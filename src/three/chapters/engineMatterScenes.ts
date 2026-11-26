import * as THREE from 'three';
import type { SimulationEngineParams } from '../../utils/simulationPhysics';
import { positionRodBetween, type ChapterSceneHandler, type ChapterSceneMaterials } from './types';

const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3(1, 1, 1);
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();
const _color = new THREE.Color();
const _cyan = new THREE.Color(0x38bdf8);
const _amber = new THREE.Color(0xf59e0b);
const _hot = new THREE.Color(0xfb7185);
const _ice = new THREE.Color(0x7dd3fc);

/**
 * III BOB: Issiqlik dvigatellari
 *  - bob3-engine: 4-stroke internal combustion cylinder + crankshaft + connecting rod + valves + flywheel + spark flash
 *  - bob3-turbine: Steam jet boiler + 12-blade turbine rotor + electrical generator bulb
 *  - bob3-carnot: Coupled hot (T1) and cold (T2) Carnot cylinders driving overhead flywheel
 */
export function buildBob3Scene(
  mats: ChapterSceneMaterials,
  disposables: { dispose: () => void }[]
): ChapterSceneHandler {
  const group = new THREE.Group();

  // --- 1. 4-Stroke Engine Group ---
  const engineGroup = new THREE.Group();
  const blockGeo = new THREE.BoxGeometry(3.4, 0.55, 2.2);
  const block = new THREE.Mesh(blockGeo, mats.darkAnodized);
  block.position.y = 0.275;
  block.castShadow = true;
  block.receiveShadow = true;
  engineGroup.add(block);

  // Crankcase housing walls
  const pillarGeo = new THREE.BoxGeometry(0.28, 1.45, 1.4);
  const leftPillar = new THREE.Mesh(pillarGeo, mats.darkAnodized);
  leftPillar.position.set(-1.1, 1.25, 0);
  engineGroup.add(leftPillar);
  const rightPillar = new THREE.Mesh(pillarGeo, mats.darkAnodized);
  rightPillar.position.set(1.1, 1.25, 0);
  engineGroup.add(rightPillar);

  // Crankshaft & Flywheel
  const crankPivot = new THREE.Group();
  crankPivot.position.set(0, 1.3, 0);

  const mainShaftGeo = new THREE.CylinderGeometry(0.11, 0.11, 3.0, 16);
  mainShaftGeo.rotateZ(Math.PI / 2);
  crankPivot.add(new THREE.Mesh(mainShaftGeo, mats.chrome));

  // Crank web discs
  const webGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.14, 24);
  webGeo.rotateZ(Math.PI / 2);
  const webL = new THREE.Mesh(webGeo, mats.darkAnodized);
  webL.position.x = -0.45;
  crankPivot.add(webL);
  const webR = new THREE.Mesh(webGeo, mats.darkAnodized);
  webR.position.x = 0.45;
  crankPivot.add(webR);

  // Offset crankpin
  const crankRadius = 0.52;
  const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.96, 14);
  pinGeo.rotateZ(Math.PI / 2);
  const crankPin = new THREE.Mesh(pinGeo, mats.brass);
  crankPin.position.set(0, crankRadius, 0);
  crankPivot.add(crankPin);

  // Spoked flywheel at right end
  const flyRimGeo = new THREE.TorusGeometry(0.92, 0.11, 14, 36);
  flyRimGeo.rotateY(Math.PI / 2);
  const flyRim = new THREE.Mesh(flyRimGeo, mats.brass);
  flyRim.position.x = 1.48;
  crankPivot.add(flyRim);
  const spokeGeo = new THREE.BoxGeometry(0.08, 1.75, 0.12);
  for (let s = 0; s < 3; s++) {
    const sp = new THREE.Mesh(spokeGeo, mats.chrome);
    sp.position.x = 1.48;
    sp.rotation.x = (s * Math.PI) / 3;
    crankPivot.add(sp);
  }
  engineGroup.add(crankPivot);

  // Connecting rod (unit height cylinder aligned every frame between crankpin and wristpin)
  const conRodGeo = new THREE.CylinderGeometry(0.075, 0.075, 1, 14);
  const conRod = new THREE.Mesh(conRodGeo, mats.chrome);
  engineGroup.add(conRod);

  // Cutaway Borosilicate Cylinder
  const cylYCenter = 3.25;
  const cylHeight = 2.25;
  const cylGeo = new THREE.CylinderGeometry(0.88, 0.88, cylHeight, 36, 1, true);
  const cylMesh = new THREE.Mesh(cylGeo, mats.glass);
  cylMesh.position.set(0, cylYCenter, 0);
  cylMesh.renderOrder = 3;
  engineGroup.add(cylMesh);

  // Cylinder Head
  const headGeo = new THREE.BoxGeometry(2.1, 0.32, 2.1);
  const cylHead = new THREE.Mesh(headGeo, mats.darkAnodized);
  cylHead.position.set(0, cylYCenter + cylHeight / 2 + 0.16, 0);
  engineGroup.add(cylHead);

  // Piston head & rings
  const pistonHead = new THREE.Group();
  const pBodyGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.54, 32);
  pistonHead.add(new THREE.Mesh(pBodyGeo, mats.chrome));
  const pRingGeo = new THREE.TorusGeometry(0.83, 0.025, 8, 32);
  pRingGeo.rotateX(Math.PI / 2);
  const pr1 = new THREE.Mesh(pRingGeo, mats.brass);
  pr1.position.y = 0.16;
  pistonHead.add(pr1);
  const pr2 = new THREE.Mesh(pRingGeo, mats.brass);
  pr2.position.y = 0.04;
  pistonHead.add(pr2);
  engineGroup.add(pistonHead);

  // Intake & Exhaust Overhead Valves + Spark Plug
  const valveStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.55, 10);
  const valveDiscGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.06, 20);
  const intakeValve = new THREE.Group();
  intakeValve.add(new THREE.Mesh(valveStemGeo, mats.chrome));
  const ivDisc = new THREE.Mesh(valveDiscGeo, mats.chrome);
  ivDisc.position.y = -0.28;
  intakeValve.add(ivDisc);
  intakeValve.position.set(-0.42, 4.48, 0);
  engineGroup.add(intakeValve);

  const exhaustValve = new THREE.Group();
  exhaustValve.add(new THREE.Mesh(valveStemGeo, mats.chrome));
  const evDisc = new THREE.Mesh(valveDiscGeo, mats.copper);
  evDisc.position.y = -0.28;
  exhaustValve.add(evDisc);
  exhaustValve.position.set(0.42, 4.48, 0);
  engineGroup.add(exhaustValve);

  // Spark plug + combustion gas glow volume
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const sparkTip = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), sparkMat);
  sparkTip.position.set(0, 4.28, 0);
  engineGroup.add(sparkTip);

  const gasGlowGeo = new THREE.CylinderGeometry(0.78, 0.78, 1, 24);
  const gasGlowMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const gasGlowMesh = new THREE.Mesh(gasGlowGeo, gasGlowMat);
  engineGroup.add(gasGlowMesh);
  group.add(engineGroup);

  // --- 2. Steam Turbine Group ---
  const turbineGroup = new THREE.Group();
  const turbBaseGeo = new THREE.BoxGeometry(5.2, 0.42, 2.4);
  const turbBase = new THREE.Mesh(turbBaseGeo, mats.darkAnodized);
  turbBase.position.y = 0.21;
  turbBase.receiveShadow = true;
  turbineGroup.add(turbBase);

  // Boiler tank on left
  const boilerGeo = new THREE.CylinderGeometry(0.88, 0.88, 2.2, 28);
  const boiler = new THREE.Mesh(boilerGeo, mats.copper);
  boiler.position.set(-1.75, 1.52, 0);
  boiler.castShadow = true;
  turbineGroup.add(boiler);

  const nozzleGeo = new THREE.CylinderGeometry(0.08, 0.24, 0.9, 18);
  nozzleGeo.rotateZ(-Math.PI / 2);
  const nozzle = new THREE.Mesh(nozzleGeo, mats.brass);
  nozzle.position.set(-0.75, 2.35, 0);
  turbineGroup.add(nozzle);

  // 12-Blade Turbine Wheel
  const rotorPivot = new THREE.Group();
  rotorPivot.position.set(0.45, 2.05, 0);
  const hubGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.44, 24);
  hubGeo.rotateX(Math.PI / 2);
  rotorPivot.add(new THREE.Mesh(hubGeo, mats.darkAnodized));

  const bladeGeo = new THREE.BoxGeometry(0.82, 0.16, 0.34);
  for (let b = 0; b < 12; b++) {
    const ang = (b * Math.PI * 2) / 12;
    const holder = new THREE.Group();
    holder.rotation.z = ang;
    const blade = new THREE.Mesh(bladeGeo, mats.chrome);
    blade.position.x = 0.68;
    blade.rotation.x = 0.42;
    holder.add(blade);
    rotorPivot.add(holder);
  }
  turbineGroup.add(rotorPivot);

  // Rotor bearing pedestal & generator cylinder
  const standGeo = new THREE.BoxGeometry(0.42, 1.68, 0.56);
  const stand = new THREE.Mesh(standGeo, mats.darkAnodized);
  stand.position.set(0.45, 1.24, -0.58);
  turbineGroup.add(stand);

  const genShaftGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.8, 16);
  genShaftGeo.rotateX(Math.PI / 2);
  const genShaft = new THREE.Mesh(genShaftGeo, mats.chrome);
  genShaft.position.set(0.45, 2.05, -0.8);
  turbineGroup.add(genShaft);

  const genBodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.9, 24);
  genBodyGeo.rotateX(Math.PI / 2);
  const genBody = new THREE.Mesh(genBodyGeo, mats.brass);
  genBody.position.set(0.45, 2.05, -1.15);
  turbineGroup.add(genBody);

  // Output incandescent load lamp bulb on right
  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0xfef3c7,
    emissive: 0xfbbf24,
    emissiveIntensity: 0.7,
    roughness: 0.2,
  });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 16), bulbMat);
  bulb.position.set(1.95, 1.22, 0);
  turbineGroup.add(bulb);
  const bulbSocket = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.5, 18), mats.darkAnodized);
  bulbSocket.position.set(1.95, 0.67, 0);
  turbineGroup.add(bulbSocket);

  // Steam jet particles (InstancedMesh)
  const steamCount = 70;
  const steamGeo = new THREE.SphereGeometry(0.075, 10, 8);
  const steamMat = new THREE.MeshStandardMaterial({
    color: 0xe0f2fe,
    roughness: 0.35,
    transparent: true,
    opacity: 0.78,
  });
  const steamMesh = new THREE.InstancedMesh(steamGeo, steamMat, steamCount);
  steamMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  turbineGroup.add(steamMesh);
  turbineGroup.visible = false;
  group.add(turbineGroup);

  // --- 3. Carnot Heat Engine Cycle Rig ---
  const carnotGroup = new THREE.Group();
  const cBase = new THREE.Mesh(turbBaseGeo, mats.darkAnodized);
  cBase.position.y = 0.21;
  carnotGroup.add(cBase);

  const cGlassGeo = new THREE.CylinderGeometry(0.75, 0.75, 2.1, 28, 1, true);
  const hotCyl = new THREE.Mesh(cGlassGeo, mats.glass);
  hotCyl.position.set(-1.2, 1.6, 0);
  hotCyl.renderOrder = 3;
  carnotGroup.add(hotCyl);

  const coldCyl = new THREE.Mesh(cGlassGeo, mats.glass);
  coldCyl.position.set(1.2, 1.6, 0);
  coldCyl.renderOrder = 3;
  carnotGroup.add(coldCyl);

  const heaterPadMat = new THREE.MeshStandardMaterial({
    color: 0x9a3412,
    emissive: 0xf97316,
    emissiveIntensity: 0.9,
  });
  const heaterPad = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.2, 28), heaterPadMat);
  heaterPad.position.set(-1.2, 0.52, 0);
  carnotGroup.add(heaterPad);

  const coolerPadMat = new THREE.MeshStandardMaterial({
    color: 0x0369a1,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.65,
  });
  const coolerPad = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 0.2, 28), coolerPadMat);
  coolerPad.position.set(1.2, 0.52, 0);
  carnotGroup.add(coolerPad);

  const hotPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.26, 28), mats.copper);
  hotPiston.position.set(-1.2, 1.9, 0);
  carnotGroup.add(hotPiston);

  const coldPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.26, 28), mats.chrome);
  coldPiston.position.set(1.2, 1.4, 0);
  carnotGroup.add(coldPiston);

  const carnotWheel = new THREE.Group();
  carnotWheel.position.set(0, 3.65, 0);
  const cwRim = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.08, 12, 32), mats.brass);
  carnotWheel.add(cwRim);
  for (let i = 0; i < 3; i++) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.38, 0.06), mats.chrome);
    sp.rotation.z = (i * Math.PI) / 3;
    carnotWheel.add(sp);
  }
  carnotGroup.add(carnotWheel);

  // Connecting rods to flywheel
  const cRodL = new THREE.Mesh(conRodGeo, mats.chrome);
  const cRodR = new THREE.Mesh(conRodGeo, mats.chrome);
  carnotGroup.add(cRodL, cRodR);

  // Efficiency bar on far right
  const etaBack = new THREE.Mesh(new THREE.BoxGeometry(0.26, 2.5, 0.14), mats.darkAnodized);
  etaBack.position.set(2.35, 1.75, 0);
  carnotGroup.add(etaBack);
  const etaGeo = new THREE.BoxGeometry(0.16, 1, 0.16);
  etaGeo.translate(0, 0.5, 0);
  const etaMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.7,
  });
  const etaBar = new THREE.Mesh(etaGeo, etaMat);
  etaBar.position.set(2.35, 0.55, 0);
  carnotGroup.add(etaBar);

  carnotGroup.visible = false;
  group.add(carnotGroup);

  disposables.push(
    blockGeo,
    pillarGeo,
    mainShaftGeo,
    webGeo,
    pinGeo,
    flyRimGeo,
    spokeGeo,
    conRodGeo,
    cylGeo,
    headGeo,
    pBodyGeo,
    pRingGeo,
    valveStemGeo,
    valveDiscGeo,
    sparkTip.geometry,
    sparkMat,
    gasGlowGeo,
    gasGlowMat,
    turbBaseGeo,
    boilerGeo,
    nozzleGeo,
    hubGeo,
    bladeGeo,
    standGeo,
    genShaftGeo,
    genBodyGeo,
    bulb.geometry,
    bulbMat,
    bulbSocket.geometry,
    steamGeo,
    steamMat,
    cGlassGeo,
    heaterPad.geometry,
    heaterPadMat,
    coolerPadMat,
    hotPiston.geometry,
    cwRim.geometry,
    etaBack.geometry,
    etaGeo,
    etaMat
  );

  let phaseAngle = 0;
  let turbineAngle = 0;
  let carnotAngle = 0;
  const steamProgress = Float32Array.from({ length: steamCount }, (_, i) => i / steamCount);

  const reset = () => {
    phaseAngle = 0;
    turbineAngle = 0;
    carnotAngle = 0;
  };

  const onScenarioChange = (scenarioId: string) => {
    engineGroup.visible = scenarioId === 'bob3-engine';
    turbineGroup.visible = scenarioId === 'bob3-turbine';
    carnotGroup.visible = scenarioId === 'bob3-carnot';
  };

  const update = (dt: number, _elapsed: number, params: SimulationEngineParams) => {
    const { scenarioId, paramA, paramB, paused } = params;

    if (scenarioId === 'bob3-engine') {
      const fuelFrac = paramA / 100;
      const omega = paramB * 3.8;
      if (!paused) {
        phaseAngle = (phaseAngle + omega * dt) % (Math.PI * 4);
      }
      crankPivot.rotation.x = phaseAngle;

      // Slider-crank kinematics along Y axis
      const cy = 1.3 + crankRadius * Math.cos(phaseAngle);
      const cz = -crankRadius * Math.sin(phaseAngle);
      const rodLen = 1.75;
      const wristY = cy + Math.sqrt(Math.max(0.2, rodLen * rodLen - cz * cz));
      pistonHead.position.set(0, wristY, 0);

      _vecA.set(0, cy, cz);
      _vecB.set(0, wristY - 0.1, 0);
      positionRodBetween(conRod, _vecA, _vecB, 1);

      // 4-stroke phases: 0..PI Intake, PI..2PI Compression, 2PI..3PI Power, 3PI..4PI Exhaust
      const cyclePos = phaseAngle;
      const intakeOpen = cyclePos < Math.PI ? Math.sin(cyclePos) * 0.16 : 0;
      const exhaustOpen = cyclePos >= Math.PI * 3 ? Math.sin(cyclePos - Math.PI * 3) * 0.16 : 0;
      intakeValve.position.y = 4.48 - intakeOpen;
      exhaustValve.position.y = 4.48 - exhaustOpen;

      const isSparking = cyclePos > Math.PI * 1.92 && cyclePos < Math.PI * 2.25;
      sparkTip.visible = isSparking;

      const cylHeadBottom = cylYCenter + cylHeight / 2;
      const pistonTop = wristY + 0.27;
      const gasH = Math.max(0.15, cylHeadBottom - pistonTop);
      gasGlowMesh.position.set(0, pistonTop + gasH / 2, 0);
      gasGlowMesh.scale.set(1, gasH, 1);

      if (cyclePos < Math.PI) {
        gasGlowMat.color.setHex(0x38bdf8);
        gasGlowMat.opacity = 0.25;
      } else if (cyclePos < Math.PI * 2) {
        gasGlowMat.color.setHex(0x60a5fa);
        gasGlowMat.opacity = 0.35;
      } else if (cyclePos < Math.PI * 3) {
        gasGlowMat.color.setHex(0xf97316);
        gasGlowMat.opacity = (0.35 + fuelFrac * 0.45) * Math.max(0.25, 1 - (cyclePos - Math.PI * 2) / Math.PI);
      } else {
        gasGlowMat.color.setHex(0x94a3b8);
        gasGlowMat.opacity = 0.28;
      }
      return;
    }

    if (scenarioId === 'bob3-turbine') {
      const pressureFrac = THREE.MathUtils.clamp((paramA - 100) / 500, 0.1, 1);
      const loadFrac = paramB / 100;
      const spinSpeed = pressureFrac * (1.25 - loadFrac * 0.45) * 8.5;
      if (!paused) {
        turbineAngle += spinSpeed * dt;
      }
      rotorPivot.rotation.z = -turbineAngle;
      bulbMat.emissiveIntensity = 0.15 + pressureFrac * loadFrac * 2.2;

      for (let i = 0; i < steamCount; i++) {
        if (!paused) {
          steamProgress[i] = (steamProgress[i] + dt * (0.8 + pressureFrac * 1.6)) % 1;
        }
        const t = steamProgress[i];
        const sx = -0.35 + t * 1.35;
        const spread = (Math.sin(i * 3.7) * 0.18 + t * 0.35) * (t > 0.55 ? 1.8 : 0.45);
        const sy = 2.35 + spread + (t > 0.55 ? (t - 0.55) * 1.1 : 0);
        const sz = Math.cos(i * 2.1) * (0.08 + t * 0.28);
        _vecA.set(sx, sy, sz);
        _quat.identity();
        _scale.setScalar(0.65 + t * 0.8);
        _mat4.compose(_vecA, _quat, _scale);
        steamMesh.setMatrixAt(i, _mat4);
      }
      steamMesh.instanceMatrix.needsUpdate = true;
      return;
    }

    // bob3-carnot
    const tHot = Math.max(paramA, paramB + 20);
    const tCold = Math.min(paramB, tHot - 20);
    const eta = THREE.MathUtils.clamp(1 - tCold / tHot, 0.05, 0.85);
    if (!paused) {
      carnotAngle += (1.2 + eta * 3.4) * dt;
    }
    carnotWheel.rotation.z = -carnotAngle;

    const hotY = 1.65 + Math.sin(carnotAngle) * 0.48;
    const coldY = 1.65 + Math.sin(carnotAngle + Math.PI * 0.5) * 0.48;
    hotPiston.position.y = hotY;
    coldPiston.position.y = coldY;

    _vecA.set(-1.2, hotY + 0.12, 0);
    _vecB.set(Math.cos(carnotAngle) * 0.45, 3.65 + Math.sin(carnotAngle) * 0.45, 0);
    positionRodBetween(cRodL, _vecA, _vecB, 0.8);

    _vecA.set(1.2, coldY + 0.12, 0);
    _vecB.set(-Math.cos(carnotAngle) * 0.45, 3.65 - Math.sin(carnotAngle) * 0.45, 0);
    positionRodBetween(cRodR, _vecA, _vecB, 0.8);

    heaterPadMat.emissiveIntensity = 0.35 + ((tHot - 400) / 500) * 1.1;
    coolerPadMat.emissiveIntensity = 0.25 + ((400 - tCold) / 200) * 0.7;
    etaBar.scale.y = Math.max(0.08, eta * 2.25);
  };

  return { group, onScenarioChange, update, reset };
}

