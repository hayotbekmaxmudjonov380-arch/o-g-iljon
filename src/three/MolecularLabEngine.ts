import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FizLabTheme, LabExperimentId, LabTelemetry } from '../types/fizlab';
import {
  createBrushedMetalTexture,
  createContactShadowTexture,
  createDialFaceTexture,
  createLabRenderer,
  detectSoftwareWebGL,
  scheduleAfterDraw,
  setupStudioEnvironment,
} from './webglUtils';

export type CameraPreset = 'overview' | 'top' | 'closeup';

export interface LabSimulationParams {
  mode: LabExperimentId;
  temperatureK: number;
  volumeL: number;
  moleculeCount: number;
  paused: boolean;
}

interface SimParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  home: THREE.Vector3;
  mass: number; // 1 = light, 8 = heavy
  species: 0 | 1; // 0 = cyan/light, 1 = amber/heavy
}

// Reusable scratch objects (Zero-GC render loop)
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();
const _vecC = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _color = new THREE.Color();
const _cyanColor = new THREE.Color(0x38bdf8);
const _amberColor = new THREE.Color(0xf59e0b);
const _iceColor = new THREE.Color(0x7dd3fc);
const _hotColor = new THREE.Color(0xfb7185);

const CHAMBER_RADIUS = 1.95;
const CHAMBER_BASE_Y = 0.72;
const CHAMBER_TOP_Y = 5.12; // Total interior height = 4.40 units
const MAX_PARTICLES = 150;
const BROWNIAN_TRAIL_LEN = 260;

