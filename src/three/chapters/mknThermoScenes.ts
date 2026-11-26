import * as THREE from 'three';
import { createDialFaceTexture } from '../webglUtils';
import type { SimulationEngineParams } from '../../utils/simulationPhysics';
import type { ChapterSceneHandler, ChapterSceneMaterials } from './types';

interface GasParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
}

const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3(1, 1, 1);
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();
const _color = new THREE.Color();
const _cyan = new THREE.Color(0x38bdf8);
const _amber = new THREE.Color(0xf59e0b);
const _hotRed = new THREE.Color(0xfb7185);
const _iceBlue = new THREE.Color(0x7dd3fc);

/**
 * I BOB: Modda tuzilishining molekulyar-kinetik nazariyasi asoslari
 * Supports 3 scenarios:
 *  - bob1-gas: Ideal gas piston + live manometer gauge
 *  - bob1-brownian: Colloidal golden pollen sphere + 3D Brownian random walk trail
 *  - bob1-isoprocess: Isobaric chamber with weighted brass discs stacked on piston
 */
export function buildBob1Scene(
  mats: ChapterSceneMaterials,
  maxAniso: number,
  disposables: { dispose: () => void }[]
): ChapterSceneHandler {
  const group = new THREE.Group();
  const radius = 1.7;
  const baseY = 0.64;
  const topY = 4.64;
  const height = topY - baseY;

  // Base pedestal
  const baseGeo = new THREE.LatheGeometry(
    [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(2.2, 0),
      new THREE.Vector2(2.2, 0.2),
      new THREE.Vector2(1.98, 0.38),
      new THREE.Vector2(1.98, 0.6),
      new THREE.Vector2(0, 0.6),
    ],
    44
  );
  const baseMesh = new THREE.Mesh(baseGeo, mats.darkAnodized);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);

  // Thermal base plate
  const plateGeo = new THREE.CylinderGeometry(radius - 0.02, radius - 0.02, 0.14, 40);
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.35,
    metalness: 0.65,
    emissive: 0x0284c7,
    emissiveIntensity: 0.3,
  });
  const plateMesh = new THREE.Mesh(plateGeo, plateMat);
  plateMesh.position.y = baseY - 0.06;
  group.add(plateMesh);

  // Borosilicate cylinder
  const glassGeo = new THREE.CylinderGeometry(radius + 0.05, radius + 0.05, height, 40, 1, true);
  const glassMesh = new THREE.Mesh(glassGeo, mats.glass);
  glassMesh.position.y = baseY + height / 2;
  glassMesh.renderOrder = 3;
  group.add(glassMesh);

  // Top flange ring
  const ringGeo = new THREE.TorusGeometry(radius + 0.12, 0.11, 14, 40);
  ringGeo.rotateX(Math.PI / 2);
  const ringMesh = new THREE.Mesh(ringGeo, mats.darkAnodized);
  ringMesh.position.y = topY;
  group.add(ringMesh);

  // 4 chrome tie-rods
  const rodGeo = new THREE.CylinderGeometry(0.05, 0.05, height + 0.36, 12);
  const nutGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 6);
  for (let i = 0; i < 4; i++) {
    const ang = (i * Math.PI) / 2 + Math.PI / 4;
    const rx = Math.cos(ang) * (radius + 0.22);
    const rz = Math.sin(ang) * (radius + 0.22);
    const rod = new THREE.Mesh(rodGeo, mats.chrome);
    rod.position.set(rx, baseY + height / 2 - 0.05, rz);
    group.add(rod);
    const topNut = new THREE.Mesh(nutGeo, mats.brass);
    topNut.position.set(rx, topY + 0.12, rz);
    group.add(topNut);
  }

  // Brass side pressure gauge
  const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.72, 12);
  pipeGeo.rotateZ(Math.PI / 2);
  const pipe = new THREE.Mesh(pipeGeo, mats.brass);
  pipe.position.set(2.15, 0.4, 0);
  group.add(pipe);

  const gaugeCaseGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.18, 28);
  gaugeCaseGeo.rotateX(Math.PI / 2);
  const gaugeCase = new THREE.Mesh(gaugeCaseGeo, mats.brass);
  gaugeCase.position.set(2.58, 0.72, 0.06);
  group.add(gaugeCase);

  const dialTex = createDialFaceTexture(maxAniso);
  const dialGeo = new THREE.CircleGeometry(0.39, 28);
  const dialMat = new THREE.MeshBasicMaterial({ map: dialTex });
  const dialMesh = new THREE.Mesh(dialGeo, dialMat);
  dialMesh.position.set(2.58, 0.72, 0.155);
  group.add(dialMesh);

  const needlePivot = new THREE.Group();
  const needleGeo = new THREE.BoxGeometry(0.028, 0.28, 0.02);
  needleGeo.translate(0, 0.11, 0);
  const needleMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  needlePivot.add(new THREE.Mesh(needleGeo, needleMat));
  needlePivot.position.set(2.58, 0.72, 0.17);
  group.add(needlePivot);

  // Sliding piston + load discs (isobaric weights)
  const pistonGroup = new THREE.Group();
  const crownGeo = new THREE.CylinderGeometry(radius - 0.02, radius - 0.02, 0.22, 40);
  pistonGroup.add(new THREE.Mesh(crownGeo, mats.darkAnodized));
  const sealGeo = new THREE.TorusGeometry(radius - 0.01, 0.04, 10, 40);
  sealGeo.rotateX(Math.PI / 2);
  const seal = new THREE.Mesh(sealGeo, mats.rubber);
  seal.position.y = -0.04;
  pistonGroup.add(seal);

  const shaftGeo = new THREE.CylinderGeometry(0.09, 0.09, 3.2, 16);
  const shaft = new THREE.Mesh(shaftGeo, mats.chrome);
  shaft.position.y = 1.7;
  pistonGroup.add(shaft);

  const handleGeo = new THREE.CylinderGeometry(0.075, 0.075, 1.05, 14);
  handleGeo.rotateZ(Math.PI / 2);
  const handle = new THREE.Mesh(handleGeo, mats.brass);
  handle.position.y = 3.28;
  pistonGroup.add(handle);

  // Load weight plates around piston shaft (shown in bob1-isoprocess)
  const weightsGroup = new THREE.Group();
  const weightGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.14, 28);
  const weightMeshes: THREE.Mesh[] = [];
  for (let w = 0; w < 4; w++) {
    const wm = new THREE.Mesh(weightGeo, mats.brass);
    wm.position.y = 0.2 + w * 0.16;
    weightsGroup.add(wm);
    weightMeshes.push(wm);
  }
  pistonGroup.add(weightsGroup);
  pistonGroup.position.y = 3.4;
  group.add(pistonGroup);

  // Instanced kinetic molecules
  const maxParticles = 140;
  const sphereGeo = new THREE.SphereGeometry(0.09, 14, 10);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.22,
    metalness: 0.1,
  });
  const particlesMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, maxParticles);
  particlesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(particlesMesh);

  // Colloidal Brownian sphere & 3D trail
  const pollenGroup = new THREE.Group();
  const pollenGeo = new THREE.SphereGeometry(0.26, 22, 16);
  const pollenMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    roughness: 0.24,
    metalness: 0.35,
    emissive: 0xd97706,
    emissiveIntensity: 0.35,
  });
  pollenGroup.add(new THREE.Mesh(pollenGeo, pollenMat));
  const pollenHaloGeo = new THREE.RingGeometry(0.32, 0.36, 32);
  const pollenHaloMat = new THREE.MeshBasicMaterial({
    color: 0xfde047,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.55,
  });
  pollenGroup.add(new THREE.Mesh(pollenHaloGeo, pollenHaloMat));
  group.add(pollenGroup);

  const trailLen = 220;
  const trailBuf = new Float32Array(trailLen * 3);
  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailBuf, 3));
  trailGeo.setDrawRange(0, 0);
  const trailMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.88,
  });
  const trailLine = new THREE.Line(trailGeo, trailMat);
  group.add(trailLine);

  disposables.push(
    baseGeo,
    plateGeo,
    plateMat,
    glassGeo,
    ringGeo,
    rodGeo,
    nutGeo,
    pipeGeo,
    gaugeCaseGeo,
    dialTex,
    dialGeo,
    dialMat,
    needleGeo,
    needleMat,
    crownGeo,
    sealGeo,
    shaftGeo,
    handleGeo,
    weightGeo,
    sphereGeo,
    sphereMat,
    pollenGeo,
    pollenMat,
    pollenHaloGeo,
    pollenHaloMat,
    trailGeo,
    trailMat
  );

  const particles: GasParticle[] = Array.from({ length: maxParticles }, () => ({
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
  }));

  const pollenPos = new THREE.Vector3(0, 2.3, 0);
  const pollenVel = new THREE.Vector3();
  let trailCount = 0;
  let trailTimer = 0;
  let pistonY = 3.4;
  let needleAngle = 0.6;

  const reset = (params: SimulationEngineParams) => {
    const maxY = params.scenarioId === 'bob1-brownian' ? topY - 0.3 : 3.2;
    for (let i = 0; i < maxParticles; i++) {
      // Quasi-random Halton-like distribution so gas particles fill cylinder evenly at t=0
      const u1 = ((i * 0.6180339887) % 1);
      const u2 = ((i * 0.7548776662) % 1);
      const u3 = ((i * 0.5698402909) % 1);
      const ang = u1 * Math.PI * 2;
      const r = Math.sqrt(u2) * (radius - 0.24);
      particles[i].pos.set(
        Math.cos(ang) * r,
        baseY + 0.22 + u3 * (maxY - baseY - 0.44),
        Math.sin(ang) * r
      );
      const vAng = u2 * Math.PI * 2;
      particles[i].vel
        .set(Math.cos(vAng), (u1 - 0.5) * 1.4, Math.sin(vAng))
        .normalize()
        .multiplyScalar(3.2);
    }
    pollenPos.set(0, 2.3, 0);
    pollenVel.set(0, 0, 0);
    trailCount = 0;
    trailGeo.setDrawRange(0, 0);
  };

  const onScenarioChange = (scenarioId: string) => {
    const isBrownian = scenarioId === 'bob1-brownian';
    const isIso = scenarioId === 'bob1-isoprocess';
    pistonGroup.visible = !isBrownian;
    weightsGroup.visible = isIso;
    pollenGroup.visible = isBrownian;
    trailLine.visible = isBrownian;
    if (isBrownian) {
      pollenPos.set(0, 2.3, 0);
      pollenVel.set(0, 0, 0);
      trailCount = 0;
      trailGeo.setDrawRange(0, 0);
    }
  };

  const update = (dt: number, _elapsed: number, params: SimulationEngineParams) => {
    const { scenarioId, paramA, paramB, paused } = params;
    const isBrownian = scenarioId === 'bob1-brownian';
    const isIso = scenarioId === 'bob1-isoprocess';
    const tempK = paramA;
    const tempScale = Math.sqrt(Math.max(50, tempK) / 300);

    // Target piston height
    let targetPistonY = topY - 0.25;
    if (scenarioId === 'bob1-gas') {
      const frac = THREE.MathUtils.clamp((paramB - 2.0) / 5.0, 0, 1);
      targetPistonY = baseY + 1.15 + frac * (height - 1.55);
    } else if (isIso) {
      // V proportional to T / P_load
      const ratio = THREE.MathUtils.clamp((tempK / Math.max(0.6, paramB) - 70) / 480, 0.1, 1);
      targetPistonY = baseY + 1.05 + ratio * (height - 1.45);
      const visibleWeights = Math.max(1, Math.min(4, Math.round((paramB / 3.2) * 4)));
      weightMeshes.forEach((m, idx) => {
        m.visible = idx < visibleWeights;
      });
    }
    pistonY = THREE.MathUtils.damp(pistonY, targetPistonY, 7, dt);
    pistonGroup.position.y = pistonY;

    // Thermal base plate color + emissive glow
    const heatT = THREE.MathUtils.clamp((tempK - 150) / 450, 0, 1);
    plateMat.emissive.copy(_cyan).lerp(_hotRed, heatT);
    plateMat.emissiveIntensity = 0.2 + heatT * 1.15;

    // Gauge needle
    let normPressure = 0.35;
    if (scenarioId === 'bob1-gas') {
      normPressure = THREE.MathUtils.clamp(((tempK / Math.max(1.5, paramB)) - 25) / 230, 0.05, 1);
    } else if (isIso) {
      normPressure = THREE.MathUtils.clamp((paramB - 0.6) / 2.8, 0.05, 1);
    } else {
      normPressure = THREE.MathUtils.clamp((tempK - 150) / 450, 0.1, 0.9);
    }
    const targetNeedle = Math.PI * 0.72 - normPressure * Math.PI * 1.44;
    needleAngle = THREE.MathUtils.damp(needleAngle, targetNeedle, 8, dt);
    needlePivot.rotation.z = needleAngle;

    const activeCount = isBrownian ? Math.round(paramB) : 110;
    const minY = baseY + 0.1;
    const maxY = isBrownian ? topY - 0.18 : pistonY - 0.2;
    const wallR = radius - 0.14;

    if (!paused) {
      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        const targetSpd = 3.2 * tempScale;
        const curSpd = p.vel.length() || 0.01;
        p.vel.multiplyScalar(THREE.MathUtils.lerp(1, targetSpd / curSpd, dt * 3));
        p.pos.addScaledVector(p.vel, dt);

        if (p.pos.y < minY) {
          p.pos.y = minY;
          p.vel.y = Math.abs(p.vel.y);
        } else if (p.pos.y > maxY) {
          p.pos.y = maxY;
          p.vel.y = -Math.abs(p.vel.y);
        }
        const r2 = p.pos.x * p.pos.x + p.pos.z * p.pos.z;
        if (r2 > wallR * wallR) {
          const r = Math.sqrt(r2);
          const nx = p.pos.x / r;
          const nz = p.pos.z / r;
          p.pos.x = nx * wallR;
          p.pos.z = nz * wallR;
          const dot = p.vel.x * nx + p.vel.z * nz;
          if (dot > 0) {
            p.vel.x -= 2 * dot * nx;
            p.vel.z -= 2 * dot * nz;
          }
        }

        if (isBrownian) {
          _vecA.subVectors(p.pos, pollenPos);
          const d = _vecA.length();
          if (d < 0.36 && d > 0.0001) {
            _vecA.divideScalar(d);
            p.pos.copy(pollenPos).addScaledVector(_vecA, 0.37);
            const rel = p.vel.dot(_vecA);
            if (rel < 0) {
              p.vel.addScaledVector(_vecA, -2 * rel);
              pollenVel.addScaledVector(_vecA, rel * 0.25);
            }
          }
        }
      }

      if (isBrownian) {
        pollenVel.multiplyScalar(Math.pow(0.32, dt));
        pollenPos.addScaledVector(pollenVel, dt);
        const bw = wallR - 0.28;
        const pr = Math.hypot(pollenPos.x, pollenPos.z);
        if (pr > bw) {
          pollenPos.x *= bw / pr;
          pollenPos.z *= bw / pr;
          pollenVel.x *= -0.7;
          pollenVel.z *= -0.7;
        }
        if (pollenPos.y < minY + 0.28) {
          pollenPos.y = minY + 0.28;
          pollenVel.y = Math.abs(pollenVel.y) * 0.7;
        } else if (pollenPos.y > maxY - 0.28) {
          pollenPos.y = maxY - 0.28;
          pollenVel.y = -Math.abs(pollenVel.y) * 0.7;
        }
        pollenGroup.position.copy(pollenPos);
        pollenGroup.rotation.y += dt * 0.9;

        trailTimer += dt;
        if (trailTimer >= 0.05) {
          trailTimer = 0;
          if (trailCount < trailLen) {
            const idx = trailCount * 3;
            trailBuf[idx] = pollenPos.x;
            trailBuf[idx + 1] = pollenPos.y;
            trailBuf[idx + 2] = pollenPos.z;
            trailCount++;
          } else {
            trailBuf.copyWithin(0, 3);
            const last = (trailLen - 1) * 3;
            trailBuf[last] = pollenPos.x;
            trailBuf[last + 1] = pollenPos.y;
            trailBuf[last + 2] = pollenPos.z;
          }
          trailGeo.setDrawRange(0, trailCount);
          trailGeo.attributes.position.needsUpdate = true;
        }
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      if (i < activeCount) {
        _quat.identity();
        _scale.setScalar(isBrownian ? 0.72 : 0.95);
        _mat4.compose(particles[i].pos, _quat, _scale);
        particlesMesh.setMatrixAt(i, _mat4);
        const spdN = THREE.MathUtils.clamp(particles[i].vel.length() / 6.2, 0, 1);
        _color.copy(_cyan).lerp(_amber, spdN);
        particlesMesh.setColorAt(i, _color);
      } else {
        _vecB.set(0, -100, 0);
        _scale.setScalar(0);
        _mat4.compose(_vecB, _quat, _scale);
        particlesMesh.setMatrixAt(i, _mat4);
      }
    }
    particlesMesh.instanceMatrix.needsUpdate = true;
    if (particlesMesh.instanceColor) particlesMesh.instanceColor.needsUpdate = true;
  };

  return { group, onScenarioChange, update, reset };
}

