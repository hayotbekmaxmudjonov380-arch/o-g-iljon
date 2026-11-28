import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Box,
  Camera,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  FlaskConical,
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
import LaboratorySectionsView from './LaboratorySectionsView';
import LibraryView from './LibraryView';
import type { LaboratorySubSectionId } from '../data/laboratorySectionsData';
import type { LibraryGrade } from '../data/libraryBooksData';
import SimulationChaptersView from './SimulationChaptersView';
import TestsGradesView, { type TestGrade } from './TestsGradesView';
import ThemeToggle from './ThemeToggle';
import TheoryGradesView, { type TheoryGrade } from './TheoryGradesView';

import theoryImg from '../assets/images/theory_physics_lesson_1794766163206.jpg';
import videoImg from '../assets/images/video_physics_lecture_1794766163559.jpg';
import testsImg from '../assets/images/physics_quiz_test_1794766165407.jpg';
import libraryImg from '../assets/images/physics_digital_library_1794766164428.jpg';
import simulationImg from '../assets/images/physics_3d_simulation_1794845647265.jpg';
import laboratoryImg from '../assets/images/physics_laboratory_work_1795545684004.jpg';
import aiImg from '../assets/images/ai_physics_assistant_1794766165894.jpg';

gsap.registerPlugin(useGSAP);

