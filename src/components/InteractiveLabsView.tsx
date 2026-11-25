import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';

type LabTab = 'calculators' | 'drawing' | 'sequence' | 'soil';

const BAR_DIAMETERS = [8, 10, 12, 16, 20, 25, 32] as const;

const DRAWING_QUIZ_ITEMS = [
  {
    id: 'north',
    label: 'North Arrow & Plot Orientation',
    prompt: 'Tap the symbol that fixes sun-path shading and room orientation on site.',
    feedback:
      'Correct! The North Arrow anchors solar orientation (NBC Part 8 / Eco-Niwas) and aligns the plot plan with site boundaries.',
  },
  {
    id: 'grid',
    label: 'Structural Column Grid Line (A / 1)',
    prompt: 'Tap the structural centerline reference used to lay out columns and footings.',
    feedback:
      'Correct! Column Grid Bubbles (A, B / 1, 2) establish the orthogonal setting-out axes for excavation, footings, and plumb columns.',
  },
  {
    id: 'datum',
    label: 'Plinth & Benchmark Level Marker (RL +0.600 m)',
    prompt: 'Tap the vertical elevation datum linking finished floor level to the site TBM.',
    feedback:
      'Correct! Reduced Level (RL) / Plinth level markers tie excavation depth, plinth height, and drainage slopes to a single permanent TBM.',
  },
  {
    id: 'section',
    label: 'Section Cut Arrow (X–X)',
    prompt: 'Tap the marker showing where a vertical cross-section drawing is sliced.',
    feedback:
      'Correct! Section cut lines (X–X) indicate the plane and viewing direction for checking stair headroom, lintel levels, and beam depths.',
  },
  {
    id: 'stamp',
    label: 'Title Block Revision & GFC Stamp',
    prompt: 'Tap the drawing control block you must inspect BEFORE building anything on site.',
    feedback:
      'Correct! Always verify Revision number, Date, Engineer signature, and "GOOD FOR CONSTRUCTION (GFC)" status before executing work.',
  },
];

const CORRECT_POUR_SEQUENCE = [
  { id: 's1', text: 'Verify latest GFC structural drawing & check formwork line, level, plumb & propping.' },
  { id: 's2', text: 'Inspect rebar diameter, spacing, lap zones, 135° stirrup hooks & cover blocks (Hold Point).' },
  { id: 's3', text: 'Verify electrical conduits, plumbing sleeves & construction joint stop-ends are secured.' },
  { id: 's4', text: 'Check concrete delivery / weigh-batch mix & perform slump test before placing.' },
  { id: 's5', text: 'Place in controlled layers & compact with needle vibrator without touching rebar or segregation.' },
  { id: 's6', text: 'Cast dated IS 516 test cubes & begin continuous wet curing once final set allows.' },
];

const SOIL_MATERIAL_SCENARIOS = [
  {
    scenario: 'Deep dark-grey clay with wide seasonal desiccation cracks observed across the plot in summer.',
    options: [
      'Adopt a standard 1.2 m isolated footing copied from the neighbour.',
      'Commission IS 1892:2021 boreholes + IS 2720 Free Swell Index & Atterberg limits before choosing foundation system.',
      'Add extra brick soling and proceed without soil testing.',
    ],
    correct: 1,
    explanation:
      'Seasonal wide cracking signals expansive Black Cotton soil. Plot-specific Free Swell Index, swelling pressure, and moisture-depth tests are mandatory before foundation selection.',
  },
  {
    scenario: 'TMT reinforcement steel arrives on site with no Mill Test Certificate (MTC) and faded rolling marks.',
    options: [
      'Use it in slab distribution steel only to save time.',
      'Quarantine the lot, demand BIS ISI mark & heat-number MTC, and send sample for independent IS 1786 tensile/bend test.',
      'Accept it if the supplier signs a verbal guarantee.',
    ],
    correct: 1,
    explanation:
      'Untraceable steel violates IS 1786 QA. Quarantine the delivery until BIS licence, heat-number MTC, and independent lab tensile/elongation/bend verification pass.',
  },
  {
    scenario: 'Waterlogging observed at 1.4 m depth while excavating a 2.1 m deep isolated footing trench in sandy silt.',
    options: [
      'Pour concrete directly into standing muddy water.',
      'Stop work, shore/slope sides safely, dewater via filtered sump away from pit base, and inspect firm bearing stratum with the engineer.',
      'Drop dry cement bags into the water to absorb moisture.',
    ],
    correct: 1,
    explanation:
      'Never dump dry cement or pour structural concrete into uncontrolled water. Safe shoring, controlled dewatering, and geotechnical/structural witness sign-off are mandatory.',
  },
];

