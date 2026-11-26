import { useState } from 'react';
import {
  CheckCircle2,
  Droplets,
  RotateCcw,
  Ruler,
  Target,
  XCircle,
} from 'lucide-react';
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

const RULER_MAX_CM = 10;

export default function MoleculeSizePractical() {
  const [dropped, setDropped] = useState(false);
  const [measuredDiameter, setMeasuredDiameter] = useState<number | null>(null);
  const [diameterInput, setDiameterInput] = useState('');
  const [diameterError, setDiameterError] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState('');
  const [answerStatus, setAnswerStatus] = useState<
    'idle' | 'correct' | 'wrong'
  >('idle');
  const [answerMessage, setAnswerMessage] = useState('');

  const measurement =
    measuredDiameter !== null
      ? estimateMoleculeSize(MOLECULE_SIZE_OIL_VOLUME_MM3, measuredDiameter)
      : null;

  const displayedDiameter =
    measuredDiameter ?? MOLECULE_SIZE_TARGET_FILM_DIAMETER_CM;
  const filmWidthPercent = (displayedDiameter / RULER_MAX_CM) * 100;

  const isSolved = answerStatus === 'correct';

  const handleDrop = () => {
    setDropped(true);
    setMeasuredDiameter(null);
    setDiameterInput('');
    setDiameterError(null);
    setAnswerInput('');
    setAnswerStatus('idle');
    setAnswerMessage('');
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
  };

  const steps = [
    { label: 'Tomchi tomizildi', done: dropped },
    { label: 'Diametr o‘lchandi', done: measuredDiameter !== null },
    { label: 'Yuza hisoblandi', done: measurement !== null },
    { label: 'Molekula o‘lchami topildi', done: isSolved },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4">
        <div className="fizlab-neo-well !p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="fizlab-neo-icon !w-8 !h-8">
                <Droplets size={15} aria-hidden="true" />
              </span>
              <div>
                <div className="text-[11px] font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                  Tajriba maydoni
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Suv yuzasidagi moy plyonkasi
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-600 dark:text-slate-400">
              V = 0,004 mm³
            </span>
          </div>

          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-gradient-to-br from-sky-100 via-sky-200 to-cyan-200 ring-1 ring-inset ring-white/60 dark:from-sky-900/60 dark:via-sky-950/60 dark:to-cyan-950/70 dark:ring-white/10">
              <div
                className="absolute inset-0 opacity-35"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 55%), radial-gradient(circle at 70% 65%, rgba(255,255,255,0.5), transparent 50%)',
                }}
                aria-hidden="true"
              />

              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/80 ring-2 ring-amber-400/70 shadow-[0_0_38px_rgba(251,191,36,0.55)] transition-all duration-1000 ease-out ${
                  dropped ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                style={{
                  width: `${filmWidthPercent}%`,
                  height: `${filmWidthPercent}%`,
                }}
                aria-hidden="true"
              />

              {measuredDiameter !== null && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="flex items-center gap-1"
                    style={{ width: `${filmWidthPercent}%` }}
                  >
                    <span className="h-px flex-1 bg-slate-900/60 dark:bg-white/70" />
                    <span className="rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-slate-900 shadow-sm dark:bg-slate-900/80 dark:text-white">
                      {formatFixed(measuredDiameter, 1)} cm
                    </span>
                    <span className="h-px flex-1 bg-slate-900/60 dark:bg-white/70" />
                  </div>
                </div>
              )}

              {!dropped && (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700 backdrop-blur-sm dark:bg-slate-900/60 dark:text-slate-200">
                    Tomchi tomizilmagan
                  </span>
                </div>
              )}
            </div>

            <div className="mt-2 rounded-xl bg-white/55 px-2 py-1.5 ring-1 ring-inset ring-slate-900/10 dark:bg-white/5 dark:ring-white/10">
              <div className="flex items-end justify-between">
                {Array.from({ length: RULER_MAX_CM + 1 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center gap-0.5">
                    <span
                      className={`w-px bg-slate-500/70 dark:bg-slate-300/60 ${
                        index % 5 === 0 ? 'h-3' : 'h-1.5'
                      }`}
                    />
                    <span className="text-[8px] font-mono-tabular text-slate-600 dark:text-slate-400">
                      {index}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-[9px] text-slate-500 dark:text-slate-400">
                <Ruler size={10} aria-hidden="true" />
                <span>Chizg‘ich, sm</span>
              </div>
            </div>
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
              Suyultirilgan moy tomchisi suv yuzasida bir molekula qalinlikdagi
              plyonka hosil qiladi.
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
                disabled={!dropped || measuredDiameter !== null}
                placeholder="masalan: 5,0"
                aria-label="Plyonka diametri, santimetr"
                className="w-full rounded-xl border border-slate-300/70 bg-white/80 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 disabled:opacity-50 dark:border-white/15 dark:bg-slate-900/50 dark:text-white"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                sm
              </span>
              <button
                type="button"
                onClick={handleCheckDiameter}
                disabled={!dropped || measuredDiameter !== null}
                className="fizlab-neo-btn shrink-0 !m-0 !px-3 !py-2 text-[11px] disabled:opacity-45"
              >
                Tekshirish
              </button>
            </div>
            {diameterError && (
              <p className="mt-2 flex items-start gap-1 text-[11px] text-rose-700 dark:text-rose-300">
                <XCircle size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
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
                disabled={measurement === null || isSolved}
                placeholder="masalan: 2,0"
                aria-label="Molekula diametri, nanometr"
                className="w-full rounded-xl border border-slate-300/70 bg-white/80 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 disabled:opacity-50 dark:border-white/15 dark:bg-slate-900/50 dark:text-white"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                nm
              </span>
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={measurement === null || isSolved}
                className="fizlab-neo-btn shrink-0 !m-0 !px-3 !py-2 text-[11px] disabled:opacity-45"
              >
                Tekshirish
              </button>
            </div>

            {answerStatus !== 'idle' && (
              <div
                className={`mt-2 flex items-start gap-1.5 rounded-xl px-3 py-2 text-[11px] ${
                  answerStatus === 'correct'
                    ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-500/10 text-rose-800 dark:text-rose-300'
                }`}
              >
                {answerStatus === 'correct' ? (
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                )}
                <span>{answerMessage}</span>
              </div>
            )}

            {isSolved && (
              <button
                type="button"
                onClick={handleReset}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-sky-800 ring-1 ring-inset ring-sky-500/40 transition hover:bg-sky-500/10 dark:text-sky-300"
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
          <Target size={14} className="text-sky-600 dark:text-sky-400" aria-hidden="true" />
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