type LabSectionTab =
  | 'all'
  | 'theory'
  | 'video'
  | 'tests'
  | 'library'
  | 'simulation'
  | 'laboratory'
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
    id: 'laboratory',
    title: 'Laboratoriya',
    icon: FlaskConical,
    image: laboratoryImg,
    imageAlt: 'Laboratoriya — fizika tajribalari va o‘lchov asboblari',
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
    blur: 16,
    opacity: theme === 'dark' ? 0.56 : 0.44,
    saturation: 1.25,
    edge: 0.78,
    tint: theme === 'dark' ? '#16244A' : '#EEF7FF',
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
  onChangeViewMode,
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
  const [selectedSimulationChapterId, setSelectedSimulationChapterId] =
    useState<string | null>(null);
  const [selectedLabSubSectionId, setSelectedLabSubSectionId] =
    useState<LaboratorySubSectionId | null>(null);

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

  const handleGoHome = () => {
    setSelectedTheoryGrade(null);
    setSelectedTestGrade(null);
    setSelectedLibraryGrade(null);
    setSelectedSimulationChapterId(null);
    setSelectedLabSubSectionId(null);
    setActiveModuleTab('all');
    onChangeViewMode?.('sections');
  };

  const tempC = Math.round(temperatureK - 273.15);

  if (isAiOpen) {
    return <AiSectionView onBack={() => setActiveModuleTab('all')} />;
  }

  return (
    <div
      ref={rootRef}
      data-theme={theme}
      className={`gw-root fizlab-gw-lab relative w-full h-full overflow-hidden rounded-[28px] border border-white/45 dark:border-white/14 ${
        viewMode === 'simulator'
          ? 'bg-[#DCEBF5] dark:bg-[#050A1C]'
          : 'glass-panel-subtle'
      }`}
      style={
        {
          '--gw-blur': `${material.blur}px`,
          '--gw-opacity': material.opacity,
          '--gw-saturation': material.saturation,
          '--gw-tint': `color-mix(in srgb, var(--color-background, Canvas) 72%, ${material.tint})`,
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
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#DCEBF5]/90 dark:bg-[#050A1C]/90 p-6 text-center">
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
            viewMode === 'sections' ? 'flex-1 min-h-0' : ''
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
              <button
                type="button"
                onClick={handleGoHome}
                aria-label="Bosh sahifaga qaytish"
                title="Bosh sahifaga qaytish"
                className="fizlab-brand-home-btn"
              >
                <img
                  src="/logo.png"
                  alt="FizLab 3D"
                  className="h-9 sm:h-10 w-auto object-contain shrink-0 select-none"
                />
              </button>
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
                  className="fizlab-logout-orb"
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
              <SimulationChaptersView
                selectedChapterId={selectedSimulationChapterId}
                onSelectChapterId={setSelectedSimulationChapterId}
                onBackToSections={() => {
                  setSelectedSimulationChapterId(null);
                  setActiveModuleTab('all');
                }}
                theme={theme}
              />
            ) : activeModuleTab === 'laboratory' ? (
              <LaboratorySectionsView
                selectedSubSectionId={selectedLabSubSectionId}
                onSelectSubSectionId={setSelectedLabSubSectionId}
                onBackToSections={() => {
                  setSelectedLabSubSectionId(null);
                  setActiveModuleTab('all');
                }}
                theme={theme}
              />
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
                        if (sec.id === 'simulation') {
                          setSelectedSimulationChapterId(null);
                        }
                        if (sec.id === 'laboratory') {
                          setSelectedLabSubSectionId(null);
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
                    className="fizlab-quiz-secondary-btn !py-2.5 !px-3.5 !text-xs"
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
  --gw-ink: #0B132B;
  --gw-muted: rgba(11, 19, 43, 0.64);
  --gw-line: rgba(11, 19, 43, 0.1);
  --gw-accent: #0077E6;
  --gw-brand: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  --gw-brand-ink: #FFFFFF;
  --gw-dock-shadow: rgba(0, 80, 204, 0.42);
  --gw-surface: rgba(255, 255, 255, 0.36);
  min-height: 0;
  height: 100%;
  padding: 0;
  background: transparent;
  font-family: var(--font-sans);
}
.gw-root.fizlab-gw-lab[data-theme="dark"] {
  --gw-ink: #F1F7FF;
  --gw-muted: rgba(241, 247, 255, 0.68);
  --gw-line: rgba(241, 247, 255, 0.12);
  --gw-accent: #2E9BFF;
  --gw-surface: rgba(14, 24, 52, 0.56);
}
.gw-root.fizlab-gw-lab .fizlab-topbar {
  height: 54px;
  margin-bottom: 0;
  border-radius: 999px;
  padding: 0 16px;
}
.gw-root.fizlab-gw-lab .gw-button {
  border-radius: 999px;
  background: linear-gradient(160deg, #2E9BFF 0%, #0066E6 65%, #0050CC 100%);
  color: #FFFFFF;
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.78),
    inset 0 -2px 6px rgba(0, 32, 100, 0.28),
    0 10px 22px -10px rgba(0, 80, 204, 0.56);
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1), filter 0.2s ease;
}
.gw-root.fizlab-gw-lab .gw-button:hover {
  transform: translateY(-1px);
  filter: brightness(1.06);
}
.gw-root.fizlab-gw-lab .fizlab-lab-dock {
  border-radius: 999px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.36);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.85),
    inset 0 0 0 1px rgba(255, 255, 255, 0.48),
    0 14px 34px -18px rgba(0, 40, 90, 0.45);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
}
.gw-root.fizlab-gw-lab[data-theme="dark"] .fizlab-lab-dock {
  background: rgba(12, 22, 52, 0.66);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.32),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    0 16px 36px -16px rgba(0, 0, 0, 0.75);
}
.gw-root.fizlab-gw-lab .fizlab-lab-dock button {
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
}
.gw-root.fizlab-gw-lab .fizlab-lab-dock button[aria-current="page"] {
  background: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  color: #FFFFFF;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.72),
    0 6px 16px -6px rgba(0, 80, 204, 0.56);
}
.gw-root.fizlab-gw-lab .gw-segment {
  border-radius: 999px;
}
.gw-root.fizlab-gw-lab .gw-segment button {
  border-radius: 999px;
}
.gw-root.fizlab-gw-lab .gw-segment button[aria-pressed="true"] {
  background: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  color: #FFFFFF;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.72);
}
.gw-root.fizlab-gw-lab .fizlab-hud-card {
  padding: 12px 18px;
  border-radius: 22px;
}
.gw-root.fizlab-gw-lab .fizlab-empty-card {
  padding: 18px 20px;
  border-radius: 24px;
}

