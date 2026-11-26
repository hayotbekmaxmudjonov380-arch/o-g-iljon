import * as THREE from 'three';
import type { SimulationEngineParams } from '../../utils/simulationPhysics';
import {
  createProtractorTexture,
  createSolarCellTexture,
  positionRodBetween,
  type ChapterSceneHandler,
  type ChapterSceneMaterials,
} from './types';

const _p0 = new THREE.Vector3();
const _p1 = new THREE.Vector3();
const _p2 = new THREE.Vector3();
const _p3 = new THREE.Vector3();
const _p4 = new THREE.Vector3();
const _p5 = new THREE.Vector3();

/**
 * V BOB: Geometrik optika va optik asboblar
 *  - bob5-snell: Goniometer protractor turntable + semicircular glass block + incident/reflected/refracted laser beams
 *  - bob5-tir: Equilateral optical prism + critical angle total internal reflection switching
 *  - bob5-lens: Calibrated optical bench rail + biconvex glass lens + object arrow + principal rays + real/virtual image arrow
 */
export function buildBob5Scene(
  mats: ChapterSceneMaterials,
  maxAniso: number,
  disposables: { dispose: () => void }[]
): ChapterSceneHandler {
  const group = new THREE.Group();

  const laserMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const reflectMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  const refractMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
  const rayGeo = new THREE.CylinderGeometry(0.032, 0.032, 1, 10);
  const thinRayGeo = new THREE.CylinderGeometry(0.022, 0.022, 1, 10);
  disposables.push(laserMat, reflectMat, refractMat, rayGeo, thinRayGeo);

  // --- 1. Snell Law Goniometer Group ---
  const snellGroup = new THREE.Group();
  const gBase = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.55, 0.36, 48), mats.darkAnodized);
  gBase.position.y = 0.18;
  gBase.receiveShadow = true;
  snellGroup.add(gBase);

  const protractorTex = createProtractorTexture(maxAniso);
  const dialFace = new THREE.Mesh(
    new THREE.CircleGeometry(2.3, 48),
    new THREE.MeshBasicMaterial({ map: protractorTex })
  );
  dialFace.rotation.x = -Math.PI / 2;
  dialFace.position.y = 0.37;
  snellGroup.add(dialFace);

  // Semicircular glass block positioned in Z >= 0 half-plane
  const semiGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.56, 36, 1, false, -Math.PI / 2, Math.PI);
  const semiBlock = new THREE.Mesh(semiGeo, mats.glass);
  semiBlock.position.set(0, 0.66, 0);
  semiBlock.renderOrder = 3;
  snellGroup.add(semiBlock);

  // Laser emitter turret (moves on Z < 0 arc)
  const laserTurret = new THREE.Group();
  const turretBody = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.58, 16), mats.brass);
  turretBody.rotation.x = Math.PI / 2;
  laserTurret.add(turretBody);
  const emitterNose = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.14, 12), mats.darkAnodized);
  emitterNose.rotation.x = Math.PI / 2;
  emitterNose.position.z = 0.32;
  laserTurret.add(emitterNose);
  snellGroup.add(laserTurret);

  const sIncident = new THREE.Mesh(rayGeo, laserMat);
  const sReflected = new THREE.Mesh(rayGeo, reflectMat);
  const sRefracted = new THREE.Mesh(rayGeo, refractMat);
  const hitSpot = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 10),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  hitSpot.position.set(0, 0.66, 0);
  snellGroup.add(sIncident, sReflected, sRefracted, hitSpot);
  group.add(snellGroup);

  // --- 2. Total Internal Reflection Prism Group ---
  const tirGroup = new THREE.Group();
  const tBase = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.55, 0.36, 48), mats.darkAnodized);
  tBase.position.y = 0.18;
  tirGroup.add(tBase);

  const tDial = new THREE.Mesh(
    new THREE.CircleGeometry(2.3, 48),
    new THREE.MeshBasicMaterial({ map: protractorTex })
  );
  tDial.rotation.x = -Math.PI / 2;
  tDial.position.y = 0.37;
  tirGroup.add(tDial);

  // Equilateral optical glass prism (centered near origin)
  const prismShape = new THREE.Shape();
  prismShape.moveTo(-1.1, -0.5);
  prismShape.lineTo(1.1, -0.5);
  prismShape.lineTo(0, 1.4);
  prismShape.closePath();
  const prismGeo = new THREE.ExtrudeGeometry(prismShape, {
    depth: 0.72,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
  });
  prismGeo.rotateX(Math.PI / 2);
  const prismMesh = new THREE.Mesh(prismGeo, mats.glass);
  prismMesh.position.set(0, 1.12, -0.2);
  prismMesh.renderOrder = 3;
  tirGroup.add(prismMesh);

  const tirTurret = new THREE.Group();
  const ttBody = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.58, 16), mats.brass);
  ttBody.rotation.x = Math.PI / 2;
  tirTurret.add(ttBody);
  tirGroup.add(tirTurret);

  const tIn = new THREE.Mesh(rayGeo, laserMat);
  const tBounce = new THREE.Mesh(rayGeo, reflectMat);
  const tOut = new THREE.Mesh(rayGeo, refractMat);
  tirGroup.add(tIn, tBounce, tOut);
  tirGroup.visible = false;
  group.add(tirGroup);

  // --- 3. Biconvex Lens Optical Bench Group ---
  const lensGroup = new THREE.Group();
  const railMesh = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.24, 0.76), mats.darkAnodized);
  railMesh.position.y = 0.22;
  railMesh.receiveShadow = true;
  lensGroup.add(railMesh);

  // Chrome rail guide rods
  const guideRodGeo = new THREE.CylinderGeometry(0.04, 0.04, 6.7, 12);
  guideRodGeo.rotateZ(Math.PI / 2);
  const gr1 = new THREE.Mesh(guideRodGeo, mats.chrome);
  gr1.position.set(0, 0.36, 0.26);
  lensGroup.add(gr1);
  const gr2 = new THREE.Mesh(guideRodGeo, mats.chrome);
  gr2.position.set(0, 0.36, -0.26);
  lensGroup.add(gr2);

  // Central Lens Mount & Biconvex Glass Element at x = 0
  const lensHolder = new THREE.Group();
  lensHolder.position.set(0, 1.55, 0);
  const lensPed = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.15, 16), mats.brass);
  lensPed.position.y = -0.68;
  lensHolder.add(lensPed);
  const lensRim = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.065, 14, 36), mats.brass);
  lensRim.rotation.y = Math.PI / 2;
  lensHolder.add(lensRim);
  const biconvexGeo = new THREE.SphereGeometry(0.8, 28, 20);
  biconvexGeo.scale(0.24, 1, 1);
  const biconvexGlass = new THREE.Mesh(biconvexGeo, mats.glass);
  biconvexGlass.renderOrder = 3;
  lensHolder.add(biconvexGlass);
  lensGroup.add(lensHolder);

  // Focal markers on rail (+F and -F)
  const fMarkGeo = new THREE.BoxGeometry(0.07, 0.18, 0.42);
  const fMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.4 });
  const fLeft = new THREE.Mesh(fMarkGeo, fMat);
  const fRight = new THREE.Mesh(fMarkGeo, fMat);
  fLeft.position.set(-1.2, 0.42, 0);
  fRight.position.set(1.2, 0.42, 0);
  lensGroup.add(fLeft, fRight);

  // Illuminated Object Arrow Assembly
  const objGroup = new THREE.Group();
  const objCarrier = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.3, 0.62), mats.darkAnodized);
  objCarrier.position.y = 0.46;
  objGroup.add(objCarrier);
  const objStem = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.72, 12), mats.chrome);
  objStem.position.y = 0.96;
  objGroup.add(objStem);
  const arrowGlowMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.85,
  });
  const objShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.65, 12), arrowGlowMat);
  objShaft.position.y = 1.65;
  objGroup.add(objShaft);
  const objTip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.24, 14), arrowGlowMat);
  objTip.position.y = 2.06;
  objGroup.add(objTip);
  lensGroup.add(objGroup);

  // Image Arrow Assembly (real inverted OR virtual upright)
  const imgGroup = new THREE.Group();
  const imgMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.85,
  });
  const imgShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 1, 12), imgMat);
  const imgTip = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.22, 14), imgMat);
  imgGroup.add(imgShaft, imgTip);
  const screenMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.0, 1.45), mats.glass);
  screenMesh.position.y = 1.55;
  screenMesh.renderOrder = 2;
  imgGroup.add(screenMesh);
  lensGroup.add(imgGroup);

  // Principal optical rays (Ray 1: parallel -> lens -> F -> imgTip; Ray 2: objTip -> center -> imgTip)
  const ray1a = new THREE.Mesh(thinRayGeo, laserMat);
  const ray1b = new THREE.Mesh(thinRayGeo, laserMat);
  const ray2 = new THREE.Mesh(thinRayGeo, reflectMat);
  lensGroup.add(ray1a, ray1b, ray2);

  lensGroup.visible = false;
  group.add(lensGroup);

  disposables.push(
    gBase.geometry,
    protractorTex,
    dialFace.geometry,
    dialFace.material as THREE.Material,
    semiGeo,
    turretBody.geometry,
    emitterNose.geometry,
    hitSpot.geometry,
    hitSpot.material as THREE.Material,
    prismGeo,
    railMesh.geometry,
    guideRodGeo,
    lensPed.geometry,
    lensRim.geometry,
    biconvexGeo,
    fMarkGeo,
    fMat,
    objCarrier.geometry,
    objStem.geometry,
    arrowGlowMat,
    objShaft.geometry,
    objTip.geometry,
    imgMat,
    imgShaft.geometry,
    imgTip.geometry,
    screenMesh.geometry
  );

  const reset = () => {};

  const onScenarioChange = (scenarioId: string) => {
    snellGroup.visible = scenarioId === 'bob5-snell';
    tirGroup.visible = scenarioId === 'bob5-tir';
    lensGroup.visible = scenarioId === 'bob5-lens';
  };

  const update = (_dt: number, _elapsed: number, params: SimulationEngineParams) => {
    const { scenarioId, paramA, paramB } = params;

    if (scenarioId === 'bob5-snell') {
      const alphaRad = (paramA * Math.PI) / 180;
      const n = Math.max(1.05, paramB);
      const gammaRad = Math.asin(Math.min(1, Math.sin(alphaRad) / n));

      const turretR = 2.05;
      const sx = -Math.sin(alphaRad) * turretR;
      const sz = -Math.cos(alphaRad) * turretR;
      laserTurret.position.set(sx, 0.66, sz);
      laserTurret.lookAt(0, 0.66, 0);

      _p0.set(sx, 0.66, sz);
      _p1.set(0, 0.66, 0);
      positionRodBetween(sIncident, _p0, _p1, 1);

      _p2.set(Math.sin(alphaRad) * 2.15, 0.66, -Math.cos(alphaRad) * 2.15);
      positionRodBetween(sReflected, _p1, _p2, 0.85);

      _p3.set(Math.sin(gammaRad) * 2.2, 0.66, Math.cos(gammaRad) * 2.2);
      positionRodBetween(sRefracted, _p1, _p3, 1);
      return;
    }

    if (scenarioId === 'bob5-tir') {
      const alphaDeg = paramA;
      const n = Math.max(1.05, paramB);
      const critDeg = (Math.asin(1 / n) * 180) / Math.PI;
      const isTir = alphaDeg >= critDeg;
      const rad = (alphaDeg * Math.PI) / 180;

      // Emitter sits on lower-left and shines toward prism internal face at origin
      const ex = -Math.sin(rad) * 2.05;
      const ez = Math.cos(rad) * 1.45;
      tirTurret.position.set(ex, 0.76, ez);
      tirTurret.lookAt(0, 0.76, -0.15);

      _p0.set(ex, 0.76, ez);
      _p1.set(0, 0.76, -0.15);
      positionRodBetween(tIn, _p0, _p1, 1);

      if (isTir) {
        // Total internal reflection inside glass prism toward right/bottom edge
        _p2.set(Math.sin(rad) * 1.9, 0.76, Math.cos(rad) * 1.5);
        positionRodBetween(tBounce, _p1, _p2, 1.05);
        tOut.visible = false;
      } else {
        const exitRad = Math.asin(Math.min(0.98, Math.sin(rad) * n * 0.75));
        _p2.set(Math.sin(exitRad) * 2.1, 0.76, -Math.cos(exitRad) * 1.9);
        positionRodBetween(tOut, _p1, _p2, 1);
        tBounce.visible = false;
      }
      return;
    }

    // bob5-lens: scale cm -> scene meters (0.085 m per cm)
    const scaleCm = 0.085;
    const dCm = paramA;
    const fCm = paramB;
    const objX = -dCm * scaleCm;
    const fX = fCm * scaleCm;
    fLeft.position.x = -fX;
    fRight.position.x = fX;
    objGroup.position.x = objX;

    const axisY = 1.55;
    const objHeight = 0.62;
    const tipY = axisY + objHeight;

    if (Math.abs(dCm - fCm) < 0.6) {
      imgGroup.visible = false;
      _p0.set(objX, tipY, 0);
      _p1.set(0, tipY, 0);
      _p2.set(2.9, axisY - (objHeight / fX) * (2.9 - fX), 0);
      positionRodBetween(ray1a, _p0, _p1, 1);
      positionRodBetween(ray1b, _p1, _p2, 1);
      _p3.set(2.9, axisY - (objHeight / Math.abs(objX)) * 2.9, 0);
      positionRodBetween(ray2, _p0, _p3, 1);
      return;
    }

    const imgCm = (dCm * fCm) / (dCm - fCm);
    const mag = -imgCm / dCm;
    const clampedImgX = THREE.MathUtils.clamp(imgCm * scaleCm, -3.1, 3.1);
    const imgHeight = THREE.MathUtils.clamp(objHeight * mag, -1.25, 1.25);

    imgGroup.visible = true;
    imgGroup.position.x = clampedImgX;
    screenMesh.visible = imgCm > 0;

    // Position shaft + tip symmetrically above or below optical axis
    const shaftLen = Math.max(0.08, Math.abs(imgHeight) - 0.14);
    const sign = imgHeight >= 0 ? 1 : -1;
    imgShaft.scale.set(1, shaftLen, 1);
    imgShaft.position.y = axisY + sign * (shaftLen / 2);
    imgTip.position.y = axisY + imgHeight;
    imgTip.rotation.z = sign > 0 ? 0 : Math.PI;

    _p0.set(objX, tipY, 0);
    _p1.set(0, tipY, 0);
    _p2.set(clampedImgX, axisY + imgHeight, 0);
    positionRodBetween(ray1a, _p0, _p1, 1);
    positionRodBetween(ray1b, _p1, _p2, 1);
    positionRodBetween(ray2, _p0, _p2, 1);
  };

  return { group, onScenarioChange, update, reset };
}

