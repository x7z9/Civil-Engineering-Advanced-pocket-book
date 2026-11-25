import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { DiagramKey } from '../types/pocketbook';

interface DiagramCallout {
  num: string;
  label: string;
  detail: string;
  tone: 'structure' | 'water' | 'soil' | 'hazard' | 'electrical' | 'inspection';
}

interface DiagramMeta {
  title: string;
  legend: string[];
  callouts: DiagramCallout[];
  renderSvg: () => React.ReactNode;
}

const TONE_TEXT: Record<DiagramCallout['tone'], string> = {
  structure: 'text-blue-900',
  water: 'text-sky-700',
  soil: 'text-amber-900',
  hazard: 'text-red-700',
  electrical: 'text-amber-700',
  inspection: 'text-emerald-800',
};

const TONE_DOT_FILL: Record<DiagramCallout['tone'], string> = {
  structure: '#1E3A8A',
  water: '#0284C7',
  soil: '#92400E',
  hazard: '#B91C1C',
  electrical: '#B45309',
  inspection: '#047857',
};

function Marker({ x, y, n, tone }: { x: number; y: number; n: string; tone: DiagramCallout['tone'] }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10" fill={TONE_DOT_FILL[tone]} />
      <text x={x} y={y + 3.5} textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">
        {n}
      </text>
    </g>
  );
}