/* ===================== Nimbus UI · Liquid Glass ("Tidepool") Design System ===================== */
.fizlab-neo-topbar {
  position: relative;
  height: 58px;
  margin-bottom: 0;
  padding: 0 18px;
  border-radius: 28px;
  border: none;
  background: linear-gradient(155deg, rgba(255, 255, 255, 0.48) 0%, rgba(232, 245, 255, 0.28) 100%);
  -webkit-backdrop-filter: blur(16px) saturate(1.25) brightness(1.06);
  backdrop-filter: blur(16px) saturate(1.25) brightness(1.06);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.52),
    inset 0 -2px 8px rgba(0, 162, 255, 0.08),
    0 20px 44px -22px rgba(0, 40, 90, 0.48),
    0 2px 6px rgba(0, 40, 90, 0.07);
}
[data-theme="dark"] .fizlab-neo-topbar {
  background: linear-gradient(155deg, rgba(22, 36, 74, 0.58) 0%, rgba(8, 16, 40, 0.48) 100%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    inset 0 -2px 10px rgba(0, 140, 255, 0.1),
    0 22px 48px -22px rgba(0, 0, 0, 0.78);
}

.fizlab-neo-brand-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  color: #FFFFFF;
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.8),
    inset 0 0 0 1px rgba(255, 255, 255, 0.45),
    0 8px 18px -6px rgba(0, 80, 204, 0.58);
}
[data-theme="dark"] .fizlab-neo-brand-icon {
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.58),
    inset 0 0 0 1px rgba(125, 211, 252, 0.32),
    0 8px 20px -6px rgba(0, 120, 255, 0.55);
}

.fizlab-neo-brand-title {
  font-weight: 800;
  font-size: 16px;
  color: #0B132B;
  letter-spacing: -0.02em;
}
[data-theme="dark"] .fizlab-neo-brand-title {
  color: #F1F7FF;
}

.gw-root .fizlab-brand-home-btn {
  display: inline-flex;
  align-items: center;
  padding: 2px 4px;
  border: none;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1), opacity 0.18s ease;
}
.gw-root .fizlab-brand-home-btn:hover {
  transform: scale(1.03);
}
.gw-root .fizlab-brand-home-btn:active {
  transform: scale(0.97);
}
.gw-root .fizlab-brand-home-btn:focus-visible {
  outline: 2px solid #00A2FF;
  outline-offset: 2px;
}

.gw-root .fizlab-logout-orb {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.56);
  color: #B42318;
  cursor: pointer;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(229, 72, 77, 0.26),
    0 8px 18px -10px rgba(0, 40, 90, 0.35);
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1), background-color 0.2s ease;
}
.gw-root .fizlab-logout-orb:hover {
  background: rgba(254, 226, 226, 0.85);
  transform: scale(1.06);
}
.gw-root[data-theme="dark"] .fizlab-logout-orb {
  background: rgba(229, 72, 77, 0.14);
  color: #FDA4AF;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.26),
    inset 0 0 0 1px rgba(253, 164, 175, 0.28),
    0 8px 18px -8px rgba(0, 0, 0, 0.58);
}
.gw-root[data-theme="dark"] .fizlab-logout-orb:hover {
  background: rgba(229, 72, 77, 0.24);
}