export const InteractiveLabsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('calculators');

  // Unit converter state
  const [unitType, setUnitType] = useState<'length' | 'area' | 'volume' | 'stress'>('length');
  const [unitInput, setUnitInput] = useState<string>('10');
  const [unitFrom, setUnitFrom] = useState<string>('m');

  // Earthwork / Excavation state
  const [excL, setExcL] = useState('1.8');
  const [excB, setExcB] = useState('1.8');
  const [excD, setExcD] = useState('1.5');
  const [excCount, setExcCount] = useState('12');
  const [bulkingPct, setBulkingPct] = useState('25');

  // Concrete volume estimator state
  const [concL, setConcL] = useState('10');
  const [concB, setConcB] = useState('8');
  const [concH, setConcH] = useState('0.125');
  const [concCount, setConcCount] = useState('1');

  // Plaster / paint area estimator
  const [wallL, setWallL] = useState('12');
  const [wallH, setWallH] = useState('3.0');
  const [wallFaces, setWallFaces] = useState('2');
  const [openingsArea, setOpeningsArea] = useState('4.2');

  // Rebar weight estimator
  const [barDia, setBarDia] = useState<number>(12);
  const [barLen, setBarLen] = useState('12');
  const [barCount, setBarCount] = useState('40');

  // Drawing lab state
  const [drawingStep, setDrawingStep] = useState(0);
  const [drawingFeedback, setDrawingFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  // Sequence lab state
  const [shuffledSteps, setShuffledSteps] = useState(() => [
    CORRECT_POUR_SEQUENCE[3],
    CORRECT_POUR_SEQUENCE[0],
    CORRECT_POUR_SEQUENCE[5],
    CORRECT_POUR_SEQUENCE[1],
    CORRECT_POUR_SEQUENCE[4],
    CORRECT_POUR_SEQUENCE[2],
  ]);
  const [pickedSequence, setPickedSequence] = useState<typeof CORRECT_POUR_SEQUENCE>([]);
  const [seqResult, setSeqResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Soil & Material lab state
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, number>>({});

  // Safe numeric parser
  const num = (v: string) => {
    const parsed = Number.parseFloat(v);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  };

  // Unit conversion outputs
  const val = num(unitInput);
  const unitRows = (() => {
    if (unitType === 'length') {
      const meters =
        unitFrom === 'm'
          ? val
          : unitFrom === 'mm'
            ? val / 1000
            : unitFrom === 'ft'
              ? val * 0.3048
              : val * 0.0254;
      return [
        { label: 'Metres (m)', value: meters.toFixed(4) },
        { label: 'Millimetres (mm)', value: (meters * 1000).toFixed(1) },
        { label: 'Feet (ft)', value: (meters / 0.3048).toFixed(3) },
        { label: 'Inches (in)', value: (meters / 0.0254).toFixed(2) },
      ];
    }
    if (unitType === 'area') {
      const sqm =
        unitFrom === 'sqm'
          ? val
          : unitFrom === 'sqft'
            ? val * 0.09290304
            : unitFrom === 'sqyd'
              ? val * 0.83612736
              : val * 40.468564224; // cent (1/100 acre)
      return [
        { label: 'Square Metres (m²)', value: sqm.toFixed(3) },
        { label: 'Square Feet (sq.ft)', value: (sqm / 0.09290304).toFixed(2) },
        { label: 'Square Yards (sq.yd / Gaj)', value: (sqm / 0.83612736).toFixed(2) },
        { label: 'Cents (1/100 Acre)', value: (sqm / 40.468564224).toFixed(4) },
      ];
    }
    if (unitType === 'volume') {
      const cum =
        unitFrom === 'cum'
          ? val
          : unitFrom === 'cft'
            ? val * 0.0283168466
            : unitFrom === 'brass'
              ? val * 2.83168466
              : val / 1000;
      return [
        { label: 'Cubic Metres (m³)', value: cum.toFixed(4) },
        { label: 'Cubic Feet (CFT)', value: (cum / 0.0283168466).toFixed(2) },
        { label: 'Brass (100 CFT)', value: (cum / 2.83168466).toFixed(3) },
        { label: 'Litres (L)', value: (cum * 1000).toFixed(1) },
      ];
    }
    // stress / pressure
    const mpa =
      unitFrom === 'mpa'
        ? val
        : unitFrom === 'kpa'
          ? val / 1000
          : val * 0.0980665; // kgf/cm2
    return [
      { label: 'MPa (N/mm²)', value: mpa.toFixed(4) },
      { label: 'kPa (kN/m²)', value: (mpa * 1000).toFixed(2) },
      { label: 'kgf/cm² (approx.)', value: (mpa / 0.0980665).toFixed(3) },
    ];
  })();

  // Excavation calculation
  const bankExcVol = num(excL) * num(excB) * num(excD) * num(excCount);
  const looseExcVol = bankExcVol * (1 + num(bulkingPct) / 100);

  // Concrete volume calculation
  const wetConcVol = num(concL) * num(concB) * num(concH) * num(concCount);
  const dryConcVol = wetConcVol * 1.54;

  // Plaster / paint calculation
  const grossWallArea = num(wallL) * num(wallH) * num(wallFaces);
  const netWallArea = Math.max(0, grossWallArea - num(openingsArea));

  // Rebar weight calculation (d^2 / 162.2)
  const unitWeight = (barDia * barDia) / 162.2;
  const totalBarLen = num(barLen) * num(barCount);
  const totalSteelKg = unitWeight * totalBarLen;

  const currentDrawingTarget = DRAWING_QUIZ_ITEMS[drawingStep];

  const handleDrawingTap = (tappedId: string) => {
    if (tappedId === currentDrawingTarget.id) {
      setDrawingFeedback({ ok: true, text: currentDrawingTarget.feedback });
    } else {
      setDrawingFeedback({
        ok: false,
        text: `That is "${
          DRAWING_QUIZ_ITEMS.find((i) => i.id === tappedId)?.label ?? tappedId
        }". Try finding: ${currentDrawingTarget.label}.`,
      });
    }
  };

  const handlePickStep = (step: (typeof CORRECT_POUR_SEQUENCE)[number]) => {
    if (pickedSequence.some((s) => s.id === step.id)) return;
    const nextPicked = [...pickedSequence, step];
    setPickedSequence(nextPicked);
    setShuffledSteps((prev) => prev.filter((s) => s.id !== step.id));
    if (nextPicked.length === CORRECT_POUR_SEQUENCE.length) {
      const ok = nextPicked.every((s, idx) => s.id === CORRECT_POUR_SEQUENCE[idx].id);
      setSeqResult(ok ? 'correct' : 'wrong');
    }
  };

  const resetSequence = () => {
    setPickedSequence([]);
    setShuffledSteps([
      CORRECT_POUR_SEQUENCE[3],
      CORRECT_POUR_SEQUENCE[0],
      CORRECT_POUR_SEQUENCE[5],
      CORRECT_POUR_SEQUENCE[1],
      CORRECT_POUR_SEQUENCE[4],
      CORRECT_POUR_SEQUENCE[2],
    ]);
    setSeqResult('idle');
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
          OFFLINE TOOLS &amp; PRACTICE LABS · NON-STRUCTURAL ESTIMATORS ONLY
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
          Engineering Calculators &amp; Interactive Practice Labs
        </h1>
        <p className="text-sm text-neutral-600 max-w-3xl">
          Every calculator displays transparent SI formulas and assumptions for preliminary budgeting
          and learning. Never use quantity estimators as a substitute for structural engineering
          design.
        </p>
      </header>

      {/* Lab Mode Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-neutral-200 pb-4">
        {(
          [
            ['calculators', '1. SI & Quantity Estimators'],
            ['drawing', '2. Drawing-Reading Lab'],
            ['sequence', '3. Pour Sequence Lab'],
            ['soil', '4. Soil & Material QA Lab'],
          ] as [LabTab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`px-3.5 py-2.5 text-xs font-medium border transition-colors min-h-[44px] ${
              activeTab === id
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* TAB 1: SAFE NON-STRUCTURAL CALCULATORS */}
      {activeTab === 'calculators' && (
        <div className="space-y-8">
          <div className="border border-amber-300 bg-amber-50/40 p-4 flex items-start gap-3 text-xs text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong>BOUNDARY WARNING — ESTIMATE ≠ STRUCTURAL DESIGN:</strong> These calculators
              compute geometric volumes, areas, SI conversions, and nominal steel unit weights only.
              Member dimensions, concrete grade, mix design (IS 10262), and bar diameters must come
              solely from signed Good-for-Construction (GFC) structural drawings.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. SI Unit Converter */}
            <section className="border border-neutral-200 bg-white p-5 space-y-4">
              <div className="border-b border-neutral-200 pb-3">
                <div className="font-mono text-[11px] uppercase text-blue-900 font-semibold">
                  TOOL 01 · SI &amp; INDIAN SITE UNITS
                </div>
                <h2 className="font-serif text-lg font-semibold text-neutral-900 mt-0.5">
                  Construction Unit Converter
                </h2>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    ['length', 'Length', 'm'],
                    ['area', 'Area', 'sqm'],
                    ['volume', 'Volume', 'cum'],
                    ['stress', 'Stress / SBC', 'mpa'],
                  ] as const
                ).map(([type, label, defaultUnit]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setUnitType(type);
                      setUnitFrom(defaultUnit);
                    }}
                    className={`px-2.5 py-1.5 text-xs font-medium border min-h-[36px] ${
                      unitType === type
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-white text-neutral-700 border-neutral-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Value</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={unitInput}
                    onChange={(e) => setUnitInput(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Input Unit</label>
                  <select
                    value={unitFrom}
                    onChange={(e) => setUnitFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white min-h-[42px]"
                  >
                    {unitType === 'length' && (
                      <>
                        <option value="m">Metres (m)</option>
                        <option value="mm">Millimetres (mm)</option>
                        <option value="ft">Feet (ft)</option>
                        <option value="in">Inches (in)</option>
                      </>
                    )}
                    {unitType === 'area' && (
                      <>
                        <option value="sqm">Square Metres (m²)</option>
                        <option value="sqft">Square Feet (sq.ft)</option>
                        <option value="sqyd">Square Yards / Gaj</option>
                        <option value="cent">Cent (1/100 Acre)</option>
                      </>
                    )}
                    {unitType === 'volume' && (
                      <>
                        <option value="cum">Cubic Metres (m³)</option>
                        <option value="cft">Cubic Feet (CFT)</option>
                        <option value="brass">Brass (100 CFT)</option>
                        <option value="l">Litres (L)</option>
                      </>
                    )}
                    {unitType === 'stress' && (
                      <>
                        <option value="mpa">MPa (N/mm²)</option>
                        <option value="kpa">kPa (kN/m²)</option>
                        <option value="kgf">kgf/cm²</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="divide-y divide-neutral-200 border border-neutral-200 bg-neutral-50/50 text-xs">
                {unitRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-3 py-2">
                    <span className="text-neutral-600">{row.label}</span>
                    <span className="font-mono font-semibold text-neutral-900 tabular-nums">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-500">
                Note: Traditional regional land units like <em>Bigha</em> and <em>Katha</em> vary by
                State/district; always verify official State revenue conversion factors.
              </p>
            </section>

            {/* 2. Rebar Unit Weight Calculator */}
            <section className="border border-neutral-200 bg-white p-5 space-y-4">
              <div className="border-b border-neutral-200 pb-3">
                <div className="font-mono text-[11px] uppercase text-blue-900 font-semibold">
                  TOOL 02 · IS 1786 NOMINAL MASS
                </div>
                <h2 className="font-serif text-lg font-semibold text-neutral-900 mt-0.5">
                  Rebar Weight Estimator (d² / 162.2)
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Dia d (mm)</label>
                  <select
                    value={barDia}
                    onChange={(e) => setBarDia(Number(e.target.value))}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm bg-white min-h-[42px]"
                  >
                    {BAR_DIAMETERS.map((d) => (
                      <option key={d} value={d}>
                        {d} mm
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Cut Length (m)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={barLen}
                    onChange={(e) => setBarLen(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">No. of Bars</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={barCount}
                    onChange={(e) => setBarCount(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
              </div>

              <div className="border border-neutral-200 bg-neutral-50/60 p-3.5 space-y-1.5 text-xs">
                <div className="font-mono text-neutral-600">
                  Formula: w = d² / 162.2 = {barDia}² / 162.2 ={' '}
                  <strong className="text-neutral-900">{unitWeight.toFixed(3)} kg/m</strong>
                </div>
                <div className="font-mono text-neutral-600">
                  Total Length = {num(barLen).toFixed(2)} m × {num(barCount)} ={' '}
                  <strong className="text-neutral-900">{totalBarLen.toFixed(2)} m</strong>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex items-baseline justify-between">
                  <span className="font-semibold text-neutral-900">Estimated Steel Mass</span>
                  <span className="font-mono text-base font-bold text-blue-900 tabular-nums">
                    {totalSteelKg.toFixed(1)} kg ({(totalSteelKg / 1000).toFixed(3)} MT)
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">
                Assumes steel density 7850 kg/m³. Check IS 1786 rolling weight tolerance on site via
                1 m physical weigh-bridge sample.
              </p>
            </section>

            {/* 3. Earthwork / Excavation Volume */}
            <section className="border border-neutral-200 bg-white p-5 space-y-4">
              <div className="border-b border-neutral-200 pb-3">
                <div className="font-mono text-[11px] uppercase text-blue-900 font-semibold">
                  TOOL 03 · IS 1200 PART 1 GEOMETRY
                </div>
                <h2 className="font-serif text-lg font-semibold text-neutral-900 mt-0.5">
                  Excavation Pit / Trench Volume Estimator
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Length L (m)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={excL}
                    onChange={(e) => setExcL(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Breadth B (m)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={excB}
                    onChange={(e) => setExcB(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Depth D (m)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={excD}
                    onChange={(e) => setExcD(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Count (Nos.)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={excCount}
                    onChange={(e) => setExcCount(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-neutral-600 mb-1">
                    Loose Bulking Allowance (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    step="1"
                    value={bulkingPct}
                    onChange={(e) => setBulkingPct(e.target.value)}
                    className="w-full px-2.5 py-2 border border-neutral-300 font-mono text-sm min-h-[42px]"
                  />
                </div>
              </div>

              <div className="border border-neutral-200 bg-neutral-50/60 p-3.5 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Bank (In-situ) Volume (L × B × D × N)</span>
                  <span className="font-mono font-semibold text-neutral-900 tabular-nums">
                    {bankExcVol.toFixed(2)} m³ ({(bankExcVol * 35.3147).toFixed(0)} CFT)
                  </span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-neutral-200">
                  <span className="font-semibold text-neutral-900">
                    Loose Cart-Away Volume (+{num(bulkingPct)}%)
                  </span>
                  <span className="font-mono font-bold text-blue-900 tabular-nums">
                    {looseExcVol.toFixed(2)} m³ ({(looseExcVol * 35.3147).toFixed(0)} CFT)
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">
                Does not include working-space slopes or shoring offsets; verify IS 1200 Part 1
                contract measurement rules.
              </p>
            </section>

            {/* 4. Wet Concrete & Plaster Area Estimators */}
            <section className="border border-neutral-200 bg-white p-5 space-y-5">
              <div className="border-b border-neutral-200 pb-3">
                <div className="font-mono text-[11px] uppercase text-blue-900 font-semibold">
                  TOOL 04 · PRELIMINARY GEOMETRIC VOLUME &amp; AREA
                </div>
                <h2 className="font-serif text-lg font-semibold text-neutral-900 mt-0.5">
                  Concrete Volume &amp; Plaster Surface Estimator
                </h2>
              </div>

              {/* Concrete geometric block */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-neutral-900">
                  A. Rectangular Concrete Element Volume (RMC Ordering Basis)
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">L (m)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={concL}
                      onChange={(e) => setConcL(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">B (m)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={concB}
                      onChange={(e) => setConcB(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Thk (m)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.005"
                      value={concH}
                      onChange={(e) => setConcH(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Nos.</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={concCount}
                      onChange={(e) => setConcCount(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between gap-2 bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs">
                  <span>
                    Wet Volume: <strong className="font-mono text-blue-900">{wetConcVol.toFixed(3)} m³</strong>
                  </span>
                  <span className="text-neutral-600">
                    Dry loose equiv. (×1.54):{' '}
                    <strong className="font-mono text-neutral-900">{dryConcVol.toFixed(2)} m³</strong>
                  </span>
                </div>
              </div>

              {/* Plaster / Paint Area */}
              <div className="space-y-2.5 pt-3 border-t border-neutral-200">
                <div className="text-xs font-semibold text-neutral-900">
                  B. Net Wall Area for Plaster / Painting (Minus Openings)
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Wall L (m)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={wallL}
                      onChange={(e) => setWallL(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Ht (m)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={wallH}
                      onChange={(e) => setWallH(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Faces</label>
                    <input
                      type="number"
                      min="1"
                      max="2"
                      step="1"
                      value={wallFaces}
                      onChange={(e) => setWallFaces(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-neutral-500 mb-1">Open. (m²)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={openingsArea}
                      onChange={(e) => setOpeningsArea(e.target.value)}
                      className="w-full px-2 py-1.5 border border-neutral-300 font-mono text-xs min-h-[38px]"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-between gap-2 bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs">
                  <span>
                    Net Surface Area:{' '}
                    <strong className="font-mono text-blue-900">{netWallArea.toFixed(2)} m²</strong>
                  </span>
                  <span className="font-mono text-neutral-700">
                    {(netWallArea * 10.7639).toFixed(1)} sq.ft
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE DRAWING-READING PRACTICE LAB */}
      {activeTab === 'drawing' && (
        <section className="border border-neutral-200 bg-white p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
            <div>
              <div className="font-mono text-xs text-blue-900 font-semibold">
                TASK {drawingStep + 1} OF {DRAWING_QUIZ_ITEMS.length}
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900 mt-0.5">
                {currentDrawingTarget.prompt}
              </h2>
            </div>
            <div className="flex gap-2">
              {DRAWING_QUIZ_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setDrawingStep(idx);
                    setDrawingFeedback(null);
                  }}
                  className={`w-9 h-9 font-mono text-xs border ${
                    idx === drawingStep
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-neutral-700 border-neutral-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="drafting-paper border border-neutral-200 p-3 sm:p-5 overflow-x-auto">
            <svg
              viewBox="0 0 700 340"
              className="w-full h-auto min-w-[300px]"
              role="img"
              aria-label="Interactive orthographic structural plan reading exercise"
            >
              {/* Outer drawing sheet border */}
              <rect x="14" y="14" width="672" height="312" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />

              {/* North Arrow (clickable) */}
              <g
                onClick={() => handleDrawingTap('north')}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <rect x="576" y="28" width="94" height="68" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="1.2" />
                <polygon points="623,40 612,72 623,65 634,72" fill="#1E3A8A" />
                <text x="623" y="88" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fontWeight="700" fill="#111827">
                  N (NORTH)
                </text>
              </g>

              {/* Grid Lines & Grid Bubble A / 1 (clickable) */}
              <g
                onClick={() => handleDrawingTap('grid')}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <line x1="115" y1="68" x2="115" y2="275" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="8 4" />
                <line x1="405" y1="68" x2="405" y2="275" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="8 4" />
                <line x1="80" y1="105" x2="460" y2="105" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="8 4" />
                <line x1="80" y1="245" x2="460" y2="245" stroke="#1E3A8A" strokeWidth="1.2" strokeDasharray="8 4" />
                <circle cx="115" cy="48" r="14" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="115" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#1E3A8A">
                  A
                </text>
                <circle cx="405" cy="48" r="14" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="405" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#1E3A8A">
                  B
                </text>
                <circle cx="56" cy="105" r="14" fill="#EFF6FF" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="56" y="109" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#1E3A8A">
                  1
                </text>
              </g>

              {/* Columns & Walls */}
              <rect x="115" y="105" width="290" height="140" fill="none" stroke="#374151" strokeWidth="3" />
              <rect x="108" y="98" width="14" height="14" fill="#111827" />
              <rect x="398" y="98" width="14" height="14" fill="#111827" />
              <rect x="108" y="238" width="14" height="14" fill="#111827" />
              <rect x="398" y="238" width="14" height="14" fill="#111827" />

              {/* Section Cut Line X-X (clickable) */}
              <g
                onClick={() => handleDrawingTap('section')}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <line x1="88" y1="175" x2="438" y2="175" stroke="#B91C1C" strokeWidth="2" strokeDasharray="10 4 2 4" />
                <polygon points="90,175 102,163 102,187" fill="#B91C1C" />
                <polygon points="436,175 424,163 424,187" fill="#B91C1C" />
                <text x="72" y="180" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#B91C1C">
                  X
                </text>
                <text x="444" y="180" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#B91C1C">
                  X
                </text>
              </g>

              {/* Level / RL Datum Marker (clickable) */}
              <g
                onClick={() => handleDrawingTap('datum')}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <rect x="195" y="128" width="145" height="32" fill="#ECFDF5" stroke="#047857" strokeWidth="1.3" />
                <text x="267" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#047857">
                  FFL RL +0.600 m
                </text>
              </g>

              {/* Title Block & GFC Stamp (clickable) */}
              <g
                onClick={() => handleDrawingTap('stamp')}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <rect x="492" y="218" width="182" height="96" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.5" />
                <text x="583" y="240" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#92400E">
                  REV R2 · GFC STAMP
                </text>
                <text x="583" y="258" textAnchor="middle" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="#374151">
                  SHEET: STR-04 · 1:100
                </text>
                <text x="583" y="276" textAnchor="middle" fontSize="9.5" fontFamily="IBM Plex Mono, monospace" fill="#374151">
                  SIGN: REG. STRUCT. ENG.
                </text>
                <text x="583" y="296" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#047857">
                  ISSUED FOR CONSTRUCTION
                </text>
              </g>
            </svg>
          </div>

          {drawingFeedback && (
            <div
              className={`p-4 border text-sm flex flex-wrap items-center justify-between gap-3 ${
                drawingFeedback.ok
                  ? 'border-emerald-700 bg-emerald-50/50 text-emerald-950'
                  : 'border-red-700 bg-red-50/40 text-red-950'
              }`}
            >
              <span>{drawingFeedback.text}</span>
              {drawingFeedback.ok && drawingStep < DRAWING_QUIZ_ITEMS.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setDrawingStep((s) => s + 1);
                    setDrawingFeedback(null);
                  }}
                  className="px-3 py-1.5 bg-blue-900 text-white text-xs font-medium min-h-[36px]"
                >
                  Next Symbol →
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {/* TAB 3: CONCRETE POUR SEQUENCE LAB */}
      {activeTab === 'sequence' && (
        <section className="border border-neutral-200 bg-white p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
                Order the Safe RC Slab Concreting Sequence (IS 456 / NBC Part 7)
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Tap the scrambled site actions on the left in exact engineering execution order.
              </p>
            </div>
            <button
              type="button"
              onClick={resetSequence}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-neutral-300 bg-white hover:bg-neutral-50 min-h-[40px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sequence</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase text-neutral-500">
                Available Site Steps (Tap to Place Next)
              </div>
              {shuffledSteps.length === 0 ? (
                <div className="border border-dashed border-neutral-300 p-4 text-xs text-neutral-500">
                  All 6 steps placed. Review your order on the right.
                </div>
              ) : (
                shuffledSteps.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handlePickStep(st)}
                    className="w-full text-left p-3.5 border border-neutral-200 bg-white hover:border-blue-900 text-xs sm:text-sm text-neutral-800 transition-colors min-h-[48px]"
                  >
                    {st.text}
                  </button>
                ))
              )}
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs uppercase text-blue-900">
                Your Execution Sequence ({pickedSequence.length}/6)
              </div>
              {pickedSequence.length === 0 ? (
                <div className="border border-dashed border-neutral-300 p-4 text-xs text-neutral-500">
                  Tap the first activity to begin building the pour card sequence.
                </div>
              ) : (
                pickedSequence.map((st, idx) => (
                  <div
                    key={st.id}
                    className="p-3.5 border border-neutral-200 bg-neutral-50/70 text-xs sm:text-sm text-neutral-900 flex items-start gap-2.5"
                  >
                    <span className="font-mono text-xs font-bold text-blue-900 shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <span>{st.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {seqResult === 'correct' && (
            <div className="p-4 border border-emerald-700 bg-emerald-50/50 text-sm text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>
                Exact field sequence! Notice how formwork, rebar cover, MEP sleeves, and slump are
                verified BEFORE concrete ever leaves the chute.
              </span>
            </div>
          )}

          {seqResult === 'wrong' && (
            <div className="p-4 border border-red-700 bg-red-50/40 text-xs sm:text-sm text-red-950 space-y-2">
              <div className="font-semibold">
                Some steps are out of safe engineering order. Correct hold-point chain:
              </div>
              <ol className="space-y-1 text-xs">
                {CORRECT_POUR_SEQUENCE.map((s, idx) => (
                  <li key={s.id}>
                    <span className="font-mono font-semibold mr-1.5">{idx + 1}.</span>
                    {s.text}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>
      )}

      {/* TAB 4: SOIL & MATERIAL QA LAB */}
      {activeTab === 'soil' && (
        <section className="space-y-4">
          {SOIL_MATERIAL_SCENARIOS.map((sc, idx) => {
            const picked = scenarioAnswers[idx];
            return (
              <div key={idx} className="border border-neutral-200 bg-white p-5 space-y-3">
                <div className="font-mono text-xs text-blue-900 font-semibold">
                  SITE DECISION SCENARIO {idx + 1}
                </div>
                <p className="text-sm font-semibold text-neutral-900 leading-relaxed">
                  {sc.scenario}
                </p>
                <div className="space-y-2">
                  {sc.options.map((opt, oIdx) => {
                    const isPicked = picked === oIdx;
                    const isRight = oIdx === sc.correct;
                    let cls = 'border-neutral-200 bg-white hover:border-neutral-300';
                    if (picked !== undefined) {
                      if (isRight) cls = 'border-emerald-700 bg-emerald-50/50';
                      else if (isPicked) cls = 'border-red-700 bg-red-50/40';
                    }
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() =>
                          setScenarioAnswers((prev) => ({ ...prev, [idx]: oIdx }))
                        }
                        className={`w-full text-left p-3.5 border text-xs sm:text-sm transition-colors min-h-[44px] ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {picked !== undefined && (
                  <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 leading-relaxed">
                    <strong className="text-neutral-900">Engineering Verdict: </strong>
                    {sc.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};