/**
 * II BOB: Ichki energiya va termodinamika elementlari
 * Supports 3 scenarios:
 *  - bob2-internal: Copper-rimmed cylinder + glowing induction spiral heater + energy bar column
 *  - bob2-work: Expanding cylinder piston lifting a brass counterweight block along rails
 *  - bob2-calorimeter: Dual glass chambers coupled by a central copper heat-bridge cylinder
 */
export function buildBob2Scene(
  mats: ChapterSceneMaterials,
  disposables: { dispose: () => void }[]
): ChapterSceneHandler {
  const group = new THREE.Group();

  // Mode A/B single chamber rig
  const singleRig = new THREE.Group();
  const radius = 1.45;
  const baseY = 0.78;
  const topY = 4.4;
  const height = topY - baseY;

  const baseGeo = new THREE.CylinderGeometry(2.0, 2.2, 0.5, 40);
  const base = new THREE.Mesh(baseGeo, mats.darkAnodized);
  base.position.y = 0.25;
  base.castShadow = true;
  base.receiveShadow = true;
  singleRig.add(base);

  // Spiral induction heating coil rings
  const coilGeo = new THREE.TorusGeometry(0.92, 0.09, 12, 36);
  coilGeo.rotateX(Math.PI / 2);
  const coilMat = new THREE.MeshStandardMaterial({
    color: 0x9a3412,
    roughness: 0.35,
    metalness: 0.5,
    emissive: 0xf97316,
    emissiveIntensity: 0.8,
  });
  const coil = new THREE.Mesh(coilGeo, coilMat);
  coil.position.y = 0.56;
  singleRig.add(coil);

  const innerCoilGeo = new THREE.TorusGeometry(0.5, 0.08, 12, 32);
  innerCoilGeo.rotateX(Math.PI / 2);
  const innerCoil = new THREE.Mesh(innerCoilGeo, coilMat);
  innerCoil.position.y = 0.56;
  singleRig.add(innerCoil);

  // Glass chamber
  const glassGeo = new THREE.CylinderGeometry(radius + 0.05, radius + 0.05, height, 36, 1, true);
  const glass = new THREE.Mesh(glassGeo, mats.glass);
  glass.position.y = baseY + height / 2;
  glass.renderOrder = 3;
  singleRig.add(glass);

  const copperRingGeo = new THREE.TorusGeometry(radius + 0.08, 0.08, 12, 36);
  copperRingGeo.rotateX(Math.PI / 2);
  const botCopper = new THREE.Mesh(copperRingGeo, mats.copper);
  botCopper.position.y = baseY;
  singleRig.add(botCopper);
  const topCopper = new THREE.Mesh(copperRingGeo, mats.copper);
  topCopper.position.y = topY;
  singleRig.add(topCopper);

  // Movable piston & counterweight lift arm (bob2-work)
  const pistonGroup = new THREE.Group();
  const crownGeo = new THREE.CylinderGeometry(radius - 0.03, radius - 0.03, 0.2, 36);
  pistonGroup.add(new THREE.Mesh(crownGeo, mats.copper));
  const shaftGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.8, 14);
  const shaft = new THREE.Mesh(shaftGeo, mats.chrome);
  shaft.position.y = 1.45;
  pistonGroup.add(shaft);

  const crossBeamGeo = new THREE.BoxGeometry(2.5, 0.14, 0.22);
  const crossBeam = new THREE.Mesh(crossBeamGeo, mats.darkAnodized);
  crossBeam.position.set(1.05, 2.85, 0);
  pistonGroup.add(crossBeam);

  // Side vertical guide rail & hanging brass work weight
  const weightBoxGeo = new THREE.BoxGeometry(0.68, 0.54, 0.68);
  const workWeight = new THREE.Mesh(weightBoxGeo, mats.brass);
  workWeight.position.set(2.15, 2.25, 0);
  pistonGroup.add(workWeight);
  const cordGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.55, 8);
  const cord = new THREE.Mesh(cordGeo, mats.chrome);
  cord.position.set(2.15, 2.6, 0);
  pistonGroup.add(cord);

  pistonGroup.position.y = 2.7;
  singleRig.add(pistonGroup);

  // Guide tower on right for counterweight + work scale
  const towerGeo = new THREE.CylinderGeometry(0.06, 0.06, 4.4, 12);
  const tower = new THREE.Mesh(towerGeo, mats.chrome);
  tower.position.set(2.65, 2.2, 0);
  singleRig.add(tower);

  // Thermometer / Internal Energy bar column on left
  const gaugeBackGeo = new THREE.BoxGeometry(0.28, 3.3, 0.16);
  const gaugeBack = new THREE.Mesh(gaugeBackGeo, mats.darkAnodized);
  gaugeBack.position.set(-2.15, 2.35, 0);
  singleRig.add(gaugeBack);

  const fillGeo = new THREE.BoxGeometry(0.16, 1, 0.18);
  fillGeo.translate(0, 0.5, 0);
  const fillMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xf97316,
    emissiveIntensity: 0.7,
    roughness: 0.2,
  });
  const energyFill = new THREE.Mesh(fillGeo, fillMat);
  energyFill.position.set(-2.15, 0.78, 0);
  singleRig.add(energyFill);

  group.add(singleRig);

  // Mode C: Dual-chamber Calorimeter rig
  const calRig = new THREE.Group();
  const calBaseGeo = new THREE.BoxGeometry(5.6, 0.42, 2.6);
  const calBase = new THREE.Mesh(calBaseGeo, mats.darkAnodized);
  calBase.position.y = 0.21;
  calBase.receiveShadow = true;
  calRig.add(calBase);

  const dualCylGeo = new THREE.CylinderGeometry(1.05, 1.05, 2.8, 32, 1, true);
  const leftCyl = new THREE.Mesh(dualCylGeo, mats.glass);
  leftCyl.position.set(-1.55, 1.85, 0);
  leftCyl.renderOrder = 3;
  calRig.add(leftCyl);

  const rightCyl = new THREE.Mesh(dualCylGeo, mats.glass);
  rightCyl.position.set(1.55, 1.85, 0);
  rightCyl.renderOrder = 3;
  calRig.add(rightCyl);

  const hotPadGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.14, 32);
  const hotPadMat = new THREE.MeshStandardMaterial({
    color: 0x7c2d12,
    emissive: 0xf97316,
    emissiveIntensity: 0.75,
  });
  const hotPad = new THREE.Mesh(hotPadGeo, hotPadMat);
  hotPad.position.set(-1.55, 0.48, 0);
  calRig.add(hotPad);

  const coldPadMat = new THREE.MeshStandardMaterial({
    color: 0x0c4a6e,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.55,
  });
  const coldPad = new THREE.Mesh(hotPadGeo, coldPadMat);
  coldPad.position.set(1.55, 0.48, 0);
  calRig.add(coldPad);

  // Central conductive copper bridge
  const bridgeGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.8, 20);
  bridgeGeo.rotateZ(Math.PI / 2);
  const bridgeMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.85,
    roughness: 0.25,
    emissive: 0xfbbf24,
    emissiveIntensity: 0.35,
  });
  const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
  bridge.position.set(0, 1.65, 0);
  calRig.add(bridge);

  const dualCapGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.14, 32);
  const lCap = new THREE.Mesh(dualCapGeo, mats.darkAnodized);
  lCap.position.set(-1.55, 3.28, 0);
  calRig.add(lCap);
  const rCap = new THREE.Mesh(dualCapGeo, mats.darkAnodized);
  rCap.position.set(1.55, 3.28, 0);
  calRig.add(rCap);

  calRig.visible = false;
  group.add(calRig);

  // Shared kinetic particles (120 max)
  const maxParticles = 120;
  const pGeo = new THREE.SphereGeometry(0.088, 12, 10);
  const pMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.22,
    metalness: 0.12,
  });
  const pMesh = new THREE.InstancedMesh(pGeo, pMat, maxParticles);
  pMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(pMesh);

  disposables.push(
    baseGeo,
    coilGeo,
    coilMat,
    innerCoilGeo,
    glassGeo,
    copperRingGeo,
    crownGeo,
    shaftGeo,
    crossBeamGeo,
    weightBoxGeo,
    cordGeo,
    towerGeo,
    gaugeBackGeo,
    fillGeo,
    fillMat,
    calBaseGeo,
    dualCylGeo,
    hotPadGeo,
    hotPadMat,
    coldPadMat,
    bridgeGeo,
    bridgeMat,
    dualCapGeo,
    pGeo,
    pMat
  );

  const particles: GasParticle[] = Array.from({ length: maxParticles }, () => ({
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
  }));

  let pistonY = 2.7;
  let calProgress = 0;

  const reset = (params: SimulationEngineParams) => {
    calProgress = 0;
    const isCal = params.scenarioId === 'bob2-calorimeter';
    for (let i = 0; i < maxParticles; i++) {
      if (isCal) {
        const isLeft = i < maxParticles / 2;
        const cx = isLeft ? -1.55 : 1.55;
        const ang = (i * 2.399) % (Math.PI * 2);
        const r = Math.sqrt(((i % 60) + 0.5) / 60) * 0.82;
        particles[i].pos.set(
          cx + Math.cos(ang) * r,
          0.7 + ((i * 0.37) % 1) * 2.2,
          Math.sin(ang) * r
        );
      } else {
        const ang = (i * 2.399) % (Math.PI * 2);
        const r = Math.sqrt((i + 0.5) / maxParticles) * (radius - 0.2);
        particles[i].pos.set(
          Math.cos(ang) * r,
          baseY + 0.2 + ((i * 0.43) % 1) * 2.0,
          Math.sin(ang) * r
        );
      }
      particles[i].vel
        .set(Math.cos(i * 1.1), Math.sin(i * 0.7) * 0.7, Math.sin(i * 1.1))
        .normalize()
        .multiplyScalar(3.0);
    }
  };

  const onScenarioChange = (scenarioId: string) => {
    const isCal = scenarioId === 'bob2-calorimeter';
    const isWork = scenarioId === 'bob2-work';
    singleRig.visible = !isCal;
    calRig.visible = isCal;
    crossBeam.visible = isWork;
    workWeight.visible = isWork;
    cord.visible = isWork;
    tower.visible = isWork;
  };

  const update = (dt: number, elapsed: number, params: SimulationEngineParams) => {
    const { scenarioId, paramA, paramB, paused } = params;
    const isCal = scenarioId === 'bob2-calorimeter';
    const isWork = scenarioId === 'bob2-work';

    if (isCal) {
      if (!paused) {
        calProgress = Math.min(1, calProgress + dt * 0.08);
      }
      const tHot = paramA;
      const tCold = paramB;
      const tEq = (tHot + tCold) / 2;
      const curHot = THREE.MathUtils.lerp(tHot, tEq, calProgress);
      const curCold = THREE.MathUtils.lerp(tCold, tEq, calProgress);
      const spdHot = 3.2 * Math.sqrt(curHot / 300);
      const spdCold = 3.2 * Math.sqrt(curCold / 300);

      hotPadMat.emissiveIntensity = 0.25 + ((curHot - 200) / 360) * 0.9;
      bridgeMat.emissiveIntensity = 0.2 + (1 - calProgress) * 0.85;

      for (let i = 0; i < maxParticles; i++) {
        const isLeft = i < 60;
        const cx = isLeft ? -1.55 : 1.55;
        const p = particles[i];
        const targetSpd = isLeft ? spdHot : spdCold;
        if (!paused) {
          const cur = p.vel.length() || 0.1;
          p.vel.multiplyScalar(THREE.MathUtils.lerp(1, targetSpd / cur, dt * 3));
          p.pos.addScaledVector(p.vel, dt);
          if (p.pos.y < 0.68) {
            p.pos.y = 0.68;
            p.vel.y = Math.abs(p.vel.y);
          } else if (p.pos.y > 3.1) {
            p.pos.y = 3.1;
            p.vel.y = -Math.abs(p.vel.y);
          }
          const dx = p.pos.x - cx;
          const dz = p.pos.z;
          const r2 = dx * dx + dz * dz;
          const maxR = 0.88;
          if (r2 > maxR * maxR) {
            const r = Math.sqrt(r2);
            const nx = dx / r;
            const nz = dz / r;
            p.pos.x = cx + nx * maxR;
            p.pos.z = nz * maxR;
            const dot = p.vel.x * nx + p.vel.z * nz;
            if (dot > 0) {
              p.vel.x -= 2 * dot * nx;
              p.vel.z -= 2 * dot * nz;
            }
          }
        }
        _quat.identity();
        _scale.setScalar(0.85);
        _mat4.compose(p.pos, _quat, _scale);
        pMesh.setMatrixAt(i, _mat4);
        const hNorm = THREE.MathUtils.clamp(((isLeft ? curHot : curCold) - 180) / 380, 0, 1);
        _color.copy(_iceBlue).lerp(_hotRed, hNorm);
        pMesh.setColorAt(i, _color);
      }
      pMesh.instanceMatrix.needsUpdate = true;
      if (pMesh.instanceColor) pMesh.instanceColor.needsUpdate = true;
      return;
    }

    // Internal energy & Thermodynamic work
    let targetY = 3.15;
    let heatFrac = 0.5;
    let activeCount = 90;

    if (scenarioId === 'bob2-internal') {
      heatFrac = THREE.MathUtils.clamp((paramA - 200) / 500, 0, 1);
      activeCount = Math.round(45 + ((paramB - 0.5) / 2.0) * 70);
      targetY = 3.45;
      energyFill.scale.y = Math.max(0.1, heatFrac * 2.95);
    } else if (isWork) {
      // Expansion piston rises with heat input Q and drops with opposing pressure p
      heatFrac = THREE.MathUtils.clamp((paramA - 100) / 500, 0, 1);
      const expansion = THREE.MathUtils.clamp(
        (paramA / Math.max(60, paramB) - 0.5) / 5.5,
        0.08,
        1
      );
      const cycle = Math.sin(elapsed * 1.4) * 0.14;
      targetY = THREE.MathUtils.clamp(baseY + 1.2 + expansion * 2.0 + cycle, baseY + 1.0, topY - 0.25);
      energyFill.scale.y = Math.max(0.15, expansion * 2.9);
      activeCount = 95;
    }

    pistonY = THREE.MathUtils.damp(pistonY, targetY, 6, dt);
    pistonGroup.position.y = pistonY;

    coilMat.emissiveIntensity = 0.2 + heatFrac * 1.4;
    fillMat.color.copy(_cyan).lerp(_amber, heatFrac);
    fillMat.emissive.copy(_cyan).lerp(_hotRed, heatFrac);

    const speedTarget = 2.4 + heatFrac * 3.8;
    const minY = baseY + 0.12;
    const maxY = pistonY - 0.18;
    const wallR = radius - 0.14;

    for (let i = 0; i < maxParticles; i++) {
      if (i < activeCount) {
        const p = particles[i];
        if (!paused) {
          const cur = p.vel.length() || 0.1;
          p.vel.multiplyScalar(THREE.MathUtils.lerp(1, speedTarget / cur, dt * 3));
          p.pos.addScaledVector(p.vel, dt);
          if (p.pos.y < minY) {
            p.pos.y = minY;
            p.vel.y = Math.abs(p.vel.y);
          } else if (p.pos.y > maxY) {
            p.pos.y = maxY;
            p.vel.y = -Math.abs(p.vel.y);
          }
          const r2 = p.pos.x * p.pos.x + p.pos.z * p.pos.z;
          if (r2 > wallR * wallR) {
            const r = Math.sqrt(r2);
            const nx = p.pos.x / r;
            const nz = p.pos.z / r;
            p.pos.x = nx * wallR;
            p.pos.z = nz * wallR;
            const dot = p.vel.x * nx + p.vel.z * nz;
            if (dot > 0) {
              p.vel.x -= 2 * dot * nx;
              p.vel.z -= 2 * dot * nz;
            }
          }
        }
        _quat.identity();
        _scale.setScalar(0.92);
        _mat4.compose(p.pos, _quat, _scale);
        pMesh.setMatrixAt(i, _mat4);
        _color.copy(_cyan).lerp(_hotRed, heatFrac);
        pMesh.setColorAt(i, _color);
      } else {
        _vecB.set(0, -100, 0);
        _scale.setScalar(0);
        _mat4.compose(_vecB, _quat, _scale);
        pMesh.setMatrixAt(i, _mat4);
      }
    }
    pMesh.instanceMatrix.needsUpdate = true;
    if (pMesh.instanceColor) pMesh.instanceColor.needsUpdate = true;
  };

  return { group, onScenarioChange, update, reset };
}
