import React, { useEffect, useState } from 'react';
import {
  ArrowUp,
  BookOpen,
  CheckCircle2,
  Download,
  Home,
  Maximize2,
  Minimize2,
  Search,
  SlidersHorizontal,
  Trash2,
  Wrench,
  X,
} from 'lucide-react';
import { ChapterView } from './components/ChapterView';
import { ChaptersDirectory } from './components/ChaptersDirectory';
import { ChecklistsView } from './components/ChecklistsView';
import { ExportPdfModal } from './components/ExportPdfModal';
import { GlossaryView } from './components/GlossaryView';
import { HomeView } from './components/HomeView';
import { InteractiveLabsView } from './components/InteractiveLabsView';
import { OfflineSearchModal } from './components/OfflineSearchModal';
import { PrintBookView } from './components/PrintBookView';
import { RegionsView } from './components/RegionsView';
import { StandardsView } from './components/StandardsView';
import { CHAPTERS, CHAPTER_BY_NUMBER } from './data/chapters';
import { AUDIT_DATE, PARTS } from './data/parts';
import type { TextScale } from './types/pocketbook';
import { usePocketbookState } from './utils/storage';

type ViewMode =
  | 'home'
  | 'chapter'
  | 'chapters'
  | 'standards'
  | 'regions'
  | 'labs'
  | 'checklists'
  | 'glossary'
  | 'print-book';