/**
 * IV BOB: Suyuqlik va qattiq jismlarning xossalari
 *  - bob4-capillary: 3 stepped capillary tubes showing Jurin height h ∝ sigma / r
 *  - bob4-crystal: Heated 4x4x3 3D cubic lattice atoms + dynamic LineSegments bonds (melting transition)
 *  - bob4-vapor: Wide glass evaporation tray + adjustable open aperture + vapor condensation molecules
 */
export function buildBob4Scene(
  mats: ChapterSceneMaterials,
  disposables: { dispose: () => void }[]
): ChapterSceneHandler {
  const group = new THREE.Group();

  // --- 1. Capillary Tubes Group ---
  const capGroup = new THREE.Group();
  const cTrayBase = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.32, 2.2), mats.darkAnodized);
  cTrayBase.position.y = 0.16;
  capGroup.add(cTrayBase);

  const glassBathGeo = new THREE.BoxGeometry(3.8, 0.88, 1.75);
  const glassBath = new THREE.Mesh(glassBathGeo, mats.glass);
  glassBath.position.y = 0.76;
  glassBath.renderOrder = 3;
  capGroup.add(glassBath);

  const liquidPoolMat = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    emissive: 0x0284c7,
    emissiveIntensity: 0.22,
    roughness: 0.12,
    metalness: 0.08,
    transparent: true,
    opacity: 0.78,
  });
  const poolMesh = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.56, 1.65), liquidPoolMat);
  poolMesh.position.y = 0.6;
  capGroup.add(poolMesh);

  // Brass gantry posts holding 3 capillary tubes
  const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 4.1, 12);
  const postL = new THREE.Mesh(postGeo, mats.brass);
  postL.position.set(-1.75, 2.35, 0);
  capGroup.add(postL);
  const postR = new THREE.Mesh(postGeo, mats.brass);
  postR.position.set(1.75, 2.35, 0);
  capGroup.add(postR);
  const barMesh = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.12, 0.2), mats.darkAnodized);
  barMesh.position.set(0, 4.35, 0);
  capGroup.add(barMesh);

  // 3 stepped capillary tubes: narrow (1x), medium (1.6x), wide (2.4x)
  const tubeConfigs = [
    { x: -1.0, r: 0.11, factor: 1.0 },
    { x: 0.0, r: 0.17, factor: 0.62 },
    { x: 1.0, r: 0.25, factor: 0.42 },
  ];
  const colMeshes: THREE.Mesh[] = [];
  const meniscusMeshes: THREE.Mesh[] = [];
  const unitColGeo = new THREE.CylinderGeometry(1, 1, 1, 20);
  unitColGeo.translate(0, 0.5, 0);

  tubeConfigs.forEach((tc) => {
    const outerTubeGeo = new THREE.CylinderGeometry(tc.r + 0.035, tc.r + 0.035, 3.65, 22, 1, true);
    const outerTube = new THREE.Mesh(outerTubeGeo, mats.glass);
    outerTube.position.set(tc.x, 2.52, 0);
    outerTube.renderOrder = 4;
    capGroup.add(outerTube);
    disposables.push(outerTubeGeo);

    const col = new THREE.Mesh(unitColGeo, liquidPoolMat);
    col.position.set(tc.x, 0.86, 0);
    col.scale.set(tc.r, 1.5, tc.r);
    capGroup.add(col);
    colMeshes.push(col);

    const menGeo = new THREE.TorusGeometry(tc.r * 0.88, 0.025, 10, 22);
    menGeo.rotateX(Math.PI / 2);
    const men = new THREE.Mesh(menGeo, mats.chrome);
    capGroup.add(men);
    meniscusMeshes.push(men);
    disposables.push(menGeo);
  });
  group.add(capGroup);

  // --- 2. Crystal Lattice Group ---
  const crystalGroup = new THREE.Group();
  const cStage = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.2, 0.45, 36), mats.darkAnodized);
  cStage.position.y = 0.225;
  crystalGroup.add(cStage);

  const cHeaterMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    emissive: 0xf97316,
    emissiveIntensity: 0.35,
  });
  const cHeater = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 0.14, 36), cHeaterMat);
  cHeater.position.y = 0.5;
  crystalGroup.add(cHeater);

  const crystalEnclosure = new THREE.Mesh(
    new THREE.CylinderGeometry(1.75, 1.75, 3.4, 36, 1, true),
    mats.glass
  );
  crystalEnclosure.position.y = 2.25;
  crystalEnclosure.renderOrder = 3;
  crystalGroup.add(crystalEnclosure);

  // 4 x 4 x 3 = 48 crystal lattice atoms
  const atomCount = 48;
  const atomGeo = new THREE.SphereGeometry(0.14, 14, 12);
  const atomMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25, metalness: 0.25 });
  const atomsMesh = new THREE.InstancedMesh(atomGeo, atomMat, atomCount);
  atomsMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  crystalGroup.add(atomsMesh);

  const maxBonds = 200;
  const bondBuf = new Float32Array(maxBonds * 6);
  const bondGeo = new THREE.BufferGeometry();
  bondGeo.setAttribute('position', new THREE.BufferAttribute(bondBuf, 3));
  bondGeo.setDrawRange(0, 0);
  const bondMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.65,
  });
  const bondLines = new THREE.LineSegments(bondGeo, bondMat);
  crystalGroup.add(bondLines);
  crystalGroup.visible = false;
  group.add(crystalGroup);

  // --- 3. Evaporation & Condensation Vessel ---
  const vaporGroup = new THREE.Group();
  const vBase = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.3, 0.45, 40), mats.darkAnodized);
  vBase.position.y = 0.225;
  vaporGroup.add(vBase);

  const vVessel = new THREE.Mesh(
    new THREE.CylinderGeometry(1.85, 1.85, 3.5, 40, 1, true),
    mats.glass
  );
  vVessel.position.y = 2.2;
  vVessel.renderOrder = 3;
  vaporGroup.add(vVessel);

  const vFluid = new THREE.Mesh(
    new THREE.CylinderGeometry(1.8, 1.8, 0.72, 40),
    liquidPoolMat
  );
  vFluid.position.y = 0.82;
  vaporGroup.add(vFluid);

  // Adjustable iris aperture ring on top
  const irisRing = new THREE.Mesh(
    new THREE.RingGeometry(0.6, 1.92, 36),
    mats.brass
  );
  irisRing.rotation.x = -Math.PI / 2;
  irisRing.position.y = 3.96;
  vaporGroup.add(irisRing);

  const vaporCount = 90;
  const vMolGeo = new THREE.SphereGeometry(0.085, 10, 8);
  const vMolMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.25 });
  const vaporMesh = new THREE.InstancedMesh(vMolGeo, vMolMat, vaporCount);
  vaporMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  vaporGroup.add(vaporMesh);
  vaporGroup.visible = false;
  group.add(vaporGroup);

  disposables.push(
    cTrayBase.geometry,
    glassBathGeo,
    liquidPoolMat,
    poolMesh.geometry,
    postGeo,
    barMesh.geometry,
    unitColGeo,
    cStage.geometry,
    cHeater.geometry,
    cHeaterMat,
    crystalEnclosure.geometry,
    atomGeo,
    atomMat,
    bondGeo,
    bondMat,
    vBase.geometry,
    vVessel.geometry,
    vFluid.geometry,
    irisRing.geometry,
    vMolGeo,
    vMolMat
  );

  // Crystal atom homes & positions
  const homes: THREE.Vector3[] = [];
  const atomPos: THREE.Vector3[] = [];
  const atomVel: THREE.Vector3[] = [];
  for (let iy = 0; iy < 3; iy++) {
    for (let ix = 0; ix < 4; ix++) {
      for (let iz = 0; iz < 4; iz++) {
        const hx = (ix - 1.5) * 0.62;
        const hy = 1.0 + iy * 0.62;
        const hz = (iz - 1.5) * 0.62;
        homes.push(new THREE.Vector3(hx, hy, hz));
        atomPos.push(new THREE.Vector3(hx, hy, hz));
        atomVel.push(new THREE.Vector3(Math.sin(ix + iy), 0.3, Math.cos(iz - ix)).multiplyScalar(1.2));
      }
    }
  }

  // Vapor particle positions
  const vPos: THREE.Vector3[] = Array.from({ length: vaporCount }, (_, i) => {
    const ang = (i * 2.399) % (Math.PI * 2);
    const r = Math.sqrt((i + 0.5) / vaporCount) * 1.55;
    return new THREE.Vector3(Math.cos(ang) * r, 1.25 + ((i * 0.41) % 1) * 2.5, Math.sin(ang) * r);
  });
  const vVel: THREE.Vector3[] = Array.from({ length: vaporCount }, (_, i) =>
    new THREE.Vector3(Math.cos(i) * 0.6, 0.8 + (i % 5) * 0.35, Math.sin(i) * 0.6)
  );

  const curHeights = [1.5, 1.0, 0.6];

  const reset = () => {
    for (let i = 0; i < atomCount; i++) {
      atomPos[i].copy(homes[i]);
    }
  };

  const onScenarioChange = (scenarioId: string) => {
    capGroup.visible = scenarioId === 'bob4-capillary';
    crystalGroup.visible = scenarioId === 'bob4-crystal';
    vaporGroup.visible = scenarioId === 'bob4-vapor';
  };

  const update = (dt: number, elapsed: number, params: SimulationEngineParams) => {
    const { scenarioId, paramA, paramB, paused } = params;

    if (scenarioId === 'bob4-capillary') {
      const sigma = paramA;
      const baseR = Math.max(0.2, paramB);
      tubeConfigs.forEach((tc, idx) => {
        // Scaled visual Jurin rise (0.35..3.0m on stage)
        const targetH = THREE.MathUtils.clamp((sigma / 75) * (0.45 / baseR) * 2.15 * tc.factor, 0.35, 3.05);
        curHeights[idx] = THREE.MathUtils.damp(curHeights[idx], targetH, 6, dt);
        colMeshes[idx].scale.y = curHeights[idx];
        meniscusMeshes[idx].position.set(tc.x, 0.86 + curHeights[idx], 0);
      });
      return;
    }

    if (scenarioId === 'bob4-crystal') {
      const tempK = paramA;
      const bondScale = paramB;
      const meltK = 280 + bondScale * 140;
      const molten = tempK >= meltK;
      const heatN = THREE.MathUtils.clamp((tempK - 150) / 630, 0, 1);
      cHeaterMat.emissiveIntensity = 0.2 + heatN * 1.1;

      for (let i = 0; i < atomCount; i++) {
        if (!paused) {
          if (!molten) {
            const amp = 0.03 + (tempK / meltK) * 0.095;
            _vecA.set(
              homes[i].x + Math.sin(elapsed * 14 + i * 1.9) * amp,
              homes[i].y + Math.cos(elapsed * 15 + i * 2.3) * amp,
              homes[i].z + Math.sin(elapsed * 13 + i * 1.3) * amp
            );
            atomPos[i].lerp(_vecA, Math.min(1, dt * 15));
          } else {
            atomVel[i].y -= 3.5 * dt;
            atomVel[i].x += Math.sin(elapsed * 7 + i * 2.1) * 3.8 * dt;
            atomVel[i].z += Math.cos(elapsed * 6.5 + i * 1.7) * 3.8 * dt;
            atomVel[i].multiplyScalar(0.98);
            atomPos[i].addScaledVector(atomVel[i], dt);
            if (atomPos[i].y < 0.72) {
              atomPos[i].y = 0.72;
              atomVel[i].y = Math.abs(atomVel[i].y) * 0.65;
            } else if (atomPos[i].y > 1.85) {
              atomPos[i].y = 1.85;
              atomVel[i].y = -Math.abs(atomVel[i].y) * 0.6;
            }
            const r = Math.hypot(atomPos[i].x, atomPos[i].z);
            if (r > 1.48) {
              atomPos[i].x *= 1.48 / r;
              atomPos[i].z *= 1.48 / r;
              atomVel[i].x *= -0.7;
              atomVel[i].z *= -0.7;
            }
          }
        }
        _quat.identity();
        _scale.setScalar(1);
        _mat4.compose(atomPos[i], _quat, _scale);
        atomsMesh.setMatrixAt(i, _mat4);
        _color.copy(_ice).lerp(_hot, heatN);
        atomsMesh.setColorAt(i, _color);
      }
      atomsMesh.instanceMatrix.needsUpdate = true;
      if (atomsMesh.instanceColor) atomsMesh.instanceColor.needsUpdate = true;

      let seg = 0;
      if (!molten) {
        for (let i = 0; i < atomCount && seg < maxBonds; i++) {
          for (let j = i + 1; j < atomCount && seg < maxBonds; j++) {
            if (atomPos[i].distanceToSquared(atomPos[j]) < 0.56) {
              const o = seg * 6;
              bondBuf[o] = atomPos[i].x;
              bondBuf[o + 1] = atomPos[i].y;
              bondBuf[o + 2] = atomPos[i].z;
              bondBuf[o + 3] = atomPos[j].x;
              bondBuf[o + 4] = atomPos[j].y;
              bondBuf[o + 5] = atomPos[j].z;
              seg++;
            }
          }
        }
      }
      bondGeo.setDrawRange(0, seg * 2);
      bondGeo.attributes.position.needsUpdate = true;
      return;
    }

    // bob4-vapor
    const tempScale = THREE.MathUtils.clamp((paramA - 270) / 120, 0.25, 1.4);
    const activeVapor = Math.round(25 + tempScale * (paramB / 100) * 55);
    const irisScale = 0.7 + (1 - paramB / 100) * 0.45;
    irisRing.scale.setScalar(irisScale);

    for (let i = 0; i < vaporCount; i++) {
      if (i < activeVapor) {
        if (!paused) {
          vPos[i].addScaledVector(vVel[i], dt * (0.7 + tempScale * 1.4));
          if (vPos[i].y > 3.92) {
            vPos[i].y = 1.22;
            const ang = ((i * 2.399) + elapsed) % (Math.PI * 2);
            const r = Math.sqrt((i + 0.5) / vaporCount) * 1.5;
            vPos[i].x = Math.cos(ang) * r;
            vPos[i].z = Math.sin(ang) * r;
          }
          const r = Math.hypot(vPos[i].x, vPos[i].z);
          if (r > 1.62) {
            vPos[i].x *= 1.62 / r;
            vPos[i].z *= 1.62 / r;
          }
        }
        _quat.identity();
        _scale.setScalar(1);
        _mat4.compose(vPos[i], _quat, _scale);
        vaporMesh.setMatrixAt(i, _mat4);
      } else {
        _vecB.set(0, -100, 0);
        _scale.setScalar(0);
        _mat4.compose(_vecB, _quat, _scale);
        vaporMesh.setMatrixAt(i, _mat4);
      }
    }
    vaporMesh.instanceMatrix.needsUpdate = true;
  };

  return { group, onScenarioChange, update, reset };
}
