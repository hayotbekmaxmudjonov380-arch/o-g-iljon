import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { PHYSICS_EXERCISES } from '../data/molecularPhysicsData';
import { ExerciseDifficulty } from '../types/fizlab';

interface ExercisesViewProps {
  solvedIds: string[];
  onMarkSolved: (id: string) => void;
  onResetProgress: () => void;
}

type DiffFilter = 'Barchasi' | ExerciseDifficulty;

export default function ExercisesView({
  solvedIds,
  onMarkSolved,
  onResetProgress,
}: ExercisesViewProps) {
  const [diffFilter, setDiffFilter] = useState<DiffFilter>('Barchasi');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<
    Record<string, { status: 'correct' | 'wrong'; message: string }>
  >({});
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});

  const exercises = useMemo(() => {
    if (diffFilter === 'Barchasi') return PHYSICS_EXERCISES;
    return PHYSICS_EXERCISES.filter((e) => e.difficulty === diffFilter);
  }, [diffFilter]);

  const handleCheck = (id: string) => {
    const ex = PHYSICS_EXERCISES.find((item) => item.id === id);
    if (!ex) return;

    const raw = (inputs[id] ?? '').replace(',', '.').trim();
    const val = parseFloat(raw);
    if (Number.isNaN(val)) {
      setFeedback((prev) => ({
        ...prev,
        [id]: {
          status: 'wrong',
          message: 'Iltimos, sonli qiymat kiriting.',
        },
      }));
      return;
    }

    const diffPct =
      (Math.abs(val - ex.expectedAnswer) /
        Math.max(1e-6, Math.abs(ex.expectedAnswer))) *
      100;

    if (diffPct <= ex.tolerancePercent) {
      onMarkSolved(id);
      setFeedback((prev) => ({
        ...prev,
        [id]: {
          status: 'correct',
          message: `To‘g‘ri javob! (${ex.targetSymbol} = ${ex.expectedAnswer} ${ex.targetUnit})`,
        },
      }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [id]: {
          status: 'wrong',
          message:
            'Natija kutilgan qiymatdan farq qiladi. Birliklarni (SI) va formulani qayta tekshiring.',
        },
      }));
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-5 md:px-8 md:py-7">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-sky-700 dark:text-sky-300 mb-1.5">
              Amaliy mashqlar · Bilimni tekshirish
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
              Molekulyar fizika masalalari
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm font-mono-tabular text-slate-700 dark:text-slate-300">
              Bajarilgan:{' '}
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                {solvedIds.length} / {PHYSICS_EXERCISES.length}
              </span>
            </div>
            {solvedIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setFeedback({});
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/[0.06] hover:bg-slate-900/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-900/10 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tozalash</span>
              </button>
            )}
          </div>
        </header>

        {/* Difficulty Segmented Filter */}
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-panel-subtle">
          {(['Barchasi', 'Oson', "O'rta", 'Murakkab'] as DiffFilter[]).map((d) => {
            const active = diffFilter === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDiffFilter(d)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06]'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Exercise Cards */}
        <div className="space-y-5">
          {exercises.map((ex) => {
            const isSolved = solvedIds.includes(ex.id);
            const fb = feedback[ex.id];
            const showHint = !!openHints[ex.id];
            const showSolution = !!openSolutions[ex.id];

            return (
              <section
                key={ex.id}
                className="glass-panel rounded-3xl p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <span className="font-mono-tabular text-sky-700 dark:text-sky-300 font-semibold">
                      {String(ex.number).padStart(2, '0')}-masala
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{ex.topic}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        ex.difficulty === 'Oson'
                          ? 'text-emerald-700 dark:text-emerald-300 font-medium'
                          : ex.difficulty === "O'rta"
                          ? 'text-amber-700 dark:text-amber-300 font-medium'
                          : 'text-rose-700 dark:text-rose-300 font-medium'
                      }
                    >
                      {ex.difficulty}
                    </span>
                  </div>

                  {isSolved && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Yechilgan</span>
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="font-display text-lg font-bold text-slate-950 dark:text-white mb-2">
                    {ex.title}
                  </h2>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
                    {ex.statement}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono-tabular text-sky-800 dark:text-sky-200/90 bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/10 dark:border-white/10 rounded-xl px-3.5 py-2.5">
                    <span className="text-slate-600 dark:text-slate-400 font-sans">
                      Berilgan:
                    </span>
                    {ex.given.map((g, i) => (
                      <span key={g}>
                        {g}
                        {i < ex.given.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm font-semibold text-slate-950 dark:text-white">
                  {ex.question}
                </div>

                {/* Answer Input + Check Row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 max-w-sm">
                    <span className="font-mono-tabular text-sm text-slate-700 dark:text-slate-300 shrink-0">
                      {ex.targetSymbol} =
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={inputs[ex.id] ?? ''}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [ex.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheck(ex.id);
                      }}
                      placeholder="Javobni kiriting"
                      className="w-full rounded-xl bg-white/90 dark:bg-[#070c18]/90 border border-slate-900/15 dark:border-white/15 px-3.5 py-2.5 text-sm font-mono-tabular text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-sky-600 dark:focus:border-sky-400"
                    />
                    <span className="font-mono-tabular text-sm text-slate-600 dark:text-slate-400 shrink-0">
                      {ex.targetUnit}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCheck(ex.id)}
                      className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Tekshirish
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setOpenHints((prev) => ({ ...prev, [ex.id]: !prev[ex.id] }))
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/[0.05] hover:bg-slate-900/[0.1] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-900/10 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer whitespace-nowrap"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" />
                      <span>Maslahat</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setOpenSolutions((prev) => ({
                          ...prev,
                          [ex.id]: !prev[ex.id],
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/[0.05] hover:bg-slate-900/[0.1] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-900/10 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer whitespace-nowrap"
                    >
                      <span>Yechim</span>
                      {showSolution ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Validation Feedback */}
                {fb && (
                  <div
                    className={`flex items-center gap-2 text-xs font-medium rounded-xl px-3.5 py-2.5 border ${
                      fb.status === 'correct'
                        ? 'bg-emerald-500/15 border-emerald-600/30 dark:border-emerald-400/35 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-500/15 border-rose-600/30 dark:border-rose-400/35 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {fb.status === 'correct' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{fb.message}</span>
                  </div>
                )}

                {showHint && (
                  <div className="rounded-2xl bg-amber-500/10 border border-amber-600/25 dark:border-amber-400/25 px-4 py-3 text-xs text-amber-950 dark:text-amber-100">
                    <span className="font-semibold text-amber-800 dark:text-amber-300">
                      Maslahat:{' '}
                    </span>
                    {ex.hint}
                  </div>
                )}

                {showSolution && (
                  <div className="rounded-2xl bg-white/75 dark:bg-[#070c18]/80 border border-slate-900/10 dark:border-white/10 p-4 space-y-1.5">
                    <div className="text-xs font-semibold text-sky-700 dark:text-sky-300 mb-1">
                      Yechish bosqichlari:
                    </div>
                    {ex.solutionSteps.map((step, i) => (
                      <div
                        key={step}
                        className="text-xs font-mono-tabular text-slate-800 dark:text-slate-200 leading-relaxed"
                      >
                        {i + 1}. {step}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
