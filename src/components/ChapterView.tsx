import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  Printer,
  RotateCcw,
  Wrench,
} from 'lucide-react';
import { CHAPTERS, CHAPTER_BY_NUMBER } from '../data/chapters';
import { GLOSSARY } from '../data/glossary';
import { AUDIT_DATE, PARTS } from '../data/parts';
import { STANDARDS_REGISTER } from '../data/standards';
import type { Chapter, LocalUserState } from '../types/pocketbook';
import { generateOfflinePocketbookPdf } from '../utils/pdfExporter';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface ChapterViewProps {
  chapter: Chapter;
  userState: LocalUserState;
  onOpenChapter: (chapterNumber: number) => void;
  onToggleComplete: (chapterNumber: number) => void;
  onToggleBookmark: (chapterNumber: number) => void;
  onToggleChecklistItem: (itemId: string) => void;
  onRecordQuizScore: (chapterNumber: number, scorePercent: number) => void;
  onOpenStandards: () => void;
  onOpenGlossary: () => void;
  onPrintCurrentPage: () => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  userState,
  onOpenChapter,
  onToggleComplete,
  onToggleBookmark,
  onToggleChecklistItem,
  onRecordQuizScore,
  onOpenStandards,
  onOpenGlossary,
  onPrintCurrentPage,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setPdfNotice(null);
  }, [chapter.number]);

  const part = PARTS.find((p) => p.id === chapter.partId);
  const isCompleted = userState.completedChapters.includes(chapter.number);
  const isBookmarked = userState.bookmarkedChapters.includes(chapter.number);
  const prevChapter = CHAPTER_BY_NUMBER[chapter.number - 1];
  const nextChapter = CHAPTER_BY_NUMBER[chapter.number + 1];

  const chapterSources = chapter.sourceIds
    .map((id) => STANDARDS_REGISTER.find((s) => s.source_id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const chapterGlossary = chapter.glossaryIds
    .map((id) => GLOSSARY.find((g) => g.id === id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const relatedChapters = chapter.relatedNumbers
    .map((n) => CHAPTER_BY_NUMBER[n])
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const checkedCount = chapter.checklist.filter(
    (_, idx) => userState.checkedItems[`ch-${chapter.number}-chk-${idx}`]
  ).length;

  const handleSubmitQuiz = () => {
    if (chapter.quiz.length === 0) return;
    let correct = 0;
    chapter.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correct += 1;
    });
    const pct = Math.round((correct / chapter.quiz.length) * 100);
    setQuizSubmitted(true);
    onRecordQuizScore(chapter.number, pct);
  };

  const handleExportChapterPdf = () => {
    const res = generateOfflinePocketbookPdf({ type: 'chapter', chapterNumber: chapter.number });
    setPdfNotice(`Saved ${res.filename} (${res.pageCount} page${res.pageCount === 1 ? '' : 's'})`);
    window.setTimeout(() => setPdfNotice(null), 4500);
  };

  const savedBestScore = userState.quizScores[chapter.number];

  return (
    <article className="max-w-4xl mx-auto space-y-10 pb-14">
      {/* 1. Header & Breadcrumb Navigation */}
      <header className="border-b border-neutral-200 pb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-neutral-500">
          <div>
            <span>{part ? `${part.code.toUpperCase()} · ${part.shortTitle.toUpperCase()}` : 'POCKETBOOK'}</span>
            <span className="mx-1.5">/</span>
            <span className="text-blue-900 font-semibold tabular-nums">
              CHAPTER {chapter.number} OF {CHAPTERS.length}
            </span>
          </div>
          <div className="text-neutral-500">
            {chapter.evidenceTags.map((t) => `[${t}]`).join(' · ')}
          </div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 leading-tight">
          {chapter.title}
        </h1>

        <p className="text-base text-neutral-700 leading-relaxed">{chapter.objective}</p>

        {/* Action bar: Complete, Bookmark, Export Chapter PDF, Print Page */}
        <div className="no-print flex flex-wrap items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => onToggleComplete(chapter.number)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border transition-colors min-h-[44px] ${
              isCompleted
                ? 'bg-emerald-800 text-white border-emerald-800'
                : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleBookmark(chapter.number)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border transition-colors min-h-[44px] ${
              isBookmarked
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportChapterPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 transition-colors min-h-[44px]"
          >
            <Download className="w-4 h-4 text-blue-900" />
            <span>Chapter PDF</span>
          </button>

          <button
            type="button"
            onClick={onPrintCurrentPage}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50 transition-colors min-h-[44px]"
          >
            <Printer className="w-4 h-4 text-neutral-600" />
            <span>Print Page</span>
          </button>

          {pdfNotice && (
            <span className="font-mono text-xs text-emerald-800 ml-1">{pdfNotice}</span>
          )}
        </div>

        <div className="text-xs font-mono text-neutral-500 pt-1">
          Audience: {chapter.audience.map((r) => r.toUpperCase()).join(' / ')} · Verified{' '}
          {AUDIT_DATE}
        </div>
      </header>

      {/* 2. At a Glance */}
      <section className="space-y-3">
        <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
          At a Glance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {chapter.atAGlance.map((item) => (
            <div key={item.label} className="border border-neutral-200 bg-neutral-50/50 p-4">
              <div className="font-mono text-[11px] uppercase tracking-wider text-blue-900 font-semibold">
                {item.label}
              </div>
              <p className="text-sm text-neutral-800 mt-1.5 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Visual Diagram */}
      <section className="space-y-3">
        <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
          Visual Engineering Reference
        </h2>
        <TechnicalDiagram
          diagramKey={chapter.diagramKey}
          caption={chapter.diagramCaption}
          focusNote={chapter.diagramFocusNote}
          compact={userState.lowBandwidthDiagrams}
        />
      </section>

      {/* 4. Design Engineer Ready-to-Use Tips & Industry Techniques */}
      <section className="border border-neutral-200 bg-white p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-900 shrink-0" />
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
              Design Engineer Ready-to-Use Tips &amp; Industry Techniques
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase text-neutral-500 hidden sm:inline">
            FIELD PRACTICE · QA
          </span>
        </div>
        <ol className="space-y-3">
          {chapter.engineerTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-neutral-800 leading-relaxed">
              <span className="font-mono text-xs font-semibold text-blue-900 tabular-nums shrink-0 mt-0.5">
                {String(idx + 1).padStart(2, '0')}.
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. How It Works (Step-by-Step Sequence) */}
      <section className="space-y-3">
        <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
          How It Works — Step-by-Step Engineering Sequence
        </h2>
        <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
          {chapter.howItWorks.map((stepObj, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex items-start gap-4">
              <div className="font-mono text-xs font-semibold text-neutral-500 tabular-nums shrink-0 pt-0.5">
                STEP {idx + 1}
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="text-sm font-semibold text-neutral-900">{stepObj.step}</h3>
                <p className="text-sm text-neutral-700 leading-relaxed">{stepObj.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Read-Together Companion Codes (when present) */}
      {chapter.readTogether && chapter.readTogether.length > 0 && (
        <section className="border border-neutral-200 bg-neutral-50/70 p-4 sm:p-5 space-y-2">
          <div className="font-mono text-xs uppercase tracking-wider font-semibold text-blue-900">
            Read-Together Companion Standards
          </div>
          <ul className="space-y-1.5 text-sm text-neutral-800">
            {chapter.readTogether.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-xs text-neutral-400 mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 6. Key Reference Values & Code Verification Table */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
            Indian Code &amp; Verification Reference Table
          </h2>
          <button
            type="button"
            onClick={onOpenStandards}
            className="no-print text-xs font-medium text-blue-900 hover:underline self-start sm:self-auto"
          >
            Inspect Full BIS Standards Register →
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto border border-neutral-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 font-mono text-[11px] uppercase tracking-wider text-neutral-600">
                <th className="py-2.5 px-3 font-semibold">Item / Check</th>
                <th className="py-2.5 px-3 font-semibold">Code Requirement / Value</th>
                <th className="py-2.5 px-3 font-semibold">Unit</th>
                <th className="py-2.5 px-3 font-semibold">Applicability</th>
                <th className="py-2.5 px-3 font-semibold">Primary Source</th>
                <th className="py-2.5 px-3 font-semibold">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {chapter.referenceValues.map((row, idx) => (
                <tr key={idx} className="align-top">
                  <td className="py-3 px-3 font-medium text-neutral-900">{row.item}</td>
                  <td className="py-3 px-3 text-neutral-700">{row.value}</td>
                  <td className="py-3 px-3 font-mono text-neutral-600 tabular-nums whitespace-nowrap">
                    {row.unit}
                  </td>
                  <td className="py-3 px-3 text-neutral-700">{row.applicability}</td>
                  <td className="py-3 px-3 font-mono text-blue-900">{row.source}</td>
                  <td className="py-3 px-3 font-mono text-neutral-500 whitespace-nowrap tabular-nums">
                    {row.verified}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards (zero horizontal overflow) */}
        <div className="md:hidden space-y-2.5">
          {chapter.referenceValues.map((row, idx) => (
            <div key={idx} className="border border-neutral-200 bg-white p-3.5 space-y-1.5 text-xs">
              <div className="font-semibold text-neutral-900">{row.item}</div>
              <div className="text-neutral-700">{row.value}</div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 border-t border-neutral-100 font-mono text-[11px] text-neutral-500">
                <span>Unit: {row.unit}</span>
                <span className="text-blue-900">{row.source}</span>
                <span>Verified: {row.verified}</span>
              </div>
              <div className="text-neutral-600">Scope: {row.applicability}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Site / Design Checklist (localStorage persisted) */}
      <section className="space-y-3 print-avoid-break">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
            Field &amp; Drawing Verification Checklist
          </h2>
          <span className="font-mono text-xs text-neutral-500 tabular-nums">
            {checkedCount} / {chapter.checklist.length} checked
          </span>
        </div>

        <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white">
          {chapter.checklist.map((item, idx) => {
            const key = `ch-${chapter.number}-chk-${idx}`;
            const checked = Boolean(userState.checkedItems[key]);
            return (
              <label
                key={key}
                className="flex items-start gap-3 p-3.5 sm:p-4 cursor-pointer hover:bg-neutral-50/70 transition-colors min-h-[44px]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleChecklistItem(key)}
                  className="mt-0.5 w-4 h-4 accent-blue-900 shrink-0"
                />
                <span
                  className={`text-sm leading-relaxed ${
                    checked ? 'line-through text-neutral-400' : 'text-neutral-800'
                  }`}
                >
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* 8. Common Mistakes & Field Red Flags */}
      <section className="space-y-3">
        <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
          Common Site Mistakes &amp; Red Flags
        </h2>
        <div className="space-y-3">
          {chapter.commonMistakes.map((m, idx) => (
            <div key={idx} className="border border-neutral-200 bg-white p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-red-800">{m.mistake}</h3>
                <span className="font-mono text-[11px] text-neutral-500">
                  Resolved by: {m.whoResolves}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-700 pt-1">
                <div>
                  <span className="font-semibold text-neutral-900">Why it happens: </span>
                  {m.whyItHappens}
                </div>
                <div>
                  <span className="font-semibold text-neutral-900">Consequence: </span>
                  {m.consequence}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Worked Illustrative Example — Mandatory Safety Labelling */}
      <section className="border border-amber-300 bg-amber-50/30 p-5 sm:p-6 space-y-4 print-avoid-break">
        <div className="border-b border-amber-200 pb-3 space-y-1">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900">
            ILLUSTRATIVE TRAINING EXAMPLE — NOT FOR CONSTRUCTION
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
            {chapter.workedExample.title}
          </h2>
        </div>

        <div className="space-y-3 text-sm text-neutral-800">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Hypothetical Inputs &amp; Assumptions
            </div>
            <ul className="space-y-1">
              {chapter.workedExample.assumptions.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-xs text-neutral-400">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-600 font-semibold mb-1">
              Method Steps
            </div>
            <ol className="space-y-1.5">
              {chapter.workedExample.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-semibold text-blue-900 tabular-nums shrink-0 mt-0.5">
                    {i + 1}.
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-neutral-200 bg-white p-3.5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
              Illustrative Output
            </div>
            <p className="font-medium text-neutral-900 mt-1">{chapter.workedExample.result}</p>
          </div>

          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Boundary Limitation:</strong> {chapter.workedExample.limitation}
          </p>
        </div>
      </section>

      {/* Ask Your Architect / Engineer / Contractor */}
      <section className="border border-neutral-200 bg-neutral-50/50 p-5 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-neutral-900">
          Questions to Ask Your Architect, Structural Engineer, or Contractor
        </h2>
        <ul className="space-y-2 text-sm text-neutral-800">
          {chapter.askYourTeam.map((q, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="font-mono text-xs font-semibold text-blue-900 tabular-nums mt-0.5">
                Q{idx + 1}.
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. Interactive Knowledge Check Quiz */}
      <section className="no-print border border-neutral-200 bg-white p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
              Chapter Knowledge Check
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              100% offline self-assessment stored locally in your browser.
            </p>
          </div>
          {savedBestScore !== undefined && (
            <span className="font-mono text-xs font-semibold text-emerald-800 tabular-nums">
              BEST SCORE: {savedBestScore}%
            </span>
          )}
        </div>

        <div className="space-y-6">
          {chapter.quiz.map((q, qIdx) => {
            const chosen = selectedAnswers[qIdx];
            return (
              <div key={qIdx} className="space-y-2.5">
                <div className="text-sm font-semibold text-neutral-900">
                  <span className="font-mono text-xs text-blue-900 mr-2">Q{qIdx + 1}.</span>
                  {q.question}
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = chosen === oIdx;
                    const isCorrect = oIdx === q.correctIndex;
                    let borderClass = 'border-neutral-200 bg-white hover:border-neutral-300';
                    if (quizSubmitted) {
                      if (isCorrect) borderClass = 'border-emerald-700 bg-emerald-50/50';
                      else if (isSelected && !isCorrect) borderClass = 'border-red-700 bg-red-50/40';
                    } else if (isSelected) {
                      borderClass = 'border-blue-900 bg-blue-50/40';
                    }
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        disabled={quizSubmitted}
                        onClick={() =>
                          setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
                        }
                        className={`w-full text-left p-3 border text-sm transition-colors flex items-start gap-3 min-h-[44px] ${borderClass}`}
                      >
                        <span className="font-mono text-xs font-semibold text-neutral-500 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span className="text-neutral-800">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <div className="text-xs text-neutral-700 bg-neutral-50 border border-neutral-200 p-3 leading-relaxed">
                    <span className="font-semibold text-neutral-900">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {!quizSubmitted ? (
            <button
              type="button"
              disabled={Object.keys(selectedAnswers).length < chapter.quiz.length}
              onClick={handleSubmitQuiz}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white text-xs font-medium hover:bg-blue-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[44px]"
            >
              <Check className="w-4 h-4" />
              <span>Check Answers</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSelectedAnswers({});
                setQuizSubmitted(false);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-800 border border-neutral-300 text-xs font-medium hover:bg-neutral-50 transition-colors min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          )}
        </div>
      </section>

      {/* Related Glossary & Chapters */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-neutral-200 pt-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-semibold text-neutral-900">
              Key Terms in This Chapter
            </h2>
            <button
              type="button"
              onClick={onOpenGlossary}
              className="no-print text-xs text-blue-900 hover:underline"
            >
              Full Glossary →
            </button>
          </div>
          <div className="space-y-2">
            {chapterGlossary.map((g) => (
              <div key={g.id} className="border border-neutral-200 bg-white p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold text-neutral-900">{g.term}</span>
                  {g.unit && <span className="font-mono text-[11px] text-neutral-500">{g.unit}</span>}
                </div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{g.definition}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-base font-semibold text-neutral-900">
            Related Chapters
          </h2>
          <div className="space-y-2">
            {relatedChapters.map((rel) => (
              <button
                key={rel.number}
                type="button"
                onClick={() => onOpenChapter(rel.number)}
                className="w-full text-left border border-neutral-200 bg-white hover:border-blue-900 p-3 transition-colors"
              >
                <div className="font-mono text-[11px] text-blue-900 tabular-nums">
                  CHAPTER {rel.number} · {rel.evidenceTags.join(' · ')}
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-900 mt-0.5">
                  {rel.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Primary Sources */}
      <section className="border-t border-neutral-200 pt-6 space-y-3">
        <h2 className="font-serif text-base font-semibold text-neutral-900">
          Verified Indian Primary Sources
        </h2>
        <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
          {chapterSources.map((src) => (
            <div key={src.source_id} className="p-3.5 text-xs space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono font-semibold text-blue-900">
                  {src.standard_or_document_number} ({src.edition_or_year})
                </span>
                <span className="font-mono text-[11px] text-neutral-500">
                  {src.issuing_body} · Verified {src.last_verified_date}
                </span>
              </div>
              <div className="text-neutral-800">{src.title}</div>
              {src.edition_flag && (
                <div className="text-amber-900 font-medium">{src.edition_flag}</div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-neutral-500">
                <span>Clauses / Scope: {src.clauses_or_pages_used}</span>
                <a
                  href={src.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-900 hover:underline font-medium"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Previous / Next Chapter Navigation */}
      <nav
        aria-label="Chapter pagination"
        className="no-print grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-neutral-200 pt-6"
      >
        {prevChapter ? (
          <button
            type="button"
            onClick={() => onOpenChapter(prevChapter.number)}
            className="text-left p-4 border border-neutral-200 bg-white hover:border-blue-900 transition-colors flex items-start gap-3 min-h-[56px]"
          >
            <ArrowLeft className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="font-mono text-[11px] text-neutral-500">
                PREVIOUS · CH. {prevChapter.number}
              </div>
              <div className="text-sm font-medium text-neutral-900 truncate mt-0.5">
                {prevChapter.title}
              </div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <button
            type="button"
            onClick={() => onOpenChapter(nextChapter.number)}
            className="text-right p-4 border border-neutral-200 bg-white hover:border-blue-900 transition-colors flex items-start justify-end gap-3 min-h-[56px]"
          >
            <div className="min-w-0">
              <div className="font-mono text-[11px] text-neutral-500">
                NEXT · CH. {nextChapter.number}
              </div>
              <div className="text-sm font-medium text-neutral-900 truncate mt-0.5">
                {nextChapter.title}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
          </button>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};