/* Liquid Glass Cards (.lc-panel + .lc-glass) */
.gw-root .fizlab-neo-card {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 18px 22px;
  border: none;
  background: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.44) 0%,
    rgba(232, 245, 255, 0.26) 100%
  );
  -webkit-backdrop-filter: blur(16px) saturate(1.25) brightness(1.06);
  backdrop-filter: blur(16px) saturate(1.25) brightness(1.06);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5),
    inset 0 -3px 12px rgba(0, 162, 255, 0.08),
    0 22px 50px -24px rgba(0, 40, 90, 0.48),
    0 2px 6px rgba(0, 40, 90, 0.08);
  transition:
    transform 0.26s cubic-bezier(0.25, 1.25, 0.35, 1),
    box-shadow 0.26s ease,
    background 0.26s ease;
}
.gw-root .fizlab-neo-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    125deg,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(255, 255, 255, 0.06) 36%,
    rgba(0, 162, 255, 0.04) 72%,
    rgba(255, 255, 255, 0.2) 100%
  );
  pointer-events: none;
  z-index: 0;
}
.gw-root .fizlab-neo-card > * {
  position: relative;
  z-index: 1;
}
.gw-root[data-theme="dark"] .fizlab-neo-card {
  background: linear-gradient(
    155deg,
    rgba(22, 36, 74, 0.56) 0%,
    rgba(7, 14, 36, 0.48) 100%
  );
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.32),
    inset 0 0 0 1px rgba(255, 255, 255, 0.13),
    inset 0 -3px 14px rgba(0, 140, 255, 0.12),
    0 22px 52px -22px rgba(0, 0, 0, 0.78),
    0 2px 8px rgba(0, 10, 34, 0.45);
}
.gw-root[data-theme="dark"] .fizlab-neo-card::before {
  background: linear-gradient(
    125deg,
    rgba(125, 211, 252, 0.12) 0%,
    rgba(255, 255, 255, 0.02) 38%,
    rgba(0, 110, 255, 0.04) 72%,
    rgba(186, 230, 253, 0.08) 100%
  );
}
.gw-root .fizlab-neo-card.is-interactive:hover {
  transform: translateY(-2px) scale(1.012);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.96),
    inset 0 0 0 1px rgba(0, 162, 255, 0.38),
    inset 0 -3px 14px rgba(0, 162, 255, 0.14),
    0 26px 56px -22px rgba(0, 50, 120, 0.54),
    0 4px 10px rgba(0, 40, 90, 0.1);
}
.gw-root[data-theme="dark"] .fizlab-neo-card.is-interactive:hover {
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.4),
    inset 0 0 0 1px rgba(46, 155, 255, 0.42),
    inset 0 -3px 16px rgba(0, 140, 255, 0.2),
    0 26px 58px -20px rgba(0, 0, 0, 0.85),
    0 0 24px -8px rgba(46, 155, 255, 0.3);
}
.gw-root .fizlab-neo-card.is-interactive:active {
  transform: scale(0.985);
}

.fizlab-neo-heading {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(16px, 1.4vw, 18px);
  color: #0B132B;
  letter-spacing: -0.025em;
}
[data-theme="dark"] .fizlab-neo-heading {
  color: #F1F7FF;
}

/* Liquid Glass Icon Orbs */
.fizlab-neo-icon {
  position: relative;
  background: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  border: none;
  border-radius: 999px;
  width: 38px;
  height: 38px;
  display: grid;
  place-content: center;
  color: #FFFFFF;
  flex: none;
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.84),
    inset 0 0 0 1px rgba(255, 255, 255, 0.46),
    inset 0 -3px 6px rgba(0, 25, 90, 0.28),
    0 10px 20px -8px rgba(0, 80, 204, 0.56);
  transition: transform 0.25s cubic-bezier(0.3, 1.6, 0.5, 1), box-shadow 0.25s ease;
}
.fizlab-neo-icon.is-dark-badge {
  background: linear-gradient(160deg, #16244A 0%, #050A1C 100%);
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.52),
    inset 0 0 0 1px rgba(125, 211, 252, 0.3),
    0 10px 20px -8px rgba(5, 10, 28, 0.65);
}
[data-theme="dark"] .fizlab-neo-icon {
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.58),
    inset 0 0 0 1px rgba(125, 211, 252, 0.34),
    0 10px 22px -8px rgba(0, 120, 255, 0.55);
}
.fizlab-neo-card.is-interactive:hover .fizlab-neo-icon {
  transform: scale(1.09);
}