const DIAGRAMS: Record<DiagramKey, DiagramMeta> = {
  'house-cutaway': {
    title: 'Axonometric Indian House Cutaway — Ground to Roof System',
    legend: ['Structure (#1E3A8A)', 'Waterproofing & Drainage (#0284C7)', 'Bearing Soil (#92400E)', 'Inspection Hold Points (#047857)'],
    callouts: [
      { num: '1', label: 'Competent Bearing Strata & PCC Bed', detail: 'Plot-specific IS 1892:2021 borehole determines depth; lean PCC creates level clean base.', tone: 'soil' },
      { num: '2', label: 'Engineered Footing & Plinth Beam', detail: 'Transfers column loads safely; raised plinth + DPC blocks storm runoff and rising damp.', tone: 'structure' },
      { num: '3', label: 'Continuous RC Frame (Columns, Beams, Slabs)', detail: 'Monolithic load path with ductile IS 13920 confinement and continuous column lines.', tone: 'structure' },
      { num: '4', label: 'Masonry Infill, Chajjas & Waterproofed Roof', detail: 'Sloped terrace membrane turned into parapet reglet, drip grooves on sunshades, and rainwater outlets.', tone: 'water' },
      { num: '5', label: 'Stacked Wet Shaft & Earthing Pit', detail: 'Accessible external plumbing shaft + IS 3043 protective earthing outside structure.', tone: 'inspection' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 380" className="w-full h-auto" role="img" aria-label="Sectional house cutaway from bearing soil to roof">
        {/* Soil layers */}
        <rect x="30" y="290" width="660" height="72" fill="#FEF3C7" stroke="#92400E" strokeWidth="1" />
        <line x1="30" y1="322" x2="690" y2="322" stroke="#92400E" strokeWidth="1" strokeDasharray="6 4" />
        <text x="46" y="310" fill="#92400E" fontSize="10" fontFamily="IBM Plex Mono, monospace">NATURAL SOIL STRATUM (IS 1892:2021)</text>
        <text x="46" y="346" fill="#78350F" fontSize="10" fontFamily="IBM Plex Mono, monospace">DEEPER COMPETENT BEARING STRATUM</text>

        {/* PCC + Footings */}
        <rect x="115" y="308" width="90" height="10" fill="#E5E7EB" stroke="#374151" strokeWidth="1" />
        <polygon points="122,308 198,308 182,288 138,288" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="315" y="308" width="90" height="10" fill="#E5E7EB" stroke="#374151" strokeWidth="1" />
        <polygon points="322,308 398,308 382,288 338,288" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="515" y="308" width="90" height="10" fill="#E5E7EB" stroke="#374151" strokeWidth="1" />
        <polygon points="522,308 598,308 582,288 538,288" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />

        {/* Plinth & DPC */}
        <rect x="145" y="258" width="430" height="16" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <line x1="145" y1="258" x2="575" y2="258" stroke="#0284C7" strokeWidth="3" />
        <text x="235" y="270" fill="#1E3A8A" fontSize="9.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">PLINTH BEAM + CONTINUOUS DPC + COMPACTED FILL</text>

        {/* RC Columns */}
        <rect x="150" y="92" width="20" height="196" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="350" y="92" width="20" height="196" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="550" y="92" width="20" height="196" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.6" />

        {/* First Floor Slab & Beam */}
        <rect x="145" y="176" width="430" height="14" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.6" />
        {/* Roof Slab & Waterproofing */}
        <rect x="145" y="88" width="430" height="14" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <line x1="148" y1="84" x2="572" y2="84" stroke="#0284C7" strokeWidth="3.5" />
        {/* Parapet */}
        <rect x="145" y="54" width="12" height="34" fill="#F3F4F6" stroke="#374151" strokeWidth="1.3" />
        <rect x="563" y="54" width="12" height="34" fill="#F3F4F6" stroke="#374151" strokeWidth="1.3" />

        {/* OHT on Beams */}
        <rect x="330" y="42" width="60" height="40" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        <text x="360" y="65" textAnchor="middle" fill="#0369A1" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">OHT</text>

        {/* Masonry infill & Chajja */}
        <rect x="170" y="190" width="180" height="68" fill="#F9FAFB" stroke="#6B7280" strokeWidth="1" />
        <rect x="218" y="206" width="64" height="34" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
        <line x1="120" y1="196" x2="150" y2="202" stroke="#1E3A8A" strokeWidth="3" />
        <text x="86" y="192" fill="#1E3A8A" fontSize="9" fontFamily="IBM Plex Mono, monospace">CHAJJA</text>

        {/* Wet shaft + rainwater pipe */}
        <line x1="588" y1="86" x2="588" y2="286" stroke="#0284C7" strokeWidth="3" />
        <rect x="615" y="276" width="48" height="24" fill="#ECFDF5" stroke="#047857" strokeWidth="1.4" />
        <text x="639" y="291" textAnchor="middle" fill="#047857" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">EARTH</text>

        {/* Ground level line */}
        <line x1="30" y1="290" x2="690" y2="290" stroke="#374151" strokeWidth="1.5" />
        <text x="46" y="284" fill="#374151" fontSize="9.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">EXISTING GL / APRON</text>

        <Marker x={160} y={325} n="1" tone="soil" />
        <Marker x={210} y={266} n="2" tone="structure" />
        <Marker x={360} y={145} n="3" tone="structure" />
        <Marker x={490} y={80} n="4" tone="water" />
        <Marker x={604} y={220} n="5" tone="inspection" />
      </svg>
    ),
  },

  'project-lifecycle': {
    title: 'Gated House-Building Lifecycle & Sign-Off Governance',
    legend: ['Design & Statutory (#1E3A8A)', 'Mandatory Hold Gate (#047857)', 'Risk Stop (#B91C1C)'],
    callouts: [
      { num: '1', label: 'Survey & Soil Investigation First', detail: 'Physical boundary diagonals, TBM levels, and IS 1892:2021 borehole report precede structural design.', tone: 'soil' },
      { num: '2', label: 'Coordinated GFC & AHJ Sanction', detail: 'Freeze Arch + Structural + MEP grids together; retire superseded prints immediately.', tone: 'structure' },
      { num: '3', label: 'ITP Hold Points During Execution', detail: 'Excavation, rebar pre-pour, plumbing pressure, waterproofing ponding, and electrical IR gates.', tone: 'inspection' },
      { num: '4', label: 'Commissioning, OC & As-Built Dossier', detail: 'Live utility testing, snag closure, warranties, and Occupancy Certificate complete handover.', tone: 'water' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 260" className="w-full h-auto" role="img" aria-label="Gated 10-stage construction lifecycle flow">
        {[
          { x: 25, y: 40, t: '01 TITLE &', b: 'SURVEY', c: '#92400E' },
          { x: 160, y: 40, t: '02 SOIL TEST', b: 'IS 1892:2021', c: '#92400E' },
          { x: 295, y: 40, t: '03 ARCH & MEP', b: 'DESIGN FREEZE', c: '#1E3A8A' },
          { x: 430, y: 40, t: '04 STRUCTURAL', b: 'GFC + AHJ', c: '#1E3A8A' },
          { x: 565, y: 40, t: '05 TENDER', b: 'BOQ & ITP', c: '#1E3A8A' },
          { x: 565, y: 155, t: '06 SUBSTRUCTURE', b: 'HOLD POINTS', c: '#047857' },
          { x: 430, y: 155, t: '07 RC FRAME', b: 'POUR CARDS', c: '#047857' },
          { x: 295, y: 155, t: '08 ENVELOPE', b: 'WATERPROOF', c: '#0284C7' },
          { x: 160, y: 155, t: '09 MEP TEST', b: 'FINISHES', c: '#0284C7' },
          { x: 25, y: 155, t: '10 HANDOVER', b: 'OC + AS-BUILT', c: '#047857' },
        ].map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y} width="115" height="58" rx="4" fill="#FFFFFF" stroke={n.c} strokeWidth="1.5" />
            <text x={n.x + 57} y={n.y + 24} textAnchor="middle" fill={n.c} fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">{n.t}</text>
            <text x={n.x + 57} y={n.y + 41} textAnchor="middle" fill="#374151" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">{n.b}</text>
          </g>
        ))}
        {/* Arrows */}
        <path d="M140 69 L158 69 M275 69 L293 69 M410 69 L428 69 M545 69 L563 69 M622 98 L622 153 M565 184 L547 184 M430 184 L412 184 M295 184 L277 184 M160 184 L142 184" stroke="#6B7280" strokeWidth="1.6" fill="none" />
        <Marker x={160} y={34} n="1" tone="soil" />
        <Marker x={430} y={34} n="2" tone="structure" />
        <Marker x={565} y={149} n="3" tone="inspection" />
        <Marker x={25} y={149} n="4" tone="water" />
      </svg>
    ),
  },

  'site-survey-rl': {
    title: 'Site Levels, Datum RL, Road Crown & Plinth Elevation Section',
    legend: ['Datum / TBM (#047857)', 'Natural & Filled Ground (#92400E)', 'Stormwater Slope (#0284C7)', 'Structure (#1E3A8A)'],
    callouts: [
      { num: '1', label: 'Permanent TBM (+100.000 m)', detail: 'Fixed reference benchmark protected outside excavation; every RL ties back here.', tone: 'inspection' },
      { num: '2', label: 'Existing Road Crown + Future Overlay', detail: 'Account for future asphalt overlays and recorded monsoon High Flood Level (HFL).', tone: 'hazard' },
      { num: '3', label: 'Raised Plinth FFL & DPC', detail: 'Positive slope from plinth apron outward to compound drain keeps foundations dry.', tone: 'structure' },
      { num: '4', label: 'Stormwater Outfall Separation', detail: 'Silt-trapped plot storm channel drains cleanly to lawful street storm drain (never sewer).', tone: 'water' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 310" className="w-full h-auto" role="img" aria-label="Site elevation section showing road crown, TBM, plinth height, and drainage fall">
        {/* Datum line */}
        <line x1="25" y1="270" x2="695" y2="270" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="4 4" />
        <text x="35" y="286" fill="#6B7280" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">ASSUMED PROJECT DATUM RL +98.000 m</text>

        {/* Road crown */}
        <path d="M30 220 Q95 206 160 220 L160 270 L30 270 Z" fill="#E5E7EB" stroke="#374151" strokeWidth="1.4" />
        <text x="95" y="238" textAnchor="middle" fill="#111827" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">ROAD CROWN</text>
        <text x="95" y="251" textAnchor="middle" fill="#4B5563" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">RL +100.000 m</text>

        {/* Storm Drain */}
        <rect x="165" y="216" width="32" height="32" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        <text x="181" y="261" textAnchor="middle" fill="#0284C7" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">DRAIN</text>

        {/* TBM Pillar */}
        <rect x="215" y="196" width="22" height="36" fill="#ECFDF5" stroke="#047857" strokeWidth="1.5" />
        <text x="226" y="188" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">TBM</text>

        {/* Compound Apron Slope */}
        <polygon points="200,220 340,204 340,270 200,270" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.2" />
        <path d="M320 198 L215 210" stroke="#0284C7" strokeWidth="1.8" />
        <text x="278" y="194" textAnchor="middle" fill="#0284C7" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">OUTWARD SLOPE</text>

        {/* House Plinth & Floor */}
        <rect x="340" y="162" width="280" height="44" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <line x1="340" y1="162" x2="620" y2="162" stroke="#0284C7" strokeWidth="3" />
        <rect x="340" y="206" width="280" height="64" fill="#FDE68A" stroke="#92400E" strokeWidth="1.2" />
        <text x="480" y="183" textAnchor="middle" fill="#1E3A8A" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">PROPOSED PLINTH FFL (RL +100.700 m*)</text>
        <text x="480" y="197" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">*Illustrative elevation — verify local HFL & AHJ rules</text>
        <text x="480" y="242" textAnchor="middle" fill="#92400E" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">COMPACTED LAYERED FILL + ANTI-TERMITE</text>

        {/* HFL Line */}
        <line x1="30" y1="196" x2="335" y2="196" stroke="#B91C1C" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="95" y="190" textAnchor="middle" fill="#B91C1C" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">RECORDED HFL CHECK</text>

        <Marker x={226} y={214} n="1" tone="inspection" />
        <Marker x={95} y={208} n="2" tone="hazard" />
        <Marker x={365} y={162} n="3" tone="structure" />
        <Marker x={181} y={232} n="4" tone="water" />
      </svg>
    ),
  },

  'soil-borelog': {
    title: 'Subsurface Borehole Log, SPT N-Value & Groundwater Profile (IS 1892:2021)',
    legend: ['Soil Strata (#92400E)', 'Water Table (#0284C7)', 'SPT / Lab Verification (#047857)', 'Expansive / Weak Risk (#B91C1C)'],
    callouts: [
      { num: '1', label: 'Topsoil / Active Shrink-Swell Zone', detail: 'Never found footings inside organic topsoil or expansive seasonal moisture zone.', tone: 'hazard' },
      { num: '2', label: 'SPT Drive (150 mm Seating + 300 mm Count)', detail: 'Discard first 150 mm blows; sum final 300 mm for raw N-value; collect UDS in clay.', tone: 'inspection' },
      { num: '3', label: 'Seasonal Groundwater Table (GWT)', detail: 'Record date/season; monsoon rise lowers effective stress and drives buoyancy/corrosion checks.', tone: 'water' },
      { num: '4', label: 'Competent Bearing Stratum Below Pressure Bulb', detail: 'Borehole must probe 1.5B–2.0B below footing base to rule out hidden soft seams.', tone: 'soil' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 340" className="w-full h-auto" role="img" aria-label="Geotechnical borehole log showing soil strata, SPT blow count chart, and water table">
        {/* Depth axis */}
        <line x1="70" y1="36" x2="70" y2="305" stroke="#374151" strokeWidth="1.4" />
        {[0, 1.5, 3.0, 4.5, 6.0, 7.5].map((d, i) => (
          <g key={d}>
            <line x1="64" y1={45 + i * 48} x2="70" y2={45 + i * 48} stroke="#374151" strokeWidth="1.2" />
            <text x="58" y={49 + i * 48} textAnchor="end" fill="#4B5563" fontSize="9.5" fontFamily="IBM Plex Mono, monospace">{d.toFixed(1)}m</text>
          </g>
        ))}

        {/* Borehole column */}
        <rect x="85" y="45" width="235" height="48" fill="#FEE2E2" stroke="#B91C1C" strokeWidth="1.2" />
        <text x="202" y="73" textAnchor="middle" fill="#991B1B" fontSize="9.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">LOOSE FILL / ACTIVE CLAY (DO NOT FOUND)</text>

        <rect x="85" y="93" width="235" height="72" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.2" />
        <text x="202" y="133" textAnchor="middle" fill="#92400E" fontSize="9.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">MEDIUM STIFF SILTY CLAY (UDS + ATTERBERG)</text>

        <rect x="85" y="165" width="235" height="76" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.2" />
        <text x="202" y="206" textAnchor="middle" fill="#0369A1" fontSize="9.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">DENSE SANDY STRATUM (SATURATED)</text>

        <rect x="85" y="241" width="235" height="58" fill="#E5E7EB" stroke="#374151" strokeWidth="1.2" />
        <text x="202" y="274" textAnchor="middle" fill="#1F2937" fontSize="9.5" fontWeight="600" fontFamily="IBM Plex Mono, monospace">WEATHERED / HARD BEDROCK (CORE CHECK)</text>

        {/* Water table line */}
        <line x1="80" y1="165" x2="345" y2="165" stroke="#0284C7" strokeWidth="2.5" strokeDasharray="6 3" />
        <polygon points="330,157 342,157 336,165" fill="#0284C7" />
        <text x="348" y="169" fill="#0284C7" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">GWT (DATE LOGGED)</text>

        {/* SPT N-Value Plot */}
        <rect x="470" y="45" width="215" height="254" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.2" />
        <text x="577" y="34" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">ILLUSTRATIVE SPT N-VALUE PROFILE</text>
        <polyline points="495,70 520,120 538,155 590,195 620,235 665,270" fill="none" stroke="#047857" strokeWidth="2.4" />
        {[
          { x: 495, y: 70, n: 'N=4' },
          { x: 520, y: 120, n: 'N=9' },
          { x: 538, y: 155, n: 'N=12' },
          { x: 590, y: 195, n: 'N=24' },
          { x: 620, y: 235, n: 'N=34' },
          { x: 665, y: 270, n: 'R' },
        ].map((p) => (
          <g key={p.n}>
            <circle cx={p.x} cy={p.y} r="4" fill="#047857" />
            <text x={p.x + 8} y={p.y + 3} fill="#047857" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">{p.n}</text>
          </g>
        ))}

        <Marker x={105} y={68} n="1" tone="hazard" />
        <Marker x={560} y={140} n="2" tone="inspection" />
        <Marker x={315} y={165} n="3" tone="water" />
        <Marker x={105} y={268} n="4" tone="soil" />
      </svg>
    ),
  },

  'foundation-types': {
    title: 'Foundation Systems: Shallow Spread, Strap, Raft & Deep Piles',
    legend: ['RC Structure (#1E3A8A)', 'Bearing Stratum (#92400E)', 'Weak / Expansive Layer (#B91C1C)'],
    callouts: [
      { num: '1', label: 'Isolated Pad Footing', detail: 'Economical on competent uniform soil when pads do not overlap and settlement stays within IS 1904 limits.', tone: 'structure' },
      { num: '2', label: 'Strap / Combined Footing', detail: 'Balances eccentric boundary columns against interior columns without crossing property line.', tone: 'structure' },
      { num: '3', label: 'Raft / Mat Foundation (IS 2950)', detail: 'Spreads column loads across full footprint when isolated pads overlap or soils are moderately compressible.', tone: 'inspection' },
      { num: '4', label: 'Deep Piles & Under-Reamed Piles (IS 2911)', detail: 'Bypasses deep soft clay, loose fill, or active expansive black-cotton zone into firm deeper strata.', tone: 'soil' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 290" className="w-full h-auto" role="img" aria-label="Comparison of isolated, strap, raft, and pile foundations">
        {/* 4 panels */}
        {[
          { x: 20, title: 'ISOLATED PAD', sub: 'Firm uniform soil' },
          { x: 195, title: 'STRAP FOOTING', sub: 'Boundary eccentricity' },
          { x: 370, title: 'RAFT / MAT', sub: 'High load / softer soil' },
          { x: 545, title: 'PILE FOUNDATION', sub: 'Deep weak / BC clay' },
        ].map((p, idx) => (
          <g key={idx}>
            <rect x={p.x} y="22" width="158" height="246" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" />
            <text x={p.x + 79} y="42" textAnchor="middle" fill="#1E3A8A" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">{p.title}</text>
            <text x={p.x + 79} y="56" textAnchor="middle" fill="#6B7280" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">{p.sub}</text>
            <rect x={p.x + 8} y="165" width="142" height="92" fill={idx === 3 ? '#FEE2E2' : '#FEF3C7'} />
            {idx === 3 && <rect x={p.x + 8} y="225" width="142" height="32" fill="#E5E7EB" />}
          </g>
        ))}

        {/* 1: Isolated */}
        <rect x="89" y="80" width="20" height="105" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <polygon points="56,205 142,205 126,185 72,185" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.5" />
        <rect x="50" y="205" width="98" height="8" fill="#E5E7EB" stroke="#374151" strokeWidth="1" />

        {/* 2: Strap */}
        <line x1="210" y1="74" x2="210" y2="235" stroke="#B91C1C" strokeWidth="1.4" strokeDasharray="4 3" />
        <rect x="214" y="82" width="16" height="108" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="302" y="82" width="16" height="108" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="214" y="168" width="104" height="16" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.5" />
        <rect x="212" y="190" width="42" height="18" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="286" y="190" width="48" height="18" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.4" />

        {/* 3: Raft */}
        <rect x="398" y="82" width="16" height="106" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="441" y="82" width="16" height="106" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="484" y="82" width="16" height="106" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="384" y="186" width="130" height="24" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="380" y="210" width="138" height="8" fill="#E5E7EB" stroke="#374151" strokeWidth="1" />

        {/* 4: Piles */}
        <rect x="615" y="82" width="18" height="86" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="576" y="166" width="96" height="20" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.5" />
        <rect x="588" y="186" width="16" height="62" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />
        <rect x="644" y="186" width="16" height="62" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.4" />

        <Marker x={99} y={242} n="1" tone="structure" />
        <Marker x={274} y={242} n="2" tone="structure" />
        <Marker x={449} y={242} n="3" tone="inspection" />
        <Marker x={624} y={242} n="4" tone="soil" />
      </svg>
    ),
  },

  'plot-envelope': {
    title: 'Plot Boundaries, Statutory Setbacks & Buildable Envelope Plan',
    legend: ['Plot Legal Boundary (#111827)', 'Buildable Footprint (#1E3A8A)', 'Statutory Corridors (#B91C1C)', 'Services & RWH (#0284C7)'],
    callouts: [
      { num: '1', label: 'Road Access & Road-Widening Line', detail: 'Setbacks measure from future road-widening line (where applicable), not merely today’s kerb.', tone: 'hazard' },
      { num: '2', label: 'Mandatory Front, Rear & Side Setbacks', detail: 'Governed strictly by local State Gazette building rules (never inferred from another State).', tone: 'inspection' },
      { num: '3', label: 'Regular Buildable Envelope & Column Grid', detail: 'Align rooms, structural columns, and daylight/cross-ventilation cleanly inside setback lines.', tone: 'structure' },
      { num: '4', label: 'Separated Underground Sump, RWH & Sewer', detail: 'Keep potable sump well clear of septic/sewer lines and RWH recharge pit clear of footings.', tone: 'water' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 310" className="w-full h-auto" role="img" aria-label="Site plan showing road frontage, setbacks, buildable envelope, and utility zones">
        {/* Public Road */}
        <rect x="25" y="25" width="670" height="44" fill="#F3F4F6" stroke="#374151" strokeWidth="1.3" />
        <text x="360" y="51" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">PUBLIC ACCESS ROAD (VERIFY WIDTH & WIDENING LINE)</text>

        {/* Plot Boundary */}
        <rect x="115" y="78" width="490" height="210" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
        <text x="126" y="95" fill="#4B5563" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">FRONT SETBACK (VERIFY AHJ RULE)</text>

        {/* Buildable Box */}
        <rect x="175" y="122" width="370" height="122" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.8" strokeDasharray="6 3" />
        <text x="360" y="176" textAnchor="middle" fill="#1E3A8A" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace">BUILDABLE ENVELOPE</text>
        <text x="360" y="194" textAnchor="middle" fill="#4B5563" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">Aligned Column Grid · Cross-Ventilation · Daylight</text>

        {/* Utilities */}
        <rect x="128" y="102" width="38" height="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.3" />
        <text x="147" y="118" textAnchor="middle" fill="#0284C7" fontSize="8" fontWeight="700" fontFamily="IBM Plex Mono, monospace">SUMP</text>
        <rect x="556" y="232" width="38" height="36" fill="#ECFDF5" stroke="#047857" strokeWidth="1.3" />
        <text x="575" y="254" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="700" fontFamily="IBM Plex Mono, monospace">RWH</text>

        {/* North arrow */}
        <g transform="translate(650, 120)">
          <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#374151" strokeWidth="1.2" />
          <polygon points="0,-13 5,6 0,2 -5,6" fill="#1E3A8A" />
          <text x="0" y="30" textAnchor="middle" fill="#111827" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">NORTH</text>
        </g>

        <Marker x={230} y={68} n="1" tone="hazard" />
        <Marker x={145} y={185} n="2" tone="inspection" />
        <Marker x={360} y={145} n="3" tone="structure" />
        <Marker x={575} y={218} n="4" tone="water" />
      </svg>
    ),
  },

  'climate-zones': {
    title: 'Climate-Responsive Passive House Section (Sun, Wind & Monsoon)',
    legend: ['Solar Shading (#B45309)', 'Cross-Ventilation & Rain (#0284C7)', 'Thermal Envelope (#1E3A8A)', 'Durability Protection (#047857)'],
    callouts: [
      { num: '1', label: 'Insulated / Reflective Cool Roof', detail: 'Blocks primary overhead daytime solar radiation (BEE Eco-Niwas Samhita).', tone: 'electrical' },
      { num: '2', label: 'Calculated Chajja + Underside Drip Groove', detail: 'Shades high summer sun while snapping monsoon rainwater away from walls.', tone: 'water' },
      { num: '3', label: 'Cross-Ventilation & Stack Relief', detail: 'Opposite/adjacent operable windows flush warm humid air naturally.', tone: 'inspection' },
      { num: '4', label: 'Exposure-Matched Coastal / Arid Concrete', detail: 'Adequate IS 456 clear cover, low w/c blended cement, and positive perimeter drainage.', tone: 'structure' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 300" className="w-full h-auto" role="img" aria-label="Passive climate-responsive house section showing solar angles, roof insulation, and cross-ventilation">
        {/* Sun */}
        <circle cx="95" cy="56" r="20" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
        <text x="95" y="60" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">SUN</text>
        <line x1="115" y1="70" x2="215" y2="128" stroke="#B45309" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* House shell */}
        <rect x="220" y="96" width="320" height="162" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="2" />
        {/* Roof insulation layer */}
        <rect x="215" y="82" width="330" height="14" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.4" />
        <text x="380" y="92" textAnchor="middle" fill="#92400E" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">OVER-DECK INSULATION + HIGH-SRI COOL ROOF</text>

        {/* Chajjas */}
        <polygon points="172,134 220,126 220,138 172,138" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.4" />
        <polygon points="540,126 588,134 588,138 540,138" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.4" />

        {/* Windows */}
        <rect x="216" y="142" width="8" height="46" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        <rect x="536" y="142" width="8" height="46" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />

        {/* Cross-ventilation arrows */}
        <path d="M135 166 Q260 154 380 164 T625 160" fill="none" stroke="#0284C7" strokeWidth="2.4" />
        <polygon points="625,160 615,155 615,165" fill="#0284C7" />
        <text x="380" y="152" textAnchor="middle" fill="#0284C7" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">NATURAL CROSS-VENTILATION PATH</text>

        {/* Plinth & ground */}
        <line x1="60" y1="258" x2="660" y2="258" stroke="#374151" strokeWidth="1.6" />
        <text x="380" y="232" textAnchor="middle" fill="#4B5563" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">West wall shaded / buffered · Shaded openings · Positive apron slope</text>

        <Marker x={380} y={64} n="1" tone="electrical" />
        <Marker x={188} y={120} n="2" tone="water" />
        <Marker x={380} y={182} n="3" tone="inspection" />
        <Marker x={235} y={248} n="4" tone="structure" />
      </svg>
    ),
  },

  'load-path': {
    title: 'Continuous Structural Load Path & Tributary Area Transfer',
    legend: ['Gravity Load Path (#1E3A8A)', 'Lateral Wind / Seismic (#B91C1C)', 'Soil Reaction (#92400E)'],
    callouts: [
      { num: '1', label: 'Slab Tributary Catchment', detail: 'Dead (IS 875 Pt 1:2026) + Imposed loads split via 45° panels onto supporting beams.', tone: 'structure' },
      { num: '2', label: 'Primary Beams & Monolithic Diaphragm', detail: 'Slabs tie horizontal seismic forces (IS 1893:2025) across frames into columns/shear walls.', tone: 'hazard' },
      { num: '3', label: 'Continuous Columns (Zero Floating Columns)', detail: 'Interior columns carry ~4× the tributary area of corner columns down uninterrupted axes.', tone: 'structure' },
      { num: '4', label: 'Footing Dispersion to Bearing Soil', detail: 'Spreads axial + moment reactions below allowable bearing and settlement limits.', tone: 'soil' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 310" className="w-full h-auto" role="img" aria-label="Structural load path diagram from roof slab to beams, columns, footings, and soil">
        {/* Left: Frame Elevation */}
        <text x="195" y="28" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">GRAVITY & LATERAL LOAD PATH</text>
        {/* Lateral seismic arrows */}
        <path d="M40 94 L88 94" stroke="#B91C1C" strokeWidth="2.5" />
        <polygon points="88,94 78,89 78,99" fill="#B91C1C" />
        <path d="M48 174 L88 174" stroke="#B91C1C" strokeWidth="2.2" />
        <polygon points="88,174 78,169 78,179" fill="#B91C1C" />
        <text x="64" y="82" textAnchor="middle" fill="#B91C1C" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">SEISMIC/WIND</text>

        {/* Frame */}
        <rect x="95" y="88" width="215" height="12" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="95" y="168" width="215" height="12" fill="#BFDBFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="102" y="100" width="16" height="150" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="286" y="100" width="16" height="150" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="1.6" />
        {/* Footings */}
        <rect x="82" y="250" width="56" height="18" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <rect x="266" y="250" width="56" height="18" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <line x1="50" y1="268" x2="350" y2="268" stroke="#92400E" strokeWidth="2" />
        {/* Downward arrows */}
        <path d="M160 56 L160 84 M205 56 L205 84 M250 56 L250 84" stroke="#1E3A8A" strokeWidth="2" />
        <text x="205" y="49" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">DEAD + IMPOSED LOADS</text>

        {/* Right: Tributary Area Plan */}
        <text x="535" y="28" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">PLAN TRIBUTARY CATCHMENT</text>
        <rect x="415" y="54" width="240" height="200" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.8" />
        <line x1="535" y1="54" x2="535" y2="254" stroke="#1E3A8A" strokeWidth="1.4" />
        <line x1="415" y1="154" x2="655" y2="154" stroke="#1E3A8A" strokeWidth="1.4" />
        {/* Highlight interior column tributary */}
        <rect x="475" y="104" width="120" height="100" fill="#DBEAFE" fillOpacity="0.65" stroke="#1E3A8A" strokeWidth="1.5" strokeDasharray="5 3" />
        <circle cx="535" cy="154" r="6" fill="#1E3A8A" />
        <text x="535" y="186" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">INTERIOR COL (~4× CORNER)</text>

        <Marker x={475} y={104} n="1" tone="structure" />
        <Marker x={95} y={130} n="2" tone="hazard" />
        <Marker x={294} y={145} n="3" tone="structure" />
        <Marker x={110} y={282} n="4" tone="soil" />
      </svg>
    ),
  },

  'rc-detailing': {
    title: 'Ductile RC Beam-Column Joint & Seismic Reinforcement Detailing (IS 13920 / IS 456)',
    legend: ['Confined Concrete Core (#1E3A8A)', 'Correct Ductile Detail (#047857)', 'Hazardous Site Error (#B91C1C)'],
    callouts: [
      { num: '1', label: 'Beam Bars Anchored Past Column Core (Ld)', detail: 'Top & bottom beam bars turn 90° inside confined column core to develop full tensile bond.', tone: 'structure' },
      { num: '2', label: 'Continuous Column Hoops INSIDE Joint', detail: 'Mandatory seismic confinement ties continue unbroken through the beam-column junction.', tone: 'inspection' },
      { num: '3', label: '135° Closed Hooks (NEVER 90° Open)', detail: '135° hooks lock into the inner core so bars cannot buckle if outer cover spalls during shaking.', tone: 'inspection' },
      { num: '4', label: 'Staggered Column Laps in Mid-Height Only', detail: 'Never lap all column bars at the floor slab joint; lap staggered in the middle half.', tone: 'hazard' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 310" className="w-full h-auto" role="img" aria-label="Ductile beam-column joint detailing comparing 135 degree hooks vs unsafe 90 degree hooks">
        {/* Left: Joint Elevation */}
        <text x="200" y="26" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">DUCTILE BEAM-COLUMN JOINT ELEVATION</text>
        {/* Column outline */}
        <rect x="90" y="42" width="90" height="240" fill="#F9FAFB" stroke="#374151" strokeWidth="1.6" />
        {/* Beam outline */}
        <rect x="180" y="114" width="225" height="90" fill="#F9FAFB" stroke="#374151" strokeWidth="1.6" />

        {/* Column vertical bars */}
        <line x1="106" y1="44" x2="106" y2="280" stroke="#1E3A8A" strokeWidth="2.8" />
        <line x1="164" y1="44" x2="164" y2="280" stroke="#1E3A8A" strokeWidth="2.8" />

        {/* Beam top & bottom bars anchored with 90 deg bend inside column */}
        <path d="M400 130 L114 130 L114 195" fill="none" stroke="#1E3A8A" strokeWidth="2.6" />
        <path d="M400 188 L124 188 L124 118" fill="none" stroke="#1E3A8A" strokeWidth="2.6" />

        {/* Confining ties THROUGH joint */}
        {[62, 82, 102, 126, 146, 166, 186, 218, 238, 258].map((yy) => (
          <line key={yy} x1="102" y1={yy} x2="168" y2={yy} stroke="#047857" strokeWidth="2.2" />
        ))}
        {/* Tight beam end stirrups */}
        {[196, 214, 232, 250, 268, 296, 330, 364].map((xx) => (
          <line key={xx} x1={xx} y1="126" x2={xx} y2="192" stroke="#047857" strokeWidth="2" />
        ))}

        {/* Right: 135 vs 90 Stirrup Section */}
        <rect x="445" y="42" width="250" height="114" fill="#ECFDF5" stroke="#047857" strokeWidth="1.5" />
        <text x="570" y="60" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">CORRECT: 135° SEISMIC HOOK</text>
        <rect x="520" y="72" width="100" height="68" rx="6" fill="none" stroke="#047857" strokeWidth="2.5" />
        <line x1="620" y1="76" x2="598" y2="96" stroke="#047857" strokeWidth="2.5" />
        <line x1="614" y1="72" x2="592" y2="92" stroke="#047857" strokeWidth="2.5" />

        <rect x="445" y="170" width="250" height="112" fill="#FEF2F2" stroke="#B91C1C" strokeWidth="1.5" />
        <text x="570" y="188" textAnchor="middle" fill="#B91C1C" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">AVOID: OPEN 90° HOOK (UNCONFINED)</text>
        <rect x="520" y="200" width="100" height="66" rx="4" fill="none" stroke="#B91C1C" strokeWidth="2.2" strokeDasharray="5 3" />
        <text x="570" y="238" textAnchor="middle" fill="#991B1B" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">Opens outward when cover spalls</text>

        <Marker x={122} y={130} n="1" tone="structure" />
        <Marker x={165} y={156} n="2" tone="inspection" />
        <Marker x={645} y={96} n="3" tone="inspection" />
        <Marker x={106} y={266} n="4" tone="hazard" />
      </svg>
    ),
  },

  'material-testing': {
    title: 'Material Verification Gate: ISI CM/L, Mill Certificates & Lab Testing',
    legend: ['Gate Screening (#1E3A8A)', 'Accredited Lab Proof (#047857)', 'Quarantine / Reject (#B91C1C)'],
    callouts: [
      { num: '1', label: 'Verify ISI Mark + CM/L Licence Number', detail: 'Check IS standard number + active CM/L licence via official BIS portal before bulk unloading.', tone: 'structure' },
      { num: '2', label: 'Match Mill Test Certificate (MTC) to Heat/Batch', detail: 'Steel heat/lot tags and cement week-of-manufacture codes must match delivery challan.', tone: 'inspection' },
      { num: '3', label: 'Field Screening + Accredited Lab Samples', detail: 'Weigh 1 m rebar & screen silt at gate; send cubes, steel, water & bricks to BIS/NABL lab.', tone: 'inspection' },
      { num: '4', label: 'Segregated Quarantine for Failed Lots', detail: 'Immediately red-tag and remove off-spec loads so they never contaminate approved stockpiles.', tone: 'hazard' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 270" className="w-full h-auto" role="img" aria-label="Material acceptance gate and BIS ISI certification workflow">
        {/* Step boxes */}
        <rect x="26" y="60" width="150" height="120" rx="4" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.6" />
        <text x="101" y="84" textAnchor="middle" fill="#1E3A8A" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">1. GATE CHECK</text>
        <text x="101" y="106" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">ISI + CM/L Licence</text>
        <text x="101" y="124" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">MTC & Batch Week</text>
        <text x="101" y="142" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">1m Steel Mass Check</text>

        <rect x="210" y="60" width="155" height="120" rx="4" fill="#FFFFFF" stroke="#047857" strokeWidth="1.6" />
        <text x="287" y="84" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">2. FIELD + LAB TEST</text>
        <text x="287" y="106" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">IS 1786 Tensile/Bend</text>
        <text x="287" y="124" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">IS 383 Grading/Silt</text>
        <text x="287" y="142" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">IS 516 Cubes · IS 1077</text>

        <rect x="405" y="34" width="285" height="72" rx="4" fill="#ECFDF5" stroke="#047857" strokeWidth="1.6" />
        <text x="547" y="60" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">APPROVED FOR PERMANENT WORKS</text>
        <text x="547" y="80" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">Logged in Material Register · Dry FIFO Storage</text>

        <rect x="405" y="138" width="285" height="72" rx="4" fill="#FEF2F2" stroke="#B91C1C" strokeWidth="1.6" />
        <text x="547" y="164" textAnchor="middle" fill="#B91C1C" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">REJECTED / QUARANTINED LOT</text>
        <text x="547" y="184" textAnchor="middle" fill="#991B1B" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">Issued NCR · Removed from Site Prior to Mixing</text>

        <path d="M176 120 L208 120 M365 98 L403 70 M365 142 L403 172" stroke="#4B5563" strokeWidth="1.8" fill="none" />

        <Marker x={101} y={54} n="1" tone="structure" />
        <Marker x={287} y={54} n="2" tone="inspection" />
        <Marker x={547} y={28} n="3" tone="inspection" />
        <Marker x={547} y={216} n="4" tone="hazard" />
      </svg>
    ),
  },

  'concrete-chain': {
    title: 'Concrete Production Chain: Batch, Slump, Vibrate, Cure & Test',
    legend: ['Batch & Place (#1E3A8A)', 'Water & Curing Control (#0284C7)', 'QA Testing (#047857)'],
    callouts: [
      { num: '1', label: 'Weigh Batch + Moisture Correction', detail: 'Maintain design w/c ratio (IS 10262); use plasticizers instead of extra site water.', tone: 'structure' },
      { num: '2', label: 'Slump Check Before Pouring (IS 1199)', detail: 'Reject collapse/segregated batches or expired transit loads prior to discharge.', tone: 'inspection' },
      { num: '3', label: 'Vertical Poker Vibration (Standby Ready)', detail: 'Insert vertically and withdraw slowly; never drag concrete sideways with vibrator.', tone: 'structure' },
      { num: '4', label: 'Uninterrupted Curing + Cube Tests (IS 516)', detail: 'Pond slabs and wrap columns wet for full IS 456 duration; test 7 & 28-day cubes.', tone: 'water' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 245" className="w-full h-auto" role="img" aria-label="Concrete quality production chain from weigh batching to curing and cube crushing">
        {[
          { x: 20, l1: 'WEIGH BATCH', l2: 'IS 10262 w/c', c: '#1E3A8A' },
          { x: 158, l1: 'SLUMP CONE', l2: 'IS 1199 Check', c: '#047857' },
          { x: 296, l1: 'LOW-DROP POUR', l2: 'No Segregation', c: '#1E3A8A' },
          { x: 434, l1: 'POKER VIBRATE', l2: 'Vertical Lift', c: '#1E3A8A' },
          { x: 572, l1: 'MOIST CURING', l2: 'IS 456 + Cubes', c: '#0284C7' },
        ].map((s, i) => (
          <g key={i}>
            <rect x={s.x} y="64" width="124" height="92" rx="4" fill="#FFFFFF" stroke={s.c} strokeWidth="1.6" />
            <text x={s.x + 62} y="102" textAnchor="middle" fill={s.c} fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">{s.l1}</text>
            <text x={s.x + 62} y="124" textAnchor="middle" fill="#4B5563" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">{s.l2}</text>
            {i < 4 && <path d={`M${s.x + 124} 110 L${s.x + 136} 110`} stroke="#6B7280" strokeWidth="1.8" />}
          </g>
        ))}
        <rect x="20" y="182" width="676" height="36" rx="4" fill="#FEF2F2" stroke="#B91C1C" strokeWidth="1.2" />
        <text x="358" y="204" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="600" fontFamily="IBM Plex Mono, monospace">ZERO UNAUTHORIZED SITE WATER ADDITION  |  SIGNED POUR CARD & CUBE REGISTER MANDATORY</text>

        <Marker x={82} y={56} n="1" tone="structure" />
        <Marker x={220} y={56} n="2" tone="inspection" />
        <Marker x={496} y={56} n="3" tone="structure" />
        <Marker x={634} y={56} n="4" tone="water" />
      </svg>
    ),
  },

  'masonry-waterproofing': {
    title: 'Wall-Junction Detailing, Terrace & Wet-Area Waterproofing Assembly',
    legend: ['RC Frame & Bands (#1E3A8A)', 'Waterproofing Barrier (#0284C7)', 'Crack Mesh & Inspection (#047857)'],
    callouts: [
      { num: '1', label: 'RCC-to-Masonry Junction Mesh', detail: '150 mm fibreglass/chicken mesh bridges differential thermal shrinkage before plastering.', tone: 'inspection' },
      { num: '2', label: 'Rounded Mortar Coving (Vatta) & Parapet Upturn', detail: 'Waterproof membrane turns smoothly up parapet into a chased reglet groove above finished terrace.', tone: 'water' },
      { num: '3', label: 'Grouted Pipe Collar + Ponding Hold Point', detail: 'All core-cut drains grouted tight BEFORE membrane; witness 48–72 h ponding test.', tone: 'water' },
      { num: '4', label: 'Positive Sloped Screed & Drip Coping', detail: 'Protective screed slopes positively to roof/floor outlet with chamfered parapet drip edge.', tone: 'structure' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 300" className="w-full h-auto" role="img" aria-label="Terrace parapet waterproofing section and RCC-masonry junction mesh detail">
        {/* Left: Terrace & Parapet Waterproofing */}
        <text x="205" y="26" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">TERRACE WATERPROOFING SECTION</text>
        {/* Parapet wall */}
        <rect x="55" y="54" width="38" height="156" fill="#F3F4F6" stroke="#374151" strokeWidth="1.5" />
        {/* Structural slab */}
        <rect x="55" y="210" width="310" height="36" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        {/* Coving fillet */}
        <polygon points="93,210 116,210 93,187" fill="#E5E7EB" stroke="#4B5563" strokeWidth="1" />
        {/* Waterproof membrane tucked into reglet */}
        <path d="M84 128 L94 128 L94 187 L116 208 L352 208" fill="none" stroke="#0284C7" strokeWidth="4" />
        {/* Sloped protective screed */}
        <polygon points="95,180 352,196 352,206 95,206" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.2" />
        {/* Rainwater outlet */}
        <rect x="330" y="196" width="22" height="58" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        <text x="225" y="266" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="600" fontFamily="IBM Plex Mono, monospace">48-72h PONDING TEST BEFORE PROTECTIVE SCREED</text>

        {/* Right: RCC-Masonry Junction */}
        <text x="545" y="26" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">RCC-TO-MASONRY JUNCTION</text>
        <rect x="430" y="64" width="76" height="180" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.6" />
        <text x="468" y="156" textAnchor="middle" fill="#1E3A8A" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">RC COL</text>
        <rect x="506" y="64" width="160" height="180" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.4" />
        {[94, 124, 154, 184, 214].map((yy) => (
          <line key={yy} x1="506" y1={yy} x2="666" y2={yy} stroke="#92400E" strokeWidth="1" />
        ))}
        {/* Mesh overlay */}
        <rect x="484" y="68" width="44" height="172" fill="#047857" fillOpacity="0.2" stroke="#047857" strokeWidth="1.6" strokeDasharray="4 2" />
        <text x="545" y="266" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="600" fontFamily="IBM Plex Mono, monospace">150 mm FIBREGLASS / GI MESH BEFORE PLASTER</text>

        <Marker x={506} y={110} n="1" tone="inspection" />
        <Marker x={102} y={136} n="2" tone="water" />
        <Marker x={341} y={184} n="3" tone="water" />
        <Marker x={215} y={188} n="4" tone="structure" />
      </svg>
    ),
  },

  'plumbing-isometric': {
    title: 'Domestic Water Supply, Vented Drainage & Rainwater Harvesting',
    legend: ['Potable Water Supply (#0284C7)', 'Foul Soil / Waste (#92400E)', 'RWH & Inspection (#047857)'],
    callouts: [
      { num: '1', label: 'OHT & Dedicated Isolation Valves', detail: 'OHT seated directly on RC beams; floor-wise valves + hydrostatic test before wall closure.', tone: 'water' },
      { num: '2', label: 'Water-Seal Traps + Roof Vent Cowl', detail: 'Nahani/P-traps block sewer gas; vent pipe prevents trap siphoning.', tone: 'soil' },
      { num: '3', label: 'Accessible Inspection Chambers (IC)', detail: 'Placed at every bend/junction with uniform gravity invert fall to municipal sewer.', tone: 'inspection' },
      { num: '4', label: 'Separated RWH First-Flush & Filter', detail: 'Clean roof runoff diverted via first-flush & filter; never cross-connected to sanitary sewer.', tone: 'water' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 300" className="w-full h-auto" role="img" aria-label="Domestic plumbing supply, vented drainage traps, inspection chamber, and rainwater harvesting schematic">
        {/* OHT */}
        <rect x="64" y="34" width="90" height="44" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.6" />
        <text x="109" y="60" textAnchor="middle" fill="#0369A1" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">OHT (BEAM)</text>
        {/* Supply line */}
        <path d="M109 78 L109 218 L245 218 L245 140" fill="none" stroke="#0284C7" strokeWidth="2.6" />
        <rect x="218" y="114" width="54" height="32" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.4" />
        <text x="245" y="133" textAnchor="middle" fill="#0284C7" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">BATH/WC</text>

        {/* Vent & Soil stack */}
        <line x1="340" y1="36" x2="340" y2="236" stroke="#92400E" strokeWidth="3" />
        <text x="340" y="28" textAnchor="middle" fill="#92400E" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">VENT COWL</text>
        {/* Trap */}
        <path d="M272 134 L302 134 L302 152 L318 152 L318 138 L340 138" fill="none" stroke="#92400E" strokeWidth="2.4" />
        <text x="308" y="168" textAnchor="middle" fill="#92400E" fontSize="8" fontFamily="IBM Plex Mono, monospace">TRAP</text>

        {/* Inspection Chamber & Sewer */}
        <rect x="395" y="220" width="76" height="44" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.6" />
        <text x="433" y="246" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">IC CHAMBER</text>
        <path d="M340 236 L395 244 M471 248 L560 258" stroke="#92400E" strokeWidth="2.6" fill="none" />
        <text x="520" y="242" textAnchor="middle" fill="#92400E" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">SLOPED TO SEWER</text>

        {/* Separate RWH Track */}
        <rect x="545" y="48" width="140" height="130" rx="4" fill="#ECFDF5" stroke="#047857" strokeWidth="1.5" />
        <text x="615" y="70" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">SEPARATE RWH LOOP</text>
        <text x="615" y="96" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">Roof Leaf Screen</text>
        <text x="615" y="118" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">First-Flush Diverter</text>
        <text x="615" y="140" textAnchor="middle" fill="#374151" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">Multi-Media Filter</text>
        <text x="615" y="162" textAnchor="middle" fill="#047857" fontSize="8.5" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">Storage / Safe Recharge</text>

        <Marker x={109} y={145} n="1" tone="water" />
        <Marker x={340} y={102} n="2" tone="soil" />
        <Marker x={433} y={208} n="3" tone="inspection" />
        <Marker x={615} y={40} n="4" tone="water" />
      </svg>
    ),
  },

  'electrical-earthing': {
    title: 'Domestic Single-Line Distribution, 30 mA RCCB & Protective Earthing (IS 732 / IS 3043)',
    legend: ['Power & Protection (#B45309)', 'Protective Earth Path (#047857)', 'Life-Safety Alert (#B91C1C)'],
    callouts: [
      { num: '1', label: 'Main Isolator + Surge Protection (SPD)', detail: 'Clean upstream disconnect and surge clamping ahead of domestic circuits.', tone: 'electrical' },
      { num: '2', label: '30 mA RCCB / RCBO Shock Protection', detail: 'Trips rapidly on earth leakage to prevent electrocution; press "T" button monthly.', tone: 'hazard' },
      { num: '3', label: 'Dedicated MCB Circuits (Never Shared Overloads)', detail: 'Separate MCBs for AC, geysers, kitchen heavy loads, lighting, and inverter lines.', tone: 'structure' },
      { num: '4', label: 'Tested Earth Pit & Continuous Earth Conductor', detail: 'IS 3043 electrode linked continuously to every socket earth pin & metal appliance body.', tone: 'inspection' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 270" className="w-full h-auto" role="img" aria-label="Residential electrical single line diagram showing isolator, RCCB, MCBs, and earth pit">
        <rect x="26" y="78" width="102" height="58" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.6" />
        <text x="77" y="104" textAnchor="middle" fill="#92400E" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">UTILITY METER</text>
        <text x="77" y="120" textAnchor="middle" fill="#4B5563" fontSize="8" fontFamily="Plus Jakarta Sans, sans-serif">+ Main Isolator</text>

        <rect x="164" y="78" width="128" height="58" rx="4" fill="#FEF2F2" stroke="#B91C1C" strokeWidth="1.8" />
        <text x="228" y="103" textAnchor="middle" fill="#B91C1C" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">30 mA RCCB</text>
        <text x="228" y="120" textAnchor="middle" fill="#991B1B" fontSize="8" fontFamily="Plus Jakarta Sans, sans-serif">Human Shock Trip</text>

        {/* MCB Bank */}
        <rect x="330" y="42" width="210" height="132" rx="4" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.6" />
        <text x="435" y="62" textAnchor="middle" fill="#1E3A8A" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">LABELLED MCB CIRCUITS (IS 732)</text>
        {['C1: Lighting / Fans (Inverter)', 'C2: 6A General Sockets', 'C3: 16A AC Dedicated', 'C4: 16A Geyser / Kitchen'].map((c, i) => (
          <text key={c} x="346" y={86 + i * 22} fill="#374151" fontSize="8.8" fontFamily="IBM Plex Mono, monospace">• {c}</text>
        ))}

        {/* Earth Pit */}
        <rect x="578" y="150" width="116" height="84" rx="4" fill="#ECFDF5" stroke="#047857" strokeWidth="1.6" />
        <text x="636" y="178" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">EARTH PIT</text>
        <text x="636" y="196" textAnchor="middle" fill="#047857" fontSize="8.5" fontFamily="IBM Plex Mono, monospace">IS 3043</text>
        <line x1="616" y1="210" x2="656" y2="210" stroke="#047857" strokeWidth="2" />
        <line x1="624" y1="216" x2="648" y2="216" stroke="#047857" strokeWidth="2" />
        <line x1="631" y1="222" x2="641" y2="222" stroke="#047857" strokeWidth="2" />

        {/* Connectors */}
        <path d="M128 107 L162 107 M292 107 L328 107" stroke="#B45309" strokeWidth="2.4" />
        <path d="M435 174 L435 204 L576 204" fill="none" stroke="#047857" strokeWidth="2.4" strokeDasharray="6 3" />
        <text x="485" y="220" textAnchor="middle" fill="#047857" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">CONTINUOUS EARTH BAR TO EVERY SOCKET</text>

        <Marker x={77} y={70} n="1" tone="electrical" />
        <Marker x={228} y={70} n="2" tone="hazard" />
        <Marker x={435} y={36} n="3" tone="structure" />
        <Marker x={636} y={142} n="4" tone="inspection" />
      </svg>
    ),
  },

  'construction-holdpoints': {
    title: 'Site Execution & Mandatory Inspection Hold-Point Gates (ITP)',
    legend: ['Mandatory Stop Hold Point (#B91C1C)', 'Verified Pass (#047857)', 'Execution Stage (#1E3A8A)'],
    callouts: [
      { num: '1', label: 'HP-1 & HP-2: Grid Diagonals & Founding Soil', detail: 'Never pour PCC until grid diagonals match and geotechnical stratum is witnessed dry and firm.', tone: 'hazard' },
      { num: '2', label: 'HP-3: Pre-Pour Concrete Card (Rebar + Cover + Sleeves)', detail: 'Sign off shuttering props, 135° hooks, joint ties, cover blocks, and MEP sleeves hours before batching.', tone: 'structure' },
      { num: '3', label: 'HP-4 & HP-5: Pressure Test & 48–72 h Ponding Test', detail: 'Never conceal pipes or lay tiles until pressure gauge holds and wet-area soffits stay dry.', tone: 'water' },
      { num: '4', label: 'HP-6: Commissioning, Safety & Handover Binder', detail: 'Verify IR/earthing/RCCB tests, live drainage flow, snag closure, and As-Built drawings.', tone: 'inspection' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 245" className="w-full h-auto" role="img" aria-label="Mandatory construction hold-point gates across a residential project">
        {[
          { x: 22, hp: 'HP-1 / HP-2', t: 'GRID & SOIL', b: 'Diagonals + Stratum' },
          { x: 196, hp: 'HP-3 (EVERY POUR)', t: 'REBAR & SHUTTER', b: 'Cover + 135° + Cubes' },
          { x: 370, hp: 'HP-4 / HP-5', t: 'MEP & PONDING', b: 'Pressure + 72h Dry' },
          { x: 544, hp: 'HP-6 FINAL', t: 'COMMISSIONING', b: 'IR/Earth + As-Built' },
        ].map((g, i) => (
          <g key={i}>
            <rect x={g.x} y="56" width="154" height="122" rx="4" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth="1.6" />
            <rect x={g.x} y="56" width="154" height="28" rx="4" fill="#FEF2F2" stroke="#B91C1C" strokeWidth="1.2" />
            <text x={g.x + 77} y="74" textAnchor="middle" fill="#B91C1C" fontSize="8.8" fontWeight="700" fontFamily="IBM Plex Mono, monospace">{g.hp}</text>
            <text x={g.x + 77} y="114" textAnchor="middle" fill="#111827" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace">{g.t}</text>
            <text x={g.x + 77} y="138" textAnchor="middle" fill="#4B5563" fontSize="8.5" fontFamily="Plus Jakarta Sans, sans-serif">{g.b}</text>
            <text x={g.x + 77} y="164" textAnchor="middle" fill="#047857" fontSize="8.2" fontWeight="700" fontFamily="IBM Plex Mono, monospace">SIGN-OFF TO PROCEED</text>
            {i < 3 && <path d={`M${g.x + 154} 118 L${g.x + 174} 118`} stroke="#4B5563" strokeWidth="2" />}
          </g>
        ))}
        <Marker x={99} y={44} n="1" tone="hazard" />
        <Marker x={273} y={44} n="2" tone="structure" />
        <Marker x={447} y={44} n="3" tone="water" />
        <Marker x={621} y={44} n="4" tone="inspection" />
      </svg>
    ),
  },

  'crack-diagnosis': {
    title: 'Visual Crack & Moisture Diagnosis Guide (Non-Structural vs Structural Red Alerts)',
    legend: ['Structural Red Alert — Call Engineer (#B91C1C)', 'Moisture / Plumbing Source (#0284C7)', 'Thermal / Shrinkage Monitor (#B45309)'],
    callouts: [
      { num: '1', label: '45° Stepped Diagonal Wall Crack', detail: 'Classic differential foundation settlement indicator—monitor & call Structural/Geotech Engineer.', tone: 'hazard' },
      { num: '2', label: 'Longitudinal Rust Stain & Spalling Cover', detail: 'Active reinforcement corrosion bursting concrete outward—requires engineered propping & repair.', tone: 'hazard' },
      { num: '3', label: 'Vertical RCC-to-Masonry Straight Seam', detail: 'Common non-structural shrinkage/thermal crack where junction mesh was omitted.', tone: 'electrical' },
      { num: '4', label: 'Rising Damp (<1 m) vs Overhead Leak Patch', detail: 'Trace physical moisture origin (failed DPC, leaking bath pipe, or terrace outlet) before painting.', tone: 'water' },
    ],
    renderSvg: () => (
      <svg viewBox="0 0 720 275" className="w-full h-auto" role="img" aria-label="Diagnostic guide comparing structural settlement and corrosion cracks versus non-structural seam cracks and damp patterns">
        {/* Panel 1: Settlement */}
        <rect x="20" y="34" width="160" height="196" fill="#FEF2F2" stroke="#B91C1C" strokeWidth="1.5" />
        <text x="100" y="54" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">RED ALERT: SETTLEMENT</text>
        <rect x="44" y="72" width="112" height="110" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1" />
        <polyline points="54,174 72,156 84,156 102,136 116,136 138,108 148,88" fill="none" stroke="#B91C1C" strokeWidth="2.8" />
        <text x="100" y="208" textAnchor="middle" fill="#991B1B" fontSize="8.2" fontFamily="Plus Jakarta Sans, sans-serif">Stepped 45° widening crack</text>

        {/* Panel 2: Corrosion spalling */}
        <rect x="194" y="34" width="160" height="196" fill="#FEF2F2" stroke="#B91C1C" strokeWidth="1.5" />
        <text x="274" y="54" textAnchor="middle" fill="#B91C1C" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">RED ALERT: CORROSION</text>
        <rect x="242" y="72" width="64" height="110" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.4" />
        <line x1="258" y1="84" x2="258" y2="170" stroke="#B91C1C" strokeWidth="3" strokeDasharray="8 3" />
        <text x="274" y="208" textAnchor="middle" fill="#991B1B" fontSize="8.2" fontFamily="Plus Jakarta Sans, sans-serif">Vertical rust line / spalling</text>

        {/* Panel 3: Junction seam */}
        <rect x="368" y="34" width="160" height="196" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.5" />
        <text x="448" y="54" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">SEAM / SHRINKAGE</text>
        <rect x="392" y="72" width="34" height="110" fill="#DBEAFE" stroke="#1E3A8A" strokeWidth="1.2" />
        <rect x="426" y="72" width="78" height="110" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1" />
        <line x1="426" y1="76" x2="426" y2="178" stroke="#B45309" strokeWidth="2.2" />
        <text x="448" y="208" textAnchor="middle" fill="#92400E" fontSize="8.2" fontFamily="Plus Jakarta Sans, sans-serif">Straight vertical col-wall joint</text>

        {/* Panel 4: Dampness */}
        <rect x="542" y="34" width="158" height="196" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
        <text x="621" y="54" textAnchor="middle" fill="#0284C7" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace">MOISTURE DIAGNOSTIC</text>
        <rect x="566" y="72" width="110" height="110" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1" />
        <path d="M566 156 Q596 142 626 154 T676 148 L676 182 L566 182 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" />
        <circle cx="645" cy="102" r="14" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="621" y="208" textAnchor="middle" fill="#0369A1" fontSize="8.2" fontFamily="Plus Jakarta Sans, sans-serif">Rising damp vs pipe patch</text>

        <Marker x={100} y={248} n="1" tone="hazard" />
        <Marker x={274} y={248} n="2" tone="hazard" />
        <Marker x={448} y={248} n="3" tone="electrical" />
        <Marker x={621} y={248} n="4" tone="water" />
      </svg>
    ),
  },
};

interface TechnicalDiagramProps {
  diagramKey: DiagramKey;
  caption?: string;
  focusNote?: string;
  compact?: boolean;
}

export const TechnicalDiagram: React.FC<TechnicalDiagramProps> = ({
  diagramKey,
  caption,
  focusNote,
  compact = false,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const [activeCallout, setActiveCallout] = useState<string | null>(null);
  const meta = DIAGRAMS[diagramKey] ?? DIAGRAMS['house-cutaway'];

  return (
    <figure className="border border-neutral-200 bg-white print-avoid-break">
      {/* Header strip */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-neutral-200 bg-neutral-50/70">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-neutral-900 truncate">{meta.title}</div>
          {focusNote && (
            <div className="text-xs text-neutral-600 mt-0.5 line-clamp-1">{focusNote}</div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="no-print inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-900 border border-neutral-300 bg-white hover:bg-neutral-50 transition-colors whitespace-nowrap shrink-0 min-h-[36px]"
          aria-label="Open diagram in full-screen viewer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Zoom</span>
        </button>
      </div>

      {/* Drafting SVG stage */}
      {!compact ? (
        <div className="drafting-paper p-3 sm:p-5 overflow-x-auto">
          <div className="min-w-[290px]">{meta.renderSvg()}</div>
        </div>
      ) : (
        <div className="px-4 py-3 bg-neutral-50 text-xs text-neutral-600 flex items-center justify-between gap-3">
          <span>Low-bandwidth compact mode active — diagram collapsed.</span>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="text-blue-900 font-medium underline whitespace-nowrap shrink-0"
          >
            View diagram
          </button>
        </div>
      )}

      {/* Interactive numbered callouts */}
      <div className="border-t border-neutral-200 px-4 py-3 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {meta.callouts.map((c) => {
            const isSelected = activeCallout === c.num;
            return (
              <button
                key={c.num}
                type="button"
                onClick={() => setActiveCallout(isSelected ? null : c.num)}
                className={`text-left p-2.5 border transition-colors ${
                  isSelected
                    ? 'border-blue-900 bg-blue-50/40'
                    : 'border-neutral-200/80 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className="font-mono text-xs font-bold tabular-nums shrink-0 mt-0.5"
                    style={{ color: TONE_DOT_FILL[c.tone] }}
                  >
                    [{c.num}]
                  </span>
                  <div className="min-w-0">
                    <div className={`text-xs font-semibold ${TONE_TEXT[c.tone]}`}>{c.label}</div>
                    <div className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{c.detail}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend & Caption */}
        <figcaption className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-neutral-500">
          <span className="italic">{caption ?? `${meta.title} — Illustrative engineering diagram (not to scale).`}</span>
          <span className="font-mono text-[11px] text-neutral-500">
            {meta.legend.join(' · ')}
          </span>
        </figcaption>
      </div>

      {/* Full-Screen Zoom Lightbox */}
      {zoomed && (
        <div
          className="no-print fixed inset-0 z-50 bg-neutral-950/75 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={meta.title}
          onClick={() => setZoomed(false)}
        >
          <div
            className="bg-white border border-neutral-300 w-full max-w-5xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 py-3 border-b border-neutral-200 bg-white">
              <div className="text-sm font-semibold text-neutral-900 truncate">{meta.title}</div>
              <button
                type="button"
                onClick={() => setZoomed(false)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-800 border border-neutral-300 hover:bg-neutral-50 min-h-[40px]"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
            <div className="drafting-paper p-4 sm:p-8">{meta.renderSvg()}</div>
            <div className="p-4 sm:p-6 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-3">
              {meta.callouts.map((c) => (
                <div key={c.num} className="p-3 border border-neutral-200 bg-white">
                  <div className={`text-xs font-semibold ${TONE_TEXT[c.tone]}`}>
                    <span className="font-mono mr-1.5">[{c.num}]</span>
                    {c.label}
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </figure>
  );
};
