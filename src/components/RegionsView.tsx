import React, { useState } from 'react';
import { ExternalLink, MapPin, Printer } from 'lucide-react';
import { AUDIT_DATE } from '../data/parts';
import { REGIONAL_PROFILES, SITE_INFO_PACK_CHECKLIST, STATE_AUTHORITIES } from '../data/regions';
import type { LocalUserState } from '../types/pocketbook';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface RegionsViewProps {
  userState: LocalUserState;
  onToggleChecklistItem: (itemId: string) => void;
  onPrintCurrentPage: () => void;
}

type TerrainType = 'plains' | 'coastal' | 'hill' | 'expansive-clay' | 'flood-prone';

const TERRAIN_GUIDANCE: Record<
  TerrainType,
  { label: string; checks: string[]; codes: string }
> = {
  plains: {
    label: 'Alluvial / Urban Plains',
    checks: [
      'Confirm road-crown vs finished ground level (RL) and storm-drain invert so plinth clears historic street waterlogging.',
      'Obtain IS 1892:2021 borehole SPT data across filled or agricultural plots to check soft lenses and seasonal water table.',
      'Check urban setback, road-widening line, and FSI/FAR directly from notified State / Municipal Gazette rules.',
    ],
    codes: 'IS 1892:2021 · IS 1904:2021 · NBC Part 3 · Local AHJ Rules',
  },
  coastal: {
    label: 'Coastal / High-Humidity & Cyclonic Belt',
    checks: [
      'Check Coastal Regulation Zone (CRZ) category and High Tide Line setback on the State CZMP / PARIVESH portal.',
      'Specify IS 456 coastal/severe exposure concrete durability, minimum cover, dense curing, and corrosion-resistant steel detailing.',
      'Verify basic wind speed, cyclonic factor, roof-to-wall tie-downs, and hurricane-rated window fasteners under IS 875 (Part 3):2015.',
    ],
    codes: 'IS 875 (Part 3):2015 · IS 456:2000 (Rev 2025) · CRZ / PARIVESH · BMTPC Atlas',
  },
  hill: {
    label: 'Hill / Sloping Terrain & High Seismic Zone',
    checks: [
      'Review GSI Bhusanket landslide susceptibility and local drainage nalas before cutting any slope.',
      'Design engineered retaining walls with free-draining granular backfill, geotextile filter, and functioning weep holes.',
      'Avoid unbraced short columns on stepped slopes; verify IS 1893 (Part 1):2025 and IS 13920 ductile detailing.',
    ],
    codes: 'IS 1893 (Part 1):2025 · IS 13920 · GSI Bhusanket · Hill Town Rules',
  },
  'expansive-clay': {
    label: 'Black Cotton / Expansive Clay Soil',
    checks: [
      'Test Free Swell Index (FSI), Atterberg limits, and moisture-depth profile under IS 2720 before selecting foundation type.',
      'Investigate under-reamed piles (IS 2911 Part 3), CNS cushion, or stiffened plinth/grade beams isolated from swelling clay.',
      'Maintain continuous perimeter apron pavement and leak-free plumbing lines to prevent seasonal moisture swings under footings.',
    ],
    codes: 'IS 1892:2021 · IS 2911 (Part 3) · IS 2720 · IS 1904:2021',
  },
  'flood-prone': {
    label: 'Riverine / Monsoon Flood-Prone Zone',
    checks: [
      'Anchor plinth elevation above verified High Flood Level (HFL) + freeboard, never merely above current unpaved street dirt.',
      'Check scour depth, hydrostatic uplift on underground sumps/septic tanks, and backflow-prevented storm/sewer outlets.',
      'Detail flood-resilient ground-level finishes, raised electrical distribution boards, and moisture-tolerant masonry below flood mark.',
    ],
    codes: 'BMTPC Flood Atlas · IMD Normals · NBC Part 3 & 9 · Local Disaster Rules',
  },
};

