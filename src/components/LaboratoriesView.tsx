import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Activity,
  ArrowLeft,
  Atom,
  BookOpen,
  Box,
  Camera,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Gauge,
  Library,
  LogOut,
  Pause,
  Play,
  RotateCcw,
  Snowflake,
  Sparkles,
  Video,
} from 'lucide-react';
import {
  adjustableGlassStyles,
  normalizeGlassSettings,
  type GlassSettings,
} from '@/components/ui/adjustable-glass-dashboard';
import { LAB_EXPERIMENTS } from '../data/molecularPhysicsData';
import {
  CameraPreset,
  MolecularLabEngine,
} from '../three/MolecularLabEngine';
import { FizLabTheme, LabExperimentId, LabTelemetry } from '../types/fizlab';
import AiSectionView from './AiSectionView';
import LibraryView from './LibraryView';
import type { LibraryGrade } from '../data/libraryBooksData';
import TestsGradesView, { type TestGrade } from './TestsGradesView';
import ThemeToggle from './ThemeToggle';
import TheoryGradesView, { type TheoryGrade } from './TheoryGradesView';

import theoryImg from '../assets/images/theory_physics_lesson_1794766163206.jpg';
import videoImg from '../assets/images/video_physics_lecture_1794766163559.jpg';
import testsImg from '../assets/images/physics_quiz_test_1794766165407.jpg';
import libraryImg from '../assets/images/physics_digital_library_1794766164428.jpg';
import simulationImg from '../assets/images/physics_3d_simulation_1794845647265.jpg';
import aiImg from '../assets/images/ai_physics_assistant_1794766165894.jpg';

gsap.registerPlugin(useGSAP);

type LabSectionTab =
  | 'all'
  | 'theory'
  | 'video'
  | 'tests'
  | 'library'
  | 'simulation'
  | 'ai';
type LabViewMode = 'sections' | 'simulator';

interface LaboratoriesViewProps {
  activeLab: LabExperimentId;
  onSelectLab: (lab: LabExperimentId) => void;
  theme: FizLabTheme;
  onToggleTheme?: () => void;
  onLogout?: () => void;
  viewMode?: LabViewMode;
  onChangeViewMode?: (mode: LabViewMode) => void;
  onAiModeChange?: (isAiOpen: boolean) => void;
}

const LAB_MODULE_SECTIONS: {
  id: Exclude<LabSectionTab, 'all'>;
  title: string;
  icon: typeof BookOpen;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: 'theory',
    title: 'Darsning nazariy qismi',
    icon: BookOpen,
    image: theoryImg,
    imageAlt: 'Darsning nazariy qismi — molekulyar fizika darsligi',
  },
  {
    id: 'video',
    title: 'Video darslik',
    icon: Video,
    image: videoImg,
    imageAlt: 'Video darslik — interaktiv fizika videomashg‘uloti',
  },
  {
    id: 'tests',
    title: 'Testlar qismi',
    icon: ClipboardList,
    image: testsImg,
    imageAlt: 'Testlar qismi — nazorat savollari va taymer',
  },
  {
    id: 'library',
    title: 'Kutubxona',
    icon: Library,
    image: libraryImg,
    imageAlt: 'Kutubxona — fizika adabiyotlari va prizma modeli',
  },
  {
    id: 'simulation',
    title: 'Simulyatsiya',
    icon: Box,
    image: simulationImg,
    imageAlt: 'Simulyatsiya — fizika bo‘limlarining 3D grafik animatsiyalari',
  },
  {
    id: 'ai',
    title: 'AI',
    icon: Sparkles,
    image: aiImg,
    imageAlt: 'AI — sun’iy intellekt fizika yordamchisi',
  },
];

const INITIAL_TELEMETRY: LabTelemetry = {
  temperatureK: 300,
  volumeL: 4.0,
  pressureKpa: 99.8,
  rmsSpeedMs: 508.0,
  kineticEnergyJ: 6.21e-21,
  collisionRate: 42,
  msdUm2: 0,
  phaseLabel: 'Ideal gaz',
  lightSpeciesSpeedMs: 1368,
  heavySpeciesSpeedMs: 484,
  speedBins: [2, 6, 12, 18, 22, 16, 12, 8, 5, 3, 2, 1],
};

const LAB_ICONS: Record<LabExperimentId, typeof Gauge> = {
  'gas-laws': Gauge,
  brownian: Sparkles,
  states: Snowflake,
  maxwell: Activity,
};

const LAB_GLASS_DEFAULT = (theme: FizLabTheme): GlassSettings =>
  normalizeGlassSettings({
    blur: 18,
    opacity: 0.56,
    saturation: 1.3,
    edge: 0.72,
    tint: theme === 'dark' ? '#0f1f3a' : '#ffffff',
  });

