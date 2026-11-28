import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  RotateCcw,
  Snowflake,
  Thermometer,
  XCircle,
} from 'lucide-react';
import {
  computeHeatEquilibrium,
  formatFixed,
  formatKilojoules,
  HEAT_EQUILIBRIUM_TOLERANCE_C,
  isWithinTolerance,
  parseNumericInput,
  WATER_SPECIFIC_HEAT,
} from '../../utils/practicalPhysics';

interface BeakerPanelProps {
  variant: 'hot' | 'cold';
  mass: number;
  temperature: number;
  disabled: boolean;
  onMassChange: (value: number) => void;
  onTemperatureChange: (value: number) => void;
}

function waterFillPercent(massG: number): number {
  const clamped = Math.min(300, Math.max(50, massG));
  return 30 + ((clamped - 50) / 250) * 60;
}

function BeakerPanel({
  variant,
  mass,
  temperature,
  disabled,
  onMassChange,
  onTemperatureChange,
}: BeakerPanelProps) {
  const isHot = variant === 'hot';
  const Icon = isHot ? Flame : Snowflake;
  const fill = waterFillPercent(mass);

  return (
    <div className="fizlab-neo-well !p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`grid h-8 w-8 place-content-center rounded-full ${
              isHot
                ? 'bg-orange-500/15 text-orange-600 dark:text-orange-300'
                : 'bg-sky-500/15 text-sky-600 dark:text-sky-300'
            }`}
          >
            <Icon size={15} aria-hidden="true" />
          </span>
          <div>
            <div className="text-[11px] font-mono-tabular text-slate-500 dark:text-slate-400">
              {isHot ? 'Issiq suv' : 'Sovuq suv'}
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {mass} g · {temperature}°C
            </div>
          </div>
        </div>
        <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-mono-tabular text-slate-600 ring-1 ring-inset ring-slate-900/10 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10">
          m{isHot ? '₁' : '₂'}
        </span>
      </div>

      <div className="relative mx-auto h-36 w-full max-w-[150px]">
        <div className="absolute inset-0 overflow-hidden rounded-t-[10px] rounded-b-[26px] border-2 border-slate-300/80 bg-white/35 ring-1 ring-inset ring-white/60 dark:border-white/20 dark:bg-white/5 dark:ring-white/10">
          <div
            className={`absolute inset-x-0 bottom-0 transition-all duration-500 ease-out ${
              isHot
                ? 'bg-gradient-to-t from-orange-500/80 via-orange-400/70 to-amber-300/60'
                : 'bg-gradient-to-t from-sky-600/80 via-sky-500/70 to-cyan-300/60'
            }`}
            style={{ height: `${fill}%` }}
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-white/40" />
          </div>
          <div className="absolute inset-x-0 top-0 h-2 bg-white/50 dark:bg-white/10" />
        </div>
        <div className="absolute -right-1 top-1/2 h-1.5 w-3 -translate-y-1/2 rounded-full bg-slate-300 dark:bg-slate-600" />
      </div>

      <div className="mt-3 space-y-2.5">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <label
              htmlFor={`${variant}-mass`}
              className="font-medium text-slate-600 dark:text-slate-400"
            >
              Massa (m)
            </label>
            <span className="font-mono-tabular font-semibold text-slate-900 dark:text-white">
              {mass} g
            </span>
          </div>
          <input
            id={`${variant}-mass`}
            type="range"
            min={50}
            max={300}
            step={10}
            value={mass}
            disabled={disabled}
            onChange={(event) => onMassChange(Number(event.target.value))}
            className="fiz-slider w-full disabled:opacity-45"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <label
              htmlFor={`${variant}-temp`}
              className="font-medium text-slate-600 dark:text-slate-400"
            >
              Temperatura (t)
            </label>
            <span className="font-mono-tabular font-semibold text-slate-900 dark:text-white">
              {temperature}°C
            </span>
          </div>
          <input
            id={`${variant}-temp`}
            type="range"
            min={isHot ? 40 : 5}
            max={isHot ? 90 : 30}
            step={1}
            value={temperature}
            disabled={disabled}
            onChange={(event) =>
              onTemperatureChange(Number(event.target.value))
            }
            className="fiz-slider w-full disabled:opacity-45"
          />
        </div>
      </div>
    </div>
  );
}

export default function HeatEquilibriumPractical() {
  const [hotMass, setHotMass] = useState(200);
  const [hotTemp, setHotTemp] = useState(80);
  const [coldMass, setColdMass] = useState(300);
  const [coldTemp, setColdTemp] = useState(20);
  const [prediction, setPrediction] = useState('');
  const [mixed, setMixed] = useState(false);
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong';
    message: string;
  } | null>(null);

  const result = computeHeatEquilibrium({
    hotMassG: hotMass,
    hotTempC: hotTemp,
    coldMassG: coldMass,
    coldTempC: coldTemp,
  });

  const handleMix = () => {
    const value = parseNumericInput(prediction);
    if (value === null) {
      setFeedback({
        status: 'wrong',
        message:
          'Avval aralashmaning taxminiy temperaturasini son bilan kiriting.',
      });
      return;
    }

    setMixed(true);

    if (
      isWithinTolerance(
        value,
        result.equilibriumTempC,
        HEAT_EQUILIBRIUM_TOLERANCE_C
      )
    ) {
      setFeedback({
        status: 'correct',
        message: `To‘g‘ri! Aralashma ${formatFixed(result.equilibriumTempC, 1)}°C da issiqlik muvozanatiga keladi.`,
      });
    } else {
      setFeedback({
        status: 'wrong',
        message: `Taxminingiz aniq emas. To‘g‘ri javob: ${formatFixed(result.equilibriumTempC, 1)}°C. Formulani tekshiring: t = (m₁t₁ + m₂t₂)/(m₁ + m₂).`,
      });
    }
  };

  const handleReset = () => {
    setPrediction('');
    setMixed(false);
    setFeedback(null);
  };

  const thermometerPercent = Math.min(
    100,
    Math.max(0, (result.equilibriumTempC / 100) * 100)
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BeakerPanel
          variant="hot"
          mass={hotMass}
          temperature={hotTemp}
          disabled={mixed}
          onMassChange={setHotMass}
          onTemperatureChange={setHotTemp}
        />
        <BeakerPanel
          variant="cold"
          mass={coldMass}
          temperature={coldTemp}
          disabled={mixed}
          onMassChange={setColdMass}
          onTemperatureChange={setColdTemp}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="fizlab-neo-well !p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="fizlab-neo-icon !h-8 !w-8">
              <Thermometer size={15} aria-hidden="true" />
            </span>
            <div>
              <div className="text-[11px] font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                Tajriba
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                Aralashma temperaturasini bashorat qiling
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={prediction}
              onChange={(event) => setPrediction(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !mixed) {
                  handleMix();
                }
              }}
              disabled={mixed}
              placeholder="masalan: 44"
              aria-label="Aralashma temperaturasi, Selsiy"
              className="w-full rounded-xl border border-white/75 bg-white/60 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#00A2FF] focus:ring-2 focus:ring-[#00A2FF]/25 disabled:opacity-50 dark:border-white/15 dark:bg-white/[0.07] dark:text-white"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              °C
            </span>
            {!mixed ? (
              <button
                type="button"
                onClick={handleMix}
                className="fizlab-neo-btn shrink-0 !m-0 !px-3.5 !py-2 text-[11px]"
              >
                <ArrowRight size={13} aria-hidden="true" />
                <span>Aralashtirish</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="fizlab-quiz-secondary-btn shrink-0 !py-2 !px-3.5 !text-[11px]"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Qayta</span>
              </button>
            )}
          </div>

          <p className="mt-2 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
            Issiq va sovuq suv aralashtirilganda issiq suv bergan issiqlik
            sovuq suv olgan issiqlikka teng bo‘ladi: Q₁ = Q₂.
          </p>

          {feedback && (
            <div
              role="status"
              className={`mt-2 flex items-start gap-1.5 rounded-xl px-3 py-2 text-[11px] ${
                feedback.status === 'correct'
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-500/10 text-rose-800 dark:text-rose-300'
              }`}
            >
              {feedback.status === 'correct' ? (
                <CheckCircle2 size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              ) : (
                <XCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}
        </div>

        <div className="fizlab-neo-well !p-3">
          <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold text-slate-900 dark:text-white">
            <span>O‘lchov natijasi</span>
            {mixed && (
              <span className="font-mono-tabular text-[11px] font-medium text-sky-700 dark:text-sky-300">
                Jami massa: {result.totalMassG} g
              </span>
            )}
          </div>

          {!mixed ? (
            <div className="flex h-[132px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300/70 px-4 text-center text-[11px] text-slate-500 dark:border-white/15 dark:text-slate-400">
              <Thermometer size={22} className="mb-1.5 opacity-60" aria-hidden="true" />
              <span>
                Suvlarni aralashtirgandan so‘ng termometr ko‘rsatkichi shu yerda
                paydo bo‘ladi.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative h-32 w-6 shrink-0 overflow-hidden rounded-full bg-slate-200 ring-1 ring-inset ring-slate-900/10 dark:bg-slate-800 dark:ring-white/10">
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sky-500 via-amber-400 to-rose-500 transition-all duration-700"
                  style={{ height: `${thermometerPercent}%` }}
                />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Muvozanat temperaturasi
                  </div>
                  <div className="font-mono-tabular text-2xl font-bold text-slate-900 dark:text-white">
                    {formatFixed(result.equilibriumTempC, 1)}°C
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400">
                      <span>Issiq suv bergan (Q₁)</span>
                      <span className="font-mono-tabular font-semibold text-orange-700 dark:text-orange-300">
                        {formatKilojoules(result.heatGivenJ)}
                      </span>
                    </div>
                    <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800">
                      <div className="h-full w-full rounded-full bg-orange-500/80" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400">
                      <span>Sovuq suv olgan (Q₂)</span>
                      <span className="font-mono-tabular font-semibold text-sky-700 dark:text-sky-300">
                        {formatKilojoules(result.heatTakenJ)}
                      </span>
                    </div>
                    <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-800">
                      <div className="h-full w-full rounded-full bg-sky-500/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {mixed && (
        <div className="fizlab-neo-well !p-3">
          <div className="mb-2 text-xs font-semibold text-slate-900 dark:text-white">
            Yechim bosqichlari
          </div>
          <div className="space-y-1.5 font-mono-tabular text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
            <div>
              t = (m₁t₁ + m₂t₂) / (m₁ + m₂) = ({hotMass}·{hotTemp} + {coldMass}·
              {coldTemp}) / {result.totalMassG} ={' '}
              <span className="font-semibold text-sky-700 dark:text-sky-300">
                {formatFixed(result.equilibriumTempC, 1)}°C
              </span>
            </div>
            <div>
              Q₁ = c·m₁·(t₁ − t) = {WATER_SPECIFIC_HEAT}·{formatFixed(hotMass / 1000, 2)}·
              {formatFixed(result.hotDeltaC, 1)} ={' '}
              <span className="font-semibold text-orange-700 dark:text-orange-300">
                {formatKilojoules(result.heatGivenJ)}
              </span>
            </div>
            <div>
              Q₂ = c·m₂·(t − t₂) = {WATER_SPECIFIC_HEAT}·{formatFixed(coldMass / 1000, 2)}·
              {formatFixed(result.coldDeltaC, 1)} ={' '}
              <span className="font-semibold text-sky-700 dark:text-sky-300">
                {formatKilojoules(result.heatTakenJ)}
              </span>
            </div>
            <div className="pt-1 text-emerald-800 dark:text-emerald-300">
              Q₁ = Q₂ — issiqlik balansi bajarildi.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
