import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Search } from 'lucide-react';
import { GLOSSARY } from '../data/glossary';
import type { GlossaryEntry } from '../types/pocketbook';

interface GlossaryViewProps {
  onOpenChapter: (chapterNumber: number) => void;
}

const CATEGORIES: ('All' | GlossaryEntry['category'])[] = [
  'All',
  'Site & Survey',
  'Soil & Foundations',
  'Planning & Law',
  'Structural',
  'Concrete & Steel',
  'Masonry & Finishes',
  'Services & MEP',
  'Execution & QA',
];

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onOpenChapter }) => {
  const [mode, setMode] = useState<'list' | 'flashcards'>('list');
  const [category, setCategory] = useState<'All' | GlossaryEntry['category']>('All');
  const [query, setQuery] = useState('');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (category !== 'All' && g.category !== category) return false;
      if (q) {
        const hay = `${g.term} ${g.siteAlias ?? ''} ${g.definition} ${g.codeRef}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [category, query]);

  const safeIndex = filtered.length > 0 ? Math.min(cardIndex, filtered.length - 1) : 0;
  const activeCard = filtered[safeIndex];

  return (
    <div className="space-y-8 pb-12">
      <header className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
            TECHNICAL TERMINOLOGY &amp; SITE VOCABULARY · {GLOSSARY.length} ENTRIES
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
            Civil Engineering Glossary &amp; Flashcards
          </h1>
          <p className="text-sm text-neutral-600 max-w-2xl">
            Bridging BIS engineering terminology, SI units, and everyday Indian site vocabulary
            (such as <em>Sariya, Chokhat, FSI, RL, SBC,</em> and <em>TBM</em>).
          </p>
        </div>

        <div className="inline-flex border border-neutral-300 bg-white self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('list')}
            className={`px-4 py-2 text-xs font-medium min-h-[40px] ${
              mode === 'list' ? 'bg-blue-900 text-white' : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Dictionary List
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('flashcards');
              setFlipped(false);
            }}
            className={`px-4 py-2 text-xs font-medium min-h-[40px] border-l border-neutral-300 ${
              mode === 'flashcards'
                ? 'bg-blue-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Flashcard Mode
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="border border-neutral-200 bg-neutral-50/60 p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCardIndex(0);
              setFlipped(false);
            }}
            placeholder="Search term, Indian site alias, SI unit, or IS code..."
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 text-sm text-neutral-900 min-h-[44px]"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setCardIndex(0);
                setFlipped(false);
              }}
              className={`px-2.5 py-1.5 text-xs font-medium border transition-colors min-h-[36px] ${
                category === cat
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="border border-neutral-200 bg-white p-8 text-center text-sm text-neutral-600">
          No glossary entries match "{query}".
        </div>
      ) : mode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="border border-neutral-200 bg-white p-4 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-sm font-semibold text-neutral-900">{entry.term}</h2>
                  {entry.unit && (
                    <span className="font-mono text-[11px] text-blue-900 shrink-0">
                      {entry.unit}
                    </span>
                  )}
                </div>
                {entry.siteAlias && (
                  <div className="text-xs text-neutral-500 mt-0.5">
                    Site alias: <span className="italic text-neutral-700">{entry.siteAlias}</span>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed">
                  {entry.definition}
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-[11px] text-neutral-500">
                  {entry.category} · {entry.codeRef}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenChapter(entry.relatedChapter)}
                  className="font-semibold text-blue-900 hover:underline whitespace-nowrap shrink-0"
                >
                  Ch. {entry.relatedChapter} →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Flashcard Study Mode */
        activeCard && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>
                CARD {safeIndex + 1} OF {filtered.length}
              </span>
              <span>{activeCard.category}</span>
            </div>

            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="w-full text-left border border-neutral-300 bg-white hover:border-blue-900 p-6 sm:p-8 min-h-[260px] flex flex-col justify-between transition-colors"
            >
              {!flipped ? (
                <>
                  <div className="font-mono text-xs uppercase tracking-wider text-blue-900">
                    TERM — TAP CARD TO REVEAL DEFINITION
                  </div>
                  <div className="py-6 space-y-2">
                    <div className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
                      {activeCard.term}
                    </div>
                    {activeCard.siteAlias && (
                      <div className="text-sm text-neutral-500">
                        Common Indian site alias: <em>{activeCard.siteAlias}</em>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-blue-900">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Flip card</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-2 font-mono text-xs text-emerald-800">
                    <span>ENGINEERING DEFINITION</span>
                    {activeCard.unit && <span>UNIT: {activeCard.unit}</span>}
                  </div>
                  <div className="py-4 space-y-3">
                    <div className="text-sm font-semibold text-neutral-900">{activeCard.term}</div>
                    <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
                      {activeCard.definition}
                    </p>
                    <div className="font-mono text-xs text-neutral-500">
                      Basis: {activeCard.codeRef}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs">
                    <span className="text-neutral-500">Tap anywhere to flip back</span>
                    <span className="font-mono text-blue-900">
                      Related Chapter {activeCard.relatedChapter}
                    </span>
                  </div>
                </>
              )}
            </button>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setCardIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
                  setFlipped(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-neutral-300 bg-white text-xs font-medium hover:bg-neutral-50 min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenChapter(activeCard.relatedChapter)}
                className="text-xs font-semibold text-blue-900 hover:underline min-h-[44px] px-2"
              >
                Read Ch. {activeCard.relatedChapter} →
              </button>

              <button
                type="button"
                onClick={() => {
                  setCardIndex((prev) => (prev + 1) % filtered.length);
                  setFlipped(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-neutral-300 bg-white text-xs font-medium hover:bg-neutral-50 min-h-[44px]"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
