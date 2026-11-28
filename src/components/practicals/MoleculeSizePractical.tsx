import { useEffect, useRef, useState } from 'react';
import {
  Atom,
  CheckCircle2,
  Droplets,
  Eye,
  RotateCcw,
  Ruler,
  Target,
  XCircle,
} from 'lucide-react';
import {
  MoleculeFilmSceneEngine,
  type MoleculeCameraPreset,
} from '../../three/practicals/MoleculeFilmSceneEngine';
import type { FizLabTheme } from '../../types/fizlab';
import {
  estimateMoleculeSize,
  formatFixed,
  isWithinTolerance,
  MOLECULE_SIZE_DIAMETER_TOLERANCE_NM,
  MOLECULE_SIZE_FILM_TOLERANCE_CM,
  MOLECULE_SIZE_OIL_VOLUME_MM3,
  MOLECULE_SIZE_TARGET_DIAMETER_NM,
  MOLECULE_SIZE_TARGET_FILM_DIAMETER_CM,
  parseNumericInput,
} from '../../utils/practicalPhysics';

interface MoleculeSizePracticalProps {
  theme?: FizLabTheme;
}

const CAMERA_PRESETS: { id: MoleculeCameraPreset; label: string }[] = [
  { id: 'overview', label: 'Umumiy' },
  { id: 'top', label: 'Yuqoridan' },
  { id: 'closeup', label: 'Yaqin' },
];