export const RegionsView: React.FC<RegionsViewProps> = ({
  userState,
  onToggleChecklistItem,
  onPrintCurrentPage,
}) => {
  const [selectedState, setSelectedState] = useState<string>(STATE_AUTHORITIES[0].state);
  const [selectedTerrain, setSelectedTerrain] = useState<TerrainType>('plains');
  const [activeRegionId, setActiveRegionId] = useState<string>(REGIONAL_PROFILES[0].id);

  const stateEntry =
    STATE_AUTHORITIES.find((s) => s.state === selectedState) ?? STATE_AUTHORITIES[0];
  const matchedRegion =
    REGIONAL_PROFILES.find((r) => r.id === stateEntry.regionId) ?? REGIONAL_PROFILES[0];
  const activeRegion =
    REGIONAL_PROFILES.find((r) => r.id === activeRegionId) ?? REGIONAL_PROFILES[0];
  const terrainInfo = TERRAIN_GUIDANCE[selectedTerrain];

  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <header className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          INDIA REGIONAL &amp; CLIMATE GUIDE · 11 REGIONS · STATE BUILDING RULES · AUDIT {AUDIT_DATE}
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
          Choose Your Location &amp; Regional Engineering Guide
        </h1>
        <p className="text-sm text-neutral-600 max-w-3xl leading-relaxed">
          India spans hot-dry deserts, humid cyclone coasts, black-cotton clays, alluvial floodplains,
          and high-seismic Himalayan slopes. Never copy a house plan or foundation detail from another
          region without verifying local State rules, hazards, and plot-specific soil tests.
        </p>
      </header>

      {/* Interactive "Choose Your Location" Explorer */}
      <section className="border border-neutral-200 bg-white p-5 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-900 shrink-0" />
            <h2 className="font-serif text-xl font-semibold text-neutral-900">
              Interactive Location &amp; Terrain Briefing (100% Offline)
            </h2>
          </div>
          <button
            type="button"
            onClick={onPrintCurrentPage}
            className="no-print inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-300 bg-white hover:bg-neutral-50 min-h-[40px] self-start sm:self-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Site Briefing</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="state-select"
              className="block font-mono text-xs uppercase tracking-wider text-neutral-600"
            >
              1. Select State / UT Jurisdiction
            </label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                const found = STATE_AUTHORITIES.find((s) => s.state === e.target.value);
                if (found) setActiveRegionId(found.regionId);
              }}
              className="w-full px-3 py-2.5 bg-white border border-neutral-300 text-sm text-neutral-900 min-h-[44px]"
            >
              {STATE_AUTHORITIES.map((st) => (
                <option key={st.state} value={st.state}>
                  {st.state}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <span className="block font-mono text-xs uppercase tracking-wider text-neutral-600">
              2. Select Site Terrain / Soil Context
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(TERRAIN_GUIDANCE) as TerrainType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTerrain(key)}
                  className={`px-2.5 py-2 text-xs font-medium border transition-colors min-h-[40px] ${
                    selectedTerrain === key
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {TERRAIN_GUIDANCE[key].label.split('/')[0].trim()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Location Output Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          <div className="border border-neutral-200 bg-neutral-50/60 p-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-blue-900 font-semibold">
              Statutory &amp; Regional Profile — {stateEntry.state}
            </div>
            <dl className="space-y-2 text-xs">
              <div>
                <dt className="font-semibold text-neutral-900">Governing Building Rules</dt>
                <dd className="text-neutral-700 mt-0.5">{stateEntry.governingRules}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Amendment / Gazette Verification</dt>
                <dd className="text-neutral-700 mt-0.5">{stateEntry.amendmentNote}</dd>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <dt className="font-semibold text-neutral-900">Climate Context</dt>
                  <dd className="text-neutral-700 mt-0.5">{stateEntry.climateZone}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-neutral-900">Seismic Context</dt>
                  <dd className="text-neutral-700 mt-0.5">{stateEntry.seismicContext}</dd>
                </div>
              </div>
              <div>
                <dt className="font-semibold text-neutral-900">Mapped Learning Region</dt>
                <dd className="text-neutral-700 mt-0.5">{matchedRegion.region}</dd>
              </div>
            </dl>
            <div className="pt-2 border-t border-neutral-200 flex flex-wrap gap-4 text-xs">
              <a
                href={stateEntry.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-900 hover:underline"
              >
                <span>State Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={stateEntry.gazetteOrRuleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-900 hover:underline"
              >
                <span>Building Rules / Gazette</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="border border-neutral-200 bg-white p-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-blue-900 font-semibold">
              Terrain Action Points — {terrainInfo.label}
            </div>
            <ul className="space-y-2 text-xs text-neutral-700 leading-relaxed">
              {terrainInfo.checks.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-blue-900 font-semibold shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-neutral-100 font-mono text-[11px] text-neutral-500">
              Primary Basis: {terrainInfo.codes}
            </div>
          </div>
        </div>
      </section>

      {/* Climate Diagram */}
      <TechnicalDiagram
        diagramKey="climate-zones"
        caption="India Climate Zones & Passive Building Envelope Principles (NBC Part 8 / Eco-Niwas Samhita)."
        focusNote="Select shading, ventilation, wall thermal mass, and waterproofing to match your regional microclimate."
        compact={userState.lowBandwidthDiagrams}
      />

      {/* 13-Point Printable Site Information Pack */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-neutral-900">
            13-Point Site Information Pack Checklist
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Assemble all 13 site inputs before finalizing architectural plans, structural design, or
            contractor tenders. Ticks save locally on your device.
          </p>
        </div>

        <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white">
          {SITE_INFO_PACK_CHECKLIST.map((entry) => {
            const key = `site-pack-${entry.step}`;
            const checked = Boolean(userState.checkedItems[key]);
            return (
              <label
                key={key}
                className="flex items-start gap-3 p-3.5 sm:p-4 cursor-pointer hover:bg-neutral-50/60 transition-colors min-h-[44px]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleChecklistItem(key)}
                  className="mt-1 w-4 h-4 accent-blue-900 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        checked ? 'line-through text-neutral-400' : 'text-neutral-900'
                      }`}
                    >
                      <span className="font-mono text-xs text-blue-900 mr-1.5 tabular-nums">
                        {String(entry.step).padStart(2, '0')}.
                      </span>
                      {entry.item}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500">{entry.source}</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{entry.action}</p>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* 11 Regional Learning Profiles Interactive Selector */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-neutral-900">
          11 Indian Regional Learning Profiles
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {REGIONAL_PROFILES.map((reg) => (
            <button
              key={reg.id}
              type="button"
              onClick={() => setActiveRegionId(reg.id)}
              className={`px-3 py-2 text-xs font-medium border transition-colors min-h-[40px] ${
                activeRegionId === reg.id
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {reg.region}
            </button>
          ))}
        </div>

        <div className="border border-neutral-200 bg-white p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
                {activeRegion.region}
              </h3>
              <div className="text-xs text-neutral-500 mt-0.5">
                States / Areas: {activeRegion.states.join(', ')}
              </div>
            </div>
            <span className="font-mono text-xs text-blue-900">{activeRegion.climate}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="border border-neutral-200 bg-neutral-50/50 p-4 space-y-1">
              <div className="font-mono text-[11px] uppercase text-red-800 font-semibold">
                Main Exposure / Hazards
              </div>
              <p className="text-neutral-800 leading-relaxed">{activeRegion.mainHazards}</p>
            </div>
            <div className="border border-neutral-200 bg-neutral-50/50 p-4 space-y-1">
              <div className="font-mono text-[11px] uppercase text-amber-900 font-semibold">
                Typical Site &amp; Soil Concerns
              </div>
              <p className="text-neutral-800 leading-relaxed">{activeRegion.typicalSiteConcerns}</p>
            </div>
            <div className="border border-neutral-200 bg-white p-4 space-y-1">
              <div className="font-mono text-[11px] uppercase text-blue-900 font-semibold">
                Design Response to Investigate
              </div>
              <p className="text-neutral-800 leading-relaxed">{activeRegion.designResponse}</p>
            </div>
            <div className="border border-neutral-200 bg-white p-4 space-y-1">
              <div className="font-mono text-[11px] uppercase text-neutral-600 font-semibold">
                Local Materials &amp; Construction Context
              </div>
              <p className="text-neutral-800 leading-relaxed">{activeRegion.materialsContext}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs">
            <span className="font-mono text-neutral-500">
              Source: {activeRegion.source} · Verified {activeRegion.lastVerified}
            </span>
            <div className="flex flex-wrap gap-3">
              {activeRegion.officialPortals.map((p) => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-blue-900 hover:underline"
                >
                  <span>{p.label}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Master Regional Comparison Matrix */}
      <section className="space-y-3">
        <h2 className="font-serif text-xl font-semibold text-neutral-900">
          India Regional Comparison Matrix
        </h2>

        {/* Desktop Matrix Table */}
        <div className="hidden lg:block overflow-x-auto border border-neutral-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 font-mono text-[11px] uppercase tracking-wider text-neutral-600">
                <th className="py-2.5 px-3 font-semibold">Region</th>
                <th className="py-2.5 px-3 font-semibold">Climate</th>
                <th className="py-2.5 px-3 font-semibold">Main Exposure / Hazard</th>
                <th className="py-2.5 px-3 font-semibold">Typical Site Concerns</th>
                <th className="py-2.5 px-3 font-semibold">Design Response to Investigate</th>
                <th className="py-2.5 px-3 font-semibold">Source &amp; Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {REGIONAL_PROFILES.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="py-3 px-3 font-semibold text-neutral-900">{r.region}</td>
                  <td className="py-3 px-3 text-neutral-700">{r.climate}</td>
                  <td className="py-3 px-3 text-neutral-700">{r.mainHazards}</td>
                  <td className="py-3 px-3 text-neutral-700">{r.typicalSiteConcerns}</td>
                  <td className="py-3 px-3 text-neutral-800">{r.designResponse}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-neutral-500">
                    <div>{r.source}</div>
                    <div className="mt-1">{r.lastVerified}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Stacked Regional Cards */}
        <div className="lg:hidden space-y-3">
          {REGIONAL_PROFILES.map((r) => (
            <div key={r.id} className="border border-neutral-200 bg-white p-4 space-y-2 text-xs">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold text-neutral-900 text-sm">{r.region}</span>
                <span className="font-mono text-[11px] text-blue-900">{r.climate}</span>
              </div>
              <p className="text-neutral-700">
                <strong>Hazards:</strong> {r.mainHazards}
              </p>
              <p className="text-neutral-700">
                <strong>Site Concerns:</strong> {r.typicalSiteConcerns}
              </p>
              <p className="text-neutral-800">
                <strong>Design Response:</strong> {r.designResponse}
              </p>
              <div className="font-mono text-[11px] text-neutral-500 pt-1 border-t border-neutral-100">
                {r.source} · Verified {r.lastVerified}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
