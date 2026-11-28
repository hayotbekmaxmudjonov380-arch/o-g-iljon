import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { FizLabTheme } from '../../types/fizlab';
import {
  createBrushedMetalTexture,
  createContactShadowTexture,
  createLabRenderer,
  detectSoftwareWebGL,
  scheduleAfterDraw,
  setupStudioEnvironment,
} from '../webglUtils';

export type MoleculeCameraPreset = 'overview' | 'top' | 'closeup';

export interface MoleculeFilmSceneState {
  dropped: boolean;
  measuredDiameterCm: number | null;
  targetFilmDiameterCm: number;
  showMolecules: boolean;
}

const CM_SCALE = 0.52; // 10 cm = 5.20 world units (-2.60 .. +2.60)
const RULER_MAX_CM = 10;
const WATER_Y = 0.35;
const TALK_COUNT = 130;
const MOLECULE_COUNT = 165;

const _dummy = new THREE.Object3D();

function createRulerTexture(
  maxAnisotropy: number,
  isLight: boolean
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 192;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = isLight ? '#f1f5f9' : '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top & bottom subtle metallic bevel lines
  ctx.fillStyle = isLight ? '#cbd5e1' : '#334155';
  ctx.fillRect(0, 0, canvas.width, 6);
  ctx.fillRect(0, canvas.height - 6, canvas.width, 6);

  const padX = 48;
  const usableW = canvas.width - padX * 2;
  const totalMm = RULER_MAX_CM * 10;

  for (let mm = 0; mm <= totalMm; mm++) {
    const x = padX + (mm / totalMm) * usableW;
    const isCm = mm % 10 === 0;
    const isHalfCm = mm % 5 === 0 && !isCm;

    ctx.strokeStyle = isCm
      ? isLight
        ? '#0f172a'
        : '#f8fafc'
      : isHalfCm
      ? isLight
        ? '#334155'
        : '#94a3b8'
      : isLight
      ? '#94a3b8'
      : '#475569';
    ctx.lineWidth = isCm ? 4 : isHalfCm ? 2.5 : 1.5;

    const tickLen = isCm ? 56 : isHalfCm ? 38 : 22;
    ctx.beginPath();
    ctx.moveTo(x, 8);
    ctx.lineTo(x, 8 + tickLen);
    ctx.stroke();

    if (isCm) {
      const cmVal = mm / 10;
      ctx.fillStyle = isLight ? '#0f172a' : '#f1f7ff';
      ctx.font = '700 34px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(String(cmVal), x, 108);
    }
  }

  ctx.fillStyle = isLight ? '#0284c7' : '#38bdf8';
  ctx.font = '700 24px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('CHIZG‘ICH (sm)', padX, 158);

  ctx.fillStyle = isLight ? '#475569' : '#94a3b8';
  ctx.font = '600 22px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('0 — 10 sm', canvas.width - padX, 158);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.max(1, maxAnisotropy);
  return texture;
}

