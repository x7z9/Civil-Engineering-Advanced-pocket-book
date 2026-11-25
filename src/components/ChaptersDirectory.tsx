import React, { useMemo, useState } from 'react';
import { Bookmark, CheckCircle2, Search } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { PARTS } from '../data/parts';
import type { AudienceRole, EvidenceTag, LocalUserState } from '../types/pocketbook';

interface ChaptersDirectoryProps {
  userState: LocalUserState;
  onOpenChapter: (chapterNumber: number) => void;
}

const EVIDENCE_OPTIONS: EvidenceTag[] = [
  'IS',
  'NBC',
  'LAW',
  'GOVT MANUAL',
  'RESEARCH',
  'FIELD PRACTICE',
];

export const ChaptersDirectory: React.FC<ChaptersDirectoryProps> = ({
  userState,
  onOpenChapter,
}) => {
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all');
  const [selectedRole, setSelectedRole] = useState<AudienceRole | 'all'>(userState.audienceFilter);
  const [selectedTag, setSelectedTag] = useState<EvidenceTag | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'bookmarked' | 'remaining'>(
    'all'
  );
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHAPTERS.filter((ch) => {
      if (selectedPart !== 'all' && ch.partId !== selectedPart) return false;
      if (selectedRole !== 'all' && !ch.audience.includes(selectedRole)) return false;
      if (selectedTag !== 'all' && !ch.evidenceTags.includes(selectedTag)) return false;
      if (statusFilter === 'completed' && !userState.completedChapters.includes(ch.number)) {
        return false;
      }
      if (statusFilter === 'bookmarked' && !userState.bookmarkedChapters.includes(ch.number)) {
        return false;
      }
      if (statusFilter === 'remaining' && userState.completedChapters.includes(ch.number)) {
        return false;
      }
      if (q) {
        const hay = `${ch.number} ${ch.title} ${ch.objective} ${ch.engineerTips.join(' ')}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [
    query,
    selectedPart,
    selectedRole,
    selectedTag,
    statusFilter,
    userState.bookmarkedChapters,
    userState.completedChapters,
  ]);

  const groupedByPart = useMemo(() => {
    return PARTS.map((part) => ({
      part,
      chapters: filtered.filter((c) => c.partId === part.id),
    })).filter((g) => g.chapters.length > 0);
  }, [filtered]);

  return (
    <div className="space-y-8 pb-12">
      <header className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          COMPLETE SYLLABUS · 14 PARTS · 180 CHAPTERS
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
          Chapters Directory
        </h1>
        <p className="text-sm text-neutral-600 max-w-2xl">
          Filter every chapter offline by construction part, learning role, evidence classification, or
          local study status.
        </p>
      </header>

      {/* Filter Control Panel */}
      <section className="border border-neutral-200 bg-neutral-50/60 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by chapter number, topic, or IS code..."
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 text-sm text-neutral-900 placeholder:text-neutral-400 min-h-[44px]"
            />
          </div>

          <select
            aria-label="Filter by Part"
            value={selectedPart}
            onChange={(e) =>
              setSelectedPart(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="px-3 py-2.5 bg-white border border-neutral-300 text-sm text-neutral-900 min-h-[44px]"
          >
            <option value="all">All 14 Parts (0–13)</option>
            {PARTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.code}: {p.shortTitle} (Ch. {p.chapterRange[0]}–{p.chapterRange[1]})
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by Audience"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as AudienceRole | 'all')}
            className="px-3 py-2.5 bg-white border border-neutral-300 text-sm text-neutral-900 min-h-[44px]"
          >
            <option value="all">All Audiences</option>
            <option value="student">Students</option>
            <option value="homeowner">Homeowners</option>
            <option value="site">Site Engineers / Supervisors</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {(['all', 'remaining', 'completed', 'bookmarked'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors min-h-[36px] ${
                  statusFilter === st
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {st === 'all'
                  ? 'All'
                  : st === 'remaining'
                    ? 'Unread'
                    : st === 'completed'
                      ? 'Completed'
                      : 'Bookmarked'}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filter by Evidence Tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value as EvidenceTag | 'all')}
              className="px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-800 min-h-[36px]"
            >
              <option value="all">All Evidence Tags</option>
              {EVIDENCE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  [{t}]
                </option>
              ))}
            </select>

            <span className="font-mono text-xs text-neutral-600 tabular-nums">
              Showing {filtered.length} / {CHAPTERS.length}
            </span>
          </div>
        </div>
      </section>

      {/* Grouped Chapter Listings */}
      {groupedByPart.length === 0 ? (
        <div className="border border-neutral-200 bg-white p-8 text-center space-y-2">
          <p className="text-sm font-medium text-neutral-900">No chapters match your current filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedPart('all');
              setSelectedRole('all');
              setSelectedTag('all');
              setStatusFilter('all');
              setQuery('');
            }}
            className="text-xs font-semibold text-blue-900 hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedByPart.map(({ part, chapters }) => (
            <section key={part.id} className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-200 pb-2">
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
                  <span className="font-mono text-xs text-blue-900 mr-2 uppercase">
                    {part.code}
                  </span>
                  {part.title}
                </h2>
                <span className="font-mono text-xs text-neutral-500 tabular-nums">
                  {chapters.length} chapter{chapters.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chapters.map((ch) => {
                  const done = userState.completedChapters.includes(ch.number);
                  const saved = userState.bookmarkedChapters.includes(ch.number);
                  return (
                    <button
                      key={ch.number}
                      type="button"
                      onClick={() => onOpenChapter(ch.number)}
                      className="text-left p-4 border border-neutral-200 bg-white hover:border-blue-900 transition-colors flex flex-col justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-neutral-500">
                          <span className="text-blue-900 font-semibold tabular-nums">
                            CH. {String(ch.number).padStart(3, '0')}
                          </span>
                          <div className="flex items-center gap-2">
                            <span>{ch.evidenceTags.slice(0, 2).join(' · ')}</span>
                            {saved && <Bookmark className="w-3.5 h-3.5 text-blue-900 fill-blue-900" />}
                            {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-neutral-900 mt-1">
                          {ch.title}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                          {ch.objective}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
