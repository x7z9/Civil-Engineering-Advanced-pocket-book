import type { AudienceRole, Chapter } from '../types/pocketbook';
import { slugifyChapter } from './chapterBuilder';
import { CHAPTER_SPECS_A, type ChapterSpec } from './chapterCatalogPartA';
import { CHAPTER_SPECS_B } from './chapterCatalogPartB';
import { CHAPTER_SPECS_C } from './chapterCatalogPartC';
import { CHAPTER_SPECS_D } from './chapterCatalogPartD';
import { CHAPTER_SPECS_E } from './chapterCatalogPartE';
import { PARTS } from './parts';
import { STANDARDS_REGISTER } from './standards';

const ALL_SPECS: ChapterSpec[] = [
  ...CHAPTER_SPECS_A,
  ...CHAPTER_SPECS_B,
  ...CHAPTER_SPECS_C,
  ...CHAPTER_SPECS_D,
  ...CHAPTER_SPECS_E,
].sort((a, b) => a.n - b.n);

const PART_AUDIENCE_DEFAULTS: Record<number, AudienceRole[]> = {
  0: ['student', 'homeowner', 'site'],
  1: ['homeowner', 'site', 'student'],
  2: ['student', 'site', 'homeowner'],
  3: ['homeowner', 'student'],
  4: ['student', 'homeowner', 'site'],
  5: ['student', 'site'],
  6: ['site', 'student', 'homeowner'],
  7: ['site', 'student'],
  8: ['site', 'homeowner', 'student'],
  9: ['site', 'homeowner', 'student'],
  10: ['site', 'homeowner'],
  11: ['site', 'homeowner', 'student'],
  12: ['homeowner', 'site', 'student'],
  13: ['student', 'homeowner', 'site'],
};

const PART_SECOND_MISTAKE: Record<
  number,
  { mistake: string; whyItHappens: string; consequence: string; whoResolves: string }
> = {
  0: {
    mistake: 'Relying on informal verbal assumptions instead of signed drawings and stage records.',
    whyItHappens: 'Desire to save a few days upfront without realizing downstream ambiguity.',
    consequence: 'Disputes over scope, omitted inspections, and unverified structural changes.',
    whoResolves: 'Owner & Supervising Engineer',
  },
  1: {
    mistake: 'Failing to link site elevations to a permanent Temporary Benchmark (TBM).',
    whyItHappens: 'Measuring depths informally from uneven topsoil or disturbed trenches.',
    consequence: 'Wrong plinth height, inverted drainage slope, or uneven foundation bearing depths.',
    whoResolves: 'Licensed Surveyor & Site Engineer',
  },
  2: {
    mistake: 'Extrapolating foundation type or bearing capacity from an adjacent plot or regional stereotype.',
    whyItHappens: 'Skipping plot-specific IS 1892:2021 borehole testing to cut upfront fees.',
    consequence: 'Unexpected soft clay, fill, or high groundwater causing severe differential settlement.',
    whoResolves: 'Geotechnical & Structural Engineers',
  },
  3: {
    mistake: 'Assuming a neighbouring city’s setbacks, FSI, or model bye-laws apply automatically.',
    whyItHappens: 'Using generic internet articles instead of local AHJ Gazette rules.',
    consequence: 'Sanction rejection, statutory penalties, or denial of Occupancy Certificate.',
    whoResolves: 'Registered Architect & AHJ',
  },
  4: {
    mistake: 'Importing climate-blind facade details or ignoring exposure durability in coastal/hill zones.',
    whyItHappens: 'Prioritizing external styling over shading, drainage, and IS 456 exposure protection.',
    consequence: 'Chronic indoor overheating, rain leakage, and early steel corrosion spalling.',
    whoResolves: 'Architect & Structural Engineer',
  },
  5: {
    mistake: 'Treating structural computer output or textbook thumb rules as construction-ready without detailing checks.',
    whyItHappens: 'Overlooking load-path continuity, joint confinement, and IS 1893:2025 updates.',
    consequence: 'Congested rebar joints, premature cracks, or brittle seismic vulnerability.',
    whoResolves: 'Registered Structural Engineer',
  },
  6: {
    mistake: 'Accepting material deliveries without matching batch test certificates or ISI CM/L verification.',
    whyItHappens: 'Urgent site pours pressuring supervisors to skip gate inspections.',
    consequence: 'Counterfeit steel, stale cement, or silty sand permanently embedded in structure.',
    whoResolves: 'Site QA Engineer',
  },
  7: {
    mistake: 'Cutting short moist curing or stripping formwork props before IS 456 minimum periods.',
    whyItHappens: 'Contractor rushing slab cycle turnaround to reuse shuttering plates.',
    consequence: 'Permanent slab sag, surface dusting, low durability, and micro-cracking.',
    whoResolves: 'Site Engineer & Structural Engineer',
  },
  8: {
    mistake: 'Skipping junction mesh, substrate cleaning, or pre-concealment ponding tests.',
    whyItHappens: 'Treating finishes and waterproofing as cosmetic afterthoughts.',
    consequence: 'Recurring wall-seam cracks, damp rooms, and costly tile break-ups.',
    whoResolves: 'Site Engineer & Specialist Applicator',
  },
  9: {
    mistake: 'Concealing plumbing or electrical conduits without pressure/IR testing and as-built photographs.',
    whyItHappens: 'Rushing to start plastering before MEP sign-off.',
    consequence: 'Hidden wall leaks, unsafe earthing, and blind drilling into live conduits later.',
    whoResolves: 'Licensed MEP Contractors & Site Engineer',
  },
  10: {
    mistake: 'Allowing site trades to improvise drawing clashes verbally without formal RFI sign-off.',
    whyItHappens: 'Wanting quick progress without waiting for coordinated consultant confirmation.',
    consequence: 'Cut structural beams, misaligned staircases, and disowned responsibility.',
    whoResolves: 'Site Engineer & Design Consultants',
  },
  11: {
    mistake: 'Awarding work on an ambiguous per-sq.ft. headline rate with undefined specifications and safety rules.',
    whyItHappens: 'Comparing unnormalized bids without an itemized IS 1200 BOQ.',
    consequence: 'Hidden material downgrades, heavy variation bills, and unsafe work at height.',
    whoResolves: 'Owner & Quantity Surveyor / Engineer',
  },
  12: {
    mistake: 'Applying cosmetic putty or false ceilings over active structural cracks or chronic water seepage.',
    whyItHappens: 'Treating visible symptoms instead of diagnosing physical root cause.',
    consequence: 'Concealed steel corrosion, advancing distress, and much higher repair costs.',
    whoResolves: 'Qualified Structural Engineer / Auditor',
  },
  13: {
    mistake: 'Copying a worked case study directly onto another plot without site-specific soil, climate, and AHJ checks.',
    whyItHappens: 'Confusing illustrative educational scenarios with engineered GFC design.',
    consequence: 'Non-compliant construction and unverified site hazard exposure.',
    whoResolves: 'Registered Multidisciplinary Project Team',
  },
};

