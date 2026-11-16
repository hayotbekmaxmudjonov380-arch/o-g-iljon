import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

export default class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('FizLab UI error:', error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#eef4fb] dark:bg-[#060a14] text-slate-900 dark:text-slate-100 p-6">
          <div className="max-w-md w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 p-6 text-center space-y-4 shadow-lg">
            <h1 className="text-lg font-semibold">
              Sahifani yuklashda xatolik yuz berdi
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Ulanish uzilganda yoki server yangilanganda ushbu holat yuzaga
              kelishi mumkin. Sahifani qayta yuklang.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer"
            >
              Sahifani yangilash
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
