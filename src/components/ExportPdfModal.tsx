import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Download, FileText, Printer, X } from 'lucide-react';
import { CHAPTER_BY_NUMBER } from '../data/chapters';
import { PARTS } from '../data/parts';
import { generateOfflinePocketbookPdf } from '../utils/pdfExporter';

interface ExportPdfModalProps {
  open: boolean;
  currentChapterNumber: number;
  onClose: () => void;
  onOpenPrintBook: (partId: number | 'all') => void;
  onPrintCurrentPage: () => void;
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  open,
  currentChapterNumber,
  onClose,
  onOpenPrintBook,
  onPrintCurrentPage,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const currentChapter = CHAPTER_BY_NUMBER[currentChapterNumber];

  const runDirectPdf = (
    scope: { type: 'complete' } | { type: 'part'; partId: number } | { type: 'chapter'; chapterNumber: number }
  ) => {
    setBusy(true);
    setStatusMessage('Generating offline searchable A4 PDF...');
    window.setTimeout(() => {
      try {
        const res = generateOfflinePocketbookPdf(scope);
        setStatusMessage(`Downloaded ${res.filename} (${res.pageCount} A4 pages).`);
      } catch {
        setStatusMessage('Could not generate direct PDF in this browser context. Use Print-Book Save as PDF below.');
      } finally {
        setBusy(false);
      }
    }, 60);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-neutral-950/60 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Export Pocketbook to PDF"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-neutral-300 shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-neutral-200">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-blue-900 font-semibold">
              100% OFFLINE EXPORT · A4 PORTRAIT · NO SERVER REQUIRED
            </div>
            <h2 className="font-serif text-xl font-semibold text-neutral-900 mt-0.5">
              Export Pocketbook to PDF &amp; Print
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close export modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {statusMessage && (
            <div className="border border-emerald-700 bg-emerald-50/60 p-3.5 text-xs text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Option 1: Complete 180-Chapter Direct Download */}
          <div className="border border-neutral-200 p-4 space-y-3 bg-neutral-50/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-neutral-900">
                  Complete 180-Chapter Pocketbook PDF (Direct Offline Download)
                </div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Generates a clean, searchable A4 PDF directly in your browser containing the
                  Cover, Mandatory Disclaimer, Table of Contents, all 180 Chapters with engineer
                  tips &amp; checklists, BIS Standards Register, Regional Matrix, and Glossary.
                </p>
              </div>
              <BookOpen className="w-5 h-5 text-blue-900 shrink-0" />
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => runDirectPdf({ type: 'complete' })}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white text-xs font-medium hover:bg-blue-950 disabled:opacity-50 min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete 180-Chapter PDF</span>
            </button>
          </div>

          {/* Option 2: Export Selected Part or Current Chapter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-neutral-200 p-4 space-y-3">
              <div className="text-sm font-semibold text-neutral-900">Export Single Part PDF</div>
              <select
                aria-label="Select Part to Export"
                value={selectedPartId}
                onChange={(e) => setSelectedPartId(Number(e.target.value))}
                className="w-full px-2.5 py-2 border border-neutral-300 text-xs bg-white min-h-[40px]"
              >
                {PARTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code}: {p.shortTitle} (Ch. {p.chapterRange[0]}–{p.chapterRange[1]})
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={busy}
                onClick={() => runDirectPdf({ type: 'part', partId: selectedPartId })}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-medium min-h-[42px]"
              >
                <FileText className="w-3.5 h-3.5 text-blue-900" />
                <span>Download Part {selectedPartId} PDF</span>
              </button>
            </div>

            <div className="border border-neutral-200 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-sm font-semibold text-neutral-900">
                  Export Current Chapter PDF
                </div>
                <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                  {currentChapter
                    ? `Ch. ${currentChapter.number}: ${currentChapter.title}`
                    : 'Chapter 1'}
                </p>
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  runDirectPdf({ type: 'chapter', chapterNumber: currentChapterNumber })
                }
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-medium min-h-[42px]"
              >
                <Download className="w-3.5 h-3.5 text-blue-900" />
                <span>Download Ch. {currentChapterNumber} PDF</span>
              </button>
            </div>
          </div>

          {/* Option 3: Illustrated Vector SVG A4 Print-Book */}
          <div className="border border-neutral-200 p-4 space-y-3">
            <div className="text-sm font-semibold text-neutral-900">
              Illustrated A4 Print-Book (Vector SVG Diagrams via Print → Save as PDF)
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Opens a crisp white-paper A4 book view embedding vector technical diagrams, running
              chapter headers, and clean page breaks ready for browser <em>Print → Save as PDF</em>.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onOpenPrintBook(selectedPartId);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-blue-900 text-blue-900 bg-white hover:bg-blue-50/40 text-xs font-medium min-h-[42px]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Illustrated Print-Book (Part {selectedPartId})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onOpenPrintBook('all');
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-neutral-300 text-neutral-800 bg-white hover:bg-neutral-50 text-xs font-medium min-h-[42px]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Illustrated Full 180-Ch Print-Book</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  window.setTimeout(onPrintCurrentPage, 120);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50 text-xs font-medium min-h-[42px]"
              >
                <span>Print Current Screen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
