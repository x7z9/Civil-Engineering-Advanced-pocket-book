import type { PartMeta } from '../types/pocketbook';

export const AUDIT_DATE = '23 November 2026';

export const EDITORIAL_DISCLAIMER =
  'This pocketbook is an educational guide to Indian civil engineering and residential construction. It is not a structural design, geotechnical report, architectural service, electrical design, statutory approval, contract document or site-specific construction specification. Indian Standards, NBC provisions, State rules, local development regulations and project requirements may be amended. Always verify the current official edition and obtain site-specific advice, drawings, calculations, approvals and supervision from appropriately qualified and registered professionals. Never use an illustrative example as a construction instruction.';

export const PARTS: PartMeta[] = [
  {
    id: 0,
    code: 'Part 0',
    title: 'Start Here: How a House Is Really Built',
    shortTitle: 'Start Here',
    stage: 'Orientation & Roles',
    chapterRange: [1, 6],
    summary:
      'Complete plot-to-occupancy roadmap, professional responsibilities, legal boundaries, evidence tags, and essential Indian site vocabulary.',
    primaryDiagram: 'project-lifecycle',
  },
  {
    id: 1,
    code: 'Part 1',
    title: 'Land, Site and Pre-Construction Due Diligence',
    shortTitle: 'Land & Site',
    stage: 'Pre-Construction',
    chapterRange: [7, 15],
    summary:
      'Title checks, reconnaissance, total-station and level surveys, reduced levels, plinth elevation, flood history, statutory corridors, and site red flags.',
    primaryDiagram: 'site-survey-rl',
  },
  {
    id: 2,
    code: 'Part 2',
    title: 'Soil, Geology and Foundation Engineering',
    shortTitle: 'Soil & Foundations',
    stage: 'Geotechnical',
    chapterRange: [16, 27],
    summary:
      'Subsurface investigation under IS 1892:2021, borehole logs, SPT, soil lab tests, bearing vs settlement, expansive black-cotton soil, shallow/deep foundations, and excavation safety.',
    primaryDiagram: 'soil-borelog',
  },
  {
    id: 3,
    code: 'Part 3',
    title: 'Architectural Planning and Indian Building Regulations',
    shortTitle: 'Planning & Rules',
    stage: 'Design & Approvals',
    chapterRange: [28, 39],
    summary:
      'Plot buildable envelope, FSI/FAR, setbacks, NBC Part 3 vs State building rules, room planning, universal accessibility, wet shafts, drawing sets, and statutory permissions.',
    primaryDiagram: 'plot-envelope',
  },
  {
    id: 4,
    code: 'Part 4',
    title: 'Climate-Responsive and Region-Specific Design',
    shortTitle: 'Climate & Regions',
    stage: 'Environmental Design',
    chapterRange: [40, 53],
    summary:
      'India climate zones, passive shading and cross-ventilation, coastal chloride durability, cyclone/earthquake/flood/landslide responses, and regional masonry systems.',
    primaryDiagram: 'climate-zones',
  },
  {
    id: 5,
    code: 'Part 5',
    title: 'Structural Engineering from First Principles',
    shortTitle: 'Structural Basics',
    stage: 'Structural Design',
    chapterRange: [54, 73],
    summary:
      'Load paths, IS 875 load families, IS 1893:2025 seismic provisions, tributary areas, slabs, beams, columns, footings, ductile detailing, BBS reading, and GFC control.',
    primaryDiagram: 'load-path',
  },
  {
    id: 6,
    code: 'Part 6',
    title: 'Materials, Testing and Acceptance',
    shortTitle: 'Materials & Testing',
    stage: 'Procurement & QA',
    chapterRange: [74, 84],
    summary:
      'Cement, aggregates, mixing water, IS 1786 reinforcement steel, IS 1077:2025 burnt-clay bricks, blocks/AAC, admixtures, BIS ISI verification, and field vs lab testing.',
    primaryDiagram: 'material-testing',
  },
  {
    id: 7,
    code: 'Part 7',
    title: 'Concrete Technology and Reinforced Concrete Work',
    shortTitle: 'Concrete & RCC',
    stage: 'Structural Execution',
    chapterRange: [85, 99],
    summary:
      'Water-cement ratio, IS 10262 mix proportioning, weigh batching, slump, poker compaction, construction joints, curing, cube sampling, rebar tying, formwork, and defect remediation.',
    primaryDiagram: 'concrete-chain',
  },
  {
    id: 8,
    code: 'Part 8',
    title: 'Masonry, Walls, Roofs and Finishes',
    shortTitle: 'Masonry & Finishes',
    stage: 'Envelope & Finishes',
    chapterRange: [100, 113],
    summary:
      'Brick bonds, block/AAC jointing, infill vs load-bearing, confined masonry, lintels, plastering, flooring slopes, terrace drainage, wet-area waterproofing, ponding tests, and dampness diagnosis.',
    primaryDiagram: 'masonry-waterproofing',
  },
  {
    id: 9,
    code: 'Part 9',
    title: 'Building Services and Site Infrastructure',
    shortTitle: 'Services & MEP',
    stage: 'MEP & Infrastructure',
    chapterRange: [114, 130],
    summary:
      'Plumbing supply, sumps/OHTs, soil/waste/vent traps, septic tanks, rainwater harvesting, stormwater, electrical earthing and protection, fire safety, and structural penetration control.',
    primaryDiagram: 'plumbing-isometric',
  },
  {
    id: 10,
    code: 'Part 10',
    title: 'Construction Execution: Site from Day One to Handover',
    shortTitle: 'Site Execution',
    stage: 'Field Supervision',
    chapterRange: [131, 145],
    summary:
      'Site mobilisation, setting-out diagonals, excavation, PCC blinding, plinth & anti-termite, RC frame cycle, rough-ins, commissioning, snagging, site diary, pour cards, and RFIs.',
    primaryDiagram: 'construction-holdpoints',
  },
  {
    id: 11,
    code: 'Part 11',
    title: 'Quality, Safety, Estimation and Project Control',
    shortTitle: 'QA, Safety & BOQ',
    stage: 'Project Control',
    chapterRange: [146, 157],
    summary:
      'QA/QC plans, ITP hold points, IS 1200 measurement basics, quantity estimation, BBS workflow, local rate analysis, scheduling, contractor contracts, site safety, and fraud prevention.',
    primaryDiagram: 'construction-holdpoints',
  },
  {
    id: 12,
    code: 'Part 12',
    title: 'Inspection, Defects, Repair and Long-Term Maintenance',
    shortTitle: 'Inspection & Repair',
    stage: 'Audit & Lifecycle',
    chapterRange: [158, 169],
    summary:
      'Stage-wise inspection gates, crack diagnosis (structural vs non-structural), settlement/corrosion distress, NDT and structural audits, retrofitting rules, and annual maintenance.',
    primaryDiagram: 'crack-diagnosis',
  },
  {
    id: 13,
    code: 'Part 13',
    title: 'Integrated Case Studies and Mastery',
    shortTitle: 'Case Studies',
    stage: 'Synthesis & Mastery',
    chapterRange: [170, 180],
    summary:
      'End-to-end hypothetical house scenarios across hot-dry, warm-humid coastal, flood-prone, seismic, and hill sites, structural system comparisons, registers, schedules, and mastery capstone.',
    primaryDiagram: 'house-cutaway',
  },
];

