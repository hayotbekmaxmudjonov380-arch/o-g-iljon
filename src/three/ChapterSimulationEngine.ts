import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { FizLabTheme } from '../types/fizlab';
import type { SimulationEngineParams } from '../utils/simulationPhysics';
import {
  createBrushedMetalTexture,
  createContactShadowTexture,
  createLabRenderer,
  detectSoftwareWebGL,
  scheduleAfterDraw,
  setupStudioEnvironment,
} from './webglUtils';
import type {
  ChapterCameraPreset,
  ChapterSceneHandler,
  ChapterSceneMaterials,
} from './chapters/types';
import { buildBob1Scene, buildBob2Scene } from './chapters/mknThermoScenes';
import { buildBob3Scene, buildBob4Scene } from './chapters/engineMatterScenes';
import { buildBob5Scene, buildBob6Scene } from './chapters/opticsSolarScenes';

export class ChapterSimulationEngine {
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

  private params: SimulationEngineParams;
  private theme: FizLabTheme = 'dark';
  private handler: ChapterSceneHandler;

  private hemiLight!: THREE.HemisphereLight;
  private benchMat!: THREE.MeshStandardMaterial;
  private benchRingMat!: THREE.MeshBasicMaterial;
  private glassMat!: THREE.MeshPhysicalMaterial;
  private darkAnodizedMat!: THREE.MeshStandardMaterial;

  private cameraTransitionActive = false;
  private camGoalPos = new THREE.Vector3();
  private camGoalTarget = new THREE.Vector3();
  private disposables: { dispose: () => void }[] = [];

  constructor(
    container: HTMLElement,
    initialParams: SimulationEngineParams,
    initialTheme: FizLabTheme = 'dark'
  ) {
    this.container = container;
    this.params = { ...initialParams };
    this.theme = initialTheme;

    this.isSoftwareGl = detectSoftwareWebGL();
    this.renderer = createLabRenderer(container, this.isSoftwareGl);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060a14);
    this.scene.fog = new THREE.FogExp2(0x060a14, 0.024);

    this.envTex = setupStudioEnvironment(this.renderer, this.scene);
    this.disposables.push(this.envTex);

    const aspect =
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(44, aspect, 0.1, 100);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 3.8;
    this.controls.maxDistance = 15.5;
    this.controls.minPolarAngle = 0.12;
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.addEventListener('start', () => {
      this.cameraTransitionActive = false;
    });

    this.setupLighting();
    this.buildLabBench();

    const mats = this.createMaterials();
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();

    if (initialParams.chapterId === 'sim-bob-1') {
      this.handler = buildBob1Scene(mats, maxAniso, this.disposables);
    } else if (initialParams.chapterId === 'sim-bob-2') {
      this.handler = buildBob2Scene(mats, this.disposables);
    } else if (initialParams.chapterId === 'sim-bob-3') {
      this.handler = buildBob3Scene(mats, this.disposables);
    } else if (initialParams.chapterId === 'sim-bob-4') {
      this.handler = buildBob4Scene(mats, this.disposables);
    } else if (initialParams.chapterId === 'sim-bob-5') {
      this.handler = buildBob5Scene(mats, maxAniso, this.disposables);
    } else {
      this.handler = buildBob6Scene(mats, maxAniso, this.disposables);
    }