export class MolecularLabEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private envTex: THREE.Texture;
  private isSoftwareGl: boolean;
  private frameId = 0;
  private timerIds: number[] = [];
  private disposed = false;
  private clock = new THREE.Clock();

  private params: LabSimulationParams = {
    mode: 'gas-laws',
    temperatureK: 300,
    volumeL: 4.0,
    moleculeCount: 110,
    paused: false,
  };

  private onTelemetry: (telemetry: LabTelemetry) => void;
  private telemetryTimer = 0;

  // Composite 3D Apparatus Parts
  private apparatusGroup = new THREE.Group();
  private hemiLight!: THREE.HemisphereLight;
  private benchMat!: THREE.MeshStandardMaterial;
  private benchRingMat!: THREE.MeshBasicMaterial;
  private glassMat!: THREE.MeshPhysicalMaterial;
  private darkAnodizedMat!: THREE.MeshStandardMaterial;
  private thermalPlateMat!: THREE.MeshStandardMaterial;
  private pistonGroup = new THREE.Group();
  private pistonY = 3.7;
  private targetPistonY = 3.7;
  private needlePivot = new THREE.Group();
  private needleAngle = 0.6;
  private theme: FizLabTheme = 'dark';

  // Simulation entities
  private particlesMesh!: THREE.InstancedMesh;
  private particles: SimParticle[] = [];

  // Brownian motion objects
  private brownianSphere!: THREE.Group;
  private brownianPos = new THREE.Vector3(0, 2.5, 0);
  private brownianVel = new THREE.Vector3(0, 0, 0);
  private brownianOrigin = new THREE.Vector3(0, 2.5, 0);
  private brownianTrail!: THREE.Line;
  private brownianTrailMat!: THREE.LineBasicMaterial;
  private brownianTrailData = new Float32Array(BROWNIAN_TRAIL_LEN * 3);
  private trailWriteCount = 0;
  private trailSampleTimer = 0;

  // Crystal lattice bond segments (States mode)
  private latticeLines!: THREE.LineSegments;
  private latticeMat!: THREE.LineBasicMaterial;
  private latticePositions = new Float32Array(420 * 6);

  // Camera transition state
  private cameraTransitionActive = false;
  private camGoalPos = new THREE.Vector3();
  private camGoalTarget = new THREE.Vector3();

  // Telemetry accumulators
  private collisionAccumulator = 0;
  private smoothedCollisionRate = 0;
  private smoothedPressure = 101.3;

  private disposables: { dispose: () => void }[] = [];

  constructor(
    container: HTMLElement,
    initialParams: LabSimulationParams,
    onTelemetry: (t: LabTelemetry) => void,
    initialTheme: FizLabTheme = 'dark'
  ) {
    this.container = container;
    this.params = { ...initialParams };
    this.onTelemetry = onTelemetry;
    this.theme = initialTheme;

    this.isSoftwareGl = detectSoftwareWebGL();
    this.renderer = createLabRenderer(container, this.isSoftwareGl);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060a14);
    this.scene.fog = new THREE.FogExp2(0x060a14, 0.028);

    this.envTex = setupStudioEnvironment(this.renderer, this.scene);
    this.disposables.push(this.envTex);

    const aspect =
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(44, aspect, 0.1, 100);
    this.camera.position.set(5.4, 4.3, 6.9);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.06;
    this.controls.target.set(0, 2.65, 0);
    this.controls.minDistance = 4.2;
    this.controls.maxDistance = 14.5;
    this.controls.minPolarAngle = 0.14;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.addEventListener('start', () => {
      this.cameraTransitionActive = false;
    });

    this.setupLighting();
    this.buildLabEnvironment();
    this.buildApparatus();
    this.buildSimulationObjects();
    this.resetSimulationState();
    this.setTheme(this.theme);

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.tick();
  }

  private setupLighting() {
    this.hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x0f172a, 0.78);
    this.scene.add(this.hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.3);
    keyLight.position.set(6, 10, 7);
    if (!this.isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 26;
      const d = 5.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-7, 5, -6);
    this.scene.add(rimLight);
  }

  private buildLabEnvironment() {
    // Optical laboratory bench surface grounded at y = 0
    const benchGeo = new THREE.CylinderGeometry(7.2, 7.6, 0.36, 64);
    this.benchMat = new THREE.MeshStandardMaterial({
      color: 0x0d1424,
      roughness: 0.78,
      metalness: 0.18,
    });
    const bench = new THREE.Mesh(benchGeo, this.benchMat);
    bench.position.y = -0.18;
    bench.receiveShadow = true;
    this.scene.add(bench);
    this.disposables.push(benchGeo, this.benchMat);

    // Subtle bench calibration ring
    const ringGeo = new THREE.RingGeometry(2.65, 2.71, 64);
    ringGeo.rotateX(-Math.PI / 2);
    this.benchRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const ring = new THREE.Mesh(ringGeo, this.benchRingMat);
    ring.position.y = 0.015;
    this.scene.add(ring);
    this.disposables.push(ringGeo, this.benchRingMat);

    // Contact shadow plane beneath apparatus
    const shadowTex = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(6.8, 6.8);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.y = 0.01;
    this.scene.add(shadowPlane);
    this.disposables.push(shadowTex, shadowGeo, shadowMat);
  }

  private buildApparatus() {
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    const brushedTex = createBrushedMetalTexture(maxAniso);
    const dialTex = createDialFaceTexture(maxAniso);
    this.disposables.push(brushedTex, dialTex);

    this.darkAnodizedMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.42,
      metalness: 0.82,
      roughnessMap: brushedTex,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.14,
      metalness: 0.96,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.28,
      metalness: 0.88,
    });
    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.88,
      metalness: 0.05,
    });
    this.thermalPlateMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.35,
      metalness: 0.65,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25,
    });
    this.glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbeafe,
      roughness: 0.06,
      metalness: 0.0,
      transmission: this.isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: this.isSoftwareGl ? 0.2 : 0.32,
      ior: 1.52,
      thickness: 0.35,
      clearcoat: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.disposables.push(
      this.darkAnodizedMat,
      chromeMat,
      brassMat,
      rubberMat,
      this.thermalPlateMat,
      this.glassMat
    );

    // 1. Stepped Lathe Base Pedestal (grounded at y = 0)
    const baseProfile = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(2.45, 0),
      new THREE.Vector2(2.45, 0.24),
      new THREE.Vector2(2.26, 0.42),
      new THREE.Vector2(2.26, 0.68),
      new THREE.Vector2(1.96, 0.68),
      new THREE.Vector2(1.96, 0.56),
      new THREE.Vector2(0, 0.56),
    ];
    const baseGeo = new THREE.LatheGeometry(baseProfile, 48);
    const baseMesh = new THREE.Mesh(baseGeo, this.darkAnodizedMat);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    this.apparatusGroup.add(baseMesh);
    this.disposables.push(baseGeo);

    // 2. Thermal Plate inside bottom of chamber
    const plateGeo = new THREE.CylinderGeometry(
      CHAMBER_RADIUS - 0.02,
      CHAMBER_RADIUS - 0.02,
      0.16,
      48
    );
    const plateMesh = new THREE.Mesh(plateGeo, this.thermalPlateMat);
    plateMesh.position.y = CHAMBER_BASE_Y - 0.08;
    plateMesh.receiveShadow = true;
    this.apparatusGroup.add(plateMesh);
    this.disposables.push(plateGeo);

    // 3. Borosilicate Optical Glass Cylinder
    const chamberHeight = CHAMBER_TOP_Y - CHAMBER_BASE_Y;
    const glassGeo = new THREE.CylinderGeometry(
      CHAMBER_RADIUS + 0.05,
      CHAMBER_RADIUS + 0.05,
      chamberHeight,
      48,
      1,
      true
    );
    const glassMesh = new THREE.Mesh(glassGeo, this.glassMat);
    glassMesh.position.y = CHAMBER_BASE_Y + chamberHeight / 2;
    glassMesh.renderOrder = 3;
    this.apparatusGroup.add(glassMesh);
    this.disposables.push(glassGeo);

    // 4. Top Anodized Collar Ring + Brass Gasket
    const collarGeo = new THREE.TorusGeometry(CHAMBER_RADIUS + 0.14, 0.14, 18, 48);
    collarGeo.rotateX(Math.PI / 2);
    const collarMesh = new THREE.Mesh(collarGeo, this.darkAnodizedMat);
    collarMesh.position.y = CHAMBER_TOP_Y;
    collarMesh.castShadow = true;
    this.apparatusGroup.add(collarMesh);
    this.disposables.push(collarGeo);

    const topCapGeo = new THREE.CylinderGeometry(
      CHAMBER_RADIUS + 0.08,
      CHAMBER_RADIUS + 0.08,
      0.12,
      48
    );
    const topCapMat = this.glassMat.clone();
    topCapMat.opacity = 0.25;
    const topCap = new THREE.Mesh(topCapGeo, topCapMat);
    topCap.position.y = CHAMBER_TOP_Y + 0.05;
    topCap.renderOrder = 3;
    this.apparatusGroup.add(topCap);
    this.disposables.push(topCapGeo, topCapMat);

    // 5. Four Chrome Vertical Tie-Rods + Brass Nuts
    const rodGeo = new THREE.CylinderGeometry(0.055, 0.055, chamberHeight + 0.45, 16);
    const nutGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.12, 6);
    this.disposables.push(rodGeo, nutGeo);

    for (let i = 0; i < 4; i++) {
      const ang = (i * Math.PI) / 2 + Math.PI / 4;
      const rx = Math.cos(ang) * (CHAMBER_RADIUS + 0.24);
      const rz = Math.sin(ang) * (CHAMBER_RADIUS + 0.24);

      const rod = new THREE.Mesh(rodGeo, chromeMat);
      rod.position.set(rx, CHAMBER_BASE_Y + chamberHeight / 2 - 0.06, rz);
      rod.castShadow = true;
      this.apparatusGroup.add(rod);

      const nutTop = new THREE.Mesh(nutGeo, brassMat);
      nutTop.position.set(rx, CHAMBER_TOP_Y + 0.14, rz);
      this.apparatusGroup.add(nutTop);

      const nutBot = new THREE.Mesh(nutGeo, brassMat);
      nutBot.position.set(rx, 0.56, rz);
      this.apparatusGroup.add(nutBot);
    }

    // 6. Side Brass Manifold & Analog 3D Pressure Gauge
    const pipeGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.85, 16);
    pipeGeo.rotateZ(Math.PI / 2);
    const pipe = new THREE.Mesh(pipeGeo, brassMat);
    pipe.position.set(2.45, 0.42, 0);
    this.apparatusGroup.add(pipe);

    const gaugeCaseGeo = new THREE.CylinderGeometry(0.54, 0.54, 0.2, 32);
    gaugeCaseGeo.rotateX(Math.PI / 2);
    const gaugeCase = new THREE.Mesh(gaugeCaseGeo, brassMat);
    gaugeCase.position.set(2.92, 0.78, 0.08);
    gaugeCase.castShadow = true;
    this.apparatusGroup.add(gaugeCase);

    const dialGeo = new THREE.CircleGeometry(0.46, 32);
    const dialMat = new THREE.MeshBasicMaterial({ map: dialTex });
    const dialFace = new THREE.Mesh(dialGeo, dialMat);
    dialFace.position.set(2.92, 0.78, 0.185);
    this.apparatusGroup.add(dialFace);

    // Rotating 3D needle
    const needleGeo = new THREE.BoxGeometry(0.032, 0.34, 0.02);
    needleGeo.translate(0, 0.13, 0);
    const needleMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const needle = new THREE.Mesh(needleGeo, needleMat);
    this.needlePivot.add(needle);
    this.needlePivot.position.set(2.92, 0.78, 0.2);
    this.apparatusGroup.add(this.needlePivot);

    this.disposables.push(pipeGeo, gaugeCaseGeo, dialGeo, dialMat, needleGeo, needleMat);

    // 7. Dynamic Piston Assembly (Crown, O-Ring Seal, Chrome Shaft, T-Handle)
    const crownGeo = new THREE.CylinderGeometry(
      CHAMBER_RADIUS - 0.02,
      CHAMBER_RADIUS - 0.02,
      0.24,
      48
    );
    const crown = new THREE.Mesh(crownGeo, this.darkAnodizedMat);
    crown.castShadow = true;
    this.pistonGroup.add(crown);

    const sealGeo = new THREE.TorusGeometry(CHAMBER_RADIUS - 0.01, 0.045, 12, 48);
    sealGeo.rotateX(Math.PI / 2);
    const seal = new THREE.Mesh(sealGeo, rubberMat);
    seal.position.y = -0.05;
    this.pistonGroup.add(seal);

    const shaftGeo = new THREE.CylinderGeometry(0.11, 0.11, 3.6, 20);
    const shaft = new THREE.Mesh(shaftGeo, chromeMat);
    shaft.position.y = 1.9;
    this.pistonGroup.add(shaft);

    const handleGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.35, 18);
    handleGeo.rotateZ(Math.PI / 2);
    const handle = new THREE.Mesh(handleGeo, brassMat);
    handle.position.y = 3.72;
    this.pistonGroup.add(handle);

    this.disposables.push(crownGeo, sealGeo, shaftGeo, handleGeo);

    this.pistonGroup.position.y = this.pistonY;
    this.apparatusGroup.add(this.pistonGroup);
    this.scene.add(this.apparatusGroup);
  }

  private buildSimulationObjects() {
    // 1. Instanced Molecules (up to 150)
    const molGeo = new THREE.SphereGeometry(0.095, 14, 12);
    const molMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.16,
      metalness: 0.12,
      clearcoat: 0.85,
    });
    this.particlesMesh = new THREE.InstancedMesh(molGeo, molMat, MAX_PARTICLES);
    this.particlesMesh.frustumCulled = false;
    this.particlesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.disposables.push(molGeo, molMat);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.particles.push({
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        home: new THREE.Vector3(),
        mass: 1,
        species: i % 2 === 0 ? 0 : 1,
      });
      this.particlesMesh.setColorAt(i, _cyanColor);
    }
    this.particlesMesh.computeBoundingSphere();
    this.scene.add(this.particlesMesh);

    // 2. Brownian Colloidal Pollen Sphere (composite 3-part glowing core + shell + equatorial band)
    this.brownianSphere = new THREE.Group();
    const coreGeo = new THREE.SphereGeometry(0.28, 28, 24);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.2,
      clearcoat: 1.0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.brownianSphere.add(coreMesh);

    const bandGeo = new THREE.TorusGeometry(0.31, 0.025, 12, 36);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      roughness: 0.25,
      metalness: 0.8,
    });
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    bandMesh.rotation.x = Math.PI / 3;
    this.brownianSphere.add(bandMesh);

    const ring2Mesh = new THREE.Mesh(bandGeo, bandMat);
    ring2Mesh.rotation.y = Math.PI / 3;
    this.brownianSphere.add(ring2Mesh);

    this.disposables.push(coreGeo, coreMat, bandGeo, bandMat);
    this.scene.add(this.brownianSphere);

    // Brownian Trajectory Trail Line
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(this.brownianTrailData, 3)
    );
    this.brownianTrailMat = new THREE.LineBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.85,
    });
    this.brownianTrail = new THREE.Line(trailGeo, this.brownianTrailMat);
    this.brownianTrail.frustumCulled = false;
    this.disposables.push(trailGeo, this.brownianTrailMat);
    this.scene.add(this.brownianTrail);

    // 3. Crystal Lattice Bonds (States mode)
    const latticeGeo = new THREE.BufferGeometry();
    latticeGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(this.latticePositions, 3)
    );
    this.latticeMat = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.45,
    });
    this.latticeLines = new THREE.LineSegments(latticeGeo, this.latticeMat);
    this.latticeLines.frustumCulled = false;
    this.disposables.push(latticeGeo, this.latticeMat);
    this.scene.add(this.latticeLines);
  }

  public setTheme(theme: FizLabTheme) {
    this.theme = theme;
    const isLight = theme === 'light';
    const bgHex = isLight ? 0xe9f1fa : 0x060a14;

    (this.scene.background as THREE.Color).setHex(bgHex);
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(bgHex);
      this.scene.fog.density = isLight ? 0.018 : 0.028;
    }

    this.hemiLight.color.setHex(isLight ? 0xffffff : 0xbae6fd);
    this.hemiLight.groundColor.setHex(isLight ? 0xcbd5e1 : 0x0f172a);
    this.hemiLight.intensity = isLight ? 1.15 : 0.78;

    this.benchMat.color.setHex(isLight ? 0xd4e0ed : 0x0d1424);
    this.benchMat.roughness = isLight ? 0.62 : 0.78;
    this.benchRingMat.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
    this.benchRingMat.opacity = isLight ? 0.38 : 0.25;

    this.darkAnodizedMat.color.setHex(isLight ? 0x334155 : 0x1e293b);
    this.glassMat.color.setHex(isLight ? 0x93c5fd : 0xdbeafe);
    this.glassMat.opacity = this.isSoftwareGl
      ? isLight
        ? 0.22
        : 0.2
      : isLight
      ? 0.26
      : 0.32;

    this.brownianTrailMat.color.setHex(isLight ? 0xd97706 : 0xfbbf24);
    this.latticeMat.color.setHex(isLight ? 0x0284c7 : 0x7dd3fc);
    this.latticeMat.opacity = isLight ? 0.6 : 0.45;
    this.renderer.toneMappingExposure = isLight ? 1.04 : 1.12;
  }

  public updateParams(next: Partial<LabSimulationParams>) {
    const prevMode = this.params.mode;
    this.params = { ...this.params, ...next };
    if (next.mode && next.mode !== prevMode) {
      this.resetSimulationState();
    }
  }

  public setCameraPreset(preset: CameraPreset) {
    this.cameraTransitionActive = true;
    if (preset === 'overview') {
      this.camGoalPos.set(5.4, 4.3, 6.9);
      this.camGoalTarget.set(0, 2.65, 0);
    } else if (preset === 'top') {
      this.camGoalPos.set(0.01, 9.2, 2.2);
      this.camGoalTarget.set(0, 2.4, 0);
    } else if (preset === 'closeup') {
      this.camGoalPos.set(3.0, 2.4, 3.6);
      this.camGoalTarget.set(0, 2.1, 0);
    }
  }

  public resetSimulationState() {
    const mode = this.params.mode;
    this.pistonGroup.visible = mode === 'gas-laws';
    this.brownianSphere.visible = mode === 'brownian';
    this.brownianTrail.visible = mode === 'brownian';
    this.latticeLines.visible = mode === 'states';

    // Target piston height mapping: 1.5 L -> y=1.82, 6.0 L -> y=4.78
    const normV = THREE.MathUtils.clamp((this.params.volumeL - 1.5) / 4.5, 0, 1);
    this.targetPistonY = CHAMBER_BASE_Y + 1.1 + normV * 2.95;
    this.pistonY = this.targetPistonY;
    this.pistonGroup.position.y = this.pistonY;

    // Reset Brownian particle at chamber center
    this.brownianOrigin.set(0, 2.6, 0);
    this.brownianPos.copy(this.brownianOrigin);
    this.brownianVel.set(0, 0, 0);
    this.trailWriteCount = 1;
    this.brownianTrailData[0] = this.brownianPos.x;
    this.brownianTrailData[1] = this.brownianPos.y;
    this.brownianTrailData[2] = this.brownianPos.z;
    this.brownianTrail.geometry.setDrawRange(0, 1);
    this.brownianTrail.geometry.attributes.position.needsUpdate = true;

    // Arrange particles for the selected mode
    const maxY = mode === 'gas-laws' ? this.pistonY - 0.25 : CHAMBER_TOP_Y - 0.25;

    // 4 x 4 x 6 crystal grid for states mode (96 nodes)
    let gridIdx = 0;
    const spacing = 0.58;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = this.particles[i];
      if (mode === 'states' && i < 96) {
        const gx = gridIdx % 4;
        const gy = Math.floor(gridIdx / 16);
        const gz = Math.floor((gridIdx % 16) / 4);
        gridIdx++;
        p.home.set(
          (gx - 1.5) * spacing,
          CHAMBER_BASE_Y + 0.35 + gy * spacing,
          (gz - 1.5) * spacing
        );
        p.pos.copy(p.home);
      } else {
        const r = Math.sqrt(Math.random()) * (CHAMBER_RADIUS - 0.25);
        const theta = Math.random() * Math.PI * 2;
        p.pos.set(
          Math.cos(theta) * r,
          CHAMBER_BASE_Y + 0.25 + Math.random() * Math.max(0.6, maxY - CHAMBER_BASE_Y - 0.3),
          Math.sin(theta) * r
        );
        p.home.copy(p.pos);
      }

      // Random isotropic thermal velocity
      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      p.species = i % 2 === 0 ? 0 : 1;
      p.mass = mode === 'maxwell' ? (p.species === 0 ? 1 : 8) : 1;
      const baseSpd = 2.6 / Math.sqrt(p.mass);
      p.vel.copy(dir).multiplyScalar(baseSpd * (0.7 + Math.random() * 0.6));
    }

    this.collisionAccumulator = 0;
    this.smoothedCollisionRate = 0;
  }

  private handleResize = () => {
    if (this.disposed) return;
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private handleVisibilityChange = () => {
    if (!document.hidden && !this.disposed) {
      this.clock.getDelta();
    }
  };

  private tick = () => {
    if (this.disposed) return;
    if (document.hidden) {
      const id = window.setTimeout(this.tick, 250);
      this.timerIds.push(id);
      return;
    }
    const dt = Math.min(this.clock.getDelta(), 0.04);
    const elapsed = this.clock.getElapsedTime();

    // Smooth camera preset damping
    if (this.cameraTransitionActive) {
      this.camera.position.x = THREE.MathUtils.damp(
        this.camera.position.x,
        this.camGoalPos.x,
        5,
        dt
      );
      this.camera.position.y = THREE.MathUtils.damp(
        this.camera.position.y,
        this.camGoalPos.y,
        5,
        dt
      );
      this.camera.position.z = THREE.MathUtils.damp(
        this.camera.position.z,
        this.camGoalPos.z,
        5,
        dt
      );
      this.controls.target.x = THREE.MathUtils.damp(
        this.controls.target.x,
        this.camGoalTarget.x,
        5,
        dt
      );
      this.controls.target.y = THREE.MathUtils.damp(
        this.controls.target.y,
        this.camGoalTarget.y,
        5,
        dt
      );
      this.controls.target.z = THREE.MathUtils.damp(
        this.controls.target.z,
        this.camGoalTarget.z,
        5,
        dt
      );
      if (this.camera.position.distanceToSquared(this.camGoalPos) < 0.002) {
        this.cameraTransitionActive = false;
      }
    }
    this.controls.update();

    // Update thermal plate glow based on temperature (60 K -> 650 K)
    const tNorm = THREE.MathUtils.clamp((this.params.temperatureK - 60) / 590, 0, 1);
    _color.copy(_iceColor).lerp(_hotColor, tNorm);
    this.thermalPlateMat.emissive.copy(_color);
    this.thermalPlateMat.emissiveIntensity = 0.18 + tNorm * 0.65;

    // Smooth piston movement
    if (this.params.mode === 'gas-laws') {
      const normV = THREE.MathUtils.clamp((this.params.volumeL - 1.5) / 4.5, 0, 1);
      this.targetPistonY = CHAMBER_BASE_Y + 1.1 + normV * 2.95;
      this.pistonY = THREE.MathUtils.damp(this.pistonY, this.targetPistonY, 7, dt);
      this.pistonGroup.position.y = this.pistonY;
    }

    if (!this.params.paused) {
      this.stepPhysics(dt, elapsed);
    }

    // Update Pressure Gauge Needle smoothly
    const targetNeedle = THREE.MathUtils.clamp(
      0.85 - (this.smoothedPressure / 450) * 1.9,
      -1.2,
      0.95
    );
    this.needleAngle = THREE.MathUtils.damp(this.needleAngle, targetNeedle, 6, dt);
    this.needlePivot.rotation.z = this.needleAngle;

    this.renderInstances();
    this.renderer.render(this.scene, this.camera);

    // Emit telemetry at ~10 Hz
    this.telemetryTimer += dt;
    if (this.telemetryTimer >= 0.1) {
      this.emitTelemetry(this.telemetryTimer);
      this.telemetryTimer = 0;
    }

    if (this.isSoftwareGl) {
      scheduleAfterDraw(this.renderer, this.tick, (id) => this.timerIds.push(id));
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

  private stepPhysics(dt: number, elapsed: number) {
    const { mode, temperatureK, moleculeCount } = this.params;
    const activeCount =
      mode === 'states' ? 96 : Math.min(MAX_PARTICLES, Math.max(20, moleculeCount));

    const tempScale = Math.sqrt(Math.max(20, temperatureK) / 300);
    const chamberTopLimit =
      mode === 'gas-laws' ? this.pistonY - 0.2 : CHAMBER_TOP_Y - 0.18;
    const chamberBotLimit = CHAMBER_BASE_Y + 0.12;
    const wallR = CHAMBER_RADIUS - 0.14;

    if (mode === 'states') {
      // Phase transitions: < 180 K Solid Crystal, 180-360 K Liquid, > 360 K Gas
      const isSolid = temperatureK < 180;
      const isLiquid = temperatureK >= 180 && temperatureK < 360;

      for (let i = 0; i < activeCount; i++) {
        const p = this.particles[i];
        if (isSolid) {
          // Harmonic lattice oscillation
          const amp = 0.03 + (temperatureK / 180) * 0.075;
          _vecA.set(
            p.home.x + Math.sin(elapsed * 14 + i * 1.7) * amp,
            p.home.y + Math.cos(elapsed * 15 + i * 2.3) * amp,
            p.home.z + Math.sin(elapsed * 13 + i * 1.1) * amp
          );
          p.pos.lerp(_vecA, Math.min(1, dt * 16));
        } else if (isLiquid) {
          // Cohesive swirling fluid near bottom of chamber
          p.vel.y -= 3.6 * dt; // Gravity keeps liquid pooled
          // Gentle thermal agitation
          p.vel.x += (Math.random() - 0.5) * 6.5 * tempScale * dt;
          p.vel.z += (Math.random() - 0.5) * 6.5 * tempScale * dt;
          p.vel.y += (Math.random() - 0.5) * 4.5 * tempScale * dt;
          p.vel.multiplyScalar(0.985);
          p.vel.clampLength(0.2, 2.8 * tempScale);
          p.pos.addScaledVector(p.vel, dt);

          const liquidCeiling = CHAMBER_BASE_Y + 1.85;
          if (p.pos.y > liquidCeiling) {
            p.pos.y = liquidCeiling;
            p.vel.y *= -0.7;
          }
        } else {
          // Vaporized Gas
          const targetMag = 3.2 * tempScale;
          const curMag = p.vel.length() || 1;
          p.vel.multiplyScalar(THREE.MathUtils.lerp(1, targetMag / curMag, dt * 4));
          p.pos.addScaledVector(p.vel, dt);
        }

        this.constrainToCylinder(p, wallR, chamberBotLimit, chamberTopLimit);
      }

      // Draw crystal/cohesive bond lines in solid & liquid states
      let seg = 0;
      if (isSolid || isLiquid) {
        const maxDistSq = isSolid ? 0.55 : 0.42;
        for (let i = 0; i < activeCount && seg < 420; i++) {
          for (let j = i + 1; j < activeCount && seg < 420; j++) {
            const d2 = this.particles[i].pos.distanceToSquared(this.particles[j].pos);
            if (d2 < maxDistSq) {
              const off = seg * 6;
              this.latticePositions[off] = this.particles[i].pos.x;
              this.latticePositions[off + 1] = this.particles[i].pos.y;
              this.latticePositions[off + 2] = this.particles[i].pos.z;
              this.latticePositions[off + 3] = this.particles[j].pos.x;
              this.latticePositions[off + 4] = this.particles[j].pos.y;
              this.latticePositions[off + 5] = this.particles[j].pos.z;
              seg++;
            }
          }
        }
      }
      this.latticeLines.geometry.setDrawRange(0, seg * 2);
      this.latticeLines.geometry.attributes.position.needsUpdate = true;
    } else {
      // Gas-laws, Brownian, or Maxwell modes
      for (let i = 0; i < activeCount; i++) {
        const p = this.particles[i];
        const targetSpeed = (3.4 * tempScale) / Math.sqrt(p.mass);
        const curSpeed = p.vel.length() || 0.01;
        // Gently thermostat velocities toward target thermal distribution
        const factor = THREE.MathUtils.lerp(1, targetSpeed / curSpeed, dt * 2.5);
        p.vel.multiplyScalar(factor);
        p.pos.addScaledVector(p.vel, dt);

        const hit = this.constrainToCylinder(
          p,
          wallR,
          chamberBotLimit,
          chamberTopLimit
        );
        if (hit) {
          this.collisionAccumulator += 1;
        }

        // Brownian collision with colloidal pollen sphere
        if (mode === 'brownian') {
          _vecA.copy(p.pos).sub(this.brownianPos);
          const dist = _vecA.length();
          const minDist = 0.39;
          if (dist < minDist && dist > 0.0001) {
            _vecA.divideScalar(dist); // normal
            p.pos.copy(this.brownianPos).addScaledVector(_vecA, minDist + 0.01);
            // Impulse transfer to heavy colloidal particle
            const relDot = p.vel.dot(_vecA);
            if (relDot < 0) {
              p.vel.addScaledVector(_vecA, -2 * relDot);
              this.brownianVel.addScaledVector(_vecA, relDot * 0.28);
            }
          }
        }
      }

      if (mode === 'brownian') {
        // Viscous drag & thermal micro-kicks
        this.brownianVel.multiplyScalar(Math.pow(0.28, dt));
        this.brownianPos.addScaledVector(this.brownianVel, dt);

        // Keep Brownian sphere inside chamber
        const bWall = CHAMBER_RADIUS - 0.42;
        const rXZ = Math.hypot(this.brownianPos.x, this.brownianPos.z);
        if (rXZ > bWall) {
          const s = bWall / rXZ;
          this.brownianPos.x *= s;
          this.brownianPos.z *= s;
          this.brownianVel.x *= -0.7;
          this.brownianVel.z *= -0.7;
        }
        if (this.brownianPos.y < chamberBotLimit + 0.35) {
          this.brownianPos.y = chamberBotLimit + 0.35;
          this.brownianVel.y = Math.abs(this.brownianVel.y) * 0.7;
        }
        if (this.brownianPos.y > chamberTopLimit - 0.35) {
          this.brownianPos.y = chamberTopLimit - 0.35;
          this.brownianVel.y = -Math.abs(this.brownianVel.y) * 0.7;
        }

        this.brownianSphere.position.copy(this.brownianPos);
        this.brownianSphere.rotation.x += dt * 0.8;
        this.brownianSphere.rotation.y += dt * 1.1;

        this.trailSampleTimer += dt;
        if (this.trailSampleTimer >= 0.045) {
          this.trailSampleTimer = 0;
          if (this.trailWriteCount < BROWNIAN_TRAIL_LEN) {
            const idx = this.trailWriteCount * 3;
            this.brownianTrailData[idx] = this.brownianPos.x;
            this.brownianTrailData[idx + 1] = this.brownianPos.y;
            this.brownianTrailData[idx + 2] = this.brownianPos.z;
            this.trailWriteCount++;
          } else {
            // Shift left by 1 vertex
            this.brownianTrailData.copyWithin(0, 3);
            const last = (BROWNIAN_TRAIL_LEN - 1) * 3;
            this.brownianTrailData[last] = this.brownianPos.x;
            this.brownianTrailData[last + 1] = this.brownianPos.y;
            this.brownianTrailData[last + 2] = this.brownianPos.z;
          }
          this.brownianTrail.geometry.setDrawRange(0, this.trailWriteCount);
          this.brownianTrail.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
  }

  private constrainToCylinder(
    p: SimParticle,
    wallR: number,
    minY: number,
    maxY: number
  ): boolean {
    let collided = false;
    if (p.pos.y < minY) {
      p.pos.y = minY;
      p.vel.y = Math.abs(p.vel.y);
      collided = true;
    } else if (p.pos.y > maxY) {
      p.pos.y = maxY;
      p.vel.y = -Math.abs(p.vel.y);
      collided = true;
    }

    const rSq = p.pos.x * p.pos.x + p.pos.z * p.pos.z;
    if (rSq > wallR * wallR) {
      const r = Math.sqrt(rSq);
      const nx = p.pos.x / r;
      const nz = p.pos.z / r;
      p.pos.x = nx * wallR;
      p.pos.z = nz * wallR;
      const dot = p.vel.x * nx + p.vel.z * nz;
      if (dot > 0) {
        p.vel.x -= 2 * dot * nx;
        p.vel.z -= 2 * dot * nz;
        collided = true;
      }
    }
    return collided;
  }

  private renderInstances() {
    const { mode, moleculeCount, temperatureK } = this.params;
    const activeCount =
      mode === 'states' ? 96 : Math.min(MAX_PARTICLES, Math.max(20, moleculeCount));

    const tHeat = THREE.MathUtils.clamp((temperatureK - 80) / 520, 0, 1);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      if (i < activeCount) {
        const p = this.particles[i];
        _quat.identity();
        const sz =
          mode === 'maxwell'
            ? p.species === 0
              ? 0.78
              : 1.28
            : mode === 'brownian'
            ? 0.68
            : 0.95;
        _scale.setScalar(sz);
        _mat4.compose(p.pos, _quat, _scale);
        this.particlesMesh.setMatrixAt(i, _mat4);

        if (mode === 'maxwell') {
          this.particlesMesh.setColorAt(
            i,
            p.species === 0 ? _cyanColor : _amberColor
          );
        } else if (mode === 'states') {
          _color.copy(_iceColor).lerp(_amberColor, tHeat);
          this.particlesMesh.setColorAt(i, _color);
        } else {
          // Speed-tinted kinetic color
          const spdNorm = THREE.MathUtils.clamp(p.vel.length() / 6.5, 0, 1);
          _color.copy(_cyanColor).lerp(_amberColor, spdNorm);
          this.particlesMesh.setColorAt(i, _color);
        }
      } else {
        _scale.setScalar(0);
        _vecC.set(0, -100, 0);
        _quat.identity();
        _mat4.compose(_vecC, _quat, _scale);
        this.particlesMesh.setMatrixAt(i, _mat4);
      }
    }

    this.particlesMesh.instanceMatrix.needsUpdate = true;
    if (this.particlesMesh.instanceColor) {
      this.particlesMesh.instanceColor.needsUpdate = true;
    }
  }

  private emitTelemetry(windowSec: number) {
    const { mode, temperatureK, volumeL, moleculeCount } = this.params;
    const instantRate = this.collisionAccumulator / Math.max(0.05, windowSec);
    this.collisionAccumulator = 0;
    this.smoothedCollisionRate = THREE.MathUtils.lerp(
      this.smoothedCollisionRate,
      instantRate,
      0.35
    );

    // Physical Ideal Gas Law calculation (scaled for n = moleculeCount / 550 mol -> ~0.2 mol)
    const moles = (moleculeCount / 110) * 0.16;
    const idealPressureKpa =
      (moles * 8.314 * temperatureK) / Math.max(0.5, volumeL);
    this.smoothedPressure = THREE.MathUtils.lerp(
      this.smoothedPressure,
      idealPressureKpa,
      0.3
    );

    // RMS speed for air/O2 (M = 0.029 kg/mol)
    const rmsSpeedMs = Math.sqrt((3 * 8.314 * temperatureK) / 0.029);
    const kineticEnergyJ = 1.5 * 1.380649e-23 * temperatureK;

    const lightSpeciesSpeedMs = Math.sqrt((3 * 8.314 * temperatureK) / 0.004); // He
    const heavySpeciesSpeedMs = Math.sqrt((3 * 8.314 * temperatureK) / 0.032); // O2

    const msdUm2 =
      this.brownianPos.distanceToSquared(this.brownianOrigin) * 14.5;

    let phaseLabel = 'Ideal gaz';
    if (mode === 'states') {
      phaseLabel =
        temperatureK < 180
          ? 'Qattiq kristall'
          : temperatureK < 360
          ? 'Suyuqlik'
          : 'Gaz fazasi';
    } else if (mode === 'brownian') {
      phaseLabel = 'Kolloid suspenziya';
    } else if (mode === 'maxwell') {
      phaseLabel = 'He + O₂ aralashma';
    }

    // Build 12-bin live speed histogram from active particles
    const bins = new Array(12).fill(0);
    const activeCount =
      mode === 'states' ? 96 : Math.min(MAX_PARTICLES, Math.max(20, moleculeCount));
    for (let i = 0; i < activeCount; i++) {
      const spd = this.particles[i].vel.length();
      const idx = Math.min(11, Math.floor((spd / 8.5) * 12));
      bins[idx]++;
    }

    this.onTelemetry({
      temperatureK,
      volumeL,
      pressureKpa: this.smoothedPressure,
      rmsSpeedMs,
      kineticEnergyJ,
      collisionRate: Math.round(this.smoothedCollisionRate),
      msdUm2,
      phaseLabel,
      lightSpeciesSpeedMs,
      heavySpeciesSpeedMs,
      speedBins: bins,
    });
  }

  public dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.frameId);
    this.timerIds.forEach((id) => clearTimeout(id));
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.controls.dispose();
    this.disposables.forEach((d) => d.dispose());
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