function parseHashRoute(): { view: ViewMode; chapterNum: number } {
  const hash = window.location.hash.replace(/^#/, '').trim().toLowerCase();
  if (!hash || hash === 'home') return { view: 'home', chapterNum: 1 };
  const chMatch = hash.match(/^ch-(\d{1,3})$/);
  if (chMatch) {
    const n = Number.parseInt(chMatch[1], 10);
    if (n >= 1 && n <= CHAPTERS.length) return { view: 'chapter', chapterNum: n };
  }
  if (
    hash === 'chapters' ||
    hash === 'standards' ||
    hash === 'regions' ||
    hash === 'labs' ||
    hash === 'checklists' ||
    hash === 'glossary'
  ) {
    return { view: hash, chapterNum: 1 };
  }
  return { view: 'home', chapterNum: 1 };
}

export default function App() {
  const {
    state: userState,
    toggleCompleted,
    toggleBookmark,
    toggleChecklistItem,
    recordQuizScore,
    setLastVisitedChapter,
    setAudienceFilter,
    setTextScale,
    toggleDistractionFree,
    toggleLowBandwidthDiagrams,
    resetAllProgress,
  } = usePocketbookState();

  const initialRoute = parseHashRoute();
  const [view, setView] = useState<ViewMode>(initialRoute.view);
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number>(
    initialRoute.view === 'chapter' ? initialRoute.chapterNum : userState.lastVisitedChapter
  );
  const [printBookScope, setPrintBookScope] = useState<number | 'all'>(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  const navigateToView = (nextView: Exclude<ViewMode, 'chapter' | 'print-book'>) => {
    setView(nextView);
    window.history.replaceState(null, '', `#${nextView}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openChapter = (chapterNumber: number) => {
    const valid = Boolean(CHAPTER_BY_NUMBER[chapterNumber]) ? chapterNumber : 1;
    setCurrentChapterNumber(valid);
    setLastVisitedChapter(valid);
    setView('chapter');
    window.history.replaceState(null, '', `#ch-${String(valid).padStart(3, '0')}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPrintBook = (partId: number | 'all') => {
    setPrintBookScope(partId);
    setView('print-book');
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHashRoute();
      if (parsed.view === 'chapter') {
        setCurrentChapterNumber(parsed.chapterNum);
        setLastVisitedChapter(parsed.chapterNum);
      }
      setView(parsed.view);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [setLastVisitedChapter]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (!inInput && e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackTop(window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (view === 'print-book') {
    return (
      <PrintBookView
        scopePartId={printBookScope}
        onExit={() => setView('home')}
      />
    );
  }

  const activeChapter = CHAPTER_BY_NUMBER[currentChapterNumber] ?? CHAPTERS[0];
  const activePart = PARTS.find((p) => p.id === activeChapter.partId);
  const siblingChapters = CHAPTERS.filter((c) => c.partId === activeChapter.partId);

  const navItems: { id: Exclude<ViewMode, 'chapter' | 'print-book'>; label: string }[] = [
    { id: 'chapters', label: 'Chapters' },
    { id: 'standards', label: 'Standards' },
    { id: 'regions', label: 'Regions' },
    { id: 'labs', label: 'Tools' },
    { id: 'checklists', label: 'Checklists' },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col overflow-x-clip">
      {/* Minimal Distraction-Free 3-Zone Top Bar */}
      <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateToView('home')}
            className="text-left flex items-baseline gap-2 min-w-0 whitespace-nowrap shrink-0"
          >
            <span className="font-serif text-base sm:text-lg font-semibold text-neutral-900 tracking-tight">
              Civil Pocketbook
            </span>
            <span className="font-mono text-[11px] text-blue-900 hidden sm:inline">
              IN · 180 CH
            </span>
          </button>

          {/* Zone 2: 5 Single-Line Navigation Links (hidden in Distraction-Free mode on desktop) */}
          {!userState.distractionFree && (
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-6 text-sm"
            >
              {navItems.map((item) => {
                const isActive =
                  view === item.id || (view === 'chapter' && item.id === 'chapters');
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToView(item.id)}
                    className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                      isActive
                        ? 'border-blue-900 text-blue-900 font-semibold'
                        : 'border-transparent text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Zone 3: Single Primary Action + Compact Settings Icon */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:text-neutral-900 transition-colors"
              aria-label="Display settings, glossary and PDF export"
              title="Display settings, Glossary & Export PDF"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 h-10 bg-blue-900 text-white text-xs font-medium hover:bg-blue-950 transition-colors whitespace-nowrap shrink-0"
              aria-label="Open offline search"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-20 lg:pb-12">
        {view === 'chapter' && !userState.distractionFree ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Chapter Outline Rail */}
            <aside className="no-print hidden lg:block lg:col-span-3 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto border-r border-neutral-200 pr-4 space-y-4">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => navigateToView('chapters')}
                  className="font-mono text-[11px] uppercase tracking-wider text-blue-900 hover:underline"
                >
                  ← All 14 Parts (180 Ch.)
                </button>
                {activePart && (
                  <div className="text-xs font-semibold text-neutral-900 pt-1">
                    {activePart.code}: {activePart.title}
                  </div>
                )}
              </div>

              <nav aria-label="Part chapters" className="space-y-1">
                {siblingChapters.map((c) => {
                  const isCurrent = c.number === activeChapter.number;
                  const done = userState.completedChapters.includes(c.number);
                  return (
                    <button
                      key={c.number}
                      type="button"
                      onClick={() => openChapter(c.number)}
                      className={`w-full text-left px-2.5 py-2 text-xs transition-colors flex items-start justify-between gap-2 ${
                        isCurrent
                          ? 'bg-blue-50/70 text-blue-950 font-semibold border border-blue-900/30'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border border-transparent'
                      }`}
                    >
                      <span className="leading-snug">
                        <span className="font-mono text-[10px] mr-1.5 tabular-nums">
                          {String(c.number).padStart(2, '0')}
                        </span>
                        {c.title}
                      </span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </nav>

              <div className="pt-3 border-t border-neutral-200 space-y-2">
                <button
                  type="button"
                  onClick={toggleDistractionFree}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-200 text-xs text-neutral-700 hover:bg-neutral-50"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Focus Reading Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-200 text-xs text-blue-900 font-medium hover:bg-neutral-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Offline PDF</span>
                </button>
              </div>
            </aside>

            <main className="lg:col-span-9 min-w-0">
              <ChapterView
                chapter={activeChapter}
                userState={userState}
                onOpenChapter={openChapter}
                onToggleComplete={toggleCompleted}
                onToggleBookmark={toggleBookmark}
                onToggleChecklistItem={toggleChecklistItem}
                onRecordQuizScore={recordQuizScore}
                onOpenStandards={() => navigateToView('standards')}
                onOpenGlossary={() => navigateToView('glossary')}
                onPrintCurrentPage={() => window.print()}
              />
            </main>
          </div>
        ) : (
          <main className="min-w-0">
            {view === 'chapter' && userState.distractionFree && (
              <div className="no-print max-w-4xl mx-auto mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={toggleDistractionFree}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 text-xs text-neutral-700 hover:bg-neutral-50"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Focus Mode</span>
                </button>
              </div>
            )}

            {view === 'home' && (
              <HomeView
                userState={userState}
                onSelectAudience={setAudienceFilter}
                onOpenChapter={openChapter}
                onNavigate={(v) => navigateToView(v)}
                onOpenExportModal={() => setExportOpen(true)}
                onOpenSearch={() => setSearchOpen(true)}
              />
            )}

            {view === 'chapter' && (
              <ChapterView
                chapter={activeChapter}
                userState={userState}
                onOpenChapter={openChapter}
                onToggleComplete={toggleCompleted}
                onToggleBookmark={toggleBookmark}
                onToggleChecklistItem={toggleChecklistItem}
                onRecordQuizScore={recordQuizScore}
                onOpenStandards={() => navigateToView('standards')}
                onOpenGlossary={() => navigateToView('glossary')}
                onPrintCurrentPage={() => window.print()}
              />
            )}

            {view === 'chapters' && (
              <ChaptersDirectory userState={userState} onOpenChapter={openChapter} />
            )}

            {view === 'standards' && <StandardsView />}

            {view === 'regions' && (
              <RegionsView
                userState={userState}
                onToggleChecklistItem={toggleChecklistItem}
                onPrintCurrentPage={() => window.print()}
              />
            )}

            {view === 'labs' && <InteractiveLabsView />}

            {view === 'checklists' && (
              <ChecklistsView
                userState={userState}
                onToggleChecklistItem={toggleChecklistItem}
                onOpenChapter={openChapter}
                onPrintCurrentPage={() => window.print()}
              />
            )}

            {view === 'glossary' && <GlossaryView onOpenChapter={openChapter} />}
          </main>
        )}
      </div>

      {/* Minimal Editorial Footer */}
      <footer className="no-print hidden lg:block border-t border-neutral-200 bg-neutral-50/50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="font-mono">
            The Indian House-Building &amp; Civil Engineering Pocketbook · 100% Local &amp; Offline
            · Audit {AUDIT_DATE}
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => navigateToView('glossary')}
              className="hover:text-neutral-900"
            >
              Glossary
            </button>
            <button
              type="button"
              onClick={() => navigateToView('standards')}
              className="hover:text-neutral-900"
            >
              BIS Register
            </button>
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="text-blue-900 font-medium hover:underline"
            >
              Export PDF
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Compact Bottom Navigation (<= 56px, thumb-reachable) */}
      <nav
        aria-label="Mobile navigation"
        className="no-print lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-neutral-200 pb-safe"
      >
        <div className="grid grid-cols-5 h-14">
          <button
            type="button"
            onClick={() => navigateToView('home')}
            className={`flex flex-col items-center justify-center gap-0.5 text-[11px] ${
              view === 'home' ? 'text-blue-900 font-semibold' : 'text-neutral-600'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToView('chapters')}
            className={`flex flex-col items-center justify-center gap-0.5 text-[11px] ${
              view === 'chapters' || view === 'chapter'
                ? 'text-blue-900 font-semibold'
                : 'text-neutral-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Chapters</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-neutral-600"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={() => navigateToView('labs')}
            className={`flex flex-col items-center justify-center gap-0.5 text-[11px] ${
              view === 'labs' ? 'text-blue-900 font-semibold' : 'text-neutral-600'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Tools</span>
          </button>

          <button
            type="button"
            onClick={() => setExportOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-blue-900 font-medium"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </button>
        </div>
      </nav>

      {/* Back to Top Button */}
      {showBackTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          className="no-print fixed right-4 bottom-20 lg:bottom-6 z-20 w-10 h-10 bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-700 hover:border-blue-900 hover:text-blue-900"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Display Settings, Screen Auto-Scale & Quick Modules Drawer */}
      {settingsOpen && (
        <div
          className="no-print fixed inset-0 z-50 bg-neutral-950/50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Pocketbook Display Settings and Modules"
          onClick={() => {
            setSettingsOpen(false);
            setConfirmReset(false);
          }}
        >
          <div
            className="w-full max-w-sm bg-white border-l border-neutral-300 h-full overflow-y-auto p-5 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <div className="font-mono text-[11px] uppercase text-blue-900 font-semibold">
                  READER SETTINGS &amp; MENU
                </div>
                <div className="font-serif text-lg font-semibold text-neutral-900">
                  Display &amp; Offline Tools
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  setConfirmReset(false);
                }}
                className="p-2 text-neutral-500 hover:text-neutral-900 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close settings drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Section Jump (especially helpful on mobile) */}
            <div className="space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Pocketbook Sections
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ['home', 'Home'],
                    ['chapters', '180 Chapters'],
                    ['standards', 'BIS Standards'],
                    ['regions', 'India Regions'],
                    ['checklists', 'Checklists'],
                    ['labs', 'Calculators'],
                    ['glossary', 'Glossary'],
                  ] as [Exclude<ViewMode, 'chapter' | 'print-book'>, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      navigateToView(id);
                      setSettingsOpen(false);
                    }}
                    className={`px-3 py-2 text-left text-xs font-medium border min-h-[40px] ${
                      view === id
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(false);
                    setExportOpen(true);
                  }}
                  className="px-3 py-2 text-left text-xs font-semibold border border-blue-900 text-blue-900 bg-blue-50/40 min-h-[40px]"
                >
                  Export PDF →
                </button>
              </div>
            </div>

            {/* Custom & Auto Screen Text Scaling */}
            <div className="space-y-2 border-t border-neutral-200 pt-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Screen Size &amp; Text Scaling
              </div>
              <p className="text-xs text-neutral-600">
                Auto adapts smoothly from 320px phones to wide desktops; pick a custom scale if
                preferred.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {(
                  [
                    ['compact', 'Compact (Dense)'],
                    ['auto', 'Auto (Screen Fit)'],
                    ['comfortable', 'Comfortable'],
                    ['large', 'Large Print'],
                  ] as [TextScale, string][]
                ).map(([scale, label]) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setTextScale(scale)}
                    className={`px-3 py-2 text-xs font-medium border min-h-[40px] ${
                      userState.textScale === scale
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Focus & Low-Bandwidth Diagram Toggles */}
            <div className="space-y-3 border-t border-neutral-200 pt-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Reading Preferences
              </div>

              <label className="flex items-start justify-between gap-3 cursor-pointer p-3 border border-neutral-200">
                <div>
                  <div className="text-xs font-semibold text-neutral-900">
                    Distraction-Free Reading Mode
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Hides top navigation links and desktop chapter rail for pure paper reading.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={userState.distractionFree}
                  onChange={toggleDistractionFree}
                  className="mt-1 w-4 h-4 accent-blue-900 shrink-0"
                />
              </label>

              <label className="flex items-start justify-between gap-3 cursor-pointer p-3 border border-neutral-200">
                <div>
                  <div className="text-xs font-semibold text-neutral-900">
                    Compact / Low-Bandwidth Diagrams
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Collapses inline diagrams by default; open any drawing on demand via Zoom.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={userState.lowBandwidthDiagrams}
                  onChange={toggleLowBandwidthDiagrams}
                  className="mt-1 w-4 h-4 accent-blue-900 shrink-0"
                />
              </label>
            </div>

            {/* Local Storage Transparency & Reset */}
            <div className="space-y-2 border-t border-neutral-200 pt-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                Local Device Storage
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                All reading progress, bookmarks, checklist ticks, and quiz scores stay exclusively
                in your browser&apos;s <code className="font-mono">localStorage</code>. Zero external
                APIs or accounts.
              </p>

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-red-300 text-red-800 text-xs font-medium hover:bg-red-50 min-h-[40px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Local Progress</span>
                </button>
              ) : (
                <div className="border border-red-300 bg-red-50/40 p-3 space-y-2 text-xs">
                  <div className="font-semibold text-red-900">
                    Reset all completed chapters, bookmarks, checklists, and quiz scores?
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        resetAllProgress();
                        setConfirmReset(false);
                      }}
                      className="px-3 py-1.5 bg-red-800 text-white font-medium min-h-[36px]"
                    >
                      Yes, Clear All
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 min-h-[36px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offline Search Modal */}
      <OfflineSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectChapter={openChapter}
        onNavigate={(v) => navigateToView(v)}
      />

      {/* Export to PDF Modal */}
      <ExportPdfModal
        open={exportOpen}
        currentChapterNumber={currentChapterNumber}
        onClose={() => setExportOpen(false)}
        onOpenPrintBook={openPrintBook}
        onPrintCurrentPage={() => window.print()}
      />
    </div>
  );
}
