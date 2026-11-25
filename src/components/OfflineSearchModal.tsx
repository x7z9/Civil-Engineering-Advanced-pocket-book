import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { FIELD_CHECKLISTS } from '../data/checklists';
import { GLOSSARY } from '../data/glossary';
import { REGIONAL_PROFILES } from '../data/regions';
import { STANDARDS_REGISTER } from '../data/standards';

interface OfflineSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectChapter: (chapterNumber: number) => void;
  onNavigate: (view: 'standards' | 'regions' | 'checklists' | 'glossary') => void;
}

type SearchBucket = 'all' | 'chapters' | 'standards' | 'glossary' | 'regions' | 'checklists';

export const OfflineSearchModal: React.FC<OfflineSearchModalProps> = ({
  open,
  onClose,
  onSelectChapter,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [bucket, setBucket] = useState<SearchBucket>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        chapters: CHAPTERS.slice(0, 8),
        standards: STANDARDS_REGISTER.slice(0, 4),
        glossary: GLOSSARY.slice(0, 4),
        regions: REGIONAL_PROFILES.slice(0, 3),
        checklists: FIELD_CHECKLISTS.slice(0, 3),
      };
    }

    const chapters = CHAPTERS.filter((ch) => {
      const hay =
        `${ch.number} ch.${ch.number} ${ch.title} ${ch.objective} ${ch.engineerTips.join(' ')} ${ch.referenceValues
          .map((r) => `${r.item} ${r.source}`)
          .join(' ')}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 20);

    const standards = STANDARDS_REGISTER.filter((s) => {
      const hay =
        `${s.standard_or_document_number} ${s.title} ${s.subject} ${s.issuing_body} ${s.edition_or_year}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 12);

    const glossary = GLOSSARY.filter((g) => {
      const hay = `${g.term} ${g.siteAlias ?? ''} ${g.definition} ${g.codeRef}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 12);

    const regions = REGIONAL_PROFILES.filter((r) => {
      const hay =
        `${r.region} ${r.states.join(' ')} ${r.climate} ${r.mainHazards} ${r.designResponse}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 8);

    const checklists = FIELD_CHECKLISTS.filter((c) => {
      const hay = `${c.title} ${c.stage} ${c.items.map((i) => i.check).join(' ')}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 7);

    return { chapters, standards, glossary, regions, checklists };
  }, [query]);

  if (!open) return null;

  const totalMatches =
    results.chapters.length +
    results.standards.length +
    results.glossary.length +
    results.regions.length +
    results.checklists.length;

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-neutral-950/60 flex items-start justify-center p-3 sm:p-6 pt-6 sm:pt-12"
      role="dialog"
      aria-modal="true"
      aria-label="Offline Pocketbook Search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white border border-neutral-300 shadow-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200">
          <Search className="w-4 h-4 text-blue-900 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search offline: chapter, IS 1893, black cotton soil, rebar cover, plinth, sump..."
            className="flex-1 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none min-h-[40px]"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-neutral-200 bg-neutral-50/70">
          <div className="flex flex-wrap gap-1">
            {(
              [
                ['all', `All (${totalMatches})`],
                ['chapters', `Chapters (${results.chapters.length})`],
                ['standards', `IS Codes (${results.standards.length})`],
                ['glossary', `Glossary (${results.glossary.length})`],
                ['regions', `Regions (${results.regions.length})`],
                ['checklists', `Checklists (${results.checklists.length})`],
              ] as [SearchBucket, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setBucket(id)}
                className={`px-2.5 py-1 text-xs font-medium border min-h-[32px] ${
                  bucket === id
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="font-mono text-[11px] text-neutral-400 hidden sm:inline">
            100% OFFLINE INDEX · ESC TO CLOSE
          </span>
        </div>

        {/* Results Feed */}
        <div className="overflow-y-auto divide-y divide-neutral-200 flex-1">
          {totalMatches === 0 ? (
            <div className="p-8 text-center text-sm text-neutral-600">
              No offline matches for "{query}". Try broader terms such as <em>footing</em>,{' '}
              <em>IS 456</em>, <em>waterproofing</em>, or <em>earthing</em>.
            </div>
          ) : (
            <>
              {(bucket === 'all' || bucket === 'chapters') && results.chapters.length > 0 && (
                <div className="p-4 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    Chapters
                  </div>
                  <div className="space-y-1.5">
                    {results.chapters.map((ch) => (
                      <button
                        key={ch.number}
                        type="button"
                        onClick={() => {
                          onSelectChapter(ch.number);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 border border-neutral-200 hover:border-blue-900 bg-white transition-colors"
                      >
                        <div className="font-mono text-[11px] text-blue-900 font-semibold">
                          CHAPTER {ch.number} · {ch.evidenceTags.join(' · ')}
                        </div>
                        <div className="text-sm font-medium text-neutral-900">{ch.title}</div>
                        <div className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                          {ch.objective}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(bucket === 'all' || bucket === 'standards') && results.standards.length > 0 && (
                <div className="p-4 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    BIS Standards &amp; Codes
                  </div>
                  <div className="space-y-1.5">
                    {results.standards.map((s) => (
                      <button
                        key={s.source_id}
                        type="button"
                        onClick={() => {
                          onNavigate('standards');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 border border-neutral-200 hover:border-blue-900 bg-white transition-colors"
                      >
                        <div className="font-mono text-[11px] text-blue-900 font-semibold">
                          {s.standard_or_document_number} ({s.edition_or_year})
                        </div>
                        <div className="text-xs font-medium text-neutral-900">{s.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(bucket === 'all' || bucket === 'glossary') && results.glossary.length > 0 && (
                <div className="p-4 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    Glossary Terms
                  </div>
                  <div className="space-y-1.5">
                    {results.glossary.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => {
                          onSelectChapter(g.relatedChapter);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 border border-neutral-200 hover:border-blue-900 bg-white transition-colors"
                      >
                        <div className="text-xs font-semibold text-neutral-900">
                          {g.term}{' '}
                          {g.siteAlias && (
                            <span className="font-normal text-neutral-500">({g.siteAlias})</span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-600 line-clamp-2 mt-0.5">
                          {g.definition}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(bucket === 'all' || bucket === 'regions') && results.regions.length > 0 && (
                <div className="p-4 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    Indian Regional Profiles
                  </div>
                  <div className="space-y-1.5">
                    {results.regions.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => {
                          onNavigate('regions');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 border border-neutral-200 hover:border-blue-900 bg-white transition-colors"
                      >
                        <div className="text-xs font-semibold text-neutral-900">
                          {r.region} · <span className="text-blue-900 font-mono">{r.climate}</span>
                        </div>
                        <div className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                          {r.mainHazards}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(bucket === 'all' || bucket === 'checklists') && results.checklists.length > 0 && (
                <div className="p-4 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    Site Hold-Point Checklists
                  </div>
                  <div className="space-y-1.5">
                    {results.checklists.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          onNavigate('checklists');
                          onClose();
                        }}
                        className="w-full text-left p-2.5 border border-neutral-200 hover:border-blue-900 bg-white transition-colors"
                      >
                        <div className="font-mono text-[11px] text-blue-900">{c.stage}</div>
                        <div className="text-xs font-semibold text-neutral-900">{c.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
