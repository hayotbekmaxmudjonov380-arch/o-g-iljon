import { ArrowLeft, ChevronRight, Compass, FlaskConical } from 'lucide-react';
import {
  getLaboratorySubSectionById,
  LABORATORY_SUBSECTIONS,
  type LaboratorySubSectionId,
} from '../data/laboratorySectionsData';

interface LaboratorySectionsViewProps {
  selectedSubSectionId: LaboratorySubSectionId | null;
  onSelectSubSectionId: (id: LaboratorySubSectionId | null) => void;
  onBackToSections: () => void;
}

export default function LaboratorySectionsView({
  selectedSubSectionId,
  onSelectSubSectionId,
  onBackToSections,
}: LaboratorySectionsViewProps) {
  const activeSubSection = getLaboratorySubSectionById(selectedSubSectionId);

  // Sub-section empty workspace ready for building from scratch
  if (activeSubSection) {
    const ActiveIcon =
      activeSubSection.id === 'amaliy-mashgulotlar' ? Compass : FlaskConical;

    return (
      <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
        <div className="fizlab-neo-card gw-reveal">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="fizlab-neo-icon">
                <ActiveIcon size={16} strokeWidth={2} aria-hidden="true" />
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
          const Icon =
            sub.id === 'amaliy-mashgulotlar' ? Compass : FlaskConical;
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

              <div
                className="fizlab-neo-well min-h-[160px] mt-auto"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
