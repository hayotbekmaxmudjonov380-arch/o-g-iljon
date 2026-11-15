import * as THREE from 'three';
import { FizLabTheme, IntroThermalState } from '../types/fizlab';
import {
  createLabRenderer,
  detectSoftwareWebGL,
  scheduleAfterDraw,
  setupStudioEnvironment,
} from './webglUtils';

interface MoleculeNode {
  group: THREE.Group;
  homePos: THREE.Vector3;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  rotSpeed: THREE.Vector3;
  phase: number;
}

const _vec3 = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();

export class IntroMoleculeScene {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private envTex: THREE.Texture;
  private isSoftwareGl: boolean;
  private frameId = 0;
  private timerIds: number[] = [];
  private disposed = false;
  private clock = new THREE.Clock();

  private heroGroup = new THREE.Group();
  private molecules: MoleculeNode[] = [];
  private ambientParticles: THREE.InstancedMesh;
  private particlePositions: THREE.Vector3[] = [];
  private particleVelocities: THREE.Vector3[] = [];
  private bondLines: THREE.LineSegments;
  private bondPositions: Float32Array;
  private latticeRing: THREE.Mesh;
  private hemiLight!: THREE.HemisphereLight;
  private hydrogenMat!: THREE.MeshStandardMaterial;
  private particleMat!: THREE.MeshStandardMaterial;
  private bondMat!: THREE.LineBasicMaterial;
  private ringMat!: THREE.MeshStandardMaterial;

  private thermalState: IntroThermalState = 'liquid';
  private theme: FizLabTheme = 'dark';
  private pointerTarget = new THREE.Vector2(0, 0);
  private pointerCurrent = new THREE.Vector2(0, 0);
  private targetActivity = 1.0;
  private currentActivity = 1.0;

  private disposables: { dispose: () => void }[] = [];

  constructor(container: HTMLElement, initialTheme: FizLabTheme = 'dark') {
    this.container = container;
    this.theme = initialTheme;
    this.isSoftwareGl = detectSoftwareWebGL();
    this.renderer = createLabRenderer(container, this.isSoftwareGl);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060a14);
    this.scene.fog = new THREE.FogExp2(0x060a14, 0.042);

    this.envTex = setupStudioEnvironment(this.renderer, this.scene);
    this.disposables.push(this.envTex);

    const aspect =
      Math.max(1, container.clientWidth) / Math.max(1, container.clientHeight);
    this.camera = new THREE.PerspectiveCamera(48, aspect, 0.1, 100);
    this.camera.position.set(0, 1.2, 13.5);

    this.setupLighting();
    this.buildMolecularHeroCluster();