function compileChapter(spec: ChapterSpec): Chapter {
  const part = PARTS[spec.partId];
  const audience = spec.audience ?? PART_AUDIENCE_DEFAULTS[spec.partId] ?? ['student', 'homeowner', 'site'];
  const relatedSources = STANDARDS_REGISTER.filter((s) => spec.sources.includes(s.source_id));
  const readTogether =
    relatedSources.length > 1
      ? relatedSources.map((s) => `${s.standard_or_document_number} (${s.edition_or_year})`)
      : undefined;

  const secondaryRefRows = relatedSources.slice(0, 2).map((s) => ({
    item: s.title,
    value: s.edition_flag
      ? `Edition note: ${s.edition_flag}`
      : 'Verify exact clauses/tables in current licensed standard / project specification',
    unit: 'See source',
    applicability: s.jurisdiction,
    source: `${s.standard_or_document_number} (${s.edition_or_year})`,
    verified: '23 Nov 2026',
  }));

  const prevNum = spec.n > 1 ? spec.n - 1 : 2;
  const nextNum = spec.n < 180 ? spec.n + 1 : 179;
  const partStart = part.chapterRange[0];
  const related = Array.from(new Set([prevNum, nextNum, partStart].filter((x) => x !== spec.n))).slice(0, 3);

  const secondMistake = PART_SECOND_MISTAKE[spec.partId] ?? PART_SECOND_MISTAKE[0];

  return {
    number: spec.n,
    slug: slugifyChapter(spec.n, spec.title),
    partId: spec.partId,
    title: spec.title,
    objective: spec.objective,
    audience,
    evidenceTags: spec.tags,
    diagramKey: spec.diagram,
    diagramCaption: `Fig. ${spec.n} — ${spec.diagramFocus}. (Illustrative engineering diagram — not to scale; verify project GFC drawings.)`,
    diagramFocusNote: spec.diagramFocus,
    atAGlance: [
      {
        label: 'Core Principle',
        detail: spec.keyFact,
      },
      {
        label: 'Industry Design / Site Tip',
        detail: spec.engineerTip,
      },
      {
        label: 'Governing Indian Authority',
        detail: `${spec.codeItem} — anchored to ${spec.codeRef}. Always confirm active edition and local AHJ rules.`,
      },
    ],
    howItWorks: [
      {
        step: '1. Verify Site & Code Inputs',
        detail: `Confirm governing project drawings, latest revision stamp, and applicable Indian Standard / local AHJ rules (${spec.codeRef}) before commencing.`,
      },
      {
        step: '2. Technical Mechanics & Execution',
        detail: spec.keyFact,
      },
      {
        step: '3. Design Engineer Precision Technique',
        detail: spec.engineerTip,
      },
      {
        step: '4. Witness, Test & Record',
        detail: `Inspect physical execution against tolerances, log measurements or test certificates in the site QA register, and close any non-conformance before concealing work.`,
      },
    ],
    engineerTips: [
      spec.engineerTip,
      `Cross-check ${spec.codeItem.toLowerCase()} explicitly against Sheet S-01 / Architectural General Notes and confirm the active edition in the BIS catalogue or State Gazette.`,
      `Keep photographic and written verification records (with date, grid location, and measuring tape/level reference) before advancing past this stage.`,
    ],
    askYourTeam: [
      spec.homeownerQ,
      `Which specific current Indian Standard or local Authority rule is governing "${spec.codeItem}" on our house, and what written inspection record will be shared?`,
    ],
    readTogether,
    referenceValues: [
      {
        item: spec.codeItem,
        value: 'Verify exact numeric threshold / table in current licensed standard or signed GFC specification',
        unit: spec.codeUnit ?? 'SI units (mm, m, kN, MPa)',
        applicability: `${part.stage} · India jurisdiction (confirm local AHJ where statutory)`,
        source: spec.codeRef,
        verified: '23 Nov 2026',
      },
      ...secondaryRefRows,
    ],
    checklist: [
      `Confirm latest stamped GFC drawing revision and project specification covering ${spec.codeItem.toLowerCase()}.`,
      `Apply design/site check: ${spec.engineerTip}`,
      `Verify zero occurrence of common failure: ${spec.mistake}`,
      `Record dated site measurement, test certificate, or Hold-Point sign-off in the project QA binder before proceeding.`,
    ],
    commonMistakes: [
      {
        mistake: spec.mistake,
        whyItHappens: 'Rushed site scheduling, informal thumb rules, or skipped pre-stage engineering checks.',
        consequence: 'Compromised safety, reduced durability, rework expense, or statutory non-compliance.',
        whoResolves: spec.mistakeFix,
      },
      secondMistake,
    ],
    workedExample: {
      title: spec.exTitle,
      assumptions: [
        'ILLUSTRATIVE TRAINING EXAMPLE — NOT FOR CONSTRUCTION.',
        `Context: ${part.title} (Chapter ${spec.n}). All dimensions, loads, and soil/material inputs are hypothetical SI values for learning workflow only.`,
        'Actual house construction requires site-specific survey, geotechnical testing, licensed standards verification, and signed GFC drawings.',
      ],
      steps: spec.exCalc.split('->').map((s) => s.trim()),
      result: spec.exResult,
      limitation:
        'Never copy worked training numbers directly onto a real construction site. Verify current BIS editions, local AHJ Gazette rules, and project-specific engineering calculations.',
    },
    quiz: [
      {
        question: spec.quizQ,
        options: spec.quizOpts,
        correctIndex: spec.quizAns,
        explanation: spec.quizExp,
      },
      {
        question: `Who should resolve the issue if "${spec.mistake.slice(0, 95)}${spec.mistake.length > 95 ? '…' : ''}" is spotted on site?`,
        options: [
          spec.mistakeFix,
          'Proceed silently and hide it under plaster or paint',
          'Copy an unverified value from a social-media post',
        ],
        correctIndex: 0,
        explanation: `Engineering non-conformances must be escalated transparently to ${spec.mistakeFix} and verified against current Indian Standards (${spec.codeRef}).`,
      },
    ],
    sourceIds: spec.sources,
    glossaryIds: spec.glossary,
    relatedNumbers: related,
  };
}

export const CHAPTERS: Chapter[] = ALL_SPECS.map(compileChapter);

export const CHAPTER_BY_NUMBER: Record<number, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.number, c])
);

export const CHAPTERS_BY_PART: Record<number, Chapter[]> = PARTS.reduce(
  (acc, p) => {
    acc[p.id] = CHAPTERS.filter((c) => c.partId === p.id);
    return acc;
  },
  {} as Record<number, Chapter[]>
);