export const CONSTRUCTION_JOURNEY_STAGES = [
  {
    step: '01',
    title: 'Feasibility & Legal Check',
    chapters: 'Ch. 1–7',
    targetChapter: 7,
    summary: 'Verify title chain, zoning, road access, utilities, and statutory corridors before purchase.',
    leadRole: 'Owner + Advocate + Architect',
  },
  {
    step: '02',
    title: 'Site Survey & Levels',
    chapters: 'Ch. 8–15',
    targetChapter: 9,
    summary: 'Establish permanent benchmark (TBM), plot boundaries, spot levels, contours, and road-to-plinth drop.',
    leadRole: 'Licensed Surveyor + Civil Engineer',
  },
  {
    step: '03',
    title: 'Soil Investigation',
    chapters: 'Ch. 16–22',
    targetChapter: 18,
    summary: 'Boreholes, SPT, groundwater table, and lab classification under IS 1892:2021 before sizing footings.',
    leadRole: 'Geotechnical Engineer',
  },
  {
    step: '04',
    title: 'Architectural & MEP Design',
    chapters: 'Ch. 28–53',
    targetChapter: 28,
    summary: 'Climate-responsive layout, setbacks, daylight, shafts, and compliance with State/local building rules.',
    leadRole: 'Registered Architect + MEP Engineer',
  },
  {
    step: '05',
    title: 'Structural Engineering',
    chapters: 'Ch. 54–73',
    targetChapter: 54,
    summary: 'Load path, IS 875 / IS 1893:2025 analysis, IS 456 & IS 13920 detailing, and Good-for-Construction (GFC) drawings.',
    leadRole: 'Registered Structural Engineer',
  },
  {
    step: '06',
    title: 'Statutory Approvals',
    chapters: 'Ch. 38, 131',
    targetChapter: 38,
    summary: 'Sanction plan, authority NOCs, commencement certificate, and registered professional sign-offs.',
    leadRole: 'AHJ + Architect + Owner',
  },
  {
    step: '07',
    title: 'Substructure & Plinth',
    chapters: 'Ch. 23–26, 133–137',
    targetChapter: 135,
    summary: 'Setting out, safe excavation, PCC blinding, footings, plinth beams, anti-termite, and compacted backfill.',
    leadRole: 'Site Engineer + Structural Witness',
  },
  {
    step: '08',
    title: 'Superstructure & Envelope',
    chapters: 'Ch. 74–113, 138–140',
    targetChapter: 138,
    summary: 'Verified materials, controlled concreting & curing, masonry walls, lintels, and terrace/wet-area waterproofing.',
    leadRole: 'Site Engineer + QA/QC',
  },
  {
    step: '09',
    title: 'Services, Finishes & Testing',
    chapters: 'Ch. 114–130, 141–142',
    targetChapter: 142,
    summary: 'Plumbing pressure tests, drainage falls, ponding tests, electrical earthing/IR tests, and finishes.',
    leadRole: 'Licensed MEP Contractors + Engineer',
  },
  {
    step: '10',
    title: 'Handover & Maintenance',
    chapters: 'Ch. 143, 158–169',
    targetChapter: 143,
    summary: 'Snag rectification, as-built drawings, test certificates, occupancy certificate, and annual maintenance log.',
    leadRole: 'Owner + Engineer + AHJ',
  },
];
