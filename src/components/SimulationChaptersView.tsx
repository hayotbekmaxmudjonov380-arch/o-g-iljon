import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Box,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import type { FizLabTheme } from '../types/fizlab';
import {
  getSimulationChapterById,
  SIMULATION_CHAPTERS,
} from '../data/simulationChaptersData';
import { ChapterSimulationEngine } from '../three/ChapterSimulationEngine';
import type { ChapterCameraPreset } from '../three/chapters/types';
import { computeChapterSimulationTelemetry } from '../utils/simulationPhysics';

interface SimulationChaptersViewProps {
  selectedChapterId: string | null;
  onSelectChapterId: (id: string | null) => void;
  onBackToSections: () => void;
  theme?: FizLabTheme;
}

export default function SimulationChaptersView({
  selectedChapterId,
  onSelectChapterId,
  onBackToSections,
  theme = 'dark',
}: SimulationChaptersViewProps) {
  const activeChapter = getSimulationChapterById(selectedChapterId);

  const [scenarioIndex, setScenarioIndex] = useState<0 | 1 | 2>(0);
  const [paramA, setParamA] = useState<number>(300);
  const [paramB, setParamB] = useState<number>(4.0);
  const [paused, setPaused] = useState<boolean>(false);
  const [camPreset, setCamPreset] = useState<ChapterCameraPreset>('overview');
  const [contextLost, setContextLost] = useState<boolean>(false);

  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ChapterSimulationEngine | null>(null);

  const activeScenario = activeChapter
    ? activeChapter.scenarios[scenarioIndex] ?? activeChapter.scenarios[0]
    : null;

  // Reset scenario and slider defaults cleanly whenever entering a new chapter
  useEffect(() => {
    if (!activeChapter) return;
    const first = activeChapter.scenarios[0];
    setScenarioIndex(0);
    setParamA(first.paramA.defaultValue);
    setParamB(first.paramB.defaultValue);
    setPaused(false);
    setCamPreset('overview');
    setContextLost(false);
  }, [activeChapter]);

  const handleSelectScenario = (idx: 0 | 1 | 2) => {
    if (!activeChapter) return;
    const sc = activeChapter.scenarios[idx];
    setScenarioIndex(idx);
    setParamA(sc.paramA.defaultValue);
    setParamB(sc.paramB.defaultValue);
    setPaused(false);
    setCamPreset('overview');
  };

  // Mount WebGL 3D engine once per activeChapter
  useEffect(() => {
    if (!activeChapter) return;
    const container = mountRef.current;
    if (!container) return;

    const first = activeChapter.scenarios[0];
    const engine = new ChapterSimulationEngine(
      container,
      {
        chapterId: activeChapter.id,
        scenarioId: first.id,
        paramA: first.paramA.defaultValue,
        paramB: first.paramB.defaultValue,
        paused: false,
      },
      theme
    );
    engineRef.current = engine;

    const canvas = container.querySelector('canvas');
    const onLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onRestored = () => {
      setContextLost(false);
    };
    canvas?.addEventListener('webglcontextlost', onLost);
    canvas?.addEventListener('webglcontextrestored', onRestored);

    return () => {
      canvas?.removeEventListener('webglcontextlost', onLost);
      canvas?.removeEventListener('webglcontextrestored', onRestored);
      engine.dispose();
      engineRef.current = null;
    };
    // Intentionally recreate engine only when switching chapters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChapter?.id]);

  // Push scenario & parameter updates without destroying the WebGL context
  useEffect(() => {
    if (!activeChapter || !activeScenario) return;
    engineRef.current?.updateParams({
      chapterId: activeChapter.id,
      scenarioId: activeScenario.id,
      paramA,
      paramB,
      paused,
    });
  }, [activeChapter, activeScenario, paramA, paramB, paused]);

  // Keep 3D studio scene synchronized with Light/Dark theme toggle
  useEffect(() => {
    engineRef.current?.setTheme(theme);
  }, [theme]);

  const telemetry = useMemo(() => {
    if (!activeChapter || !activeScenario) return null;
    return computeChapterSimulationTelemetry(
      activeChapter.id,
      activeScenario.id,
      paramA,
      paramB
    );
  }, [activeChapter, activeScenario, paramA, paramB]);

  const handleCameraPreset = (preset: ChapterCameraPreset) => {
    setCamPreset(preset);
    engineRef.current?.setCameraPreset(preset);
  };

  const handleReset = () => {
    if (!activeScenario) return;
    setParamA(activeScenario.paramA.defaultValue);
    setParamB(activeScenario.paramB.defaultValue);
    setPaused(false);
    setCamPreset('overview');
    engineRef.current?.setCameraPreset('overview');
    engineRef.current?.resetSimulationState();
  };

  // 1. Active chapter workspace with real 3D Three.js stage + 3 scenarios
  if (activeChapter && activeScenario && telemetry) {
    return (
      <div className="w-full max-w-[980px] mx-auto my-auto py-2 space-y-4">
        <div className="fizlab-neo-card fizlab-quiz-scope gw-reveal">
          {/* Chapter Header */}
          <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {activeChapter.roman}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-mono-tabular text-sky-700/85 dark:text-sky-300/85">
                  {activeChapter.shortLabel} · {activeChapter.sectionRange}
                </div>
                <h2 className="fizlab-neo-heading text-base sm:text-lg leading-snug">
                  {activeChapter.title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectChapterId(null)}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Orqaga</span>
            </button>
          </div>

          {/* 3-Simulation Selector Bar */}
          <div
            className="fizlab-sim-tabs mb-3"
            role="tablist"
            aria-label={`${activeChapter.shortLabel} 3D simulyatsiyalari`}
          >
            {activeChapter.scenarios.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                aria-pressed={scenarioIndex === idx}
                onClick={() => handleSelectScenario(idx as 0 | 1 | 2)}
                className="fizlab-sim-tab"
              >
                <span className="font-mono-tabular opacity-75">{sc.index}.</span>
                <span>{sc.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Isolated Three.js 3D Canvas Viewport */}
          <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-white/50 dark:border-white/14 bg-[#DCEBF5] dark:bg-[#050A1C]">
            <div
              ref={mountRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              aria-label={`${activeScenario.title} — 3D simulyatsiya sahnasi`}
            />

            {contextLost && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#DCEBF5]/90 dark:bg-[#050A1C]/90 p-5 text-center">
                <div className="glass-hud rounded-xl p-5 max-w-sm space-y-1.5">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    3D grafik konteksti to‘xtatildi
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Brauzer WebGL resursni tiklamoqda. Zarurat bo‘lsa qayta yuklang.
                  </p>
                </div>
              </div>
            )}

            {/* Top-left scenario title & formula (desktop overlay) */}
            <div className="pointer-events-none hidden sm:block absolute top-3 left-3 max-w-md z-10">
              <div className="glass-hud rounded-xl px-3 py-2">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  {activeScenario.index}. {activeScenario.title}
                </div>
                <div className="text-[11px] font-mono-tabular text-sky-700 dark:text-sky-300 mt-0.5">
                  {activeScenario.formula}
                </div>
              </div>
            </div>

            {/* Top-right camera & transport controls (no backdrop-blur over WebGL) */}
            <div className="absolute top-3 right-3 z-10 hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                aria-pressed={camPreset === 'overview'}
                onClick={() => handleCameraPreset('overview')}
                className="fizlab-sim-ctrl"
              >
                Umumiy
              </button>
              <button
                type="button"
                aria-pressed={camPreset === 'closeup'}
                onClick={() => handleCameraPreset('closeup')}
                className="fizlab-sim-ctrl"
              >
                Yaqin
              </button>
              <button
                type="button"
                aria-pressed={camPreset === 'top'}
                onClick={() => handleCameraPreset('top')}
                className="fizlab-sim-ctrl"
              >
                Yuqori
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Davom ettirish' : 'To‘xtatish'}
                className="fizlab-sim-ctrl"
              >
                {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                <span>{paused ? 'Davom' : 'Pauza'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Qayta tiklash"
                className="fizlab-sim-ctrl"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Tiklash</span>
              </button>
            </div>

            {/* Bottom-right real-time physics telemetry */}
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 z-10">
              <div className="glass-hud rounded-xl px-3.5 py-2 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                {telemetry.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-[10px] text-slate-600 dark:text-slate-400">
                      {m.label}
                    </div>
                    <div
                      className={`font-mono-tabular text-xs sm:text-sm font-semibold ${
                        m.tone === 'warm'
                          ? 'text-amber-700 dark:text-amber-300'
                          : m.tone === 'accent'
                          ? 'text-sky-700 dark:text-sky-300'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile compact formula note + transport controls + Interactive Parameter Sliders */}
          <div className="mt-3 space-y-3">
            <div className="sm:hidden text-xs text-slate-700 dark:text-slate-300 leading-snug">
              <span className="font-semibold">{activeScenario.index}. {activeScenario.title}</span>
              <span className="block font-mono-tabular text-[11px] text-sky-700 dark:text-sky-300 mt-0.5">
                {activeScenario.formula}
              </span>
            </div>
            <div className="flex sm:hidden flex-wrap items-center gap-1.5">
              <button
                type="button"
                aria-pressed={camPreset === 'overview'}
                onClick={() => handleCameraPreset('overview')}
                className="fizlab-sim-ctrl"
              >
                Umumiy
              </button>
              <button
                type="button"
                aria-pressed={camPreset === 'closeup'}
                onClick={() => handleCameraPreset('closeup')}
                className="fizlab-sim-ctrl"
              >
                Yaqin
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="fizlab-sim-ctrl"
              >
                {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
                <span>{paused ? 'Davom' : 'Pauza'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="fizlab-sim-ctrl"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Tiklash</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <label className="block space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {activeScenario.paramA.label}
                  </span>
                  <span className="font-mono-tabular font-semibold text-sky-700 dark:text-sky-300">
                    {paramA} {activeScenario.paramA.unit}
                  </span>
                </div>
                <input
                  type="range"
                  className="fiz-slider w-full"
                  min={activeScenario.paramA.min}
                  max={activeScenario.paramA.max}
                  step={activeScenario.paramA.step}
                  value={paramA}
                  onChange={(e) => setParamA(Number(e.target.value))}
                />
              </label>

              <label className="block space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {activeScenario.paramB.label}
                  </span>
                  <span className="font-mono-tabular font-semibold text-amber-700 dark:text-amber-300">
                    {paramB} {activeScenario.paramB.unit}
                  </span>
                </div>
                <input
                  type="range"
                  className="fiz-slider w-full"
                  min={activeScenario.paramB.min}
                  max={activeScenario.paramB.max}
                  step={activeScenario.paramB.step}
                  value={paramB}
                  onChange={(e) => setParamB(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Categorized list of 6 chapters (I bob .. VI bob), showing each chapter's 3 simulations
  return (
    <div className="w-full max-w-[920px] mx-auto my-auto py-2 space-y-4">
      <div className="flex items-center justify-between gap-3 px-1 gw-reveal">
        <div className="flex items-center gap-3 min-w-0">
          <span className="fizlab-neo-icon">
            <Box size={16} strokeWidth={2} aria-hidden="true" />
          </span>
          <h2 className="fizlab-neo-heading">Simulyatsiya</h2>
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
        {SIMULATION_CHAPTERS.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            data-chapter-id={chapter.id}
            onClick={() => onSelectChapterId(chapter.id)}
            className="group fizlab-neo-card gw-reveal cursor-pointer is-interactive text-left w-full flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3 min-w-0">
                <span className="fizlab-neo-icon font-display font-bold text-sm">
                  {chapter.roman}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-mono-tabular text-slate-600 dark:text-slate-400">
                    {chapter.shortLabel} · {chapter.sectionRange} · 3 ta 3D tajriba
                  </div>
                  <div className="fizlab-neo-heading text-sm sm:text-[15px] leading-snug mt-0.5">
                    {chapter.title}
                  </div>
                </div>
              </div>

              <ChevronRight
                size={16}
                className="text-sky-600 dark:text-sky-400 opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 shrink-0 mt-1"
                aria-hidden="true"
              />
            </div>

            <div className="fizlab-neo-well !py-2.5 !px-3.5 mt-auto space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {chapter.scenarios.map((sc) => (
                <div key={sc.id} className="truncate">
                  <span className="font-mono-tabular text-sky-700 dark:text-sky-300 mr-1.5">
                    0{sc.index}.
                  </span>
                  <span>{sc.shortTitle}</span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
