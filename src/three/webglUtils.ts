import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function createLabRenderer(
  container: HTMLElement,
  isSoftwareGl: boolean
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: !isSoftwareGl,
    powerPreference: 'high-performance',
    alpha: false,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setPixelRatio(
    isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
  );
  renderer.setSize(
    Math.max(1, container.clientWidth),
    Math.max(1, container.clientHeight)
  );
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

export function setupStudioEnvironment(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
): THREE.Texture {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envTex = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmremGenerator.dispose();
  return envTex;
}

export function scheduleAfterDraw(
  renderer: THREE.WebGLRenderer,
  cb: () => void,
  registerTimer: (id: number) => void
) {
  const gl = renderer.getContext() as WebGL2RenderingContext | null;
  if (!gl || typeof gl.fenceSync !== 'function') {
    const id = window.setTimeout(cb, 80);
    registerTimer(id);
    return;
  }
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
  gl.flush();
  const poll = () => {
    const status = sync ? gl.getSyncParameter(sync, gl.SYNC_STATUS) : gl.SIGNALED;
    if (status === gl.UNSIGNALED) {
      const id = window.setTimeout(poll, 5);
      registerTimer(id);
    } else {
      if (sync) gl.deleteSync(sync);
      const id = window.setTimeout(cb, 80);
      registerTimer(id);
    }
  };
  const id = window.setTimeout(poll, 5);
  registerTimer(id);
}

export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 124);
  grad.addColorStop(0, 'rgba(2, 6, 23, 0.72)');
  grad.addColorStop(0.55, 'rgba(2, 6, 23, 0.32)');
  grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createBrushedMetalTexture(
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#8b95a5';
  ctx.fillRect(0, 0, 256, 256);
  for (let y = 0; y < 256; y++) {
    const shade = 128 + Math.floor((Math.sin(y * 0.7) * 0.5 + Math.random() * 0.5) * 32);
    ctx.fillStyle = `rgb(${shade}, ${shade + 4}, ${shade + 10})`;
    ctx.fillRect(0, y, 256, 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.anisotropy = Math.max(1, maxAnisotropy);
  return texture;
}

export function createDialFaceTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0c1322';
  ctx.beginPath();
  ctx.arc(256, 256, 252, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(256, 256, 236, 0, Math.PI * 2);
  ctx.stroke();

  // Ticks around 240 deg arc
  const startAngle = Math.PI * 0.75;
  const totalSweep = Math.PI * 1.5;
  for (let i = 0; i <= 30; i++) {
    const frac = i / 30;
    const angle = startAngle + frac * totalSweep;
    const isMajor = i % 5 === 0;
    const rOuter = 216;
    const rInner = isMajor ? 184 : 200;
    ctx.strokeStyle = frac > 0.75 ? '#f59e0b' : isMajor ? '#e2e8f0' : '#64748b';
    ctx.lineWidth = isMajor ? 5 : 2;
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(angle) * rInner, 256 + Math.sin(angle) * rInner);
    ctx.lineTo(256 + Math.cos(angle) * rOuter, 256 + Math.sin(angle) * rOuter);
    ctx.stroke();
  }

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 28px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('kPa', 256, 336);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 22px sans-serif';
  ctx.fillText('BOSIM', 256, 165);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.max(1, maxAnisotropy);
  return texture;
}
