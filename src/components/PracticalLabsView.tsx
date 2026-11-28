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
import type { FizLabTheme } from '../types/fizlab';
import HeatEquilibriumPractical from './practicals/HeatEquilibriumPractical';
import MoleculeSizePractical from './practicals/MoleculeSizePractical';

interface PracticalLabsViewProps {
  onBack: () => void;
  theme?: FizLabTheme;
}

const PRACTICAL_ICONS: Record<PracticalLabId, typeof Atom> = {
  'molecule-size': Atom,
  'heat-equilibrium': Thermometer,
};

export default function PracticalLabsView({
  onBack,
  theme = 'dark',
}: PracticalLabsViewProps) {
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

        <div className="fizlab-neo-card fizlab-quiz-scope gw-reveal">
          {activeLab.id === 'molecule-size' ? (
            <MoleculeSizePractical theme={theme} />
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
            <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {activeLab.theory.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-2.5 border-t border-slate-900/10 dark:border-white/10 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-sky-800 dark:text-sky-300">
                Xulosa:{' '}
              </span>
              {activeLab.conclusion}
            </div>
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
            <div className="mb-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                Kerakli jihozlar:{' '}
              </span>
              {activeLab.equipment.join(' · ')}
            </div>
            <ol className="space-y-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {activeLab.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-content-center rounded-full bg-sky-500/15 font-mono-tabular text-[10px] font-semibold text-sky-700 dark:text-sky-300">
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

        <p className="mb-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          9-sinf fizika darsligidagi amaliy mashg‘ulotlar asosida tuzilgan
          interaktiv topshiriqlar. Har bir ishni saytning o‘zida bajarib,
          natijani darhol tekshirish mumkin.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PRACTICAL_LABS.map((lab) => {
            const Icon = PRACTICAL_ICONS[lab.id];
            return (
              <button
                key={lab.id}
                type="button"
                data-practical-lab={lab.id}
                onClick={() => setSelectedId(lab.id)}
                className="group fizlab-neo-card is-interactive !p-4 text-left w-full flex flex-col cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="fizlab-neo-icon">
                      <Icon size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                        {lab.code} · {lab.grade}-sinf
                      </div>
                      <div className="fizlab-neo-heading text-sm sm:text-base leading-snug mt-0.5">
                        {lab.shortTitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-sky-600 dark:text-sky-400 opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                </div>

                <div className="fizlab-neo-well !p-3 mt-auto flex flex-col justify-between gap-2.5">
                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {lab.goal}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-300">
                    <CheckCircle2 size={13} aria-hidden="true" />
                    <span>Mashg‘ulotni boshlash</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