function LiveSpeedHistogram({ bins }: { bins: number[] }) {
  const maxVal = Math.max(1, ...bins);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-[11px] text-[var(--gw-muted)] mb-1">
        <span>Tezlik taqsimoti f(v)</span>
        <span className="font-mono-tabular">0 → 1400 m/s</span>
      </div>
      <div className="flex items-end gap-1 h-12 rounded-xl bg-slate-900/[0.06] dark:bg-[#060a14]/75 border border-[var(--gw-line)] px-2 py-1.5">
        {bins.map((count, i) => {
          const hPct = Math.max(8, Math.round((count / maxVal) * 100));
          const isFast = i >= 7;
          return (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-all duration-150 ${
                isFast
                  ? 'bg-amber-600/85 dark:bg-amber-400/85'
                  : 'bg-sky-600/85 dark:bg-sky-400/85'
              }`}
              style={{ height: `${hPct}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function LaboratoriesView({
  activeLab,
  onSelectLab,
  theme,
  onToggleTheme,
  onLogout,
  viewMode: controlledViewMode,
  onAiModeChange,
}: LaboratoriesViewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<MolecularLabEngine | null>(null);

  const viewMode: LabViewMode = controlledViewMode ?? 'sections';
  const [activeModuleTab, setActiveModuleTab] = useState<LabSectionTab>('all');
  const [selectedTheoryGrade, setSelectedTheoryGrade] =
    useState<TheoryGrade | null>(null);
  const [selectedTestGrade, setSelectedTestGrade] =
    useState<TestGrade | null>(null);
  const [selectedLibraryGrade, setSelectedLibraryGrade] =
    useState<LibraryGrade | null>(null);

  const isAiOpen = viewMode === 'sections' && activeModuleTab === 'ai';

  useEffect(() => {
    onAiModeChange?.(isAiOpen);
    return () => onAiModeChange?.(false);
  }, [isAiOpen, onAiModeChange]);

  const [temperatureK, setTemperatureK] = useState(300);
  const [volumeL, setVolumeL] = useState(4.0);
  const [moleculeCount, setMoleculeCount] = useState(110);
  const [paused, setPaused] = useState(false);
  const [dockOpen, setDockOpen] = useState(true);
  const [contextLost, setContextLost] = useState(false);
  const [telemetry, setTelemetry] = useState<LabTelemetry>(INITIAL_TELEMETRY);
  const [activeCam, setActiveCam] = useState<CameraPreset>('overview');

  const material = LAB_GLASS_DEFAULT(theme);

  const currentMeta =
    LAB_EXPERIMENTS.find((e) => e.id === activeLab) ?? LAB_EXPERIMENTS[0];

  const visibleEmptySections =
    activeModuleTab === 'all'
      ? LAB_MODULE_SECTIONS
      : LAB_MODULE_SECTIONS.filter((sec) => sec.id === activeModuleTab);

  // Mount Three.js engine only when in 3D simulator mode
  useEffect(() => {
    if (viewMode !== 'simulator') return;
    const container = mountRef.current;
    if (!container) return;

    const engine = new MolecularLabEngine(
      container,
      {
        mode: activeLab,
        temperatureK,
        volumeL,
        moleculeCount,
        paused,
      },
      (data) => setTelemetry(data),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode]);

  // Sync simulation parameters without recreating canvas
  useEffect(() => {
    engineRef.current?.updateParams({
      mode: activeLab,
      temperatureK,
      volumeL,
      moleculeCount,
      paused,
    });
  }, [activeLab, temperatureK, volumeL, moleculeCount, paused]);

  // Sync 3D scene theme dynamically
  useEffect(() => {
    engineRef.current?.setTheme(theme);
  }, [theme]);

  // GSAP staggered glass reveal animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const panels = hudRef.current?.querySelectorAll('.gw-reveal');
        if (!panels?.length) return;
        gsap.fromTo(
          panels,
          { y: 12, opacity: 0.45, filter: 'blur(3px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.48,
            stagger: 0.045,
            ease: 'power3.out',
            clearProps: 'transform,opacity,filter',
          }
        );
      });
      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [activeLab, viewMode, activeModuleTab, selectedTheoryGrade],
      revertOnUpdate: true,
    }
  );

  // Keyboard shortcut 'H' to toggle bottom control dock
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        viewMode === 'simulator' &&
        e.key.toLowerCase() === 'h' &&
        !(e.target instanceof HTMLInputElement)
      ) {
        setDockOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [viewMode]);

  const handleSelectLab = (labId: LabExperimentId) => {
    onSelectLab(labId);
    if (labId === 'states') {
      setTemperatureK(120);
    } else if (labId === 'gas-laws') {
      setTemperatureK(300);
      setVolumeL(4.0);
    } else {
      setTemperatureK(320);
    }
    setPaused(false);
  };

  const handlePreset = (preset: CameraPreset) => {
    setActiveCam(preset);
    engineRef.current?.setCameraPreset(preset);
  };

  const handleReset = () => {
    setPaused(false);
    engineRef.current?.resetSimulationState();
  };

  const tempC = Math.round(temperatureK - 273.15);

  if (isAiOpen) {
    return <AiSectionView onBack={() => setActiveModuleTab('all')} />;
  }

  return (
    <div
      ref={rootRef}
      data-theme={theme}
      className={`gw-root fizlab-gw-lab relative w-full h-full overflow-hidden rounded-3xl border border-slate-900/12 dark:border-white/12 ${
        viewMode === 'simulator'
          ? 'bg-[#e9f1fa] dark:bg-[#060a14]'
          : 'glass-panel-subtle'
      }`}
      style={
        {
          '--gw-blur': `${material.blur}px`,
          '--gw-opacity': material.opacity,
          '--gw-saturation': material.saturation,
          '--gw-tint': `color-mix(in srgb, var(--color-background, Canvas) 78%, ${material.tint})`,
          '--gw-edge': material.edge,
        } as CSSProperties
      }
    >
      <style>{adjustableGlassStyles}</style>
      <style>{labWorkspaceOverrides}</style>

      {/* Isolated 3D WebGL Canvas Mount (only in simulator mode) */}
      {viewMode === 'simulator' && (
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          aria-label="3D Molekulyar fizika laboratoriyasi sahnasi"
        />
      )}

      {viewMode === 'simulator' && contextLost && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#e9f1fa]/90 dark:bg-[#060a14]/90 p-6 text-center">
          <div className="gw-glass rounded-2xl p-6 max-w-md space-y-2">
            <div className="font-display text-lg font-bold text-[var(--gw-ink)]">
              WebGL konteksti vaqtincha to‘xtatildi
            </div>
            <p className="text-sm text-[var(--gw-muted)]">
              Brauzer grafik resursni tiklamoqda. Zarurat bo‘lsa sahifani yangilang.
            </p>
          </div>
        </div>
      )}

      {/* Glass Workspace Overlay */}
      <div
        ref={hudRef}
        className={`relative z-10 flex flex-col justify-between h-full p-3 sm:p-4 ${
          viewMode === 'simulator' ? 'pointer-events-none' : 'overflow-y-auto'
        }`}
      >
        {/* Top Section */}
        <div
          className={`flex flex-col gap-3 ${
            viewMode === 'sections' ? 'flex-1' : ''
          }`}
        >
          {/* Clean Soft-Shadow Topbar */}
          <header
            className={`pointer-events-auto gw-topbar gw-reveal shrink-0 ${
              viewMode === 'sections'
                ? 'fizlab-neo-topbar'
                : 'gw-glass fizlab-topbar'
            }`}
          >
            <div className="gw-brand">
              <span
                className={
                  viewMode === 'sections'
                    ? 'fizlab-neo-brand-icon'
                    : 'gw-brand-icon'
                }
              >
                <Atom size={17} strokeWidth={2} aria-hidden="true" />
              </span>
              <strong
                className={
                  viewMode === 'sections' ? 'fizlab-neo-brand-title' : ''
                }
              >
                FizLab 3D
              </strong>
              <span className="gw-brand-divider" />
              <span className="gw-personal">
                {viewMode === 'sections'
                  ? 'O‘quv bo‘limlari'
                  : `${currentMeta.code} · ${currentMeta.shortTitle}`}
              </span>
            </div>

            <div className="gw-toolbar">
              {viewMode === 'simulator' && (
                <div
                  className="gw-segment"
                  role="group"
                  aria-label="Kamera ko‘rinishlari"
                >
                  <span className="hidden md:inline-flex items-center gap-1 px-2 text-[11px] text-[var(--gw-muted)]">
                    <Camera size={13} aria-hidden="true" />
                    <span>Kamera</span>
                  </span>
                  {(
                    [
                      { id: 'overview', label: 'Umumiy' },
                      { id: 'top', label: 'Yuqori' },
                      { id: 'closeup', label: 'Yaqin' },
                    ] as { id: CameraPreset; label: string }[]
                  ).map((cam) => (
                    <button
                      key={cam.id}
                      type="button"
                      aria-pressed={activeCam === cam.id}
                      onClick={() => handlePreset(cam.id)}
                      className="text-xs font-medium whitespace-nowrap"
                    >
                      {cam.label}
                    </button>
                  ))}
                </div>
              )}

              {onToggleTheme && (
                <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
              )}

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Tizimdan chiqish"
                  aria-label="Tizimdan chiqish"
                  className="w-9 h-9 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 flex items-center justify-center text-rose-700 dark:text-rose-300 transition-colors cursor-pointer"
                >
                  <LogOut size={15} aria-hidden="true" />
                </button>
              )}
            </div>
          </header>

          {viewMode === 'sections' ? (
            activeModuleTab === 'theory' ? (
              <TheoryGradesView
                selectedGrade={selectedTheoryGrade}
                onSelectGrade={setSelectedTheoryGrade}
                onBackToSections={() => {
                  setSelectedTheoryGrade(null);
                  setActiveModuleTab('all');
                }}
              />
            ) : activeModuleTab === 'tests' ? (
              <TestsGradesView
                selectedGrade={selectedTestGrade}
                onSelectGrade={setSelectedTestGrade}
                onBackToSections={() => {
                  setSelectedTestGrade(null);
                  setActiveModuleTab('all');
                }}
              />
            ) : activeModuleTab === 'library' ? (
              <LibraryView
                selectedGrade={selectedLibraryGrade}
                onSelectGrade={setSelectedLibraryGrade}
                onBackToSections={() => {
                  setSelectedLibraryGrade(null);
                  setActiveModuleTab('all');
                }}
              />
            ) : activeModuleTab === 'simulation' ? (
              <div className="w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
                <div className="fizlab-neo-card gw-reveal">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="fizlab-neo-icon">
                        <Box size={16} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <h2 className="fizlab-neo-heading">Simulyatsiya</h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModuleTab('all')}
                      className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <ArrowLeft size={14} aria-hidden="true" />
                      <span>Orqaga</span>
                    </button>
                  </div>

                  <div
                    className="fizlab-neo-well min-h-[380px]"
                    aria-label="Simulyatsiya bo‘limi"
                  />
                </div>
              </div>
            ) : (
            /* Balanced 3x2 section cards */
            <div
              className={`w-full mx-auto my-auto grid gap-4 py-2 ${
                activeModuleTab === 'all'
                  ? 'max-w-[780px] grid-cols-1 sm:grid-cols-2'
                  : 'max-w-[660px] grid-cols-1'
              }`}
            >
              {visibleEmptySections.map((sec) => {
                const Icon = sec.icon;
                const focused = activeModuleTab !== 'all';
                const isAiCard = sec.id === 'ai';
                return (
                  <section
                    key={sec.id}
                    aria-label={sec.title}
                    onClick={() => {
                      if (!focused) {
                        if (sec.id === 'theory') {
                          setSelectedTheoryGrade(null);
                        }
                        if (sec.id === 'tests') {
                          setSelectedTestGrade(null);
                        }
                        if (sec.id === 'library') {
                          setSelectedLibraryGrade(null);
                        }
                        setActiveModuleTab(sec.id);
                      }
                    }}
                    className={`group fizlab-neo-card gw-reveal ${
                      !focused ? 'cursor-pointer is-interactive' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`fizlab-neo-icon ${
                            isAiCard ? 'is-dark-badge' : ''
                          }`}
                        >
                          <Icon size={16} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <h2 className="fizlab-neo-heading">{sec.title}</h2>
                      </div>

                      {isAiCard && !focused && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModuleTab('ai');
                          }}
                          className="fizlab-neo-btn !w-auto !m-0 !px-3.5 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                        >
                          <Sparkles size={13} aria-hidden="true" />
                          <span>AI bo‘limiga kirish</span>
                        </button>
                      )}

                      {focused && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModuleTab('all');
                          }}
                          className="fizlab-neo-btn !w-auto !m-0 !px-3.5 !py-2 text-xs inline-flex items-center gap-1.5"
                        >
                          <ArrowLeft size={14} aria-hidden="true" />
                          <span>Orqaga</span>
                        </button>
                      )}
                    </div>

                    <div
                      className={`fizlab-neo-well !p-1.5 overflow-hidden ${
                        focused ? 'space-y-3' : ''
                      }`}
                    >
                      <div
                        className={`w-full rounded-[14px] overflow-hidden bg-sky-50/70 dark:bg-slate-900/70 ${
                          focused
                            ? 'h-[200px] sm:h-[240px]'
                            : 'h-[126px] sm:h-[138px]'
                        }`}
                      >
                        <img
                          src={sec.image}
                          alt={sec.imageAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      </div>
                      {focused && <div className="min-h-[120px]" />}
                    </div>
                  </section>
                );
              })}
            </div>
            )
          ) : (
            /* 3D Simulator HUD (4 3D Experiments + Objective + Live Telemetry) */
            <div className="flex flex-wrap items-start justify-between gap-2.5">
              <div className="flex flex-col gap-2.5 max-w-full">
                <nav
                  className="pointer-events-auto gw-dock gw-glass fizlab-lab-dock gw-reveal overflow-x-auto max-w-full"
                  aria-label="Laboratoriya tajribalari"
                >
                  {LAB_EXPERIMENTS.map((exp, idx) => {
                    const Icon = LAB_ICONS[exp.id];
                    const active = exp.id === activeLab;
                    return (
                      <button
                        key={exp.id}
                        type="button"
                        aria-current={active ? 'page' : undefined}
                        onClick={() => handleSelectLab(exp.id)}
                      >
                        <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                        <span>
                          0{idx + 1}. {exp.shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </nav>

                <section className="pointer-events-auto gw-panel gw-glass fizlab-hud-card gw-reveal max-w-md hidden sm:block">
                  <div className="text-xs font-semibold text-[var(--gw-ink)]">
                    {currentMeta.title}
                  </div>
                  <p className="text-[11px] text-[var(--gw-muted)] leading-snug mt-0.5">
                    {currentMeta.objective}
                  </p>
                </section>
              </div>

              <section
                className="pointer-events-auto gw-panel gw-glass fizlab-hud-card gw-reveal flex flex-wrap items-center gap-4 sm:gap-5"
                aria-label="Jonli o‘lchov ko‘rsatkichlari"
              >
                <div>
                  <div className="text-[10px] text-[var(--gw-muted)]">
                    Harorat (T)
                  </div>
                  <div className="font-mono-tabular text-sm font-semibold text-[var(--gw-ink)]">
                    {telemetry.temperatureK} K{' '}
                    <span className="text-[11px] text-[var(--gw-muted)]">
                      ({tempC > 0 ? `+${tempC}` : tempC}°C)
                    </span>
                  </div>
                </div>

                {activeLab === 'gas-laws' && (
                  <>
                    <div>
                      <div className="text-[10px] text-[var(--gw-muted)]">
                        Bosim (P)
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-amber-700 dark:text-amber-300">
                        {telemetry.pressureKpa.toFixed(1)} kPa
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--gw-muted)]">
                        Hajm (V)
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-sky-700 dark:text-sky-300">
                        {telemetry.volumeL.toFixed(1)} L
                      </div>
                    </div>
                  </>
                )}

                {activeLab === 'brownian' && (
                  <div>
                    <div className="text-[10px] text-[var(--gw-muted)]">
                      Siljish ⟨r²⟩
                    </div>
                    <div className="font-mono-tabular text-sm font-semibold text-amber-700 dark:text-amber-300">
                      {telemetry.msdUm2.toFixed(1)} µm²
                    </div>
                  </div>
                )}

                {activeLab === 'states' && (
                  <div>
                    <div className="text-[10px] text-[var(--gw-muted)]">
                      Agregat holat
                    </div>
                    <div className="text-sm font-semibold text-sky-700 dark:text-sky-300">
                      {telemetry.phaseLabel}
                    </div>
                  </div>
                )}

                {activeLab === 'maxwell' ? (
                  <>
                    <div>
                      <div className="text-[10px] text-sky-700 dark:text-sky-300">
                        He tezligi
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-[var(--gw-ink)]">
                        {Math.round(telemetry.lightSpeciesSpeedMs)} m/s
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-amber-700 dark:text-amber-300">
                        O₂ tezligi
                      </div>
                      <div className="font-mono-tabular text-sm font-semibold text-[var(--gw-ink)]">
                        {Math.round(telemetry.heavySpeciesSpeedMs)} m/s
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="text-[10px] text-[var(--gw-muted)]">
                      Tezlik (vₖᵥ)
                    </div>
                    <div className="font-mono-tabular text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      {Math.round(telemetry.rmsSpeedMs)} m/s
                    </div>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>

        {/* Left Quick-Navigation Rail (3D Simulator mode on xl+ screens) */}
        {viewMode === 'simulator' && (
          <nav
            className="pointer-events-auto gw-rail gw-glass fizlab-rail hidden xl:flex"
            aria-label="Tezkor tajriba tanlovi"
          >
            {LAB_EXPERIMENTS.map((exp, idx) => {
              const Icon = LAB_ICONS[exp.id];
              return (
                <button
                  key={exp.id}
                  type="button"
                  aria-label={`0${idx + 1}. ${exp.shortTitle}`}
                  title={`0${idx + 1}. ${exp.shortTitle}`}
                  aria-current={activeLab === exp.id ? 'page' : undefined}
                  onClick={() => handleSelectLab(exp.id)}
                >
                  <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                  <span>{exp.shortTitle}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Bottom Collapsible Simulation Dock (3D Simulator mode) */}
        {viewMode === 'simulator' && (
          <div className="w-[min(940px,100%)] mx-auto flex flex-col items-center">
            <button
              type="button"
              onClick={() => setDockOpen((o) => !o)}
              className="pointer-events-auto mb-1.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-t-xl gw-glass text-[11px] font-medium text-[var(--gw-ink)] hover:brightness-105 cursor-pointer"
            >
              {dockOpen ? (
                <>
                  <ChevronDown
                    size={14}
                    className="text-[var(--gw-accent)]"
                    aria-hidden="true"
                  />
                  <span>Boshqaruv panelini yashirish (H)</span>
                </>
              ) : (
                <>
                  <ChevronUp
                    size={14}
                    className="text-[var(--gw-accent)]"
                    aria-hidden="true"
                  />
                  <span>Boshqaruv panelini ochish (H)</span>
                </>
              )}
            </button>

            {dockOpen && (
              <div className="pointer-events-auto w-full gw-panel gw-glass fizlab-bottom-dock gw-reveal grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    className="gw-button flex-1 justify-center font-semibold !py-2.5 !rounded-xl"
                  >
                    {paused ? (
                      <>
                        <Play size={14} aria-hidden="true" />
                        <span>Davom etish</span>
                      </>
                    ) : (
                      <>
                        <Pause size={14} aria-hidden="true" />
                        <span>To‘xtatish</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    title="Tajribani qayta tiklash"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900/[0.06] hover:bg-slate-900/[0.12] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] border border-[var(--gw-line)] text-[var(--gw-ink)] text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    <span>Tiklash</span>
                  </button>
                </div>

                <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <label
                        htmlFor="lab-temp"
                        className="text-[var(--gw-muted)] font-medium"
                      >
                        Harorat (T)
                      </label>
                      <span className="font-mono-tabular text-[var(--gw-accent)] font-semibold">
                        {temperatureK} K
                      </span>
                    </div>
                    <input
                      id="lab-temp"
                      type="range"
                      min={60}
                      max={650}
                      step={5}
                      value={temperatureK}
                      onChange={(e) => setTemperatureK(Number(e.target.value))}
                      className="w-full fiz-slider"
                    />
                  </div>

                  {activeLab === 'gas-laws' ? (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label
                          htmlFor="lab-vol"
                          className="text-[var(--gw-muted)] font-medium"
                        >
                          Porshen hajmi (V)
                        </label>
                        <span className="font-mono-tabular text-amber-700 dark:text-amber-300 font-semibold">
                          {volumeL.toFixed(1)} L
                        </span>
                      </div>
                      <input
                        id="lab-vol"
                        type="range"
                        min={1.5}
                        max={6.0}
                        step={0.1}
                        value={volumeL}
                        onChange={(e) => setVolumeL(Number(e.target.value))}
                        className="w-full fiz-slider"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label
                          htmlFor="lab-count"
                          className="text-[var(--gw-muted)] font-medium"
                        >
                          {activeLab === 'states'
                            ? 'Kristall tugunlari'
                            : 'Molekulalar soni'}
                        </label>
                        <span className="font-mono-tabular text-amber-700 dark:text-amber-300 font-semibold">
                          {activeLab === 'states' ? 96 : moleculeCount} ta
                        </span>
                      </div>
                      <input
                        id="lab-count"
                        type="range"
                        min={30}
                        max={150}
                        step={5}
                        disabled={activeLab === 'states'}
                        value={activeLab === 'states' ? 96 : moleculeCount}
                        onChange={(e) =>
                          setMoleculeCount(Number(e.target.value))
                        }
                        className="w-full fiz-slider disabled:opacity-45"
                      />
                    </div>
                  )}
                </div>

                <div className="md:col-span-3">
                  <LiveSpeedHistogram bins={telemetry.speedBins} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const labWorkspaceOverrides = `
.gw-root.fizlab-gw-lab {
  min-height: 0;
  height: 100%;
  padding: 0;
  background: transparent;
  font-family: var(--font-sans);
}
.gw-root.fizlab-gw-lab .fizlab-topbar {
  height: 52px;
  margin-bottom: 0;
  border-radius: 18px;
  padding: 0 14px;
}
.gw-root.fizlab-gw-lab .fizlab-lab-dock {
  border-radius: 22px;
  padding: 4px;
  background: color-mix(
    in srgb,
    var(--gw-surface) calc(var(--gw-opacity) * 100%),
    transparent
  );
  backdrop-filter: blur(var(--gw-blur)) saturate(var(--gw-saturation));
  -webkit-backdrop-filter: blur(var(--gw-blur)) saturate(var(--gw-saturation));
}
.gw-root.fizlab-gw-lab .fizlab-lab-dock button {
  padding: 7px 13px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 18px;
}
.gw-root.fizlab-gw-lab .fizlab-lab-dock button[aria-current="page"] {
  background: var(--gw-brand);
  color: var(--gw-brand-ink);
  box-shadow: 0 4px 12px var(--gw-dock-shadow);
}
.gw-root.fizlab-gw-lab .fizlab-hud-card {
  padding: 11px 16px;
  border-radius: 18px;
}
.gw-root.fizlab-gw-lab .fizlab-empty-card {
  padding: 18px 20px;
  border-radius: 20px;
}

/* Neumorphic Sky-White Card System based on user-provided Sign In design */
.fizlab-neo-topbar {
  height: 58px;
  margin-bottom: 0;
  padding: 0 18px;
  border-radius: 28px;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
  border: 4px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.78) 0px 22px 26px -18px;
}
[data-theme="dark"] .fizlab-neo-topbar {
  background: linear-gradient(0deg, rgba(15, 25, 46, 0.96) 0%, rgba(22, 36, 64, 0.92) 100%);
  border-color: rgba(133, 189, 215, 0.22);
  box-shadow: rgba(2, 6, 23, 0.65) 0px 22px 26px -18px;
}
.fizlab-neo-brand-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  border: 3px solid rgb(255, 255, 255);
  color: #ffffff;
  box-shadow: rgba(133, 189, 215, 0.878) 0px 10px 10px -6px;
}
[data-theme="dark"] .fizlab-neo-brand-icon {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: rgba(2, 6, 23, 0.5) 0px 10px 10px -6px;
}
.fizlab-neo-brand-title {
  font-weight: 900;
  font-size: 16px;
  color: rgb(16, 137, 211);
  letter-spacing: -0.02em;
}
[data-theme="dark"] .fizlab-neo-brand-title {
  color: #38bdf8;
}

.gw-root .fizlab-neo-card {
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
  border-radius: 30px;
  padding: 16px 22px;
  border: 4px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 22px 24px -16px;
  transition: transform 0.22s ease-in-out, box-shadow 0.22s ease-in-out;
}
.gw-root[data-theme="dark"] .fizlab-neo-card {
  background: linear-gradient(0deg, rgba(13, 22, 41, 0.96) 0%, rgba(20, 33, 58, 0.92) 100%);
  border-color: rgba(133, 189, 215, 0.2);
  box-shadow: rgba(2, 6, 23, 0.72) 0px 22px 24px -16px;
}
.gw-root .fizlab-neo-card.is-interactive:hover {
  transform: translateY(-2px) scale(1.012);
}
.gw-root .fizlab-neo-card.is-interactive:active {
  transform: scale(0.985);
}

.fizlab-neo-heading {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(16px, 1.4vw, 18px);
  color: rgb(16, 137, 211);
  letter-spacing: -0.02em;
}
[data-theme="dark"] .fizlab-neo-heading {
  color: #38bdf8;
}

.fizlab-neo-icon {
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  border: 4px solid white;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: grid;
  place-content: center;
  color: #ffffff;
  flex: none;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 10px 10px -7px;
  transition: transform 0.2s ease-in-out;
}
.fizlab-neo-icon.is-dark-badge {
  background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
}
[data-theme="dark"] .fizlab-neo-icon {
  border-color: rgba(255, 255, 255, 0.24);
  box-shadow: rgba(2, 6, 23, 0.6) 0px 10px 10px -7px;
}
.fizlab-neo-card.is-interactive:hover .fizlab-neo-icon {
  transform: scale(1.1);
}

.fizlab-neo-well {
  width: 100%;
  background: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 18px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
  transition: border-color 0.2s ease;
}
[data-theme="dark"] .fizlab-neo-well {
  background: rgba(8, 14, 28, 0.72);
  box-shadow: rgba(14, 165, 233, 0.16) 0px 10px 14px -5px;
  border: 1px solid rgba(133, 189, 215, 0.14);
}
.fizlab-neo-card.is-interactive:hover .fizlab-neo-well {
  border-inline-color: #12b1d1;
}

.gw-root .fizlab-neo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  color: #ffffff;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.gw-root .fizlab-neo-btn:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}
.gw-root .fizlab-neo-btn:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}
.gw-root[data-theme="dark"] .fizlab-neo-btn {
  box-shadow: rgba(14, 165, 233, 0.35) 0px 18px 16px -12px;
}
.gw-root .fizlab-neo-topic-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  padding: 10px 14px;
  border-radius: 13px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(244, 248, 252, 0.9);
  color: #0f172a;
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: 0;
  cursor: pointer;
  transition: background 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
}
.gw-root .fizlab-neo-topic-row:hover {
  background: #e6f4fd;
  border-color: rgba(16, 137, 211, 0.35);
  transform: translateX(2px);
}
.gw-root[data-theme="dark"] .fizlab-neo-topic-row {
  background: rgba(15, 25, 46, 0.85);
  border-color: rgba(133, 189, 215, 0.16);
  color: #e2e8f0;
}
.gw-root[data-theme="dark"] .fizlab-neo-topic-row:hover {
  background: rgba(24, 41, 74, 0.95);
  border-color: rgba(56, 189, 248, 0.45);
}

.gw-root .fizlab-quiz-scope {
  letter-spacing: 0;
}

.gw-root .fizlab-quiz-num-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: #f8fafc;
  color: #334155;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.gw-root .fizlab-quiz-num-btn:hover {
  border-color: rgba(2, 132, 199, 0.55);
  background: #f0f9ff;
}
.gw-root .fizlab-quiz-num-btn[data-answered="true"] {
  background: #e0f2fe;
  border-color: #38bdf8;
  color: #0369a1;
}
.gw-root .fizlab-quiz-num-btn[data-active="true"] {
  background: #0284c7;
  border-color: #0284c7;
  color: #ffffff;
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn {
  background: rgba(15, 23, 42, 0.75);
  border-color: rgba(148, 163, 184, 0.24);
  color: #cbd5e1;
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn:hover {
  border-color: rgba(56, 189, 248, 0.6);
  background: rgba(30, 41, 59, 0.9);
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn[data-answered="true"] {
  background: rgba(14, 165, 233, 0.16);
  border-color: rgba(56, 189, 248, 0.45);
  color: #bae6fd;
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn[data-active="true"] {
  background: #38bdf8;
  border-color: #38bdf8;
  color: #04111f;
}

.gw-root .fizlab-quiz-option {
  width: 100%;
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 13px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: #ffffff;
  color: #0f172a;
  text-align: left;
  letter-spacing: 0;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.gw-root .fizlab-quiz-option:hover {
  background: #f0f9ff;
  border-color: rgba(2, 132, 199, 0.45);
}
.gw-root .fizlab-quiz-option[aria-pressed="true"] {
  background: #e0f2fe;
  border-color: #0284c7;
  box-shadow: inset 0 0 0 1px #0284c7;
}
.gw-root[data-theme="dark"] .fizlab-quiz-option {
  background: rgba(10, 18, 36, 0.78);
  border-color: rgba(148, 163, 184, 0.2);
  color: #e2e8f0;
}
.gw-root[data-theme="dark"] .fizlab-quiz-option:hover {
  background: rgba(20, 34, 64, 0.9);
  border-color: rgba(56, 189, 248, 0.48);
}
.gw-root[data-theme="dark"] .fizlab-quiz-option[aria-pressed="true"] {
  background: rgba(14, 165, 233, 0.16);
  border-color: #38bdf8;
  box-shadow: inset 0 0 0 1px #38bdf8;
  color: #ffffff;
}

.gw-root .fizlab-quiz-secondary-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  background: #ffffff;
  color: #1e293b;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.gw-root .fizlab-quiz-secondary-btn:hover:not(:disabled) {
  background: #f1f5f9;
  border-color: rgba(15, 23, 42, 0.28);
}
.gw-root .fizlab-quiz-secondary-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.gw-root[data-theme="dark"] .fizlab-quiz-secondary-btn {
  background: rgba(15, 25, 46, 0.85);
  border-color: rgba(148, 163, 184, 0.24);
  color: #e2e8f0;
}
.gw-root[data-theme="dark"] .fizlab-quiz-secondary-btn:hover:not(:disabled) {
  background: rgba(30, 46, 80, 0.95);
  border-color: rgba(56, 189, 248, 0.45);
}

.gw-root .fizlab-lib-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  background: #ffffff;
  color: #1e293b;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  flex-shrink: 0;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.gw-root .fizlab-lib-btn:hover:not(:disabled) {
  background: #f0f9ff;
  border-color: rgba(2, 132, 199, 0.45);
}
.gw-root .fizlab-lib-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.gw-root[data-theme="dark"] .fizlab-lib-btn {
  background: rgba(15, 25, 46, 0.85);
  border-color: rgba(148, 163, 184, 0.24);
  color: #e2e8f0;
}
.gw-root[data-theme="dark"] .fizlab-lib-btn:hover:not(:disabled) {
  background: rgba(30, 46, 80, 0.95);
  border-color: rgba(56, 189, 248, 0.45);
}

.gw-root .fizlab-lib-select {
  height: 36px;
  max-width: 100%;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  background: #ffffff;
  color: #0f172a;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.gw-root[data-theme="dark"] .fizlab-lib-select {
  background: rgba(15, 25, 46, 0.9);
  border-color: rgba(148, 163, 184, 0.24);
  color: #e2e8f0;
}

.gw-root .fizlab-lib-input {
  width: 52px;
  height: 36px;
  padding: 0 8px;
  border-radius: 10px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  background: #ffffff;
  color: #0f172a;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0;
}
.gw-root[data-theme="dark"] .fizlab-lib-input {
  background: rgba(15, 25, 46, 0.9);
  border-color: rgba(148, 163, 184, 0.24);
  color: #f1f5f9;
}

.gw-root.fizlab-gw-lab .fizlab-bottom-dock {
  padding: 14px 16px;
  border-radius: 20px;
}
.gw-root.fizlab-gw-lab .fizlab-rail {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0;
}
.gw-root.fizlab-gw-lab .fizlab-rail button[aria-current="page"] {
  background: var(--gw-brand);
  color: var(--gw-brand-ink);
}
@media (min-width: 1550px) {
  .gw-root.fizlab-gw-lab {
    padding-top: 0;
  }
  .gw-root.fizlab-gw-lab .fizlab-hud-card {
    padding: 12px 18px;
  }
}
@media (max-width: 700px) {
  .gw-root.fizlab-gw-lab .fizlab-topbar,
  .fizlab-neo-topbar {
    height: auto;
    min-height: 48px;
    padding: 6px 12px;
    border-radius: 20px;
    flex-wrap: wrap;
    gap: 8px;
  }
  .fizlab-neo-card {
    border-radius: 30px;
    padding: 20px 18px;
  }
  .gw-root.fizlab-gw-lab .fizlab-lab-dock button {
    padding: 6px 10px;
    font-size: 11px;
  }
}
`;