/* Recessed Liquid Glass Well (.lc-box) */
.fizlab-neo-well {
  width: 100%;
  background: rgba(255, 255, 255, 0.26);
  border: none;
  padding: 12px 16px;
  border-radius: 16px;
  box-shadow:
    inset 0 0 0 1px rgba(11, 19, 43, 0.09),
    inset 0 1px 2px rgba(0, 40, 90, 0.06);
  transition: box-shadow 0.24s ease, background-color 0.24s ease;
}
[data-theme="dark"] .fizlab-neo-well {
  background: rgba(255, 255, 255, 0.045);
  box-shadow:
    inset 0 0 0 1px rgba(241, 247, 255, 0.11),
    inset 0 1px 3px rgba(0, 0, 0, 0.3);
}
.fizlab-neo-card.is-interactive:hover .fizlab-neo-well {
  box-shadow:
    inset 0 0 0 1.5px rgba(0, 162, 255, 0.48),
    inset 0 1px 2px rgba(0, 40, 90, 0.06);
}

/* Primary Nimbus Liquid Pill CTA Button (.lc-pay sky fill) */
.gw-root .fizlab-neo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 620;
  letter-spacing: -0.01em;
  background: linear-gradient(160deg, #2E9BFF 0%, #0066E6 60%, #0050CC 100%);
  color: #FFFFFF;
  border-radius: 999px;
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.82),
    inset 0 0 0 1px rgba(255, 255, 255, 0.34),
    inset 0 -2px 6px rgba(0, 28, 95, 0.32),
    0 10px 22px -10px rgba(0, 80, 204, 0.62);
  border: none;
  cursor: pointer;
  transition:
    transform 0.22s cubic-bezier(0.3, 1.6, 0.5, 1),
    box-shadow 0.22s ease,
    filter 0.22s ease;
}
.gw-root .fizlab-neo-btn:hover {
  transform: translateY(-1px) scale(1.03);
  filter: brightness(1.06);
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.42),
    inset 0 -2px 6px rgba(0, 28, 95, 0.32),
    0 14px 26px -10px rgba(0, 90, 220, 0.68);
}
.gw-root .fizlab-neo-btn:active {
  transform: scale(0.96);
}
.gw-root .fizlab-neo-btn:focus-visible {
  outline: 2px solid #00A2FF;
  outline-offset: 3px;
}
.gw-root[data-theme="dark"] .fizlab-neo-btn {
  box-shadow:
    inset 0 1.5px 1px rgba(255, 255, 255, 0.62),
    inset 0 0 0 1px rgba(125, 211, 252, 0.35),
    inset 0 -2px 6px rgba(0, 24, 90, 0.45),
    0 10px 24px -8px rgba(0, 120, 255, 0.56);
}

/* Liquid Glass Topic / Chapter Rows (.lc-row / .lc-box) */
.gw-root .fizlab-neo-topic-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  padding: 11px 14px;
  border-radius: 14px;
  border: none;
  background: rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 0 0 1px rgba(11, 19, 43, 0.08);
  color: #0B132B;
  font-size: 13.5px;
  font-weight: 540;
  line-height: 1.45;
  letter-spacing: 0;
  cursor: pointer;
  transition: background 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}