    this.scene.add(this.handler.group);
    this.handler.onScenarioChange(initialParams.scenarioId);
    this.handler.reset(initialParams);
    this.setTheme(this.theme);
    this.applyCameraImmediate('overview');

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.tick();
  }

  private setupLighting() {
    this.hemiLight = new THREE.HemisphereLight(0xbae6fd, 0x0f172a, 0.85);
    this.scene.add(this.hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.35);
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

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.45);
    rimLight.position.set(-7, 5, -6);
    this.scene.add(rimLight);
  }

  private buildLabBench() {
    const benchGeo = new THREE.CylinderGeometry(7.6, 8.0, 0.36, 64);
    this.benchMat = new THREE.MeshStandardMaterial({
      color: 0x0d1424,
      roughness: 0.78,
      metalness: 0.16,
    });
    const bench = new THREE.Mesh(benchGeo, this.benchMat);
    bench.position.y = -0.18;
    bench.receiveShadow = true;
    this.scene.add(bench);

    const ringGeo = new THREE.RingGeometry(2.85, 2.91, 64);
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
    ring.position.y = 0.014;
    this.scene.add(ring);

    const shadowTex = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(7.2, 7.2);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.y = 0.01;
    this.scene.add(shadowPlane);

    this.disposables.push(benchGeo, this.benchMat, ringGeo, this.benchRingMat, shadowTex, shadowGeo, shadowMat);
  }

  private createMaterials(): ChapterSceneMaterials {
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    const brushedTex = createBrushedMetalTexture(maxAniso);

    this.darkAnodizedMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.42,
      metalness: 0.8,
      roughnessMap: brushedTex,
    });
    const chrome = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.95,
    });
    const brass = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.28,
      metalness: 0.88,
    });
    const copper = new THREE.MeshStandardMaterial({
      color: 0xc2410c,
      roughness: 0.3,
      metalness: 0.86,
    });
    const rubber = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.88,
      metalness: 0.05,
    });
    const ceramic = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.32,
      metalness: 0.04,
    });
    this.glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbeafe,
      roughness: 0.06,
      metalness: 0,
      transmission: this.isSoftwareGl ? 0 : 0.86,
      transparent: true,
      opacity: this.isSoftwareGl ? 0.22 : 0.34,
      ior: 1.52,
      thickness: 0.35,
      clearcoat: 1.0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.disposables.push(
      brushedTex,
      this.darkAnodizedMat,
      chrome,
      brass,
      copper,
      rubber,
      ceramic,
      this.glassMat
    );

    return {
      darkAnodized: this.darkAnodizedMat,
      chrome,
      brass,
      copper,
      glass: this.glassMat,
      rubber,
      ceramic,
    };
  }

  private getPresetCoords(preset: ChapterCameraPreset) {
    const ch = this.params.chapterId;
    const sc = this.params.scenarioId;

    if (preset === 'top') {
      return {
        pos: new THREE.Vector3(0.01, 8.6, 2.4),
        target: new THREE.Vector3(0, 1.5, 0),
      };
    }

    if (preset === 'closeup') {
      if (ch === 'sim-bob-5' && sc !== 'bob5-lens') {
        return {
          pos: new THREE.Vector3(2.2, 3.6, 3.4),
          target: new THREE.Vector3(0, 0.7, 0),
        };
      }
      return {
        pos: new THREE.Vector3(3.4, 2.9, 4.6),
        target: new THREE.Vector3(0, 1.85, 0),
      };
    }

    // Overview preset customized cleanly per apparatus height/angle
    if (ch === 'sim-bob-5' && sc !== 'bob5-lens') {
      return {
        pos: new THREE.Vector3(0.6, 5.4, 4.9),
        target: new THREE.Vector3(0, 0.65, 0),
      };
    }
    if (ch === 'sim-bob-5' && sc === 'bob5-lens') {
      return {
        pos: new THREE.Vector3(0.4, 2.9, 6.8),
        target: new THREE.Vector3(0, 1.45, 0),
      };
    }
    if (ch === 'sim-bob-6' && sc === 'bob6-cosmos') {
      return {
        pos: new THREE.Vector3(0.4, 5.6, 6.2),
        target: new THREE.Vector3(0, 1.6, 0),
      };
    }
    if (ch === 'sim-bob-6' && sc === 'bob6-solar') {
      return {
        pos: new THREE.Vector3(3.6, 4.4, 6.8),
        target: new THREE.Vector3(0.3, 2.0, 0),
      };
    }
    return {
      pos: new THREE.Vector3(5.2, 4.2, 6.9),
      target: new THREE.Vector3(0, 2.15, 0),
    };
  }

  private applyCameraImmediate(preset: ChapterCameraPreset) {
    const { pos, target } = this.getPresetCoords(preset);
    this.camera.position.copy(pos);
    this.controls.target.copy(target);
    this.controls.update();
  }

  private renderNow() {
    if (this.disposed) return;
    this.handler.update(0.016, this.clock.elapsedTime, this.params);
    this.renderer.render(this.scene, this.camera);
  }

  public setCameraPreset(preset: ChapterCameraPreset) {
    const { pos, target } = this.getPresetCoords(preset);
    this.camGoalPos.copy(pos);
    this.camGoalTarget.copy(target);
    this.cameraTransitionActive = true;
  }

  public updateParams(next: SimulationEngineParams) {
    const scenarioChanged = next.scenarioId !== this.params.scenarioId;
    this.params = { ...next };
    if (scenarioChanged) {
      this.handler.onScenarioChange(next.scenarioId);
      this.handler.reset(next);
      this.cameraTransitionActive = false;
      this.applyCameraImmediate('overview');
    }
    this.renderNow();
  }

  public resetSimulationState() {
    this.handler.reset(this.params);
    this.renderNow();
  }

  public setTheme(theme: FizLabTheme) {
    this.theme = theme;
    const isLight = theme === 'light';
    const bgHex = isLight ? 0xe9f1fa : 0x060a14;
    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.setHex(bgHex);
    }
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(bgHex);
      this.scene.fog.density = isLight ? 0.015 : 0.024;
    }

    this.hemiLight.color.setHex(isLight ? 0xffffff : 0xbae6fd);
    this.hemiLight.groundColor.setHex(isLight ? 0xc7d8ea : 0x0f172a);
    this.hemiLight.intensity = isLight ? 1.15 : 0.85;

    this.benchMat.color.setHex(isLight ? 0xd9e5f3 : 0x0d1424);
    this.benchMat.roughness = isLight ? 0.65 : 0.78;
    this.benchRingMat.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
    this.benchRingMat.opacity = isLight ? 0.35 : 0.25;
    this.darkAnodizedMat.color.setHex(isLight ? 0x334155 : 0x1e293b);
    this.glassMat.color.setHex(isLight ? 0x93c5fd : 0xdbeafe);
    this.glassMat.opacity = this.isSoftwareGl ? (isLight ? 0.28 : 0.22) : isLight ? 0.36 : 0.34;
    this.renderer.toneMappingExposure = isLight ? 1.18 : 1.12;
    this.renderNow();
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
    if (document.hidden) {
      this.clock.stop();
    } else {
      this.clock.start();
      this.clock.getDelta();
    }
  };

  private tick = () => {
    if (this.disposed) return;
    const rawDt = this.clock.getDelta();
    const dt = Math.min(rawDt, 0.045);
    const elapsed = this.clock.elapsedTime;

    if (this.cameraTransitionActive) {
      const k = 7;
      this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, this.camGoalPos.x, k, dt);
      this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, this.camGoalPos.y, k, dt);
      this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, this.camGoalPos.z, k, dt);
      this.controls.target.x = THREE.MathUtils.damp(this.controls.target.x, this.camGoalTarget.x, k, dt);
      this.controls.target.y = THREE.MathUtils.damp(this.controls.target.y, this.camGoalTarget.y, k, dt);
      this.controls.target.z = THREE.MathUtils.damp(this.controls.target.z, this.camGoalTarget.z, k, dt);
      if (this.camera.position.distanceTo(this.camGoalPos) < 0.04) {
        this.cameraTransitionActive = false;
      }
    }

    this.controls.update();
    this.handler.update(dt, elapsed, this.params);
    this.renderer.render(this.scene, this.camera);

    if (this.isSoftwareGl) {
      scheduleAfterDraw(this.renderer, this.tick, (id) => this.timerIds.push(id));
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
