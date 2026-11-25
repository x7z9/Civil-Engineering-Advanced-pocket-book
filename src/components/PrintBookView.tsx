import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { AUDIT_DATE, EDITORIAL_DISCLAIMER, PARTS } from '../data/parts';
import { REGIONAL_PROFILES } from '../data/regions';
import { STANDARDS_REGISTER } from '../data/standards';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface PrintBookViewProps {
  scopePartId: number | 'all';
  onExit: () => void;
}

export const PrintBookView: React.FC<PrintBookViewProps> = ({ scopePartId, onExit }) => {
  const selectedPart = scopePartId === 'all' ? null : PARTS.find((p) => p.id === scopePartId);
  const chaptersToPrint =
    scopePartId === 'all'
      ? CHAPTERS
      : CHAPTERS.filter((c) => c.partId === scopePartId);

  return (
    <div className="bg-white text-neutral-900 min-h-screen">
      {/* Sticky Print Toolbar (hidden in actual PDF/print output) */}
      <div className="no-print sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1.5 px-3 py-2 border border-neutral-300 text-xs font-medium text-neutral-800 hover:bg-neutral-50 min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pocketbook</span>
        </button>

        <div className="text-xs text-neutral-600 font-mono">
          {selectedPart
            ? `ILLUSTRATED PRINT EDITION · ${selectedPart.code.toUpperCase()} (${chaptersToPrint.length} CHAPTERS)`
            : `COMPLETE ILLUSTRATED PRINT EDITION (${chaptersToPrint.length} CHAPTERS)`}
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 text-white text-xs font-medium hover:bg-blue-950 min-h-[40px]"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Book Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Cover Page */}
        <section className="border-b-2 border-blue-900 pb-10 space-y-4">
          <div className="font-mono text-xs uppercase tracking-wider text-blue-900 font-semibold">
            INDIA JURISDICTION · OFFLINE ILLUSTRATED EDITION · AUDIT {AUDIT_DATE}
          </div>
          <h1 className="font-serif text-4xl font-semibold text-neutral-900 leading-tight">
            The Indian House-Building &amp; Civil Engineering Pocketbook
          </h1>
          <p className="text-base text-neutral-700">
            Understand the ground. Read the drawing. Build it right.
          </p>
          {selectedPart && (
            <div className="font-mono text-sm font-semibold text-neutral-900 pt-2">
              {selectedPart.code}: {selectedPart.title} (Chapters {selectedPart.chapterRange[0]}–
              {selectedPart.chapterRange[1]})
            </div>
          )}
          <div className="border border-neutral-300 bg-neutral-50 p-4 text-xs text-neutral-700 leading-relaxed mt-6">
            <strong className="text-neutral-900 uppercase font-mono block mb-1">
              Mandatory Educational Disclaimer
            </strong>
            {EDITORIAL_DISCLAIMER}
          </div>
        </section>

        {/* Table of Contents */}
        <section className="print-page-break space-y-3">
          <h2 className="font-serif text-2xl font-semibold text-neutral-900 border-b border-neutral-200 pb-2">
            Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
            {chaptersToPrint.map((ch) => (
              <div key={ch.number} className="flex items-baseline gap-2 border-b border-neutral-100 py-1">
                <span className="font-mono text-blue-900 font-semibold shrink-0 tabular-nums">
                  Ch. {String(ch.number).padStart(3, '0')}
                </span>
                <span className="text-neutral-800">{ch.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Chapters */}
        {chaptersToPrint.map((ch, idx) => {
          const prevDiagramKey = idx > 0 ? chaptersToPrint[idx - 1].diagramKey : null;
          const showDiagram = idx === 0 || ch.diagramKey !== prevDiagramKey;
          return (
            <article key={ch.number} className="print-page-break space-y-4 border-t border-neutral-200 pt-6">
              <div className="font-mono text-[11px] text-neutral-500">
                CHAPTER {ch.number} · {ch.evidenceTags.map((t) => `[${t}]`).join(' · ')}
              </div>
              <h2 className="font-serif text-2xl font-semibold text-neutral-900">{ch.title}</h2>
              <p className="text-sm text-neutral-700 leading-relaxed">{ch.objective}</p>

              {showDiagram && (
                <TechnicalDiagram
                  diagramKey={ch.diagramKey}
                  caption={ch.diagramCaption}
                  focusNote={ch.diagramFocusNote}
                />
              )}

              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase font-semibold text-blue-900">
                  Design Engineer Tips &amp; Industry Practice
                </h3>
                <ul className="space-y-1 text-xs text-neutral-800 leading-relaxed">
                  {ch.engineerTips.map((tip, i) => (
                    <li key={i}>
                      <span className="font-mono font-semibold mr-1.5">{i + 1}.</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-mono text-xs uppercase font-semibold text-blue-900">
                  Verification Checklist
                </h3>
                <ul className="space-y-1 text-xs text-neutral-800">
                  {ch.checklist.map((item, i) => (
                    <li key={i}>[ ] {item}</li>
                  ))}
                </ul>
              </div>

              <div className="border border-amber-300 bg-amber-50/30 p-3 text-xs space-y-1 print-avoid-break">
                <div className="font-mono font-bold text-amber-900">
                  ILLUSTRATIVE TRAINING EXAMPLE — NOT FOR CONSTRUCTION
                </div>
                <div className="font-semibold text-neutral-900">{ch.workedExample.title}</div>
                <div className="text-neutral-800">Output: {ch.workedExample.result}</div>
                <div className="text-neutral-600">{ch.workedExample.limitation}</div>
              </div>
            </article>
          );
        })}

        {/* Appendix: Regional Summary & BIS Register */}
        <section className="print-page-break space-y-4 border-t border-neutral-300 pt-6">
          <h2 className="font-serif text-2xl font-semibold text-neutral-900">
            Appendix A: India Regional Comparison Summary
          </h2>
          <div className="space-y-2 text-xs">
            {REGIONAL_PROFILES.map((r) => (
              <div key={r.id} className="border border-neutral-200 p-3 print-avoid-break">
                <div className="font-semibold text-neutral-900">
                  {r.region} ({r.climate})
                </div>
                <div className="text-neutral-700 mt-1">Hazards: {r.mainHazards}</div>
                <div className="text-neutral-800 mt-0.5">Design Response: {r.designResponse}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="print-page-break space-y-4 border-t border-neutral-300 pt-6">
          <h2 className="font-serif text-2xl font-semibold text-neutral-900">
            Appendix B: Primary Indian Standards Register ({AUDIT_DATE})
          </h2>
          <div className="divide-y divide-neutral-200 border border-neutral-200 text-xs">
            {STANDARDS_REGISTER.map((s) => (
              <div key={s.source_id} className="p-2.5">
                <span className="font-mono font-semibold text-blue-900">
                  {s.standard_or_document_number} ({s.edition_or_year})
                </span>{' '}
                — {s.title} [{s.issuing_body}]
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