export class MoleculeFilmSceneEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private isSoftwareGl: boolean;
  private disposed = false;
  private frameId = 0;
  private timerIds: number[] = [];
  private startMs = performance.now();
  private lastTickMs = performance.now();
  private pageHidden = false;

  private state: MoleculeFilmSceneState;
  private theme: FizLabTheme;
  private disposables: { dispose: () => void }[] = [];

  // Lighting & theme-reactive materials
  private hemiLight!: THREE.HemisphereLight;
  private benchMat!: THREE.MeshStandardMaterial;
  private benchRingMat!: THREE.MeshBasicMaterial;
  private darkAnodizedMat!: THREE.MeshStandardMaterial;
  private ceramicMat!: THREE.MeshStandardMaterial;
  private glassMat!: THREE.MeshPhysicalMaterial;
  private waterMat!: THREE.MeshPhysicalMaterial;
  private rulerMat!: THREE.MeshStandardMaterial;
  private rulerTexLight!: THREE.CanvasTexture;
  private rulerTexDark!: THREE.CanvasTexture;

  // Dynamic apparatus & animation state
  private pipetteBulb!: THREE.Mesh;
  private pipetteTipDrop!: THREE.Mesh;
  private fallingDrop!: THREE.Mesh;
  private oilFilmMesh!: THREE.Mesh;
  private oilRimMesh!: THREE.Mesh;
  private rippleMesh!: THREE.Mesh;
  private rippleMat!: THREE.MeshBasicMaterial;
  private waterGeo!: THREE.PlaneGeometry;
  private waterBaseY!: Float32Array;
  private guideGroup!: THREE.Group;
  private spanGroup!: THREE.Group;
  private talkMesh!: THREE.InstancedMesh;
  private talkBaseR: Float32Array = new Float32Array(TALK_COUNT);
  private talkAngle: Float32Array = new Float32Array(TALK_COUNT);
  private moleculeMesh!: THREE.InstancedMesh;
  private moleculePos: { x: number; z: number; phase: number }[] = [];

  private dropPhase: 'idle' | 'falling' | 'spread' = 'idle';
  private dropTime = 0;
  private spreadTime = 0;
  private impactTime = -10;
  private currentFilmRadius = 0.001;
  private rippleRadius = 0.05;
  private rippleOpacity = 0;

  private cameraTransitionActive = false;
  private camGoalPos = new THREE.Vector3();
  private camGoalTarget = new THREE.Vector3();

  constructor(
    container: HTMLElement,
    initialState: MoleculeFilmSceneState,
    initialTheme: FizLabTheme = 'dark'
  ) {
    this.container = container;
    this.state = { ...initialState };
    this.theme = initialTheme;

    this.isSoftwareGl = detectSoftwareWebGL();
    this.renderer = createLabRenderer(container, this.isSoftwareGl);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050a1c);
    this.scene.fog = new THREE.FogExp2(0x050a1c, 0.025);

    const envTex = setupStudioEnvironment(this.renderer, this.scene);
    this.disposables.push(envTex);

    const aspect =
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 80);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.07;
    this.controls.minDistance = 2.4;
    this.controls.maxDistance = 12.5;
    this.controls.minPolarAngle = 0.04;
    this.controls.maxPolarAngle = Math.PI * 0.48;
    this.controls.addEventListener('start', () => {
      this.cameraTransitionActive = false;
    });

    this.setupLighting();
    this.buildBench();
    this.buildWaterBath();
    this.buildPipetteStand();
    this.buildRulerAndGuides();
    this.buildTalkAndMolecules();

    this.setTheme(this.theme);
    this.syncStateImmediate();
    this.applyCameraImmediate('overview');

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.tick();
  }

  private setupLighting() {
    this.hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x0f172a, 0.9);
    this.scene.add(this.hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.3);
    keyLight.position.set(5, 9, 6);
    if (!this.isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 22;
      const d = 4.6;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.35);
    rimLight.position.set(-6, 4.5, -5);
    this.scene.add(rimLight);
  }

  private buildBench() {
    const benchGeo = new THREE.CylinderGeometry(7.0, 7.4, 0.34, 64);
    this.benchMat = new THREE.MeshStandardMaterial({
      color: 0x0b1224,
      roughness: 0.76,
      metalness: 0.16,
    });
    const bench = new THREE.Mesh(benchGeo, this.benchMat);
    bench.position.y = -0.17;
    bench.receiveShadow = true;
    this.scene.add(bench);

    const ringGeo = new THREE.RingGeometry(3.45, 3.51, 64);
    ringGeo.rotateX(-Math.PI / 2);
    this.benchRingMat = new THREE.MeshBasicMaterial({
      color: 0x2e9bff,
      transparent: true,
      opacity: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const ring = new THREE.Mesh(ringGeo, this.benchRingMat);
    ring.position.y = 0.012;
    this.scene.add(ring);

    const shadowTex = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(7.2, 6.2);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.y = 0.008;
    this.scene.add(shadowPlane);

    this.disposables.push(
      benchGeo,
      this.benchMat,
      ringGeo,
      this.benchRingMat,
      shadowTex,
      shadowGeo,
      shadowMat
    );
  }

  private buildWaterBath() {
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    const brushedTex = createBrushedMetalTexture(maxAniso);

    this.darkAnodizedMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.42,
      metalness: 0.78,
      roughnessMap: brushedTex,
    });
    this.ceramicMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.52,
      metalness: 0.08,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.26,
      metalness: 0.88,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.16,
      metalness: 0.94,
    });
    this.glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbeafe,
      roughness: 0.06,
      metalness: 0,
      transmission: this.isSoftwareGl ? 0 : 0.86,
      transparent: true,
      opacity: this.isSoftwareGl ? 0.24 : 0.34,
      ior: 1.52,
      thickness: 0.28,
      clearcoat: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const bathGroup = new THREE.Group();
    const trayW = 6.2;
    const trayD = 4.9;

    // 4 machined brass leveling feet grounded at y=0
    const footGeo = new THREE.CylinderGeometry(0.16, 0.2, 0.08, 24);
    const footOffsets: [number, number][] = [
      [-trayW / 2 + 0.35, -trayD / 2 + 0.35],
      [trayW / 2 - 0.35, -trayD / 2 + 0.35],
      [-trayW / 2 + 0.35, trayD / 2 - 0.35],
      [trayW / 2 - 0.35, trayD / 2 - 0.35],
    ];
    footOffsets.forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(footGeo, brassMat);
      foot.position.set(fx, 0.04, fz);
      foot.castShadow = true;
      bathGroup.add(foot);
    });

    // Anodized tray base plate sitting on the feet
    const baseGeo = new THREE.BoxGeometry(trayW, 0.12, trayD);
    const baseMesh = new THREE.Mesh(baseGeo, this.darkAnodizedMat);
    baseMesh.position.y = 0.14;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    bathGroup.add(baseMesh);

    // Inner dark/light matte floor to reveal golden oil slick & white talk powder clearly
    const innerFloorGeo = new THREE.PlaneGeometry(trayW - 0.32, trayD - 0.32);
    innerFloorGeo.rotateX(-Math.PI / 2);
    const innerFloor = new THREE.Mesh(innerFloorGeo, this.ceramicMat);
    innerFloor.position.y = 0.205;
    innerFloor.receiveShadow = true;
    bathGroup.add(innerFloor);

    // 4 glass basin walls + 4 brushed chrome corner posts
    const wallH = 0.34;
    const wallY = 0.2 + wallH / 2;
    const wallThick = 0.07;

    const frontBackWallGeo = new THREE.BoxGeometry(trayW - 0.16, wallH, wallThick);
    const frontWall = new THREE.Mesh(frontBackWallGeo, this.glassMat);
    frontWall.position.set(0, wallY, trayD / 2 - 0.12);
    frontWall.renderOrder = 3;
    bathGroup.add(frontWall);

    const backWall = new THREE.Mesh(frontBackWallGeo, this.glassMat);
    backWall.position.set(0, wallY, -trayD / 2 + 0.12);
    backWall.renderOrder = 3;
    bathGroup.add(backWall);

    const sideWallGeo = new THREE.BoxGeometry(wallThick, wallH, trayD - 0.24);
    const leftWall = new THREE.Mesh(sideWallGeo, this.glassMat);
    leftWall.position.set(-trayW / 2 + 0.12, wallY, 0);
    leftWall.renderOrder = 3;
    bathGroup.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeo, this.glassMat);
    rightWall.position.set(trayW / 2 - 0.12, wallY, 0);
    rightWall.renderOrder = 3;
    bathGroup.add(rightWall);

    const cornerGeo = new THREE.BoxGeometry(0.14, wallH + 0.04, 0.14);
    [
      [-trayW / 2 + 0.12, -trayD / 2 + 0.12],
      [trayW / 2 - 0.12, -trayD / 2 + 0.12],
      [-trayW / 2 + 0.12, trayD / 2 - 0.12],
      [trayW / 2 - 0.12, trayD / 2 - 0.12],
    ].forEach(([cx, cz]) => {
      const post = new THREE.Mesh(cornerGeo, chromeMat);
      post.position.set(cx, wallY, cz);
      bathGroup.add(post);
    });

    // Water surface mesh (vertex-rippled dynamically)
    this.waterGeo = new THREE.PlaneGeometry(trayW - 0.32, trayD - 0.32, 36, 36);
    this.waterGeo.rotateX(-Math.PI / 2);
    const posAttr = this.waterGeo.attributes.position as THREE.BufferAttribute;
    this.waterBaseY = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      this.waterBaseY[i] = posAttr.getY(i);
    }

    this.waterMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.08,
      metalness: 0.02,
      transmission: this.isSoftwareGl ? 0 : 0.65,
      transparent: true,
      opacity: 0.62,
      ior: 1.333,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      depthWrite: false,
    });
    const waterMesh = new THREE.Mesh(this.waterGeo, this.waterMat);
    waterMesh.position.y = WATER_Y;
    waterMesh.renderOrder = 1;
    bathGroup.add(waterMesh);

    // Expanding concentric capillary ripple ring
    const rippleGeo = new THREE.RingGeometry(0.88, 1.0, 48);
    rippleGeo.rotateX(-Math.PI / 2);
    this.rippleMat = new THREE.MeshBasicMaterial({
      color: 0xbae6fd,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    this.rippleMesh = new THREE.Mesh(rippleGeo, this.rippleMat);
    this.rippleMesh.position.y = WATER_Y + 0.008;
    this.rippleMesh.visible = false;
    bathGroup.add(this.rippleMesh);

    // Iridescent golden-amber monomolecular oil film disk
    const oilGeo = new THREE.CircleGeometry(1, 64);
    oilGeo.rotateX(-Math.PI / 2);
    const oilMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.34,
      roughness: 0.14,
      metalness: 0.08,
      iridescence: 1.0,
      iridescenceIOR: 1.38,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    this.oilFilmMesh = new THREE.Mesh(oilGeo, oilMat);
    this.oilFilmMesh.position.y = WATER_Y + 0.015;
    this.oilFilmMesh.visible = false;
    this.oilFilmMesh.renderOrder = 2;
    bathGroup.add(this.oilFilmMesh);

    // Crisp rim outline around the oil slick for visual measurement clarity
    const oilRimGeo = new THREE.RingGeometry(0.975, 1.015, 64);
    oilRimGeo.rotateX(-Math.PI / 2);
    const oilRimMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
    this.oilRimMesh = new THREE.Mesh(oilRimGeo, oilRimMat);
    this.oilRimMesh.position.y = WATER_Y + 0.018;
    this.oilRimMesh.visible = false;
    this.oilRimMesh.renderOrder = 3;
    bathGroup.add(this.oilRimMesh);

    this.scene.add(bathGroup);

    this.disposables.push(
      brushedTex,
      this.darkAnodizedMat,
      this.ceramicMat,
      brassMat,
      chromeMat,
      this.glassMat,
      footGeo,
      baseGeo,
      innerFloorGeo,
      frontBackWallGeo,
      sideWallGeo,
      cornerGeo,
      this.waterGeo,
      this.waterMat,
      rippleGeo,
      this.rippleMat,
      oilGeo,
      oilMat,
      oilRimGeo,
      oilRimMat
    );
  }

  private buildPipetteStand() {
    const standGroup = new THREE.Group();
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.16,
      metalness: 0.94,
    });
    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.72,
      metalness: 0.04,
    });
    const oilDropMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      roughness: 0.08,
      metalness: 0.05,
      clearcoat: 1.0,
    });

    // Stand foot placed neatly at rear-right outside the water tray
    const standBaseGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.1, 32);
    const standBase = new THREE.Mesh(standBaseGeo, this.darkAnodizedMat);
    standBase.position.set(2.8, 0.05, -2.55);
    standBase.castShadow = true;
    standGroup.add(standBase);

    // Vertical retort rod
    const rodGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.55, 20);
    const rod = new THREE.Mesh(rodGeo, chromeMat);
    rod.position.set(2.8, 1.3, -2.55);
    rod.castShadow = true;
    standGroup.add(rod);

    // Clamp bosshead
    const bossGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
    const boss = new THREE.Mesh(bossGeo, this.darkAnodizedMat);
    boss.position.set(2.8, 2.35, -2.55);
    standGroup.add(boss);

    // Angled horizontal boom arm reaching from (2.8, 2.35, -2.55) to (0, 2.35, 0)
    const armStart = new THREE.Vector3(2.8, 2.35, -2.55);
    const armEnd = new THREE.Vector3(0, 2.35, 0);
    const armLen = armStart.distanceTo(armEnd);
    const armGeo = new THREE.CylinderGeometry(0.032, 0.032, armLen, 16);
    armGeo.rotateX(Math.PI / 2);
    const arm = new THREE.Mesh(armGeo, chromeMat);
    arm.position.copy(armStart).lerp(armEnd, 0.5);
    arm.lookAt(armEnd);
    arm.castShadow = true;
    standGroup.add(arm);

    // Clamp collar around pipette
    const collarGeo = new THREE.TorusGeometry(0.11, 0.024, 12, 24);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, chromeMat);
    collar.position.set(0, 2.35, 0);
    standGroup.add(collar);

    // Tapered glass pipette body (LatheGeometry) centered over (0, y, 0)
    const lathePoints = [
      new THREE.Vector2(0.018, 0.0), // fine tip
      new THREE.Vector2(0.034, 0.35),
      new THREE.Vector2(0.085, 0.72),
      new THREE.Vector2(0.09, 1.32),
      new THREE.Vector2(0.11, 1.38), // rim
    ];
    const pipetteGeo = new THREE.LatheGeometry(lathePoints, 28);
    const pipetteBody = new THREE.Mesh(pipetteGeo, this.glassMat);
    pipetteBody.position.set(0, 1.5, 0);
    pipetteBody.renderOrder = 4;
    standGroup.add(pipetteBody);

    // Squeeze rubber bulb on top of pipette
    const bulbGeo = new THREE.SphereGeometry(0.165, 24, 20);
    bulbGeo.scale(1, 1.35, 1);
    this.pipetteBulb = new THREE.Mesh(bulbGeo, rubberMat);
    this.pipetteBulb.position.set(0, 3.04, 0);
    this.pipetteBulb.castShadow = true;
    standGroup.add(this.pipetteBulb);

    // Small internal oil column + tip meniscus
    const oilColGeo = new THREE.CylinderGeometry(0.042, 0.014, 0.34, 16);
    const oilCol = new THREE.Mesh(oilColGeo, oilDropMat);
    oilCol.position.set(0, 1.69, 0);
    standGroup.add(oilCol);

    const tipDropGeo = new THREE.SphereGeometry(0.038, 18, 16);
    this.pipetteTipDrop = new THREE.Mesh(tipDropGeo, oilDropMat);
    this.pipetteTipDrop.position.set(0, 1.48, 0);
    standGroup.add(this.pipetteTipDrop);

    // Animated falling oil droplet
    const fallingGeo = new THREE.SphereGeometry(0.058, 20, 18);
    this.fallingDrop = new THREE.Mesh(fallingGeo, oilDropMat);
    this.fallingDrop.position.set(0, 1.48, 0);
    this.fallingDrop.visible = false;
    standGroup.add(this.fallingDrop);

    this.scene.add(standGroup);

    this.disposables.push(
      chromeMat,
      rubberMat,
      oilDropMat,
      standBaseGeo,
      rodGeo,
      bossGeo,
      armGeo,
      collarGeo,
      pipetteGeo,
      bulbGeo,
      oilColGeo,
      tipDropGeo,
      fallingGeo
    );
  }

  private buildRulerAndGuides() {
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    this.rulerTexLight = createRulerTexture(maxAniso, true);
    this.rulerTexDark = createRulerTexture(maxAniso, false);

    // Physical ruler bar length: 10 cm = 5.20 units + side padding (padX = 48/1024 on each side => scale = 5.20 / (1 - 96/1024))
    const rulerBarW = (RULER_MAX_CM * CM_SCALE) / (1 - 96 / 1024);
    const rulerBarD = 0.66;
    const rulerBarH = 0.08;

    const rulerGeo = new THREE.BoxGeometry(rulerBarW, rulerBarH, rulerBarD);
    this.rulerMat = new THREE.MeshStandardMaterial({
      map: this.rulerTexDark,
      roughness: 0.36,
      metalness: 0.14,
    });
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.35,
      metalness: 0.72,
    });

    const rulerMesh = new THREE.Mesh(rulerGeo, [
      sideMat,
      sideMat,
      this.rulerMat, // top (+Y) face carries the graduated scale
      sideMat,
      sideMat,
      sideMat,
    ]);
    rulerMesh.position.set(0, WATER_Y + 0.05, 1.98);
    rulerMesh.castShadow = true;
    rulerMesh.receiveShadow = true;
    this.scene.add(rulerMesh);

    // Two slim edge-projection laser/wire guides aligning oil film edges down to the 3D ruler
    this.guideGroup = new THREE.Group();
    const halfSpan = (this.state.targetFilmDiameterCm / 2) * CM_SCALE;

    const guideMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.78,
      polygonOffset: true,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
    const cursorMat = new THREE.MeshStandardMaterial({
      color: 0x2e9bff,
      emissive: 0x0050cc,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.65,
    });

    const lineGeo = new THREE.BoxGeometry(0.018, 0.012, 1.85);
    const cursorGeo = new THREE.ConeGeometry(0.065, 0.14, 16);
    cursorGeo.rotateX(Math.PI / 2);

    [-halfSpan, halfSpan].forEach((xPos) => {
      const line = new THREE.Mesh(lineGeo, guideMat);
      line.position.set(xPos, WATER_Y + 0.018, 0.92);
      this.guideGroup.add(line);

      const cursor = new THREE.Mesh(cursorGeo, cursorMat);
      cursor.position.set(xPos, WATER_Y + 0.105, 1.72);
      this.guideGroup.add(cursor);
    });

    this.guideGroup.visible = false;
    this.scene.add(this.guideGroup);

    // Dimension span bar shown across oil film once student verifies diameter measurement
    this.spanGroup = new THREE.Group();
    const spanMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.9,
    });
    const spanBarGeo = new THREE.BoxGeometry(halfSpan * 2, 0.018, 0.028);
    const spanBar = new THREE.Mesh(spanBarGeo, spanMat);
    spanBar.position.set(0, WATER_Y + 0.04, 0);
    this.spanGroup.add(spanBar);

    const endCapGeo = new THREE.BoxGeometry(0.025, 0.08, 0.26);
    [-halfSpan, halfSpan].forEach((xPos) => {
      const cap = new THREE.Mesh(endCapGeo, spanMat);
      cap.position.set(xPos, WATER_Y + 0.04, 0);
      this.spanGroup.add(cap);
    });
    this.spanGroup.visible = false;
    this.scene.add(this.spanGroup);

    this.disposables.push(
      this.rulerTexLight,
      this.rulerTexDark,
      rulerGeo,
      this.rulerMat,
      sideMat,
      guideMat,
      cursorMat,
      lineGeo,
      cursorGeo,
      spanMat,
      spanBarGeo,
      endCapGeo
    );
  }

  private buildTalkAndMolecules() {
    // 1. Floating white talk-powder flecks on the water surface (pushed outward by oil slick!)
    const talkGeo = new THREE.DodecahedronGeometry(0.028, 0);
    const talkMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.85,
      metalness: 0.02,
    });
    this.talkMesh = new THREE.InstancedMesh(talkGeo, talkMat, TALK_COUNT);
    this.talkMesh.frustumCulled = false;

    for (let i = 0; i < TALK_COUNT; i++) {
      // Deterministic pseudo-random radial distribution across water tray
      const seed1 = Math.sin(i * 12.9898) * 43758.5453;
      const rNorm = seed1 - Math.floor(seed1);
      const seed2 = Math.sin(i * 78.233) * 43758.5453;
      const aNorm = seed2 - Math.floor(seed2);

      this.talkBaseR[i] = 0.08 + Math.sqrt(rNorm) * 2.05;
      this.talkAngle[i] = aNorm * Math.PI * 2;
    }
    this.scene.add(this.talkMesh);

    // 2. Monolayer molecule spheres (shown when "Molekulalar" view is enabled after drop)
    const molGeo = new THREE.SphereGeometry(0.044, 14, 12);
    const molMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.25,
      roughness: 0.18,
      metalness: 0.12,
      clearcoat: 1.0,
    });
    this.moleculeMesh = new THREE.InstancedMesh(molGeo, molMat, MOLECULE_COUNT);
    this.moleculeMesh.frustumCulled = false;

    const maxR = (this.state.targetFilmDiameterCm / 2) * CM_SCALE - 0.06;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < MOLECULE_COUNT; i++) {
      const r = Math.sqrt((i + 0.5) / MOLECULE_COUNT) * maxR;
      const theta = i * goldenAngle;
      this.moleculePos.push({
        x: Math.cos(theta) * r,
        z: Math.sin(theta) * r,
        phase: i * 0.37,
      });
    }
    this.moleculeMesh.visible = false;
    this.scene.add(this.moleculeMesh);

    this.disposables.push(talkGeo, talkMat, molGeo, molMat);
  }

  private syncStateImmediate() {
    const targetR = (this.state.targetFilmDiameterCm / 2) * CM_SCALE;
    if (this.state.dropped) {
      this.dropPhase = 'spread';
      this.currentFilmRadius = targetR;
      this.oilFilmMesh.visible = true;
      this.oilFilmMesh.scale.set(targetR, 1, targetR);
      this.oilRimMesh.visible = true;
      this.oilRimMesh.scale.set(targetR, 1, targetR);
      this.guideGroup.visible = true;
    } else {
      this.dropPhase = 'idle';
      this.currentFilmRadius = 0.001;
      this.oilFilmMesh.visible = false;
      this.oilRimMesh.visible = false;
      this.guideGroup.visible = false;
    }
    this.spanGroup.visible =
      this.state.dropped && this.state.measuredDiameterCm !== null;
    this.moleculeMesh.visible =
      this.state.dropped && this.state.showMolecules;
    this.updateTalkAndMolecules(0);
  }

  private updateTalkAndMolecules(elapsed: number) {
    const pushFloor = this.state.dropped ? this.currentFilmRadius + 0.06 : 0;
    for (let i = 0; i < TALK_COUNT; i++) {
      const baseR = this.talkBaseR[i];
      const r = Math.max(baseR, pushFloor + (i % 7) * 0.025);
      const angle = this.talkAngle[i] + Math.sin(elapsed * 0.4 + i) * 0.015;
      const x = THREE.MathUtils.clamp(Math.cos(angle) * r, -2.72, 2.72);
      const z = THREE.MathUtils.clamp(Math.sin(angle) * r, -2.05, 1.52);
      _dummy.position.set(x, WATER_Y + 0.012, z);
      _dummy.rotation.set(i * 0.4, angle, 0);
      const s = 0.75 + (i % 4) * 0.16;
      _dummy.scale.set(s, s * 0.65, s);
      _dummy.updateMatrix();
      this.talkMesh.setMatrixAt(i, _dummy.matrix);
    }
    this.talkMesh.instanceMatrix.needsUpdate = true;

    if (this.moleculeMesh.visible) {
      const filmScaleRatio = Math.min(
        1,
        this.currentFilmRadius / ((this.state.targetFilmDiameterCm / 2) * CM_SCALE)
      );
      for (let i = 0; i < MOLECULE_COUNT; i++) {
        const m = this.moleculePos[i];
        const bob = Math.sin(elapsed * 2.2 + m.phase) * 0.004;
        _dummy.position.set(
          m.x * filmScaleRatio,
          WATER_Y + 0.034 + bob,
          m.z * filmScaleRatio
        );
        _dummy.rotation.set(0, 0, 0);
        _dummy.scale.setScalar(filmScaleRatio > 0.15 ? 1 : 0.01);
        _dummy.updateMatrix();
        this.moleculeMesh.setMatrixAt(i, _dummy.matrix);
      }
      this.moleculeMesh.instanceMatrix.needsUpdate = true;
    }
  }

  private updateWaterWave(elapsed: number) {
    const posAttr = this.waterGeo.attributes.position as THREE.BufferAttribute;
    const sinceImpact = elapsed - this.impactTime;
    const hasImpact = sinceImpact >= 0 && sinceImpact < 3.6;

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      let y = this.waterBaseY[i] + Math.sin(x * 1.4 + elapsed * 1.1) * 0.0025;
      if (hasImpact) {
        const dist = Math.hypot(x, z);
        const waveFront = sinceImpact * 2.3;
        const env = Math.exp(-Math.pow((dist - waveFront) * 2.2, 2)) * Math.exp(-sinceImpact * 0.9);
        y += Math.sin((dist - waveFront) * 10) * 0.032 * env;
      }
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
    this.waterGeo.computeVertexNormals();
  }

  public updateState(next: MoleculeFilmSceneState) {
    const justDropped = !this.state.dropped && next.dropped;
    const justReset = this.state.dropped && !next.dropped;
    this.state = { ...next };

    if (justDropped) {
      this.dropPhase = 'falling';
      this.dropTime = 0;
      this.spreadTime = 0;
      this.currentFilmRadius = 0.04;
      this.fallingDrop.visible = true;
      this.fallingDrop.position.set(0, 1.48, 0);
      this.fallingDrop.scale.set(1, 1, 1);
      this.oilFilmMesh.visible = false;
      this.oilRimMesh.visible = false;
      this.guideGroup.visible = false;
      this.spanGroup.visible = false;
    } else if (justReset) {
      this.syncStateImmediate();
    } else {
      this.spanGroup.visible =
        this.state.dropped && this.state.measuredDiameterCm !== null;
      this.moleculeMesh.visible =
        this.state.dropped && this.state.showMolecules;
    }
  }

  public replayDrop() {
    this.state.dropped = true;
    this.dropPhase = 'falling';
    this.dropTime = 0;
    this.spreadTime = 0;
    this.currentFilmRadius = 0.04;
    this.fallingDrop.visible = true;
    this.fallingDrop.position.set(0, 1.48, 0);
    this.oilFilmMesh.visible = false;
    this.oilRimMesh.visible = false;
    this.guideGroup.visible = false;
  }

  public setCameraPreset(preset: MoleculeCameraPreset) {
    const { pos, target } = this.getPresetCoords(preset);
    this.camGoalPos.copy(pos);
    this.camGoalTarget.copy(target);
    this.cameraTransitionActive = true;
  }

  private getPresetCoords(preset: MoleculeCameraPreset) {
    if (preset === 'top') {
      return {
        pos: new THREE.Vector3(0.0, 8.35, 1.45),
        target: new THREE.Vector3(0, 0.35, 0.42),
      };
    }
    if (preset === 'closeup') {
      return {
        pos: new THREE.Vector3(2.2, 1.75, 2.95),
        target: new THREE.Vector3(0, 0.52, 0.2),
      };
    }
    return {
      pos: new THREE.Vector3(4.35, 3.85, 5.75),
      target: new THREE.Vector3(0, 0.92, 0.15),
    };
  }

  private applyCameraImmediate(preset: MoleculeCameraPreset) {
    const { pos, target } = this.getPresetCoords(preset);
    this.camera.position.copy(pos);
    this.controls.target.copy(target);
    this.controls.update();
  }

  public setTheme(theme: FizLabTheme) {
    this.theme = theme;
    const isLight = theme === 'light';
    const bgHex = isLight ? 0xdcebf5 : 0x050a1c;

    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.setHex(bgHex);
    }
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(bgHex);
      this.scene.fog.density = isLight ? 0.016 : 0.025;
    }

    this.hemiLight.color.setHex(isLight ? 0xffffff : 0xbae6fd);
    this.hemiLight.groundColor.setHex(isLight ? 0xc7d8ea : 0x0f172a);
    this.hemiLight.intensity = isLight ? 1.18 : 0.9;

    this.benchMat.color.setHex(isLight ? 0xd0e2f2 : 0x0b1224);
    this.benchMat.roughness = isLight ? 0.65 : 0.76;
    this.benchRingMat.color.setHex(isLight ? 0x0077e6 : 0x2e9bff);
    this.benchRingMat.opacity = isLight ? 0.32 : 0.25;

    this.darkAnodizedMat.color.setHex(isLight ? 0x334155 : 0x1e293b);
    this.ceramicMat.color.setHex(isLight ? 0xdbeafe : 0x0f172a);
    this.waterMat.color.setHex(isLight ? 0x38bdf8 : 0x0284c7);
    this.waterMat.opacity = isLight ? 0.56 : 0.64;

    this.glassMat.color.setHex(isLight ? 0x93c5fd : 0xdbeafe);
    this.glassMat.opacity = this.isSoftwareGl
      ? isLight
        ? 0.3
        : 0.24
      : isLight
      ? 0.36
      : 0.34;

    this.rulerMat.map = isLight ? this.rulerTexLight : this.rulerTexDark;
    this.rulerMat.needsUpdate = true;

    this.renderer.toneMappingExposure = isLight ? 1.16 : 1.1;
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
    this.pageHidden = document.hidden;
    if (!this.pageHidden) {
      this.lastTickMs = performance.now();
    }
  };

  private tick = () => {
    if (this.disposed) return;
    const nowMs = performance.now();
    const rawDt = Math.max(0.001, (nowMs - this.lastTickMs) / 1000);
    this.lastTickMs = nowMs;
    const dt = Math.min(rawDt, 0.05);
    const animDt = Math.min(rawDt, 0.24);
    const elapsed = (nowMs - this.startMs) / 1000;

    // 1. Camera smooth damping (swift settle even under software WebGL)
    if (this.cameraTransitionActive) {
      const k = 9.0;
      const camStep = Math.min(rawDt, 0.16);
      this.camera.position.x = THREE.MathUtils.damp(
        this.camera.position.x,
        this.camGoalPos.x,
        k,
        camStep
      );
      this.camera.position.y = THREE.MathUtils.damp(
        this.camera.position.y,
        this.camGoalPos.y,
        k,
        camStep
      );
      this.camera.position.z = THREE.MathUtils.damp(
        this.camera.position.z,
        this.camGoalPos.z,
        k,
        camStep
      );
      this.controls.target.x = THREE.MathUtils.damp(
        this.controls.target.x,
        this.camGoalTarget.x,
        k,
        camStep
      );
      this.controls.target.y = THREE.MathUtils.damp(
        this.controls.target.y,
        this.camGoalTarget.y,
        k,
        camStep
      );
      this.controls.target.z = THREE.MathUtils.damp(
        this.controls.target.z,
        this.camGoalTarget.z,
        k,
        camStep
      );
      if (this.camera.position.distanceTo(this.camGoalPos) < 0.03) {
        this.camera.position.copy(this.camGoalPos);
        this.controls.target.copy(this.camGoalTarget);
        this.cameraTransitionActive = false;
      }
    }

    // 2. Droplet fall & deterministic ease-out monolayer expansion
    const targetR = (this.state.targetFilmDiameterCm / 2) * CM_SCALE;

    if (this.dropPhase === 'falling') {
      this.dropTime += animDt;
      const squeeze = Math.sin(Math.min(1, this.dropTime * 4.5) * Math.PI);
      this.pipetteBulb.scale.set(
        1 - squeeze * 0.14,
        1 + squeeze * 0.08,
        1 - squeeze * 0.14
      );

      const fallT = Math.min(1, this.dropTime / 0.32);
      const dropY = 1.48 - fallT * fallT * (1.48 - WATER_Y);
      this.fallingDrop.position.y = Math.max(WATER_Y, dropY);
      this.fallingDrop.scale.set(0.92, 1.24, 0.92);

      if (fallT >= 1) {
        this.fallingDrop.visible = false;
        this.dropPhase = 'spread';
        this.spreadTime = 0;
        this.impactTime = elapsed;
        this.rippleRadius = 0.16;
        this.rippleOpacity = 0.88;
        this.rippleMesh.visible = true;
        this.oilFilmMesh.visible = true;
        this.oilRimMesh.visible = true;
        this.pipetteBulb.scale.set(1, 1, 1);
      }
    } else if (this.dropPhase === 'spread') {
      this.spreadTime += animDt;
      const p = Math.min(1, this.spreadTime / 0.55);
      const eased = 1 - Math.pow(1 - p, 3);
      this.currentFilmRadius = THREE.MathUtils.lerp(0.08, targetR, eased);
      this.oilFilmMesh.scale.set(
        this.currentFilmRadius,
        1,
        this.currentFilmRadius
      );
      this.oilRimMesh.scale.set(
        this.currentFilmRadius,
        1,
        this.currentFilmRadius
      );
      if (p > 0.75) {
        this.guideGroup.visible = true;
      }
    }

    // Ripple ring fade-out
    if (this.rippleMesh.visible) {
      this.rippleRadius += dt * 2.25;
      this.rippleOpacity = Math.max(0, this.rippleOpacity - dt * 0.55);
      this.rippleMesh.scale.set(this.rippleRadius, 1, this.rippleRadius);
      this.rippleMat.opacity = this.rippleOpacity;
      if (this.rippleOpacity <= 0.01) {
        this.rippleMesh.visible = false;
      }
    }

    // Idle tip droplet gentle shimmer
    this.pipetteTipDrop.visible = this.dropPhase !== 'falling';
    this.pipetteTipDrop.scale.setScalar(1 + Math.sin(elapsed * 2.4) * 0.06);

    this.updateWaterWave(elapsed);
    this.updateTalkAndMolecules(elapsed);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    if (this.isSoftwareGl) {
      scheduleAfterDraw(this.renderer, this.tick, (id) =>
        this.timerIds.push(id)
      );
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

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
