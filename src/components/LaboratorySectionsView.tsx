import { ArrowLeft, ChevronRight, Compass, FlaskConical } from 'lucide-react';
import {
  getLaboratorySubSectionById,
  LABORATORY_SUBSECTIONS,
  type LaboratorySubSectionId,
} from '../data/laboratorySectionsData';
import { PRACTICAL_LABS } from '../data/practicalLabsData';
import type { FizLabTheme } from '../types/fizlab';
import PracticalLabsView from './PracticalLabsView';

interface LaboratorySectionsViewProps {
  selectedSubSectionId: LaboratorySubSectionId | null;
  onSelectSubSectionId: (id: LaboratorySubSectionId | null) => void;
  onBackToSections: () => void;
  theme?: FizLabTheme;
}

export default function LaboratorySectionsView({
  selectedSubSectionId,
  onSelectSubSectionId,
  onBackToSections,
  theme = 'dark',
}: LaboratorySectionsViewProps) {
  const activeSubSection = getLaboratorySubSectionById(selectedSubSectionId);

  if (activeSubSection?.id === 'amaliy-mashgulotlar') {
    return (
      <PracticalLabsView
        onBack={() => onSelectSubSectionId(null)}
        theme={theme}
      />
    );
  }

  // Empty workspace for Laboratoriya mashg'ulotlari ready to build from scratch
  if (activeSubSection) {
    return (
      <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
        <div className="fizlab-neo-card gw-reveal">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="fizlab-neo-icon">
                <FlaskConical size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                  Laboratoriya · {activeSubSection.code}
                </div>
                <h2 className="fizlab-neo-heading text-base sm:text-lg leading-snug">
                  {activeSubSection.title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectSubSectionId(null)}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Orqaga</span>
            </button>
          </div>

          <div
            className="fizlab-neo-well min-h-[380px]"
            aria-label={activeSubSection.ariaLabel}
          />
        </div>
      </div>
    );
  }

  // Two-card split inside Laboratoriya: Amaliy mashg'ulotlar & Laboratoriya mashg'ulotlari
  return (
    <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
      <div className="flex items-center justify-between gap-3 px-1 gw-reveal">
        <div className="flex items-center gap-3 min-w-0">
          <span className="fizlab-neo-icon">
            <FlaskConical size={16} strokeWidth={2} aria-hidden="true" />
          </span>
          <h2 className="fizlab-neo-heading">Laboratoriya</h2>
        </div>

        <button
          type="button"
          onClick={onBackToSections}
          className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Orqaga</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LABORATORY_SUBSECTIONS.map((sub) => {
          const isPractical = sub.id === 'amaliy-mashgulotlar';
          const Icon = isPractical ? Compass : FlaskConical;
          return (
            <button
              key={sub.id}
              type="button"
              data-lab-subsection={sub.id}
              onClick={() => onSelectSubSectionId(sub.id)}
              className="group fizlab-neo-card gw-reveal cursor-pointer is-interactive text-left w-full flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="fizlab-neo-icon">
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-mono-tabular text-slate-600 dark:text-slate-400">
                      {sub.code} · Bo‘lim
                    </div>
                    <div className="fizlab-neo-heading text-sm sm:text-base leading-snug mt-0.5">
                      {sub.title}
                    </div>
                  </div>
                </div>

                <ChevronRight
                  size={16}
                  className="text-sky-600 dark:text-sky-400 opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 shrink-0 mt-1"
                  aria-hidden="true"
                />
              </div>

              {isPractical ? (
                <div className="fizlab-neo-well min-h-[160px] mt-auto flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    {PRACTICAL_LABS.map((lab) => (
                      <div
                        key={lab.id}
                        className="flex items-baseline gap-2 text-xs leading-snug text-slate-700 dark:text-slate-300"
                      >
                        <span className="font-mono-tabular font-semibold text-sky-700 dark:text-sky-300 shrink-0">
                          {lab.code}
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {lab.shortTitle}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                    9-sinf · {PRACTICAL_LABS.length} ta interaktiv mashg‘ulot
                  </div>
                </div>
              ) : (
                <div
                  className="fizlab-neo-well min-h-[160px] mt-auto"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