/**
 * VI BOB: Geliotexnika va olamning yagona fizik manzarasi
 *  - bob6-solar: Dual-axis PV Solar Panel (silicon cell texture) + Sun orb + sunlight rays + power lamp
 *  - bob6-concentrator: Parabolic reflective solar dish converging incoming beams onto hot boiler receiver
 *  - bob6-cosmos: Glowing Sun + 4 Keplerian orbiting planets with Earth moon & Jupiter bands
 */
export function buildBob6Scene(
  mats: ChapterSceneMaterials,
  maxAniso: number,
  disposables: { dispose: () => void }[]
): ChapterSceneHandler {
  const group = new THREE.Group();

  // --- 1. Solar Photovoltaic Panel Group ---
  const solarGroup = new THREE.Group();
  const sPad = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.5, 0.3, 40), mats.darkAnodized);
  sPad.position.y = 0.15;
  sPad.receiveShadow = true;
  solarGroup.add(sPad);

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.75, 18), mats.chrome);
  mast.position.y = 1.05;
  solarGroup.add(mast);

  const solarTex = createSolarCellTexture(maxAniso);
  const panelPivot = new THREE.Group();
  panelPivot.position.set(0, 1.95, 0);

  const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.12, 2.05), mats.chrome);
  frameMesh.castShadow = true;
  panelPivot.add(frameMesh);

  const cellMat = new THREE.MeshStandardMaterial({
    map: solarTex,
    roughness: 0.18,
    metalness: 0.45,
  });
  const cellPlate = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.04, 1.88), cellMat);
  cellPlate.position.y = 0.06;
  panelPivot.add(cellPlate);
  solarGroup.add(panelPivot);

  // Sun orb & incoming rays
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
  const sunOrb = new THREE.Mesh(new THREE.SphereGeometry(0.45, 22, 18), sunMat);
  solarGroup.add(sunOrb);

  const sunRayMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.42,
  });
  const sunRayGeo = new THREE.CylinderGeometry(0.03, 0.03, 1, 8);
  const sunRays: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const r = new THREE.Mesh(sunRayGeo, sunRayMat);
    solarGroup.add(r);
    sunRays.push(r);
  }

  // Side Wattmeter Indicator Lamp
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.65, 18), mats.darkAnodized);
  lampBase.position.set(2.15, 0.62, 0.5);
  solarGroup.add(lampBase);
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xfbbf24,
    emissiveIntensity: 0.8,
  });
  const lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 18, 14), lampMat);
  lampBulb.position.set(2.15, 1.12, 0.5);
  solarGroup.add(lampBulb);
  group.add(solarGroup);

  // --- 2. Parabolic Solar Concentrator Group ---
  const concGroup = new THREE.Group();
  const cPad = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.3, 40), mats.darkAnodized);
  cPad.position.y = 0.15;
  concGroup.add(cPad);

  const dishPivot = new THREE.Group();
  dishPivot.position.set(0, 1.25, 0);
  // Parabolic profile y = 0.24 * r^2
  const dishPts: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const r = (i / 14) * 1.9;
    dishPts.push(new THREE.Vector2(r, 0.24 * r * r));
  }
  const dishGeo = new THREE.LatheGeometry(dishPts, 40);
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.94,
    roughness: 0.12,
    side: THREE.DoubleSide,
  });
  const dishMesh = new THREE.Mesh(dishGeo, dishMat);
  dishPivot.add(dishMesh);

  // Focal tripod + glowing copper boiler receiver at focal distance f = 1/(4*0.24) ≈ 1.04 (visual y = 1.45)
  const fReceiverY = 1.45;
  const fStrutGeo = new THREE.CylinderGeometry(0.03, 0.03, 1, 8);
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    const strut = new THREE.Mesh(fStrutGeo, mats.darkAnodized);
    _p0.set(Math.cos(a) * 1.75, 0.78, Math.sin(a) * 1.75);
    _p1.set(0, fReceiverY, 0);
    positionRodBetween(strut, _p0, _p1, 1);
    dishPivot.add(strut);
  }
  const receiverMat = new THREE.MeshStandardMaterial({
    color: 0x9a3412,
    emissive: 0xf97316,
    emissiveIntensity: 0.9,
    metalness: 0.55,
    roughness: 0.3,
  });
  const receiver = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 16), receiverMat);
  receiver.position.set(0, fReceiverY, 0);
  dishPivot.add(receiver);

  // Incoming + Reflected converging rays
  const concRayMat = new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.55 });
  const inRays: THREE.Mesh[] = [];
  const refRays: THREE.Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const ir = new THREE.Mesh(sunRayGeo, concRayMat);
    const rr = new THREE.Mesh(sunRayGeo, concRayMat);
    dishPivot.add(ir, rr);
    inRays.push(ir);
    refRays.push(rr);
  }
  concGroup.add(dishPivot);
  concGroup.visible = false;
  group.add(concGroup);

  // --- 3. Solar System & Gravitation Group ---
  const cosmosGroup = new THREE.Group();
  const cStage = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.4, 0.24, 48), mats.darkAnodized);
  cStage.position.y = 0.12;
  cosmosGroup.add(cStage);

  const sunCoreMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xf59e0b,
    emissiveIntensity: 1.6,
    roughness: 0.2,
  });
  const sunCore = new THREE.Mesh(new THREE.SphereGeometry(0.54, 28, 22), sunCoreMat);
  sunCore.position.y = 1.65;
  cosmosGroup.add(sunCore);

  const corona = new THREE.Mesh(
    new THREE.RingGeometry(0.64, 0.78, 36),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0.45 })
  );
  corona.rotation.x = Math.PI / 2;
  corona.position.y = 1.65;
  cosmosGroup.add(corona);

  const planetSpecs = [
    { r: 1.05, size: 0.12, color: 0x94a3b8, emissive: 0x334155 }, // Mercury
    { r: 1.65, size: 0.2, color: 0x0ea5e9, emissive: 0x0369a1 },  // Earth
    { r: 2.25, size: 0.16, color: 0xf97316, emissive: 0x9a3412 }, // Mars
    { r: 2.95, size: 0.3, color: 0xfbbf24, emissive: 0x92400e },  // Jupiter
  ];
  const orbitRingMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
  });
  const planetMeshes: THREE.Mesh[] = [];
  const planetAngles = [0.4, 2.1, 4.0, 5.2];

  planetSpecs.forEach((ps) => {
    const orbitGeo = new THREE.RingGeometry(ps.r - 0.015, ps.r + 0.015, 64);
    orbitGeo.rotateX(Math.PI / 2);
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitRingMat);
    orbitMesh.position.y = 1.65;
    cosmosGroup.add(orbitMesh);
    disposables.push(orbitGeo);

    const pGeo = new THREE.SphereGeometry(ps.size, 20, 16);
    const pMat = new THREE.MeshStandardMaterial({
      color: ps.color,
      emissive: ps.emissive,
      emissiveIntensity: 0.35,
      roughness: 0.35,
    });
    const pm = new THREE.Mesh(pGeo, pMat);
    cosmosGroup.add(pm);
    planetMeshes.push(pm);
    disposables.push(pGeo, pMat);
  });

  // Tiny Earth moon attached to Earth planet mesh
  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.065, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 })
  );
  planetMeshes[1].add(moonMesh);

  cosmosGroup.visible = false;
  group.add(cosmosGroup);

  disposables.push(
    sPad.geometry,
    mast.geometry,
    solarTex,
    frameMesh.geometry,
    cellMat,
    cellPlate.geometry,
    sunMat,
    sunOrb.geometry,
    sunRayMat,
    sunRayGeo,
    lampBase.geometry,
    lampMat,
    lampBulb.geometry,
    cPad.geometry,
    dishGeo,
    dishMat,
    fStrutGeo,
    receiverMat,
    receiver.geometry,
    concRayMat,
    cStage.geometry,
    sunCoreMat,
    sunCore.geometry,
    corona.geometry,
    corona.material as THREE.Material,
    orbitRingMat,
    moonMesh.geometry,
    moonMesh.material as THREE.Material
  );

  const reset = () => {
    planetAngles[0] = 0.4;
    planetAngles[1] = 2.1;
    planetAngles[2] = 4.0;
    planetAngles[3] = 5.2;
  };

  const onScenarioChange = (scenarioId: string) => {
    solarGroup.visible = scenarioId === 'bob6-solar';
    concGroup.visible = scenarioId === 'bob6-concentrator';
    cosmosGroup.visible = scenarioId === 'bob6-cosmos';
  };

  const update = (dt: number, elapsed: number, params: SimulationEngineParams) => {
    const { scenarioId, paramA, paramB, paused } = params;

    if (scenarioId === 'bob6-solar') {
      const sunElevRad = (paramA * Math.PI) / 180;
      const tiltRad = (paramB * Math.PI) / 180;
      panelPivot.rotation.z = -tiltRad;

      const sunR = 2.35;
      const sx = Math.cos(sunElevRad) * sunR;
      const sy = 1.95 + Math.sin(sunElevRad) * sunR;
      sunOrb.position.set(sx, sy, 0);

      // Update 4 solar rays striking panel corners
      const panelOffsets = [-0.9, -0.3, 0.3, 0.9];
      panelOffsets.forEach((off, idx) => {
        const px = Math.cos(tiltRad) * off;
        const py = 1.95 - Math.sin(tiltRad) * off;
        _p0.set(sx + off * 0.35, sy, (idx % 2 === 0 ? -0.45 : 0.45));
        _p1.set(px, py + 0.08, (idx % 2 === 0 ? -0.45 : 0.45));
        positionRodBetween(sunRays[idx], _p0, _p1, 1);
      });

      const cosTheta = Math.max(0, Math.cos(((paramB - (90 - paramA)) * Math.PI) / 180));
      lampMat.emissiveIntensity = 0.08 + cosTheta * 2.1;
      return;
    }

    if (scenarioId === 'bob6-concentrator') {
      const irrNorm = THREE.MathUtils.clamp((paramA - 200) / 1000, 0.1, 1);
      const focusNorm = paramB / 100;
      const spreadOffset = (1 - focusNorm) * 0.72;
      receiverMat.emissiveIntensity = 0.25 + irrNorm * focusNorm * 2.4;

      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI * 2) / 6 + 0.3;
        const rx = Math.cos(a) * 1.45;
        const rz = Math.sin(a) * 1.45;
        const ry = 0.24 * (1.45 * 1.45);
        _p0.set(rx, 3.35, rz);
        _p1.set(rx, ry, rz);
        _p2.set(Math.cos(a) * spreadOffset, fReceiverY, Math.sin(a) * spreadOffset);
        positionRodBetween(inRays[i], _p0, _p1, 0.85);
        positionRodBetween(refRays[i], _p1, _p2, 0.85);
      }
      return;
    }

    // bob6-cosmos
    const speedScale = paramA;
    const massScale = paramB;
    sunCore.scale.setScalar(0.85 + massScale * 0.18);
    sunCore.rotation.y += dt * 0.35;

    planetSpecs.forEach((ps, idx) => {
      if (!paused) {
        const omega = speedScale * Math.sqrt(massScale / Math.pow(ps.r, 3)) * 1.45;
        planetAngles[idx] += omega * dt;
      }
      const a = planetAngles[idx];
      planetMeshes[idx].position.set(Math.cos(a) * ps.r, 1.65, Math.sin(a) * ps.r);
      planetMeshes[idx].rotation.y += dt * 1.1;
    });

    moonMesh.position.set(Math.cos(elapsed * 2.6) * 0.36, 0.04, Math.sin(elapsed * 2.6) * 0.36);
  };

  return { group, onScenarioChange, update, reset };
}
