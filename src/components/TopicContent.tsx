import { BookMarked, HelpCircle, Info, KeyRound } from 'lucide-react';
import type { TheoryBlock } from '../data/grade7TheoryContent';
import { buildTheoryLayout, type FigureBlock } from '../utils/theoryLayout';

interface TopicContentProps {
  blocks: TheoryBlock[];
}

function getAsideWidthClass(size: FigureBlock['size']): string {
  switch (size) {
    case 'compact':
      return 'md:w-[205px] lg:w-[220px]';
    case 'wide':
      return 'md:w-[270px] lg:w-[300px]';
    case 'normal':
    default:
      return 'md:w-[240px] lg:w-[260px]';
  }
}

function renderFigureCard(
  block: FigureBlock,
  key: string | number,
  mode: 'aside' | 'standalone'
) {
  const isAside = mode === 'aside';
  const imgMaxHeightClass =
    block.size === 'compact'
      ? 'max-h-[360px]'
      : isAside
        ? 'max-h-[320px]'
        : 'max-h-[360px]';

  return (
    <figure
      key={key}
      className={
        isAside
          ? `w-full ${getAsideWidthClass(block.size)} rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/95 dark:bg-slate-900/75 p-2.5 flex flex-col items-center gap-2 shadow-sm`
          : 'my-2 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white/95 dark:bg-slate-900/60 p-3 sm:p-4 flex flex-col items-center gap-2.5'
      }
    >
      <div
        className={
          isAside
            ? 'w-full rounded-xl bg-white p-1.5 flex items-center justify-center'
            : 'rounded-xl bg-white p-2 sm:p-3 max-w-full flex items-center justify-center'
        }
      >
        <img
          src={block.src}
          alt={block.caption}
          className={`${imgMaxHeightClass} w-auto max-w-full object-contain rounded-lg`}
        />
      </div>
      <figcaption className="text-xs leading-snug font-medium text-slate-600 dark:text-slate-300 text-center px-1">
        {block.caption}
      </figcaption>
    </figure>
  );
}

function renderTheoryBlock(block: TheoryBlock, key: number) {
  switch (block.type) {
    case 'sectionTitle':
      return (
        <h3
          key={key}
          className="font-display text-base sm:text-[17px] font-bold text-sky-700 dark:text-sky-300 pt-2 first:pt-0 border-b border-sky-900/10 dark:border-sky-300/15 pb-1.5"
        >
          {block.text}
        </h3>
      );

    case 'paragraph':
      return (
        <p
          key={key}
          className="text-slate-700 dark:text-slate-200/90 leading-[1.72] whitespace-pre-line"
        >
          {block.text}
        </p>
      );

    case 'definition':
      return (
        <div
          key={key}
          className="rounded-2xl border border-sky-500/30 bg-sky-500/[0.07] dark:bg-sky-400/[0.08] px-4 py-3.5 flex items-start gap-3"
        >
          <span className="mt-0.5 shrink-0 w-7 h-7 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-300 flex items-center justify-center">
            <Info size={16} strokeWidth={2.1} aria-hidden="true" />
          </span>
          <p className="font-medium text-slate-900 dark:text-sky-50 leading-relaxed">
            {block.text}
          </p>
        </div>
      );

    case 'figure':
      return renderFigureCard(block, key, 'standalone');

    case 'numberedList':
      return (
        <div key={key} className="space-y-2">
          {block.intro && (
            <p className="text-slate-700 dark:text-slate-200/90 leading-[1.72]">
              {block.intro}
            </p>
          )}
          <ol className="space-y-1.5 pl-1">
            {block.items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-slate-700 dark:text-slate-200/90 leading-relaxed"
              >
                <span className="font-mono-tabular font-semibold text-sky-700 dark:text-sky-300 shrink-0">
                  {idx + 1})
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'keyTerms':
      return (
        <div
          key={key}
          className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] dark:bg-amber-400/[0.07] px-4 py-3.5 space-y-2"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">
            <KeyRound size={14} strokeWidth={2} aria-hidden="true" />
            <span>Tayanch tushunchalar</span>
          </div>
          <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
            {block.terms.join(', ')}.
          </p>
        </div>
      );

    case 'questions':
      return (
        <section
          key={key}
          aria-label={block.title ?? 'Savol va topshiriqlar'}
          className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-slate-900/[0.03] dark:bg-white/[0.03] px-4 py-3.5 space-y-2.5"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            <HelpCircle size={14} strokeWidth={2} aria-hidden="true" />
            <span>{block.title ?? 'Savol va topshiriqlar'}</span>
          </div>
          <ol className="space-y-2">
            {block.items.map((q, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-800 dark:text-slate-100 leading-relaxed"
              >
                <span className="font-mono-tabular font-semibold text-sky-700 dark:text-sky-300 shrink-0">
                  {idx + 1}.
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </section>
      );

    case 'example':
      return (
        <section
          key={key}
          aria-label={block.title ?? 'Masala yechish namunasi'}
          className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] dark:bg-emerald-400/[0.06] p-4 space-y-3"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
            <BookMarked size={14} strokeWidth={2} aria-hidden="true" />
            <span>{block.title ?? 'Masala namunasi'}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-emerald-900/10 dark:border-emerald-200/10 pb-2 md:pb-0 md:pr-3">
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  Berilgan:
                </div>
                {block.given.map((line, i) => (
                  <div key={i} className="font-mono-tabular">
                    {line}
                  </div>
                ))}
              </div>
              <div className="pt-1 border-t border-emerald-900/10 dark:border-emerald-200/10">
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  Topish kerak:
                </div>
                {block.find.map((line, i) => (
                  <div key={i} className="font-mono-tabular">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-emerald-900/10 dark:border-emerald-200/10 pb-2 md:pb-0 md:pr-3">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                Formula:
              </div>
              {block.formula.map((line, i) => (
                <div key={i} className="font-mono-tabular">
                  {line}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  Yechilishi:
                </div>
                {block.solution.map((line, i) => (
                  <div key={i} className="font-mono-tabular">
                    {line}
                  </div>
                ))}
              </div>
              <div className="pt-1 border-t border-emerald-900/10 dark:border-emerald-200/10 font-semibold text-emerald-800 dark:text-emerald-300">
                Javob: <span className="font-mono-tabular">{block.answer}</span>
              </div>
            </div>
          </div>
        </section>
      );
  }
}

export default function TopicContent({ blocks }: TopicContentProps) {
  const layoutItems = buildTheoryLayout(blocks);

  return (
    <article className="tracking-normal space-y-4 text-[15px] leading-relaxed text-slate-800 dark:text-slate-100/90">
      {layoutItems.map((item) => {
        if (item.kind === 'block') {
          return renderTheoryBlock(item.entry.block, item.entry.index);
        }

        return (
          <div
            key={`aside-${item.figureEntry.index}`}
            className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-5 items-start"
          >
            <div className="min-w-0 space-y-4">
              {item.textEntries.map(({ block, index }) =>
                renderTheoryBlock(block, index)
              )}
            </div>
            <div className="w-full md:w-auto flex justify-center md:justify-end">
              {renderFigureCard(
                item.figureEntry.block,
                item.figureEntry.index,
                'aside'
              )}
            </div>
          </div>
        );
      })}
    </article>
  );
}
