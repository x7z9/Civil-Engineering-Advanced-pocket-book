export type EvidenceTag =
  | 'IS'
  | 'NBC'
  | 'LAW'
  | 'GOVT MANUAL'
  | 'RESEARCH'
  | 'FIELD PRACTICE';

export type AudienceRole = 'student' | 'homeowner' | 'site';

export type DiagramKey =
  | 'house-cutaway'
  | 'project-lifecycle'
  | 'site-survey-rl'
  | 'soil-borelog'
  | 'foundation-types'
  | 'plot-envelope'
  | 'climate-zones'
  | 'load-path'
  | 'rc-detailing'
  | 'material-testing'
  | 'concrete-chain'
  | 'masonry-waterproofing'
  | 'plumbing-isometric'
  | 'electrical-earthing'
  | 'construction-holdpoints'
  | 'crack-diagnosis';

export interface ReferenceRow {
  item: string;
  value: string;
  unit: string;
  applicability: string;
  source: string;
  verified: string;
}

export interface CommonMistake {
  mistake: string;
  whyItHappens: string;
  consequence: string;
  whoResolves: string;
}

export interface WorkedExample {
  title: string;
  assumptions: string[];
  steps: string[];
  result: string;
  limitation: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Chapter {
  number: number;
  slug: string;
  partId: number;
  title: string;
  objective: string;
  audience: AudienceRole[];
  evidenceTags: EvidenceTag[];
  diagramKey: DiagramKey;
  diagramCaption: string;
  diagramFocusNote: string;
  atAGlance: { label: string; detail: string }[];
  howItWorks: { step: string; detail: string }[];
  engineerTips: string[];
  askYourTeam: string[];
  readTogether?: string[];
  referenceValues: ReferenceRow[];
  checklist: string[];
  commonMistakes: CommonMistake[];
  workedExample: WorkedExample;
  quiz: QuizQuestion[];
  sourceIds: string[];
  glossaryIds: string[];
  relatedNumbers: number[];
}

export interface PartMeta {
  id: number;
  code: string;
  title: string;
  shortTitle: string;
  stage: string;
  chapterRange: [number, number];
  summary: string;
  primaryDiagram: DiagramKey;
}

export interface StandardRecord {
  source_id: string;
  issuing_body: string;
  standard_or_document_number: string;
  title: string;
  edition_or_year: string;
  amendments_or_reaffirmation: string;
  jurisdiction: string;
  subject: string;
  discipline:
    | 'Building Rules & NBC'
    | 'Loads & Structural'
    | 'Soil & Foundations'
    | 'Concrete & Steel'
    | 'Masonry & Materials'
    | 'Water & Sanitation'
    | 'Electrical & Safety'
    | 'Waterproofing & Measurement'
    | 'BIS Handbooks (SP)';
  official_url: string;
  access_type: 'free' | 'registration' | 'purchase' | 'library' | 'unknown';
  clauses_or_pages_used: string;
  last_verified_date: string;
  status: 'current' | 'superseded' | 'withdrawn' | 'draft' | 'verify';
  edition_flag?: string;
  content_reuse_note: string;
}

export interface OfficialLink {
  id: number;
  category:
    | 'BIS Standards & NBC'
    | 'MoHUA & State Building Rules'
    | 'Disaster, Hazard & Geology'
    | 'Climate, Groundwater & Coastal'
    | 'CPWD & Public Works'
    | 'Water, Sanitation & Energy'
    | 'Technical Libraries';
  title: string;
  url: string;
  note: string;
}

export interface RegionalProfile {
  id: string;
  region: string;
  states: string[];
  climate: string;
  mainHazards: string;
  typicalSiteConcerns: string;
  designResponse: string;
  materialsContext: string;
  officialPortals: { label: string; url: string }[];
  source: string;
  lastVerified: string;
}

export interface StateAuthorityEntry {
  state: string;
  regionId: string;
  governingRules: string;
  amendmentNote: string;
  officialPortal: string;
  gazetteOrRuleUrl: string;
  climateZone: string;
  seismicContext: string;
  coastalApplicable: boolean;
  hillApplicable: boolean;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  siteAlias?: string;
  category:
    | 'Site & Survey'
    | 'Soil & Foundations'
    | 'Planning & Law'
    | 'Structural'
    | 'Concrete & Steel'
    | 'Masonry & Finishes'
    | 'Services & MEP'
    | 'Execution & QA';
  unit?: string;
  definition: string;
  codeRef: string;
  relatedChapter: number;
}

export interface FieldChecklistGroup {
  id: string;
  title: string;
  stage: string;
  chapterNumber: number;
  codeBasis: string;
  holdPointNote: string;
  items: {
    id: string;
    check: string;
    verificationMethod: string;
    holdPoint?: boolean;
  }[];
}

export type TextScale = 'compact' | 'auto' | 'comfortable' | 'large';

export interface LocalUserState {
  completedChapters: number[];
  bookmarkedChapters: number[];
  checkedItems: Record<string, boolean>;
  quizScores: Record<number, number>;
  lastVisitedChapter: number;
  audienceFilter: AudienceRole | 'all';
  textScale: TextScale;
  distractionFree: boolean;
  lowBandwidthDiagrams: boolean;
}