.gw-root .fizlab-neo-topic-row:hover {
  background: rgba(255, 255, 255, 0.72);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    inset 0 0 0 1.5px rgba(0, 162, 255, 0.46),
    0 6px 16px -10px rgba(0, 70, 140, 0.32);
  transform: translateX(2px);
}
.gw-root[data-theme="dark"] .fizlab-neo-topic-row {
  background: rgba(255, 255, 255, 0.055);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    inset 0 0 0 1px rgba(241, 247, 255, 0.11);
  color: #F1F7FF;
}
.gw-root[data-theme="dark"] .fizlab-neo-topic-row:hover {
  background: rgba(46, 155, 255, 0.12);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    inset 0 0 0 1.5px rgba(46, 155, 255, 0.5);
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
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.36);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.85),
    inset 0 0 0 1px rgba(11, 19, 43, 0.1);
  color: #0B132B;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, box-shadow 0.18s ease, color 0.18s ease, transform 0.18s ease;
}
.gw-root .fizlab-quiz-num-btn:hover {
  background: rgba(255, 255, 255, 0.65);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.92),
    inset 0 0 0 1.5px #00A2FF;
}
.gw-root .fizlab-quiz-num-btn[data-answered="true"] {
  background: rgba(46, 155, 255, 0.2);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.8),
    inset 0 0 0 1px rgba(0, 128, 255, 0.45);
  color: #0050CC;
}
.gw-root .fizlab-quiz-num-btn[data-active="true"] {
  background: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.72),
    0 6px 14px -5px rgba(0, 80, 204, 0.56);
  color: #FFFFFF;
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn {
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.18),
    inset 0 0 0 1px rgba(241, 247, 255, 0.14);
  color: #F1F7FF;
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 0 0 1.5px #2E9BFF;
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn[data-answered="true"] {
  background: rgba(46, 155, 255, 0.2);
  box-shadow: inset 0 0 0 1px rgba(46, 155, 255, 0.5);
  color: #BAE6FD;
}
.gw-root[data-theme="dark"] .fizlab-quiz-num-btn[data-active="true"] {
  background: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.58),
    0 6px 16px -5px rgba(0, 120, 255, 0.55);
  color: #FFFFFF;
}

.gw-root .fizlab-quiz-option {
  width: 100%;
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 16px;
  border: none;
  background: rgba(255, 255, 255, 0.44);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.85),
    inset 0 0 0 1px rgba(11, 19, 43, 0.1);
  color: #0B132B;
  text-align: left;
  letter-spacing: 0;
  cursor: pointer;
  transition: background 0.18s ease, box-shadow 0.18s ease;
}
.gw-root .fizlab-quiz-option:hover {
  background: rgba(255, 255, 255, 0.72);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.92),
    inset 0 0 0 1.5px rgba(0, 162, 255, 0.52);
}
.gw-root .fizlab-quiz-option[aria-pressed="true"] {
  background: rgba(46, 155, 255, 0.18);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.85),
    inset 0 0 0 1.5px #0077E6;
}
.gw-root[data-theme="dark"] .fizlab-quiz-option {
  background: rgba(255, 255, 255, 0.055);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.16),
    inset 0 0 0 1px rgba(241, 247, 255, 0.13);
  color: #F1F7FF;
}
.gw-root[data-theme="dark"] .fizlab-quiz-option:hover {
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 1.5px rgba(46, 155, 255, 0.56);
}
.gw-root[data-theme="dark"] .fizlab-quiz-option[aria-pressed="true"] {
  background: rgba(46, 155, 255, 0.22);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.34),
    inset 0 0 0 1.5px #2E9BFF;
  color: #FFFFFF;
}

/* Secondary Frosted Liquid Pill Buttons (.lc-pay resting state) */
.gw-root .fizlab-quiz-secondary-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.34);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.52),
    inset 0 -2px 6px rgba(0, 162, 255, 0.14),
    0 8px 20px -10px rgba(0, 70, 140, 0.42);
  color: #0B132B;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1), background 0.2s ease, box-shadow 0.2s ease;
}
.gw-root .fizlab-quiz-secondary-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.56);
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.96),
    inset 0 0 0 1px rgba(0, 162, 255, 0.36),
    inset 0 -2px 6px rgba(0, 162, 255, 0.2),
    0 10px 22px -10px rgba(0, 70, 140, 0.48);
}
.gw-root .fizlab-quiz-secondary-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.gw-root[data-theme="dark"] .fizlab-quiz-secondary-btn {
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    0 8px 20px -10px rgba(0, 0, 0, 0.65);
  color: #F1F7FF;
}
.gw-root[data-theme="dark"] .fizlab-quiz-secondary-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.14);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.42),
    inset 0 0 0 1px rgba(46, 155, 255, 0.42),
    0 10px 22px -8px rgba(0, 0, 0, 0.72);
}

