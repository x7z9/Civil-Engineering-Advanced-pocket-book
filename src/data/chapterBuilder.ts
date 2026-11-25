import type {
  AudienceRole,
  Chapter,
  DiagramKey,
  EvidenceTag,
  ReferenceRow,
} from '../types/pocketbook';

export interface ChapterInput {
  n: number;
  partId: number;
  title: string;
  objective: string;
  audience: AudienceRole[];
  tags: EvidenceTag[];
  diagram: DiagramKey;
  diagramFocus: string;
  takeaways: [string, string, string];
  steps: [string, string, string, string];
  engineerTips: [string, string, string];
  askTeam: [string, string];
  readTogether?: string[];
  refs: {
    item: string;
    value: string;
    unit: string;
    cond: string;
    src: string;
  }[];
  checks: [string, string, string, string];
  mistakes: [
    { m: string; why: string; conseq: string; who: string },
    { m: string; why: string; conseq: string; who: string },
  ];
  example: {
    title: string;
    assumptions: string[];
    steps: string[];
    result: string;
    limitation: string;
  };
  quiz: [
    { q: string; opts: [string, string, string]; ans: number; exp: string },
    { q: string; opts: [string, string, string]; ans: number; exp: string },
  ];
  sources: string[];
  glossary: string[];
  related: number[];
}

export function slugifyChapter(n: number, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return `ch-${String(n).padStart(3, '0')}-${clean}`;
}

export function buildChapter(input: ChapterInput): Chapter {
  const referenceValues: ReferenceRow[] = input.refs.map((r) => ({
    item: r.item,
    value: r.value,
    unit: r.unit,
    applicability: r.cond,
    source: r.src,
    verified: '23 Nov 2026',
  }));

  return {
    number: input.n,
    slug: slugifyChapter(input.n, input.title),
    partId: input.partId,
    title: input.title,
    objective: input.objective,
    audience: input.audience,
    evidenceTags: input.tags,
    diagramKey: input.diagram,
    diagramCaption: `Fig. ${input.n} — ${input.title}: ${input.diagramFocus}`,
    diagramFocusNote: input.diagramFocus,
    atAGlance: input.takeaways.map((detail, idx) => ({
      label: `Key Point ${idx + 1}`,
      detail,
    })),
    howItWorks: input.steps.map((detail, idx) => ({
      step: `Step ${idx + 1}`,
      detail,
    })),
    engineerTips: input.engineerTips,
    askYourTeam: input.askTeam,
    readTogether: input.readTogether,
    referenceValues,
    checklist: input.checks,
    commonMistakes: input.mistakes.map((x) => ({
      mistake: x.m,
      whyItHappens: x.why,
      consequence: x.conseq,
      whoResolves: x.who,
    })),
    workedExample: input.example,
    quiz: input.quiz.map((q) => ({
      question: q.q,
      options: q.opts,
      correctIndex: q.ans,
      explanation: q.exp,
    })),
    sourceIds: input.sources,
    glossaryIds: input.glossary,
    relatedNumbers: input.related,
  };
}
