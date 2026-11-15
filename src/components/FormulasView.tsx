import { useMemo, useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, RotateCcw, Search } from 'lucide-react';
import { PHYSICS_FORMULAS } from '../data/molecularPhysicsData';
import { FormulaCategory, PhysicsFormula } from '../types/fizlab';

const CATEGORIES: { id: FormulaCategory; label: string }[] = [
  { id: 'all', label: 'Barchasi' },
  { id: 'mkn', label: 'MKN asoslari' },
  { id: 'gas-laws', label: 'Gaz qonunlari' },
  { id: 'energy', label: 'Tezlik va energiya' },
  { id: 'thermodynamics', label: 'Termodinamika' },
];

function FormulaCard({ formula }: { formula: PhysicsFormula }) {
  const [calcOpen, setCalcOpen] = useState(false);
  const initialValues = useMemo(() => {
    const obj: Record<string, number> = {};
    formula.variables.forEach((v) => {
      obj[v.symbol] = v.defaultValue;
    });
    return obj;
  }, [formula]);

  const [values, setValues] = useState<Record<string, number>>(initialValues);
  const result = formula.compute(values);

  const handleChange = (symbol: string, raw: string) => {
    const num = parseFloat(raw);
    if (!Number.isNaN(num)) {
      setValues((prev) => ({ ...prev, [symbol]: num }));
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-5 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="text-sky-700 dark:text-sky-300 font-medium">
            {formula.categoryLabel}
          </span>
          <span>SI birliklar tizimi</span>
        </div>

        <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white leading-snug">
          {formula.title}
        </h3>

        <div className="rounded-2xl bg-white/80 dark:bg-[#070c18]/85 border border-sky-600/20 dark:border-sky-400/20 px-4 py-3.5 font-mono-tabular text-lg font-semibold text-sky-700 dark:text-sky-300 tracking-wide">
          {formula.equation}
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {formula.description}
        </p>

        {/* Variable Breakdown */}
        <div className="space-y-1.5 pt-1">
          {formula.variables.map((v) => (
            <div
              key={v.symbol}
              className="flex items-center justify-between gap-2 text-xs text-slate-700 dark:text-slate-300"
            >
              <span>
                <span className="font-mono-tabular font-semibold text-slate-950 dark:text-white">
                  {v.symbol}
                </span>{' '}
                — {v.name}
              </span>
              <span className="font-mono-tabular text-slate-500 dark:text-slate-400">
                {v.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Live Calculator */}
      <div className="pt-2 border-t border-slate-900/10 dark:border-white/10">
        <button
          type="button"
          onClick={() => setCalcOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 py-2 px-3 rounded-xl bg-slate-900/[0.05] hover:bg-slate-900/[0.09] dark:bg-white/[0.05] dark:hover:bg-white/[0.1] border border-slate-900/10 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-slate-100 transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400" />
            <span>Interaktiv hisoblagich</span>
          </span>
          {calcOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          )}
        </button>

        {calcOpen && (
          <div className="mt-3 space-y-3 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 p-3.5">
            {formula.variables.map((v) => (
              <div key={v.symbol} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label
                    htmlFor={`${formula.id}-${v.symbol}`}
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {v.symbol} ({v.name})
                  </label>
                  <span className="font-mono-tabular text-slate-500 dark:text-slate-400">
                    {v.unit}
                  </span>
                </div>
                <input
                  id={`${formula.id}-${v.symbol}`}
                  type="number"
                  step={v.step ?? 'any'}
                  value={values[v.symbol]}
                  onChange={(e) => handleChange(v.symbol, e.target.value)}
                  className="w-full rounded-xl bg-white/90 dark:bg-[#070c18]/90 border border-slate-900/15 dark:border-white/15 px-3 py-2 text-sm font-mono-tabular text-slate-950 dark:text-white focus:outline-none focus:border-sky-600 dark:focus:border-sky-400"
                />
              </div>
            ))}

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-900/10 dark:border-white/10">
              <div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  {formula.resultName}
                </div>
                <div className="font-mono-tabular text-xl font-bold text-amber-700 dark:text-amber-300">
                  {formula.resultSymbol} = {formula.formatResult(result)}{' '}
                  <span className="text-xs font-normal text-slate-600 dark:text-slate-400">
                    {formula.resultUnit}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setValues(initialValues)}
                title="Standart qiymatlarga qaytarish"
                className="p-2 rounded-xl bg-slate-900/[0.06] hover:bg-slate-900/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FormulasView() {
  const [category, setCategory] = useState<FormulaCategory>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHYSICS_FORMULAS.filter((f) => {
      const catOk = category === 'all' || f.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        f.title.toLowerCase().includes(q) ||
        f.equation.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  return (
    <div className="h-full overflow-y-auto px-4 py-5 md:px-8 md:py-7">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-sky-700 dark:text-sky-300 mb-1.5">
              Formulalar to‘plami · Molekulyar fizika
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
              Tenglamalar va tezkor hisoblagich
            </h1>
          </div>

          <div className="text-xs font-mono-tabular text-slate-600 dark:text-slate-400">
            R = 8.314 J/(mol·K) · Nₐ = 6.022×10²³ mol⁻¹
          </div>
        </header>

        {/* Filter Tabs + Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl glass-panel-subtle">
            {CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-sky-600 dark:bg-sky-500 text-white dark:text-slate-950'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.06] dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Formula qidirish..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-panel-subtle text-sm text-slate-950 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-sky-600 dark:focus:border-sky-400"
            />
          </div>
        </div>

        {/* Formulas Grid */}
        {filtered.length === 0 ? (
          <div className="glass-panel rounded-3xl p-10 text-center text-slate-600 dark:text-slate-400 text-sm">
            Qidiruv bo‘yicha mos formula topilmadi.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((f) => (
              <FormulaCard key={f.id} formula={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