.gw-root .fizlab-lib-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 6px 14px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.36);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 0 0 1px rgba(255, 255, 255, 0.52),
    inset 0 -2px 6px rgba(0, 162, 255, 0.14),
    0 8px 18px -10px rgba(0, 70, 140, 0.4);
  color: #0B132B;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  flex-shrink: 0;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.3, 1.5, 0.5, 1), background 0.2s ease, box-shadow 0.2s ease;
}
.gw-root .fizlab-lib-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.62);
  transform: translateY(-0.5px);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.96),
    inset 0 0 0 1px rgba(0, 162, 255, 0.36),
    0 10px 20px -10px rgba(0, 70, 140, 0.45);
}
.gw-root .fizlab-lib-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.gw-root[data-theme="dark"] .fizlab-lib-btn {
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.14),
    0 8px 18px -10px rgba(0, 0, 0, 0.65);
  color: #F1F7FF;
}
.gw-root[data-theme="dark"] .fizlab-lib-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.42),
    inset 0 0 0 1px rgba(46, 155, 255, 0.42),
    0 10px 20px -8px rgba(0, 0, 0, 0.72);
}

.gw-root .fizlab-lib-select {
  height: 36px;
  max-width: 100%;
  padding: 0 12px;
  border-radius: 14px;
  border: none;
  background: rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 0 0 1px rgba(11, 19, 43, 0.1),
    inset 0 1px 2px rgba(0, 40, 90, 0.06);
  color: #0B132B;
  font-size: 12px;
  font-weight: 540;
  letter-spacing: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.gw-root[data-theme="dark"] .fizlab-lib-select {
  background: rgba(16, 28, 60, 0.84);
  box-shadow:
    inset 0 0 0 1px rgba(241, 247, 255, 0.14),
    inset 0 1px 2px rgba(0, 0, 0, 0.3);
  color: #F1F7FF;
}

.gw-root .fizlab-lib-input {
  width: 54px;
  height: 36px;
  padding: 0 8px;
  border-radius: 14px;
  border: none;
  background: rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 0 0 1px rgba(11, 19, 43, 0.1),
    inset 0 1px 2px rgba(0, 40, 90, 0.06);
  color: #0B132B;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0;
}
.gw-root[data-theme="dark"] .fizlab-lib-input {
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    inset 0 0 0 1px rgba(241, 247, 255, 0.14),
    inset 0 1px 2px rgba(0, 0, 0, 0.3);
  color: #F1F7FF;
}

.gw-root.fizlab-gw-lab .fizlab-bottom-dock {
  padding: 14px 18px;
  border-radius: 26px;
}
.gw-root.fizlab-gw-lab .fizlab-rail {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  margin-top: 0;
  border-radius: 999px;
}
.gw-root.fizlab-gw-lab .fizlab-rail button {
  border-radius: 999px;
}
.gw-root.fizlab-gw-lab .fizlab-rail button[aria-current="page"] {
  background: linear-gradient(160deg, #2E9BFF 0%, #0050CC 100%);
  color: #FFFFFF;
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
    padding: 8px 14px;
    border-radius: 24px;
    flex-wrap: wrap;
    gap: 8px;
  }
  .fizlab-neo-card {
    border-radius: 26px;
    padding: 16px 16px;
  }
  .gw-root.fizlab-gw-lab .fizlab-lab-dock button {
    padding: 6px 11px;
    font-size: 11px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .gw-root .fizlab-neo-card,
  .gw-root .fizlab-neo-btn,
  .gw-root .fizlab-neo-icon,
  .gw-root .fizlab-neo-topic-row,
  .gw-root .fizlab-quiz-secondary-btn,
  .gw-root .fizlab-lib-btn {
    transition: none;
  }
}
`;
