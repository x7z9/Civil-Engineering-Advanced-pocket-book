import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckSquare,
  Compass,
  Download,
  FileCheck2,
  MapPin,
  Wrench,
} from 'lucide-react';
import { CHAPTERS, CHAPTER_BY_NUMBER } from '../data/chapters';
import { AUDIT_DATE, CONSTRUCTION_JOURNEY_STAGES, EDITORIAL_DISCLAIMER, PARTS } from '../data/parts';
import { EDITION_CHECK_FLAGS } from '../data/standards';
import type { AudienceRole, LocalUserState } from '../types/pocketbook';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface HomeViewProps {
  userState: LocalUserState;
  onSelectAudience: (role: AudienceRole | 'all') => void;
  onOpenChapter: (chapterNumber: number) => void;
  onNavigate: (view: 'chapters' | 'standards' | 'regions' | 'labs' | 'checklists' | 'glossary') => void;
  onOpenExportModal: () => void;
  onOpenSearch: () => void;
}

const AUDIENCE_ROUTES: {
  id: AudienceRole | 'all';
  label: string;
  subtitle: string;
  startChapter: number;
  highlightChapters: number[];
}[] = [
  {
    id: 'all',
    label: 'Complete Pocketbook',
    subtitle: 'All 180 chapters across Parts 0–13 in construction sequence.',
    startChapter: 1,
    highlightChapters: [1, 18, 54, 85, 131, 158],
  },
  {
    id: 'student',
    label: 'I am a student',
    subtitle: 'First principles, load paths, soil mechanics, BIS codes & worked examples.',
    startChapter: 1,
    highlightChapters: [1, 18, 54, 65, 85, 175],
  },
  {
    id: 'homeowner',
    label: 'I am a homeowner',
    subtitle: 'Due diligence, plot rules, contractor oversight, red flags & handover checks.',
    startChapter: 2,
    highlightChapters: [2, 7, 28, 38, 156, 158],
  },
  {
    id: 'site',
    label: 'I work on site',
    subtitle: 'Hold points, pour cards, rebar cover, testing, waterproofing & QA logs.',
    startChapter: 131,
    highlightChapters: [74, 90, 95, 108, 131, 146],
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  userState,
  onSelectAudience,
  onOpenChapter,
  onNavigate,
  onOpenExportModal,
  onOpenSearch,
}) => {
  const completedCount = userState.completedChapters.length;
  const totalChapters = CHAPTERS.length;
  const progressPct = Math.round((completedCount / totalChapters) * 100);
  const lastChapter = CHAPTER_BY_NUMBER[userState.lastVisitedChapter] ?? CHAPTERS[0];

  const activeRoute =
    AUDIENCE_ROUTES.find((r) => r.id === userState.audienceFilter) ?? AUDIENCE_ROUTES[0];

  const filteredParts = PARTS.map((part) => {
    const partChapters = CHAPTERS.filter((ch) => ch.partId === part.id);
    const matchingCount =
      userState.audienceFilter === 'all'
        ? partChapters.length
        : partChapters.filter((ch) => ch.audience.includes(userState.audienceFilter as AudienceRole)).length;
    const doneInPart = partChapters.filter((ch) => userState.completedChapters.includes(ch.number)).length;
    return { part, totalInPart: partChapters.length, matchingCount, doneInPart };
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Editorial Hero — Crisp White Paper Authority */}
      <section className="border-b border-neutral-200 pb-10 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-5">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              INDIA EDITION · 180 CHAPTERS · PARTS 0–13 · OFFLINE &amp; LOCAL-FIRST · AUDIT {AUDIT_DATE}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-neutral-900 leading-[1.15] tracking-tight">
              The Indian House-Building &amp; Civil Engineering Pocketbook
            </h1>
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl">
              Understand the ground. Read the drawing. Build it right. From empty plot to a safe,
              durable Indian home — grounded in BIS Indian Standards, NBC 2016, State building rules,
              and field-tested design-engineer practice.
            </p>

            {/* Primary Hero Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenChapter(lastChapter.number)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-900 text-white text-sm font-medium hover:bg-blue-950 transition-colors min-h-[44px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {completedCount > 0
                    ? `Resume Ch. ${lastChapter.number}`
                    : 'Start Chapter 1'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenExportModal}
                className="inline-flex items-center gap-2 px-4 py-3 bg-white text-neutral-900 border border-neutral-300 text-sm font-medium hover:bg-neutral-50 transition-colors min-h-[44px]"
              >
                <Download className="w-4 h-4 text-blue-900" />
                <span>Export Offline PDF</span>
              </button>

              <button
                type="button"
                onClick={onOpenSearch}
                className="inline-flex items-center gap-2 px-4 py-3 bg-white text-neutral-700 border border-neutral-200 text-sm font-medium hover:border-neutral-300 hover:text-neutral-900 transition-colors min-h-[44px]"
              >
                <span>Search 180 Chapters &amp; IS Codes</span>
                <span className="font-mono text-xs text-neutral-400 hidden sm:inline">/</span>
              </button>
            </div>
          </div>

          {/* Local Progress & Reading Ledger Card */}
          <aside className="lg:col-span-4 border border-neutral-200 bg-neutral-50/60 p-5 space-y-4">
            <div className="flex items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Local Study Progress
              </span>
              <span className="font-mono text-sm font-semibold text-blue-900 tabular-nums">
                {completedCount} / {totalChapters} ({progressPct}%)
              </span>
            </div>

            <div className="w-full h-1.5 bg-neutral-200 overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-blue-900 transition-all duration-300"
                style={{ width: `${Math.max(progressPct, completedCount > 0 ? 2 : 0)}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center pt-1">
              <div className="border border-neutral-200 bg-white p-2.5">
                <div className="font-mono text-lg font-semibold text-neutral-900 tabular-nums">
                  {completedCount}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Completed</div>
              </div>
              <div className="border border-neutral-200 bg-white p-2.5">
                <div className="font-mono text-lg font-semibold text-neutral-900 tabular-nums">
                  {userState.bookmarkedChapters.length}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Saved</div>
              </div>
              <div className="border border-neutral-200 bg-white p-2.5">
                <div className="font-mono text-lg font-semibold text-neutral-900 tabular-nums">
                  {Object.keys(userState.quizScores).length}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Quizzes</div>
              </div>
            </div>

            <div className="pt-1 border-t border-neutral-200">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                Last Read
              </div>
              <button
                type="button"
                onClick={() => onOpenChapter(lastChapter.number)}
                className="mt-1 text-left w-full group"
              >
                <div className="text-sm font-medium text-neutral-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                  <span className="font-mono text-xs text-blue-900 mr-1.5">
                    Ch. {lastChapter.number}
                  </span>
                  {lastChapter.title}
                </div>
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Role-Based Starting Route Selector */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
              Choose Your Learning Route
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Filter recommended starting chapters without hiding any engineering reference.
            </p>
          </div>
          <div className="font-mono text-xs text-neutral-500">
            Active view: <span className="text-blue-900 font-semibold">{activeRoute.label}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AUDIENCE_ROUTES.map((route) => {
            const isActive = userState.audienceFilter === route.id;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => onSelectAudience(route.id)}
                className={`text-left p-4 border transition-colors flex flex-col justify-between min-h-[112px] ${
                  isActive
                    ? 'border-blue-900 bg-blue-50/40'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-neutral-900">{route.label}</span>
                    {isActive && (
                      <span className="font-mono text-[11px] font-semibold text-blue-900">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{route.subtitle}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-100 font-mono text-[11px] text-neutral-500">
                  Suggested entry: Ch. {route.startChapter}
                </div>
              </button>
            );
          })}
        </div>

        {/* Highlighted chapters for chosen persona */}
        <div className="border border-neutral-200 bg-neutral-50/50 p-4">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3">
            Priority Chapters for {activeRoute.label}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {activeRoute.highlightChapters.map((num) => {
              const ch = CHAPTER_BY_NUMBER[num];
              if (!ch) return null;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => onOpenChapter(num)}
                  className="text-left p-3 border border-neutral-200 bg-white hover:border-blue-900 transition-colors min-h-[44px]"
                >
                  <div className="font-mono text-[11px] text-blue-900 tabular-nums">
                    CHAPTER {ch.number} · {ch.evidenceTags.join(' · ')}
                  </div>
                  <div className="text-sm font-medium text-neutral-900 mt-0.5 line-clamp-1">
                    {ch.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive House Cutaway Diagram */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
              Anatomy of an Engineered Indian House
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Click any numbered engineering callout below or zoom the drawing to inspect load path,
              waterproofing continuity, soil bearing, and service shafts.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChapter(54)}
            className="text-xs font-medium text-blue-900 hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            Read Load Paths (Ch. 54) →
          </button>
        </div>

        <TechnicalDiagram
          diagramKey="house-cutaway"
          caption="Master Reference Diagram — Ground-to-roof structural, geotechnical, waterproofing, and MEP integration (Illustrative, not to scale)."
          focusNote="Tap numbered callouts [1]–[5] to trace critical engineering interfaces."
          compact={userState.lowBandwidthDiagrams}
        />
      </section>

      {/* 10-Stage Construction Journey Timeline */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
              10-Stage Construction Journey
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Every Indian residential build follows a strict dependency chain — skipping an early gate
              locks defects permanently into the structure.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChapter(1)}
            className="text-xs font-medium text-blue-900 hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            Full Lifecycle Map (Ch. 1) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CONSTRUCTION_JOURNEY_STAGES.map((stage) => (
            <button
              key={stage.step}
              type="button"
              onClick={() => onOpenChapter(stage.targetChapter)}
              className="text-left p-4 border border-neutral-200 bg-white hover:border-blue-900 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-blue-900 tabular-nums">
                    STAGE {stage.step}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400">{stage.chapters}</span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-900 mt-2 group-hover:text-blue-900 transition-colors">
                  {stage.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{stage.summary}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                Lead: {stage.leadRole}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Complete 14-Part Curriculum Grid (180 Chapters) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
              Complete 14-Part Curriculum (180 Chapters)
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Structured from pre-purchase land checks through design, concreting, MEP, QA, defect
              forensics, and five Indian regional case studies.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('chapters')}
            className="text-xs font-medium text-blue-900 hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            Browse Full 180-Chapter Index →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredParts.map(({ part, totalInPart, matchingCount, doneInPart }) => (
            <div
              key={part.id}
              className="border border-neutral-200 bg-white p-5 flex flex-col justify-between hover:border-neutral-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-neutral-500">
                  <span className="text-blue-900 font-semibold">
                    {part.code.toUpperCase()} · CH. {part.chapterRange[0]}–{part.chapterRange[1]}
                  </span>
                  <span className="tabular-nums">
                    {doneInPart}/{totalInPart} done
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-neutral-900 mt-1.5">
                  {part.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                  {part.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                <span className="text-xs text-neutral-500">
                  {part.stage}
                  {userState.audienceFilter !== 'all' && (
                    <span className="font-mono text-neutral-600">
                      {' '}
                      · {matchingCount} route match{matchingCount === 1 ? '' : 'es'}
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenChapter(part.chapterRange[0])}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 hover:underline min-h-[36px] px-1 whitespace-nowrap shrink-0"
                >
                  <span>Open Ch. {part.chapterRange[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Reference Modules Strip */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
          Field Tools &amp; Primary Reference Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('standards')}
            className="text-left p-5 border border-neutral-200 bg-white hover:border-blue-900 transition-colors space-y-2"
          >
            <FileCheck2 className="w-5 h-5 text-blue-900" />
            <div className="text-sm font-semibold text-neutral-900">
              BIS Standards &amp; Edition Alerts
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {EDITION_CHECK_FLAGS.length} active 2025–2026 edition flags, 27 IS/NBC register records
              &amp; 53 official Indian authority URLs.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('regions')}
            className="text-left p-5 border border-neutral-200 bg-white hover:border-blue-900 transition-colors space-y-2"
          >
            <MapPin className="w-5 h-5 text-blue-900" />
            <div className="text-sm font-semibold text-neutral-900">
              India Regional &amp; State Guide
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              11 climatic &amp; hazard regions, State building rules, 13-point Site Information Pack
              &amp; terrain checklist.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('checklists')}
            className="text-left p-5 border border-neutral-200 bg-white hover:border-blue-900 transition-colors space-y-2"
          >
            <CheckSquare className="w-5 h-5 text-blue-900" />
            <div className="text-sm font-semibold text-neutral-900">
              Site Inspection Checklists
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              7 tickable &amp; printable hold-point inspection packs stored locally from plot audit to
              handover snagging.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('labs')}
            className="text-left p-5 border border-neutral-200 bg-white hover:border-blue-900 transition-colors space-y-2"
          >
            <Wrench className="w-5 h-5 text-blue-900" />
            <div className="text-sm font-semibold text-neutral-900">
              Calculators &amp; Practice Labs
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              SI converters, non-structural volume &amp; rebar weight estimators, drawing-reading lab
              &amp; concrete pour sequencing.
            </p>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-900 shrink-0" />
            <span>
              Looking up Indian site terms like <em>Sariya, Chokhat, FSI, RL, SBC,</em> or{' '}
              <em>W/C Ratio</em>?
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('glossary')}
            className="font-semibold text-blue-900 hover:underline whitespace-nowrap shrink-0"
          >
            Open Glossary &amp; Flashcards →
          </button>
        </div>
      </section>

      {/* Mandatory Editorial Boundary & Safety Notice */}
      <section className="border border-neutral-300 bg-neutral-50 p-5 space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900">
          Educational Boundary &amp; Statutory Verification Notice · Audit Date: {AUDIT_DATE}
        </div>
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {EDITORIAL_DISCLAIMER}
        </p>
      </section>
    </div>
  );
};
