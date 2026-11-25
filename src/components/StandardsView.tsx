import React, { useMemo, useState } from 'react';
import { AlertTriangle, ExternalLink, Search } from 'lucide-react';
import { AUDIT_DATE } from '../data/parts';
import { EDITION_CHECK_FLAGS, OFFICIAL_LINKS, STANDARDS_REGISTER } from '../data/standards';
import type { OfficialLink, StandardRecord } from '../types/pocketbook';

const DISCIPLINES: ('All' | StandardRecord['discipline'])[] = [
  'All',
  'Building Rules & NBC',
  'Loads & Structural',
  'Soil & Foundations',
  'Concrete & Steel',
  'Masonry & Materials',
  'Water & Sanitation',
  'Electrical & Safety',
  'Waterproofing & Measurement',
  'BIS Handbooks (SP)',
];

const LINK_CATEGORIES: ('All' | OfficialLink['category'])[] = [
  'All',
  'BIS Standards & NBC',
  'MoHUA & State Building Rules',
  'Disaster, Hazard & Geology',
  'Climate, Groundwater & Coastal',
  'CPWD & Public Works',
  'Water, Sanitation & Energy',
  'Technical Libraries',
];

export const StandardsView: React.FC = () => {
  const [discipline, setDiscipline] = useState<'All' | StandardRecord['discipline']>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | StandardRecord['status']>('all');
  const [search, setSearch] = useState('');
  const [linkCategory, setLinkCategory] = useState<'All' | OfficialLink['category']>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredStandards = useMemo(() => {
    const q = search.trim().toLowerCase();
    return STANDARDS_REGISTER.filter((s) => {
      if (discipline !== 'All' && s.discipline !== discipline) return false;
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (q) {
        const hay =
          `${s.standard_or_document_number} ${s.title} ${s.subject} ${s.issuing_body} ${s.edition_or_year}`.toLowerCase();
        return hay.includes(q);
      }
      return true;
    });
  }, [discipline, statusFilter, search]);

  const filteredLinks = useMemo(() => {
    return OFFICIAL_LINKS.filter((l) => linkCategory === 'All' || l.category === linkCategory);
  }, [linkCategory]);

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <header className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          PRIMARY AUTHORITY REGISTER · AUDIT DATE {AUDIT_DATE} · INDIA JURISDICTION
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
          Indian Standards, NBC &amp; Official Reference Library
        </h1>
        <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
          All code citations in this pocketbook anchor directly to Bureau of Indian Standards (BIS)
          records, NBC 2016 (SP 7:2016), State Gazettes, CPWD, BMTPC, IMD, CGWB, GSI, BEE, and
          CPHEEO. Always confirm the latest edition and amendments on the official portal before
          issuing project specifications.
        </p>
      </header>

      {/* Active Edition-Check Flags (All 9 Mandatory Alerts) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0" />
          <h2 className="font-serif text-xl font-semibold text-neutral-900">
            Active Edition-Check Flags (2025–2026 Audit)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600">
          Do not cite outdated textbook editions (such as IS 1893:2016, IS 875 Part 1:1987, or IS
          1077:1992) without checking the current BIS revision status flagged below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {EDITION_CHECK_FLAGS.map((flag) => (
            <div
              key={flag.code}
              className="border border-amber-300/90 bg-amber-50/30 p-4 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-neutral-900">{flag.code}</span>
                  <span className="font-mono text-[11px] text-amber-900 uppercase">
                    {flag.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-700 mt-2 leading-relaxed">{flag.summary}</p>
              </div>
              <a
                href={flag.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-900 hover:underline self-start"
              >
                <span>Verify on Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Structured 14-Field Standards Register */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl font-semibold text-neutral-900">
              Verified Standards Register ({STANDARDS_REGISTER.length} Records)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Click any record to inspect full amendments, access type, clause scope, and reuse
              policy.
            </p>
          </div>
          <span className="font-mono text-xs text-neutral-500 tabular-nums">
            Showing {filteredStandards.length} / {STANDARDS_REGISTER.length}
          </span>
        </div>

        {/* Search & Filter Row */}
        <div className="border border-neutral-200 bg-neutral-50/60 p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-2">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search IS code, SP handbook, NBC part, or subject..."
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 text-sm text-neutral-900 min-h-[44px]"
              />
            </div>

            <select
              aria-label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | StandardRecord['status'])}
              className="px-3 py-2.5 bg-white border border-neutral-300 text-sm text-neutral-900 min-h-[44px]"
            >
              <option value="all">All Statuses</option>
              <option value="current">Current</option>
              <option value="verify">Verify Scope / Revision</option>
              <option value="superseded">Superseded</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {DISCIPLINES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDiscipline(d)}
                className={`px-2.5 py-1.5 text-xs font-medium border transition-colors min-h-[36px] ${
                  discipline === d
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Register Cards / Expandable Ledger */}
        <div className="divide-y divide-neutral-200 border border-neutral-200 bg-white">
          {filteredStandards.map((rec) => {
            const isOpen = expandedId === rec.source_id;
            return (
              <div key={rec.source_id} className="p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => setExpandedId(isOpen ? null : rec.source_id)}
                  className="w-full text-left flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-neutral-500">
                      <span className="text-blue-900 font-semibold">
                        {rec.standard_or_document_number}
                      </span>
                      {' · '}
                      <span>{rec.edition_or_year}</span>
                      {' · '}
                      <span>{rec.discipline}</span>
                    </div>
                    <div className="text-sm font-semibold text-neutral-900">{rec.title}</div>
                    <div className="text-xs text-neutral-600">{rec.subject}</div>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] shrink-0">
                    <span
                      className={
                        rec.status === 'current'
                          ? 'text-emerald-800 font-semibold uppercase'
                          : 'text-amber-900 font-semibold uppercase'
                      }
                    >
                      {rec.status}
                    </span>
                    <span className="text-blue-900 underline">
                      {isOpen ? 'Hide details' : 'Inspect'}
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-neutral-50/50 p-3.5">
                    <div>
                      <span className="font-mono text-neutral-500 uppercase">Issuing Body: </span>
                      <span className="text-neutral-900 font-medium">{rec.issuing_body}</span>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-500 uppercase">Jurisdiction: </span>
                      <span className="text-neutral-900">{rec.jurisdiction}</span>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-500 uppercase">Amendments: </span>
                      <span className="text-neutral-900">{rec.amendments_or_reaffirmation}</span>
                    </div>
                    <div>
                      <span className="font-mono text-neutral-500 uppercase">Access Type: </span>
                      <span className="text-neutral-900 uppercase font-mono">
                        {rec.access_type}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-mono text-neutral-500 uppercase">
                        Clauses / Scope Used:{' '}
                      </span>
                      <span className="text-neutral-900">{rec.clauses_or_pages_used}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-mono text-neutral-500 uppercase">Reuse Policy: </span>
                      <span className="text-neutral-700">{rec.content_reuse_note}</span>
                    </div>
                    {rec.edition_flag && (
                      <div className="sm:col-span-2 text-amber-900 font-medium">
                        Edition Alert: {rec.edition_flag}
                      </div>
                    )}
                    <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-200">
                      <span className="font-mono text-neutral-500">
                        Source ID: {rec.source_id} · Last verified {rec.last_verified_date}
                      </span>
                      <a
                        href={rec.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-blue-900 hover:underline"
                      >
                        <span>Open Official Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Complete 53 Official Reference Links */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-xl font-semibold text-neutral-900">
              Official Indian Government &amp; Technical Portals ({OFFICIAL_LINKS.length} Links)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Direct links to BIS Know Your Standards, State Building Bye-Law Gazettes, BMTPC
              Vulnerability Atlas, GSI Bhusanket, IMD, CGWB, PARIVESH, CPWD, and BEE.
            </p>
          </div>
          <span className="font-mono text-xs text-neutral-500 tabular-nums">
            Showing {filteredLinks.length} links
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {LINK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setLinkCategory(cat)}
              className={`px-2.5 py-1.5 text-xs font-medium border transition-colors min-h-[36px] ${
                linkCategory === cat
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-200 bg-white hover:border-blue-900 p-4 transition-colors flex flex-col justify-between gap-2"
            >
              <div>
                <div className="font-mono text-[11px] text-neutral-500 flex items-center justify-between gap-2">
                  <span>
                    #{String(link.id).padStart(2, '0')} · {link.category}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                </div>
                <div className="text-sm font-semibold text-neutral-900 mt-1">{link.title}</div>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{link.note}</p>
              </div>
              <div className="font-mono text-[11px] text-blue-900 truncate pt-1 border-t border-neutral-100">
                {link.url}
              </div>
            </a>
          ))}
        </div>

        <div className="border border-neutral-200 bg-neutral-50/70 p-4 text-xs text-neutral-600 leading-relaxed">
          <strong className="text-neutral-900">Offline Reference Integrity Note:</strong> Because
          this pocketbook runs 100% locally without live external telemetry, official URLs open
          directly in your browser when online. If any State Gazette URL shifts, locate the latest
          notification via the State Urban Development / Local Self-Government homepage or BIS Know
          Your Standards portal.
        </div>
      </section>
    </div>
  );
};
