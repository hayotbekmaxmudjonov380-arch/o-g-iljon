import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
  type RenderTask,
} from 'pdfjs-dist';
import type { LibraryTextbook } from '../data/libraryBooksData';
import {
  clampBookPage,
  clampReaderZoom,
  findActiveChapterBookmark,
  formatZoomPercent,
  getReadingProgressPercent,
  MAX_READER_ZOOM,
  MIN_READER_ZOOM,
  READER_ZOOM_STEP,
  stepReaderZoom,
} from '../utils/libraryReader';

GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';

const LAST_PAGE_STORAGE_KEY = 'fizlab_library_last_pages_v1';

function loadSavedBookPage(grade: number, totalPages: number | null): number {
  try {
    const raw = localStorage.getItem(LAST_PAGE_STORAGE_KEY);
    if (!raw) return 1;
    const parsed = JSON.parse(raw) as Record<string, number>;
    const saved = parsed[String(grade)];
    if (typeof saved !== 'number') return 1;
    return totalPages ? clampBookPage(saved, totalPages) : Math.max(1, saved);
  } catch {
    return 1;
  }
}

function saveBookPage(grade: number, page: number) {
  try {
    const raw = localStorage.getItem(LAST_PAGE_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    parsed[String(grade)] = page;
    localStorage.setItem(LAST_PAGE_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore storage quota errors
  }
}

interface PdfBookReaderProps {
  book: LibraryTextbook;
  initialPage?: number;
  onBack: () => void;
}

export default function PdfBookReader({
  book,
  initialPage,
  onBack,
}: PdfBookReaderProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const docRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);

  const resolvedStartPage =
    typeof initialPage === 'number'
      ? clampBookPage(initialPage, book.pageCount ?? initialPage)
      : loadSavedBookPage(book.grade, book.pageCount);

  const [numPages, setNumPages] = useState<number>(book.pageCount ?? 1);
  const [currentPage, setCurrentPage] = useState<number>(resolvedStartPage);
  const [pageInput, setPageInput] = useState<string>(String(resolvedStartPage));
  const [zoom, setZoom] = useState<number>(1);
  const [stageWidth, setStageWidth] = useState<number>(760);
  const [docLoading, setDocLoading] = useState<boolean>(true);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  useEffect(() => {
    setPageInput(String(currentPage));
    saveBookPage(book.grade, currentPage);
  }, [book.grade, currentPage]);

  // Measure reader stage container width so page 100% fits container cleanly
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateWidth = () => {
      const next = Math.max(260, Math.floor(el.clientWidth - 24));
      setStageWidth((prev) => (Math.abs(prev - next) >= 4 ? next : prev));
    };

    updateWidth();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load PDF document when book changes or retry is triggered
  useEffect(() => {
    if (!book.pdfUrl) return;

    let cancelled = false;
    setDocLoading(true);
    setLoadError(null);

    const loadingTask = getDocument({
      url: book.pdfUrl,
      standardFontDataUrl: '/pdfjs/standard_fonts/',
      wasmUrl: '/pdfjs/wasm/',
      verbosity: 0,
    });

    loadingTask.promise
      .then((pdfDoc) => {
        if (cancelled) {
          void pdfDoc.cleanup();
          return;
        }
        docRef.current = pdfDoc;
        setNumPages(pdfDoc.numPages);
        setCurrentPage((prev) => clampBookPage(prev, pdfDoc.numPages));
        setDocLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setDocLoading(false);
        setLoadError(
          'Darslik PDF faylini ochishda xatolik yuz berdi. Qayta urinib ko‘ring yoki faylni yuklab oling.'
        );
      });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
      if (docRef.current) {
        void docRef.current.cleanup();
        docRef.current = null;
      }
      void loadingTask.destroy();
    };
  }, [book.pdfUrl, reloadNonce]);

  // Render active page to high-DPI canvas
  useEffect(() => {
    const pdfDoc = docRef.current;
    const canvas = canvasRef.current;
    if (!pdfDoc || !canvas || docLoading || loadError) return;

    let cancelled = false;
    setPageRendering(true);

    const render = async () => {
      try {
        renderTaskRef.current?.cancel();
      } catch {
        // Ignore cancellation rejection from prior render task
      }

      try {
        const safePage = clampBookPage(currentPage, pdfDoc.numPages);
        const page = await pdfDoc.getPage(safePage);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const targetCssWidth = Math.min(stageWidth, 820) * zoom;
        const cssScale = Math.max(0.35, targetCssWidth / baseViewport.width);
        const viewport = page.getViewport({ scale: cssScale });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.max(1, Math.floor(viewport.width * dpr));
        canvas.height = Math.max(1, Math.floor(viewport.height * dpr));
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const task = page.render({
          canvasContext: ctx,
          canvas,
          viewport,
          transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
        });
        renderTaskRef.current = task;
        await task.promise;
        if (!cancelled) {
          setPageRendering(false);
        }
      } catch (err) {
        const name =
          err && typeof err === 'object' && 'name' in err
            ? String((err as { name: unknown }).name)
            : '';
        if (name === 'RenderingCancelledException' || cancelled) {
          return;
        }
        setPageRendering(false);
        setLoadError('Sahifani ko‘rsatishda xatolik yuz berdi.');
      }
    };

    void render();

    return () => {
      cancelled = true;
      try {
        renderTaskRef.current?.cancel();
      } catch {
        // Ignore cancellation
      }
    };
  }, [currentPage, docLoading, loadError, stageWidth, zoom]);

  const goToPage = useCallback(
    (target: number) => {
      const next = clampBookPage(target, numPages);
      setCurrentPage(next);
      setPageInput(String(next));
      stageRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    },
    [numPages]
  );

  // Keyboard Left/Right navigation outside inputs
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        goToPage(currentPage - 1);
      } else if (e.key === 'ArrowRight') {
        goToPage(currentPage + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentPage, goToPage]);

  const activeChapter = findActiveChapterBookmark(book.chapters, currentPage);
  const progressPct = getReadingProgressPercent(currentPage, numPages);

  const commitPageInput = () => {
    const parsed = Number.parseInt(pageInput.trim(), 10);
    if (Number.isNaN(parsed)) {
      setPageInput(String(currentPage));
      return;
    }
    goToPage(parsed);
  };

  return (
    <div className="fizlab-quiz-scope w-full max-w-[980px] mx-auto pt-1 pb-6 space-y-4">
      <div className="fizlab-neo-card">
        {/* Top Book Header */}
        <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <span className="fizlab-neo-icon font-display font-bold text-sm">
              {book.grade}
            </span>
            <div className="min-w-0">
              <h2 className="fizlab-neo-heading text-base sm:text-lg leading-snug">
                {book.title}
              </h2>
              <div className="text-xs text-slate-600 dark:text-slate-300 truncate">
                {book.authors}
                {book.year ? ` · ${book.year}` : ''}
                {book.fileSizeLabel ? ` · ${book.fileSizeLabel}` : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto min-w-0">
            {book.pdfUrl && (
              <>
                <a
                  href={book.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fizlab-lib-btn"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  <span>Yangi oynada</span>
                </a>
                <a
                  href={book.pdfUrl}
                  download={book.downloadFileName ?? undefined}
                  className="fizlab-lib-btn"
                >
                  <Download size={14} aria-hidden="true" />
                  <span>Yuklab olish</span>
                </a>
              </>
            )}

            <button
              type="button"
              onClick={onBack}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Orqaga</span>
            </button>
          </div>
        </div>

        {/* Reader Toolbar & Canvas Well */}
        <div className="fizlab-neo-well !p-3 sm:!p-4 space-y-3">
          {/* Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-900/10 dark:border-white/10">
            {/* Chapter Jump */}
            {book.chapters.length > 0 && (
              <div className="w-full sm:w-auto sm:max-w-[300px] min-w-0">
                <label
                  htmlFor="library-chapter-select"
                  className="sr-only"
                >
                  Bob tanlash
                </label>
                <select
                  id="library-chapter-select"
                  value={activeChapter?.pdfPage ?? 1}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="fizlab-lib-select w-full min-w-0"
                  aria-label="Boblar bo‘yicha o‘tish"
                >
                  {book.chapters.map((ch) => (
                    <option key={ch.id} value={ch.pdfPage}>
                      {ch.title} ({ch.pdfPage}-sahifa)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Page Navigation */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1 || docLoading}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Oldingi sahifa"
                className="fizlab-lib-btn"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                <span className="hidden sm:inline">Oldingi</span>
              </button>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commitPageInput();
                }}
                className="flex items-center gap-1.5"
              >
                <label htmlFor="library-page-input" className="sr-only">
                  Sahifa raqami
                </label>
                <input
                  id="library-page-input"
                  type="text"
                  inputMode="numeric"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onBlur={commitPageInput}
                  aria-label="Sahifa raqami"
                  className="fizlab-lib-input font-mono-tabular"
                />
                <span className="text-xs font-mono-tabular text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  / {numPages}
                </span>
              </form>

              <button
                type="button"
                disabled={currentPage >= numPages || docLoading}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Keyingi sahifa"
                className="fizlab-lib-btn"
              >
                <span className="hidden sm:inline">Keyingi</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={zoom <= MIN_READER_ZOOM}
                onClick={() => setZoom((z) => stepReaderZoom(z, -READER_ZOOM_STEP))}
                aria-label="Kichiklashtirish"
                title="Kichiklashtirish"
                className="fizlab-lib-btn !px-2.5"
              >
                <ZoomOut size={14} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setZoom(clampReaderZoom(1))}
                aria-label="Asl o‘lcham"
                title="Asl o‘lchamga qaytarish"
                className="fizlab-lib-btn font-mono-tabular min-w-[60px] justify-center"
              >
                {formatZoomPercent(zoom)}
              </button>

              <button
                type="button"
                disabled={zoom >= MAX_READER_ZOOM}
                onClick={() => setZoom((z) => stepReaderZoom(z, READER_ZOOM_STEP))}
                aria-label="Kattalashtirish"
                title="Kattalashtirish"
                className="fizlab-lib-btn !px-2.5"
              >
                <ZoomIn size={14} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Reading progress metadata line (unboxed) */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="truncate">
              {activeChapter ? activeChapter.title : book.title}
            </span>
            <span className="font-mono-tabular shrink-0">
              {currentPage} / {numPages} sahifa · {progressPct}%
            </span>
          </div>

          {/* Scrollable PDF Page Stage */}
          <div
            ref={stageRef}
            data-testid="pdf-reader-stage"
            className="relative w-full min-h-[420px] max-h-[64vh] overflow-auto rounded-2xl border border-slate-900/10 dark:border-white/12 bg-slate-100/90 dark:bg-slate-950/70 p-3 flex justify-center items-start"
          >
            {loadError ? (
              <div className="my-auto max-w-md text-center space-y-3 p-6">
                <BookOpen
                  size={28}
                  className="mx-auto text-sky-600 dark:text-sky-400"
                  aria-hidden="true"
                />
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {loadError}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setReloadNonce((n) => n + 1)}
                    className="fizlab-lib-btn"
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    <span>Qayta yuklash</span>
                  </button>
                  {book.pdfUrl && (
                    <a
                      href={book.pdfUrl}
                      download={book.downloadFileName ?? undefined}
                      className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5"
                    >
                      <Download size={14} aria-hidden="true" />
                      <span>PDF yuklab olish</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative inline-block">
                {(docLoading || pageRendering) && (
                  <div
                    role="status"
                    className="mb-2 text-center text-xs text-slate-600 dark:text-slate-300 font-mono-tabular"
                  >
                    {docLoading
                      ? 'Darslik yuklanmoqda...'
                      : `${currentPage}-sahifa tayyorlanmoqda...`}
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  data-testid="pdf-page-canvas"
                  aria-label={`${book.title}, ${currentPage}-sahifa`}
                  className="block rounded-lg shadow-sm border border-slate-900/10 dark:border-white/10 bg-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
