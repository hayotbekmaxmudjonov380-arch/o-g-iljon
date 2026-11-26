import { useState } from 'react';
import {
  ArrowLeft,
  Atom,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  FlaskConical,
  Thermometer,
} from 'lucide-react';
import {
  getPracticalLabById,
  PRACTICAL_LABS,
  type PracticalLabId,
} from '../data/practicalLabsData';
import HeatEquilibriumPractical from './practicals/HeatEquilibriumPractical';
import MoleculeSizePractical from './practicals/MoleculeSizePractical';

interface PracticalLabsViewProps {
  onBack: () => void;
}

const PRACTICAL_ICONS: Record<PracticalLabId, typeof Atom> = {
  'molecule-size': Atom,
  'heat-equilibrium': Thermometer,
};

export default function PracticalLabsView({ onBack }: PracticalLabsViewProps) {
  const [selectedId, setSelectedId] = useState<PracticalLabId | null>(null);
  const activeLab = getPracticalLabById(selectedId);

  if (activeLab) {
    const ActiveIcon = PRACTICAL_ICONS[activeLab.id];

    return (
      <div className="w-full max-w-[920px] mx-auto my-auto py-2 space-y-4">
        <div className="fizlab-neo-card gw-reveal">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <span className="fizlab-neo-icon">
                <ActiveIcon size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                  Laboratoriya · 01 · {activeLab.code} · {activeLab.grade}-sinf
                </div>
                <h2 className="fizlab-neo-heading text-base sm:text-lg leading-snug">
                  {activeLab.title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Mashg‘ulotlar</span>
            </button>
          </div>

          <div className="fizlab-neo-well mt-4 !p-3">
            <div className="flex items-start gap-2 text-xs leading-snug text-slate-700 dark:text-slate-300">
              <ClipboardList
                size={14}
                className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400"
                aria-hidden="true"
              />
              <p>
                <span className="font-semibold text-slate-900 dark:text-white">
                  Ishning maqsadi:{' '}
                </span>
                {activeLab.goal}
              </p>
            </div>
          </div>
        </div>

        <div className="fizlab-neo-card gw-reveal">
          {activeLab.id === 'molecule-size' ? (
            <MoleculeSizePractical />
          ) : (
            <HeatEquilibriumPractical />
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="fizlab-neo-card gw-reveal">
            <div className="mb-2 flex items-center gap-2">
              <span className="fizlab-neo-icon !h-8 !w-8">
                <FlaskConical size={14} aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Nazariy eslatma
              </h3>
            </div>
            <div className="rounded-xl bg-sky-500/10 px-3 py-2 font-mono-tabular text-[12px] font-semibold text-sky-900 dark:text-sky-200">
              {activeLab.formula}
            </div>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
              {activeLab.theory.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-sky-500/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="fizlab-neo-card gw-reveal">
            <div className="mb-2 flex items-center gap-2">
              <span className="fizlab-neo-icon !h-8 !w-8">
                <Compass size={14} aria-hidden="true" />
              </span>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Jihozlar va bajarish tartibi
              </h3>
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {activeLab.equipment.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/60 px-2 py-0.5 text-[10px] text-slate-700 ring-1 ring-inset ring-slate-900/10 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
            <ol className="space-y-1 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
              {activeLab.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-content-center rounded-full bg-sky-500/15 font-mono-tabular text-[9px] font-semibold text-sky-700 dark:text-sky-300">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
      <div className="fizlab-neo-card gw-reveal">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="fizlab-neo-icon">
              <Compass size={16} strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                Laboratoriya · 01
              </div>
              <h2 className="fizlab-neo-heading text-base sm:text-lg leading-snug">
                Amaliy mashg‘ulotlar
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Orqaga</span>
          </button>
        </div>

        <div className="fizlab-neo-well">
          <p className="mb-3 text-xs leading-snug text-slate-600 dark:text-slate-400">
            9-sinf fizika darsligidagi amaliy mashg‘ulotlar asosida tuzilgan
            interaktiv topshiriqlar. Har bir ishni saytning o‘zida bajarib,
            natijani darhol tekshirish mumkin.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PRACTICAL_LABS.map((lab) => {
              const Icon = PRACTICAL_ICONS[lab.id];
              return (
                <button
                  key={lab.id}
                  type="button"
                  onClick={() => setSelectedId(lab.id)}
                  className="group flex w-full flex-col rounded-2xl bg-white/55 p-3 text-left ring-1 ring-inset ring-slate-900/10 transition hover:-translate-y-0.5 hover:bg-white/80 hover:ring-sky-500/40 dark:bg-white/5 dark:ring-white/10 dark:hover:bg-white/10"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="grid h-8 w-8 place-content-center rounded-full bg-gradient-to-br from-sky-400 to-sky-700 text-white">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <ChevronRight
                      size={16}
                      className="text-sky-600 opacity-70 transition-transform group-hover:translate-x-0.5 dark:text-sky-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-[10px] font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                    {lab.code} · {lab.grade}-sinf
                  </div>
                  <div className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">
                    {lab.shortTitle}
                  </div>
                  <p className="mt-1 line-clamp-3 text-[11px] leading-snug text-slate-600 dark:text-slate-400">
                    {lab.goal}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                    <CheckCircle2 size={12} aria-hidden="true" />
                    <span>Boshlash</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
