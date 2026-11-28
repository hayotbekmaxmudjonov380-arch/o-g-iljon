import {
  BookOpen,
  Calculator,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Library,
  LogOut,
  PenTool,
  Sparkles,
  X,
} from 'lucide-react';
import { FizLabTheme, WorkspaceSection } from '../types/fizlab';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  activeSection: WorkspaceSection;
  onSelectSection: (section: WorkspaceSection) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onBackToIntro: () => void;
  solvedCount: number;
  totalExercises: number;
  theme: FizLabTheme;
  onToggleTheme: () => void;
  username: string;
  onLogout: () => void;
}

const MENU_ITEMS: {
  id: WorkspaceSection;
  label: string;
  subtitle: string;
  icon: typeof BookOpen;
}[] = [
  {
    id: 'nazariya',
    label: 'Nazariy qism',
    subtitle: 'MKN va termodinamika asoslari',
    icon: BookOpen,
  },
  {
    id: 'formulalar',
    label: "Formulalar to'plami",
    subtitle: 'Tenglamalar va hisoblagich',
    icon: Calculator,
  },
  {
    id: 'mashqlar',
    label: 'Amaliy mashqlar',
    subtitle: 'Masalalar va tekshiruv',
    icon: PenTool,
  },
  {
    id: 'kutubxona',
    label: 'Kutubxona',
    subtitle: 'Sinflar bo‘yicha darsliklar',
    icon: Library,
  },
  {
    id: 'laboratoriya',
    label: 'Laboratoriya ishlari',
    subtitle: '3D interaktiv tajribalar',
    icon: FlaskConical,
  },
];

export default function Sidebar({
  activeSection,
  onSelectSection,
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  onBackToIntro,
  solvedCount,
  totalExercises,
  theme,
  onToggleTheme,
  username,
  onLogout,
}: SidebarProps) {
  const progressPct = Math.round(
    (solvedCount / Math.max(1, totalExercises)) * 100
  );

  const sidebarContent = (isMobileDrawer: boolean) => {
    const compact = !isMobileDrawer && isCollapsed;
    return (
      <div className="flex flex-col h-full p-3.5 select-none">
        {/* Brand + Collapse Toggle Row */}
        <div
          className={`flex items-center ${
            compact ? 'justify-center' : 'justify-between'
          } gap-2 pb-4 mb-3 border-b border-slate-900/10 dark:border-white/10`}
        >
          {!compact && (
            <div className="min-w-0 space-y-1">
              <button
                type="button"
                onClick={() => {
                  onSelectSection('laboratoriya');
                  if (isMobileDrawer) onCloseMobile();
                }}
                aria-label="Bosh sahifaga qaytish"
                className="bg-transparent border-0 p-0 cursor-pointer flex items-center"
              >
                <img
                  src="/logo.png"
                  alt="FizLab 3D"
                  className="h-8 w-auto object-contain select-none"
                />
              </button>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                {username} · Molekulyar fizika
              </div>
            </div>
          )}

          {isMobileDrawer ? (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Menyuni yopish"
              className="w-9 h-9 rounded-xl bg-slate-900/[0.06] hover:bg-slate-900/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-900/10 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleCollapse}
              title={compact ? 'Menyuni ochish' : 'Menyuni yopish'}
              aria-label={compact ? 'Menyuni ochish' : 'Menyuni yopish'}
              className="w-9 h-9 rounded-xl bg-slate-900/[0.06] hover:bg-slate-900/[0.12] dark:bg-white/[0.06] dark:hover:bg-white/[0.14] border border-slate-900/12 dark:border-white/12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer shrink-0"
            >
              {compact ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5" aria-label="Asosiy bo'limlar">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                title={compact ? item.label : undefined}
                onClick={() => {
                  onSelectSection(item.id);
                  if (isMobileDrawer) onCloseMobile();
                }}
                className={`w-full flex items-center ${
                  compact ? 'justify-center px-0 py-3' : 'px-3.5 py-3 gap-3'
                } rounded-2xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'bg-sky-600/15 dark:bg-sky-500/20 border-sky-600/45 dark:border-sky-400/50 text-slate-950 dark:text-white shadow-sm'
                    : 'bg-transparent border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.07] hover:border-slate-900/10 dark:hover:border-white/10 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    active
                      ? 'bg-sky-600/20 dark:bg-sky-400/25 text-sky-700 dark:text-sky-300'
                      : 'bg-slate-900/[0.05] dark:bg-white/[0.05] text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </div>
                {!compact && (
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold truncate">
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Progress, Theme Toggle & Return to Intro */}
        <div className="pt-3 mt-3 border-t border-slate-900/10 dark:border-white/10 space-y-2.5">
          {!compact && (
            <div className="rounded-2xl bg-slate-900/[0.04] dark:bg-white/[0.04] border border-slate-900/10 dark:border-white/10 p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Mashqlar natijasi
                </span>
                <span className="font-mono-tabular text-sky-700 dark:text-sky-300 font-semibold">
                  {solvedCount}/{totalExercises}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-600 dark:bg-sky-400 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
            compact={compact}
          />

          <button
            type="button"
            onClick={onBackToIntro}
            title={compact ? 'Kirish animatsiyasi' : undefined}
            className={`w-full flex items-center ${
              compact ? 'justify-center px-0 py-2.5' : 'px-3.5 py-2.5 gap-2.5'
            } rounded-xl bg-slate-900/[0.05] hover:bg-slate-900/[0.1] dark:bg-white/[0.05] dark:hover:bg-white/[0.11] border border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-medium transition-colors cursor-pointer`}
          >
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-300 shrink-0" />
            {!compact && (
              <span className="truncate">Kirish animatsiyasiga qaytish</span>
            )}
          </button>

          <button
            type="button"
            onClick={onLogout}
            title={compact ? 'Chiqish' : undefined}
            className={`w-full flex items-center ${
              compact ? 'justify-center px-0 py-2.5' : 'px-3.5 py-2.5 gap-2.5'
            } rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-medium transition-colors cursor-pointer`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!compact && <span className="truncate">Tizimdan chiqish</span>}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Collapsible Glass Sidebar */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 h-full glass-hud rounded-3xl transition-[width] duration-200 ease-out overflow-hidden ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/75"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-72 max-w-[85vw] h-full glass-hud rounded-r-3xl">
            {sidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
