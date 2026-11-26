import * as THREE from 'three';
import type { SimulationEngineParams } from '../../utils/simulationPhysics';

export type ChapterCameraPreset = 'overview' | 'closeup' | 'top';

export interface ChapterSceneMaterials {
  darkAnodized: THREE.MeshStandardMaterial;
  chrome: THREE.MeshStandardMaterial;
  brass: THREE.MeshStandardMaterial;
  copper: THREE.MeshStandardMaterial;
  glass: THREE.MeshPhysicalMaterial;
  rubber: THREE.MeshStandardMaterial;
  ceramic: THREE.MeshStandardMaterial;
}

export interface ChapterSceneHandler {
  group: THREE.Group;
  onScenarioChange: (scenarioId: string) => void;
  update: (dt: number, elapsed: number, params: SimulationEngineParams) => void;
  reset: (params: SimulationEngineParams) => void;
}

const _dirVec = new THREE.Vector3();
const _midVec = new THREE.Vector3();
const _upAxis = new THREE.Vector3(0, 1, 0);

/**
 * Aligns a Y-unit cylinder (height = 1) cleanly between world-local points p1 and p2
 * without creating temporary allocations.
 */
export function positionRodBetween(
  mesh: THREE.Object3D,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  radialScale = 1
) {
  _dirVec.subVectors(p2, p1);
  const len = _dirVec.length();
  if (len < 0.0001) {
    mesh.visible = false;
    return;
  }
  mesh.visible = true;
  _midVec.addVectors(p1, p2).multiplyScalar(0.5);
  mesh.position.copy(_midVec);
  _dirVec.divideScalar(len);
  mesh.quaternion.setFromUnitVectors(_upAxis, _dirVec);
  mesh.scale.set(radialScale, len, radialScale);
}

/**
 * Creates a circular protractor/goniometer dial face CanvasTexture for optics & solar mounts.
 */
export function createProtractorTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0c1526';
  ctx.beginPath();
  ctx.arc(256, 256, 252, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 232, 0, Math.PI * 2);
  ctx.stroke();

  // Crosshair axes (normal + surface tangent)
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(256, 24);
  ctx.lineTo(256, 488);
  ctx.moveTo(24, 256);
  ctx.lineTo(488, 256);
  ctx.stroke();

  // Degree ticks every 5 degrees
  for (let deg = 0; deg < 360; deg += 5) {
    const rad = (deg * Math.PI) / 180;
    const isMajor = deg % 30 === 0;
    const isMed = deg % 10 === 0;
    const rOut = 232;
    const rIn = isMajor ? 202 : isMed ? 214 : 222;
    ctx.strokeStyle = isMajor ? '#e2e8f0' : 'rgba(148, 163, 184, 0.5)';
    ctx.lineWidth = isMajor ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(rad) * rIn, 256 + Math.sin(rad) * rIn);
    ctx.lineTo(256 + Math.cos(rad) * rOut, 256 + Math.sin(rad) * rOut);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.max(1, maxAnisotropy);
  return tex;
}

/**
 * Creates a silicon photovoltaic solar cell grid texture.
 */
export function createSolarCellTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#0b2247');
  grad.addColorStop(1, '#102e63');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Silicon cell grid
  const cols = 6;
  const rows = 4;
  const cw = 512 / cols;
  const ch = 512 / rows;

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath();
    ctx.moveTo(c * cw, 0);
    ctx.lineTo(c * cw, 512);
    ctx.stroke();
  }
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * ch);
    ctx.lineTo(512, r * ch);
    ctx.stroke();
  }

  // Fine silver busbars inside each cell
  ctx.strokeStyle = 'rgba(226, 232, 240, 0.35)';
  ctx.lineWidth = 1.5;
  for (let c = 0; c < cols; c++) {
    const bx = c * cw + cw * 0.33;
    const bx2 = c * cw + cw * 0.66;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx, 512);
    ctx.moveTo(bx2, 0);
    ctx.lineTo(bx2, 512);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.max(1, maxAnisotropy);
  return tex;
}