export default function MoleculeSizePractical({
  theme = 'dark',
}: MoleculeSizePracticalProps) {
  const [dropped, setDropped] = useState(false);
  const [measuredDiameter, setMeasuredDiameter] = useState<number | null>(null);
  const [diameterInput, setDiameterInput] = useState('');
  const [diameterError, setDiameterError] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState('');
  const [answerStatus, setAnswerStatus] = useState<
    'idle' | 'correct' | 'wrong'
  >('idle');
  const [answerMessage, setAnswerMessage] = useState('');

  const [camPreset, setCamPreset] = useState<MoleculeCameraPreset>('overview');
  const [showMolecules, setShowMolecules] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<MoleculeFilmSceneEngine | null>(null);

  const measurement =
    measuredDiameter !== null
      ? estimateMoleculeSize(MOLECULE_SIZE_OIL_VOLUME_MM3, measuredDiameter)
      : null;

  const isSolved = answerStatus === 'correct';

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const engine = new MoleculeFilmSceneEngine(
      container,
      {
        dropped: false,
        measuredDiameterCm: null,
        targetFilmDiameterCm: MOLECULE_SIZE_TARGET_FILM_DIAMETER_CM,
        showMolecules: false,
      },
      theme
    );
    engineRef.current = engine;

    const canvas = container.querySelector('canvas');
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const handleContextRestored = () => {
      setContextLost(false);
    };

    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener(
          'webglcontextrestored',
          handleContextRestored
        );
      }
      engine.dispose();
      engineRef.current = null;
    };
    // Mount WebGL canvas once per view lifecycle; state & theme sync below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.updateState({
      dropped,
      measuredDiameterCm: measuredDiameter,
      targetFilmDiameterCm: MOLECULE_SIZE_TARGET_FILM_DIAMETER_CM,
      showMolecules,
    });
  }, [dropped, measuredDiameter, showMolecules]);

  useEffect(() => {
    engineRef.current?.setTheme(theme);
  }, [theme]);

  const handleCameraPreset = (preset: MoleculeCameraPreset) => {
    setCamPreset(preset);
    engineRef.current?.setCameraPreset(preset);
  };

  const handleDrop = () => {
    setDropped(true);
    setMeasuredDiameter(null);
    setDiameterInput('');
    setDiameterError(null);
    setAnswerInput('');
    setAnswerStatus('idle');
    setAnswerMessage('');
    engineRef.current?.replayDrop();
  };

  const handleCheckDiameter = () => {
    const value = parseNumericInput(diameterInput);
    if (value === null) {
      setDiameterError('Iltimos, diametrni son bilan kiriting (masalan: 5,0).');
      return;
    }

    if (
      !isWithinTolerance(
        value,
        MOLECULE_SIZE_TARGET_FILM_DIAMETER_CM,
        MOLECULE_SIZE_FILM_TOLERANCE_CM
      )
    ) {
      setDiameterError(
        'O‘lchov aniq emas. Plyonka chetlarini chizg‘ich bilan qayta tekislab o‘lchang.'
      );
      return;
    }

    setMeasuredDiameter(value);
    setDiameterError(null);
  };

  const handleCheckAnswer = () => {
    const value = parseNumericInput(answerInput);
    if (value === null) {
      setAnswerStatus('wrong');
      setAnswerMessage('Molekula diametrini nanometrda son bilan kiriting.');
      return;
    }

    if (
      isWithinTolerance(
        value,
        MOLECULE_SIZE_TARGET_DIAMETER_NM,
        MOLECULE_SIZE_DIAMETER_TOLERANCE_NM
      )
    ) {
      setAnswerStatus('correct');
      setAnswerMessage(
        `To‘g‘ri! d ≈ ${formatFixed(value, 2)} nm — bu molekulaning 10⁻⁹ m tartibidagi o‘lchami.`
      );
    } else {
      setAnswerStatus('wrong');
      setAnswerMessage(
        'Natija kutilgan oraliqda emas. d = V / S formulasini va birliklarni tekshiring: 0,004 mm³ = 4·10⁻¹² m³.'
      );
    }
  };

  const handleReset = () => {
    setDropped(false);
    setMeasuredDiameter(null);
    setDiameterInput('');
    setDiameterError(null);
    setAnswerInput('');
    setAnswerStatus('idle');
    setAnswerMessage('');
    setShowMolecules(false);
    setCamPreset('overview');
    engineRef.current?.setCameraPreset('overview');
  };

  const steps = [
    { label: 'Tomchi tomizildi', done: dropped },
    { label: 'Diametr o‘lchandi', done: measuredDiameter !== null },
    { label: 'Yuza hisoblandi', done: measurement !== null },
    { label: 'Molekula o‘lchami topildi', done: isSolved },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)] gap-4 items-start">
        <div className="fizlab-neo-well !p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="fizlab-neo-icon !w-8 !h-8">
                <Droplets size={15} aria-hidden="true" />
              </span>
              <div>
                <div className="text-[11px] font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                  3D Tajriba stendi
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Suv yuzasidagi moy plyonkasi
                </div>
              </div>
            </div>
            <span className="font-mono-tabular text-[11px] font-semibold text-sky-800 dark:text-sky-200">
              V = 0,004 mm³
            </span>
          </div>

          {/* Camera presets & monolayer toggle cleanly docked above the 3D stage */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {CAMERA_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  aria-pressed={camPreset === preset.id}
                  onClick={() => handleCameraPreset(preset.id)}
                  className="fizlab-sim-ctrl"
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-pressed={showMolecules}
              onClick={() => setShowMolecules((prev) => !prev)}
              title="Bir qatlamli molekulyar tuzilmani ko‘rsatish"
              className="fizlab-sim-ctrl"
            >
              <Atom size={12} aria-hidden="true" />
              <span>Molekulalar</span>
            </button>
          </div>

          {/* Interactive 3D Three.js Stage (no backdrop-blur over WebGL canvas) */}
          <div className="relative w-full h-[330px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/55 dark:border-white/14 bg-[#DCEBF5] dark:bg-[#050A1C]">
            <div
              ref={mountRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              aria-label="Suv yuzasidagi moy plyonkasi — 3D laboratoriya tajribasi"
            />

            {contextLost && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#DCEBF5]/95 dark:bg-[#050A1C]/95 p-5 text-center">
                <div className="glass-hud rounded-xl p-4 max-w-xs space-y-1">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    3D sahna tiklanmoqda
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    WebGL konteksti qayta ishga tushmoqda.
                  </p>
                </div>
              </div>
            )}

            {/* Top-left live stage status (no backdrop-blur) */}
            <div className="pointer-events-none absolute top-2.5 left-2.5 z-10 max-w-[260px]">
              <div className="glass-hud rounded-xl px-2.5 py-1.5 text-[11px] leading-snug">
                {!dropped ? (
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    Tomchi tomizilmagan
                  </span>
                ) : measuredDiameter !== null ? (
                  <span className="font-mono-tabular font-semibold text-emerald-700 dark:text-emerald-300">
                    D = {formatFixed(measuredDiameter, 1)} sm tasdiqlandi
                  </span>
                ) : (
                  <span className="font-medium text-sky-800 dark:text-sky-200">
                    Chizg‘ich bo‘ylab plyonka diametrini o‘qing
                  </span>
                )}
              </div>
            </div>

            {/* Bottom-left orbit controls hint */}
            <div className="pointer-events-none hidden sm:block absolute bottom-2.5 left-2.5 z-10">
              <div className="glass-hud rounded-xl px-2.5 py-1 text-[10px] text-slate-700 dark:text-slate-300">
                Sichqoncha: aylantirish · g‘ildirak: yaqinlashtirish
              </div>
            </div>

            {/* Bottom-right ruler quick focus helper */}
            {dropped && camPreset !== 'top' && (
              <div className="absolute bottom-2.5 right-2.5 z-10">
                <button
                  type="button"
                  onClick={() => handleCameraPreset('top')}
                  className="fizlab-sim-ctrl"
                >
                  <Ruler size={12} aria-hidden="true" />
                  <span>Chizg‘ichga qarash</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Eye size={12} className="text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>
                3D vannada talk kukuni va 0–10 sm chizg‘ich yordamida plyonka chetlarini kuzating
              </span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="fizlab-neo-well !p-3">
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
              1-qadam. Tomchini tomizing
            </div>
            <button
              type="button"
              onClick={handleDrop}
              className="fizlab-neo-btn w-full !m-0 !py-2.5 text-xs"
            >
              <Droplets size={14} aria-hidden="true" />
              <span>{dropped ? 'Qayta tomizish' : 'Tomchini tomizish'}</span>
            </button>
            <p className="mt-2 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
              Pipetkadan tushgan moy tomchisi suv yuzasida talk kukunini chetga
              surib, bir molekula qalinlikdagi plyonka hosil qiladi.
            </p>
          </div>

          <div className="fizlab-neo-well !p-3">
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
              2-qadam. Plyonka diametrini o‘lchang
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={diameterInput}
                onChange={(event) => setDiameterInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    dropped &&
                    measuredDiameter === null
                  ) {
                    handleCheckDiameter();
                  }
                }}
                disabled={!dropped || measuredDiameter !== null}
                placeholder="masalan: 5,0"
                aria-label="Plyonka diametri, santimetr"
                className="w-full rounded-xl border border-white/75 bg-white/60 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#00A2FF] focus:ring-2 focus:ring-[#00A2FF]/25 disabled:opacity-50 dark:border-white/15 dark:bg-white/[0.07] dark:text-white"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                sm
              </span>
              <button
                type="button"
                onClick={handleCheckDiameter}
                disabled={!dropped || measuredDiameter !== null}
                className="fizlab-neo-btn shrink-0 !m-0 !px-3.5 !py-2 text-[11px] disabled:opacity-45"
              >
                Tekshirish
              </button>
            </div>
            {diameterError && (
              <p
                role="status"
                className="mt-2 flex items-start gap-1 text-[11px] text-rose-700 dark:text-rose-300"
              >
                <XCircle
                  size={13}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{diameterError}</span>
              </p>
            )}
            {measuredDiameter !== null && measurement && (
              <div className="mt-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-[11px] text-emerald-800 dark:text-emerald-300">
                <div className="flex items-center gap-1 font-semibold">
                  <CheckCircle2 size={13} aria-hidden="true" />
                  <span>O‘lchov qabul qilindi</span>
                </div>
                <div className="mt-1 font-mono-tabular">
                  S = π·(D/2)² = {formatFixed(measurement.areaCm2, 2)} sm² ={' '}
                  {measurement.areaM2.toExponential(2).replace('.', ',')} m²
                </div>
              </div>
            )}
          </div>

          <div className="fizlab-neo-well !p-3">
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
              3-qadam. Molekula diametrini hisoblang
            </div>
            <p className="mb-2 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
              d = V / S, bunda V = 0,004 mm³ = 4·10⁻¹² m³. Natijani nanometrda
              kiriting (1 nm = 10⁻⁹ m).
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={answerInput}
                onChange={(event) => setAnswerInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' &&
                    measurement !== null &&
                    !isSolved
                  ) {
                    handleCheckAnswer();
                  }
                }}
                disabled={measurement === null || isSolved}
                placeholder="masalan: 2,0"
                aria-label="Molekula diametri, nanometr"
                className="w-full rounded-xl border border-white/75 bg-white/60 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#00A2FF] focus:ring-2 focus:ring-[#00A2FF]/25 disabled:opacity-50 dark:border-white/15 dark:bg-white/[0.07] dark:text-white"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                nm
              </span>
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={measurement === null || isSolved}
                className="fizlab-neo-btn shrink-0 !m-0 !px-3.5 !py-2 text-[11px] disabled:opacity-45"
              >
                Tekshirish
              </button>
            </div>

            {answerStatus !== 'idle' && (
              <div
                role="status"
                className={`mt-2 flex items-start gap-1.5 rounded-xl px-3 py-2 text-[11px] ${
                  answerStatus === 'correct'
                    ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-500/10 text-rose-800 dark:text-rose-300'
                }`}
              >
                {answerStatus === 'correct' ? (
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <XCircle
                    size={14}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                )}
                <span>{answerMessage}</span>
              </div>
            )}

            {isSolved && (
              <button
                type="button"
                onClick={handleReset}
                className="fizlab-quiz-secondary-btn mt-2 !py-1.5 !px-3.5 !text-[11px]"
              >
                <RotateCcw size={12} aria-hidden="true" />
                <span>Qayta bajarish</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="fizlab-neo-well !p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
          <Target
            size={14}
            className="text-sky-600 dark:text-sky-400"
            aria-hidden="true"
          />
          <span>Bajarish bosqichlari</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className={`rounded-xl px-2.5 py-2 text-[11px] ring-1 ring-inset ${
                step.done
                  ? 'bg-emerald-500/10 text-emerald-800 ring-emerald-500/30 dark:text-emerald-300'
                  : 'bg-white/40 text-slate-600 ring-slate-900/10 dark:bg-white/5 dark:text-slate-400 dark:ring-white/10'
              }`}
            >
              <div className="font-mono-tabular opacity-70">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="font-semibold leading-snug">{step.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