    // Instanced thermal micro-particles
    const particleGeo = new THREE.IcosahedronGeometry(0.065, 1);
    this.particleMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.45,
      roughness: 0.25,
      metalness: 0.3,
    });
    this.disposables.push(particleGeo, this.particleMat);

    const count = 110;
    this.ambientParticles = new THREE.InstancedMesh(particleGeo, this.particleMat, count);
    this.ambientParticles.frustumCulled = false;

    for (let i = 0; i < count; i++) {
      const p = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12 - 1
      );
      this.particlePositions.push(p);
      this.particleVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 1.4,
          (Math.random() - 0.5) * 1.4,
          (Math.random() - 0.5) * 1.4
        )
      );
      _scale.setScalar(0.6 + Math.random() * 0.9);
      _quat.identity();
      _mat4.compose(p, _quat, _scale);
      this.ambientParticles.setMatrixAt(i, _mat4);
    }
    this.ambientParticles.instanceMatrix.needsUpdate = true;
    this.ambientParticles.computeBoundingSphere();
    this.scene.add(this.ambientParticles);

    // Dynamic intermolecular van-der-Waals bond lines
    const maxPairs = 140;
    this.bondPositions = new Float32Array(maxPairs * 6);
    const bondGeo = new THREE.BufferGeometry();
    bondGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(this.bondPositions, 3)
    );
    this.bondMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
    });
    this.disposables.push(bondGeo, this.bondMat);
    this.bondLines = new THREE.LineSegments(bondGeo, this.bondMat);
    this.bondLines.frustumCulled = false;
    this.scene.add(this.bondLines);

    // Subtle orbital energy ring framing the cluster
    const ringGeo = new THREE.TorusGeometry(6.8, 0.018, 12, 128);
    this.ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      roughness: 0.3,
      metalness: 0.85,
      transparent: true,
      opacity: 0.45,
    });
    this.disposables.push(ringGeo, this.ringMat);
    this.latticeRing = new THREE.Mesh(ringGeo, this.ringMat);
    this.latticeRing.rotation.x = Math.PI * 0.38;
    this.scene.add(this.latticeRing);

    this.setTheme(this.theme);

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    window.addEventListener('resize', this.handleResize);
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.tick();
  }

  private setupLighting() {
    this.hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.85);
    this.scene.add(this.hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1db, 2.2);
    keyLight.position.set(8, 10, 8);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-9, -4, -6);
    this.scene.add(rimLight);

    const warmCore = new THREE.PointLight(0xf59e0b, 1.4, 24, 1.5);
    warmCore.position.set(0, -2, 3);
    this.scene.add(warmCore);
  }

  private buildMolecularHeroCluster() {
    // Shared materials for composite 3-7 part polyatomic molecules
    const oxygenMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      roughness: 0.14,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      emissive: 0x0369a1,
      emissiveIntensity: 0.25,
    });
    const carbonMat = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      roughness: 0.18,
      metalness: 0.22,
      clearcoat: 0.9,
      emissive: 0xb45309,
      emissiveIntensity: 0.2,
    });
    this.hydrogenMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.22,
      metalness: 0.4,
    });
    const bondMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.28,
      metalness: 0.88,
    });
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.75,
    });

    const coreGeo = new THREE.SphereGeometry(0.46, 20, 16);
    const satGeo = new THREE.SphereGeometry(0.27, 16, 12);
    const bondGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.82, 10);
    const collarGeo = new THREE.TorusGeometry(0.14, 0.028, 8, 18);

    this.disposables.push(
      oxygenMat,
      carbonMat,
      this.hydrogenMat,
      bondMat,
      collarMat,
      coreGeo,
      satGeo,
      bondGeo,
      collarGeo
    );

    // Build 18 structured polyatomic molecules arranged in a crystalline 3D lattice that can melt into gas
    const coords: THREE.Vector3[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 0; z++) {
          coords.push(new THREE.Vector3(x * 3.1, y * 2.4, z * 2.8 + 1.2));
        }
      }
    }

    coords.forEach((home, idx) => {
      const molGroup = new THREE.Group();
      const isHeavy = idx % 3 === 0;

      // Primary nucleus atom
      const core = new THREE.Mesh(coreGeo, isHeavy ? carbonMat : oxygenMat);
      molGroup.add(core);

      // 2 or 3 bonded satellite atoms + metallic collars (composite 5-8 part Group)
      const branchDirs = isHeavy
        ? [
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(-0.5, 0.866, 0),
            new THREE.Vector3(-0.5, -0.866, 0),
          ]
        : [
            new THREE.Vector3(0.82, 0.57, 0),
            new THREE.Vector3(-0.82, 0.57, 0),
          ];

      branchDirs.forEach((dir) => {
        const unit = dir.clone().normalize();
        const bondDist = 0.85;

        const atom = new THREE.Mesh(satGeo, this.hydrogenMat);
        atom.position.copy(unit).multiplyScalar(bondDist);
        molGroup.add(atom);

        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.position.copy(unit).multiplyScalar(bondDist * 0.5);
        bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unit);
        molGroup.add(bond);

        const collar = new THREE.Mesh(collarGeo, collarMat);
        collar.position.copy(unit).multiplyScalar(bondDist * 0.45);
        collar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), unit);
        molGroup.add(collar);
      });

      const scaleFactor = 0.82 + (idx % 4) * 0.1;
      molGroup.scale.setScalar(scaleFactor);
      molGroup.position.copy(home);
      this.heroGroup.add(molGroup);

      this.molecules.push({
        group: molGroup,
        homePos: home.clone(),
        pos: home.clone(),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 2.6,
          (Math.random() - 0.5) * 1.8
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 0.9
        ),
        phase: idx * 0.7,
      });
    });

    this.scene.add(this.heroGroup);
  }

  public setThermalState(state: IntroThermalState) {
    this.thermalState = state;
    this.targetActivity = state === 'crystal' ? 0.18 : state === 'liquid' ? 1.0 : 2.35;
  }

  public setTheme(theme: FizLabTheme) {
    this.theme = theme;
    const isLight = theme === 'light';
    const bgHex = isLight ? 0xe9f1fa : 0x060a14;
    (this.scene.background as THREE.Color).setHex(bgHex);
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(bgHex);
      this.scene.fog.density = isLight ? 0.028 : 0.042;
    }
    this.hemiLight.color.setHex(isLight ? 0xffffff : 0x93c5fd);
    this.hemiLight.groundColor.setHex(isLight ? 0xcbd5e1 : 0x0f172a);
    this.hemiLight.intensity = isLight ? 1.15 : 0.85;
    this.hydrogenMat.color.setHex(isLight ? 0x64748b : 0xe2e8f0);
    this.particleMat.color.setHex(isLight ? 0x0284c7 : 0x7dd3fc);
    this.particleMat.emissive.setHex(isLight ? 0x0369a1 : 0x0ea5e9);
    this.particleMat.emissiveIntensity = isLight ? 0.25 : 0.45;
    this.bondMat.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
    this.bondMat.opacity = isLight ? 0.36 : 0.28;
    this.ringMat.color.setHex(isLight ? 0x0284c7 : 0x38bdf8);
    this.ringMat.opacity = isLight ? 0.35 : 0.45;
    this.renderer.toneMappingExposure = isLight ? 1.02 : 1.12;
  }

  private handlePointerMove = (e: PointerEvent) => {
    const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    const ny = -(e.clientY / Math.max(1, window.innerHeight)) * 2 + 1;
    this.pointerTarget.set(nx * 0.9, ny * 0.55);
  };

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
      this.clock.getDelta(); // Reset delta spike after tab switch
    }
  };

  private tick = () => {
    if (this.disposed) return;
    if (document.hidden) {
      const id = window.setTimeout(this.tick, 250);
      this.timerIds.push(id);
      return;
    }
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.getElapsedTime();

    this.currentActivity = THREE.MathUtils.damp(
      this.currentActivity,
      this.targetActivity,
      3.5,
      dt
    );

    this.pointerCurrent.x = THREE.MathUtils.damp(
      this.pointerCurrent.x,
      this.pointerTarget.x,
      4.5,
      dt
    );
    this.pointerCurrent.y = THREE.MathUtils.damp(
      this.pointerCurrent.y,
      this.pointerTarget.y,
      4.5,
      dt
    );

    this.camera.position.x = this.pointerCurrent.x * 1.4;
    this.camera.position.y = 1.0 + this.pointerCurrent.y * 0.9;
    this.camera.lookAt(0, 0, 0);

    this.heroGroup.rotation.y = Math.sin(elapsed * 0.18) * 0.22;
    this.latticeRing.rotation.z += dt * 0.14 * (0.4 + this.currentActivity * 0.5);

    // Update composite molecules based on thermal state
    const isCrystal = this.thermalState === 'crystal';
    const isGas = this.thermalState === 'gas';
    const springStrength = isCrystal ? 12.0 : isGas ? 0.0 : 1.3;
    const speedScale = this.currentActivity;

    for (let i = 0; i < this.molecules.length; i++) {
      const m = this.molecules[i];
      if (isCrystal) {
        // Elastic lattice vibration around crystalline home node
        _vec3.copy(m.homePos);
        _vec3.x += Math.sin(elapsed * 8.5 + m.phase) * 0.09;
        _vec3.y += Math.cos(elapsed * 9.2 + m.phase * 1.3) * 0.09;
        _vec3.z += Math.sin(elapsed * 7.8 + m.phase * 0.7) * 0.07;
        m.pos.lerp(_vec3, Math.min(1, dt * springStrength));
      } else {
        m.pos.addScaledVector(m.vel, dt * speedScale);

        if (!isGas) {
          // Liquid cohesion gently pulls back toward cluster region
          _vec3.copy(m.homePos).sub(m.pos).multiplyScalar(dt * 0.65);
          m.vel.add(_vec3);
          m.vel.clampLength(0.5, 2.2);
        }

        // Elastic containment bounds
        if (Math.abs(m.pos.x) > 6.8) {
          m.pos.x = Math.sign(m.pos.x) * 6.8;
          m.vel.x *= -1;
        }
        if (Math.abs(m.pos.y) > 4.2) {
          m.pos.y = Math.sign(m.pos.y) * 4.2;
          m.vel.y *= -1;
        }
        if (m.pos.z > 4.2 || m.pos.z < -4.2) {
          m.pos.z = Math.sign(m.pos.z) * 4.2;
          m.vel.z *= -1;
        }
      }

      m.group.position.copy(m.pos);
      m.group.rotation.x += m.rotSpeed.x * dt * speedScale;
      m.group.rotation.y += m.rotSpeed.y * dt * speedScale;
      m.group.rotation.z += m.rotSpeed.z * dt * speedScale;
    }

    // Update intermolecular distance bonds
    let segIdx = 0;
    const maxDistSq = isCrystal ? 18 : isGas ? 9 : 14;
    const maxSegments = 140;
    for (let i = 0; i < this.molecules.length && segIdx < maxSegments; i++) {
      for (let j = i + 1; j < this.molecules.length && segIdx < maxSegments; j++) {
        const dSq = this.molecules[i].pos.distanceToSquared(this.molecules[j].pos);
        if (dSq < maxDistSq) {
          const offset = segIdx * 6;
          this.bondPositions[offset] = this.molecules[i].pos.x;
          this.bondPositions[offset + 1] = this.molecules[i].pos.y;
          this.bondPositions[offset + 2] = this.molecules[i].pos.z;
          this.bondPositions[offset + 3] = this.molecules[j].pos.x;
          this.bondPositions[offset + 4] = this.molecules[j].pos.y;
          this.bondPositions[offset + 5] = this.molecules[j].pos.z;
          segIdx++;
        }
      }
    }
    this.bondLines.geometry.setDrawRange(0, segIdx * 2);
    this.bondLines.geometry.attributes.position.needsUpdate = true;

    // Update instanced thermal background particles
    for (let i = 0; i < this.particlePositions.length; i++) {
      const p = this.particlePositions[i];
      const v = this.particleVelocities[i];
      p.addScaledVector(v, dt * (0.4 + speedScale * 0.9));
      if (Math.abs(p.x) > 10.5) v.x *= -1;
      if (Math.abs(p.y) > 6.5) v.y *= -1;
      if (p.z > 5 || p.z < -7) v.z *= -1;

      _quat.identity();
      _scale.setScalar(0.65 + 0.25 * Math.sin(elapsed * 2 + i));
      _mat4.compose(p, _quat, _scale);
      this.ambientParticles.setMatrixAt(i, _mat4);
    }
    this.ambientParticles.instanceMatrix.needsUpdate = true;

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
    window.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    this.disposables.forEach((d) => d.dispose());
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
