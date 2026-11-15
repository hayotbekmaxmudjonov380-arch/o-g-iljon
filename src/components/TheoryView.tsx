import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FlaskConical,
  Video,
} from 'lucide-react';
import { THEORY_TOPICS } from '../data/molecularPhysicsData';
import { LabExperimentId } from '../types/fizlab';

interface TheoryViewProps {
  onOpenLab: (labId: LabExperimentId) => void;
}

type TheorySubSection = 'all' | 'info' | 'video' | 'tests';

const SUB_SECTIONS: {
  id: Exclude<TheorySubSection, 'all'>;
  title: string;
  icon: typeof BookOpen;
}[] = [
  {
    id: 'info',
    title: 'Mavzu bo‘yicha nazariy ma’lumotlar',
    icon: BookOpen,
  },
  {
    id: 'video',
    title: 'Shu mavzuni video darsligi',
    icon: Video,
  },
  {
    id: 'tests',
    title: 'Shu mavzuga oid testlar',
    icon: ClipboardList,
  },
];

export default function TheoryView({ onOpenLab }: TheoryViewProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    THEORY_TOPICS[0].id
  );
  const [activeSubSection, setActiveSubSection] =
    useState<TheorySubSection>('all');

  const topic =
    THEORY_TOPICS.find((t) => t.id === selectedTopicId) ?? THEORY_TOPICS[0];

  const visibleSections =
    activeSubSection === 'all'
      ? SUB_SECTIONS
      : SUB_SECTIONS.filter((s) => s.id === activeSubSection);

  return (
    <div className="h-full overflow-y-auto px-4 py-5 md:px-8 md:py-7">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Section Heading */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-sky-700 dark:text-sky-300 mb-1.5">
              Nazariy qism · Molekulyar fizika
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
              {topic.title}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => onOpenLab(topic.relatedLab)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <FlaskConical className="w-4 h-4" />
            <span>3D laboratoriyada ko‘rish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </header>

        {/* Topic Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {THEORY_TOPICS.map((item, idx) => {
            const active = item.id === topic.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedTopicId(item.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'glass-panel border-sky-600/55 dark:border-sky-400/55 text-slate-950 dark:text-white'
                    : 'bg-white/55 hover:bg-white/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-[11px] font-mono-tabular text-sky-700 dark:text-sky-300 mb-1">
                  0{idx + 1}-mavzu
                </div>
                <div className="text-sm font-semibold leading-snug line-clamp-2">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sub-section Filter Tabs */}
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-panel-subtle">
          <button
            type="button"
            onClick={() => setActiveSubSection('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeSubSection === 'all'
                ? 'bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06]'
            }`}
          >
            Barcha bo‘limlar
          </button>
          {SUB_SECTIONS.map((sec) => {
            const active = activeSubSection === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSubSection(sec.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06]'
                }`}
              >
                {sec.title}
              </button>
            );
          })}
        </div>

        {/* Empty Glassmorphic Section Containers */}
        <div className="space-y-5">
          {visibleSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <section
                key={`${topic.id}-${sec.id}`}
                aria-label={sec.title}
                className="glass-panel rounded-3xl p-6 md:p-7"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-slate-900/10 dark:border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-sky-600/15 dark:bg-sky-500/20 border border-sky-600/25 dark:border-sky-400/30 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                    {sec.title}
                  </h2>
                </div>

                {/* Intentionally empty content container */}
                <div
                  className={`${
                    activeSubSection === 'all' ? 'min-h-[180px]' : 'min-h-[340px]'
                  } mt-5 rounded-2xl border border-dashed border-slate-900/12 dark:border-white/12 bg-slate-900/[0.02] dark:bg-white/[0.02]`}
                />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
