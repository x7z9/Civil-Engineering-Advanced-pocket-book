# MASTER BUILD PROMPT — INDIAN CIVIL ENGINEERING & HOUSE-CONSTRUCTION POCKETBOOK

**Project type:** Responsive, mobile-first, static educational website + complete downloadable PDF  
**Primary audience:** Civil engineering students, fresh graduates, site supervisors, first-time homeowners and self-build clients in India  
**Technical jurisdiction:** India only  
**Reference cutoff for this brief:** 23 November 2026  
**Working title:** **The Indian House-Building & Civil Engineering Pocketbook**  
**Tagline:** *Understand the ground. Read the drawing. Build it right.*

---

## 1. YOUR ROLE AND MISSION

Act as a multidisciplinary Indian civil-engineering editorial and technical team with the combined perspective of:

- A senior civil/structural design engineer with 15+ years of building design, analysis, detailing and construction exposure.
- A geotechnical engineer experienced in site investigation, foundations, groundwater, expansive soils, settlement and slope conditions.
- A construction/project engineer experienced in sequencing, measurement, procurement, contracts, quality assurance and site supervision.
- An architect/building-planning professional familiar with Indian development controls, climate-responsive planning and residential functionality.
- Building-services engineers for plumbing, drainage, electrical systems, ventilation, rainwater harvesting and fire/life safety.
- A technical author, visual educator and frontend engineer.

Create an **exceptionally practical, illustrated, carefully referenced digital pocketbook** that takes a learner from absolute basics to a competent understanding of how a small Indian house is planned, designed by qualified professionals, approved, constructed, inspected, handed over and maintained.

The book must make a fresh civil-engineering graduate more useful on a real site and help a homeowner understand the process, ask the right questions, read drawings, check workmanship and avoid common mistakes. It must not imply that reading the website qualifies an unlicensed person to independently design or certify a building.

The website must be static: no user account, server-side database, paid API, mandatory subscription, backend dependency or data upload. All book content, diagrams, tools and progress features must work on a deployed static host.

**Do not stop at an outline or landing-page mock-up.** Build the complete, multi-page learning product, with a proper content structure and an exportable, consolidated book.

---

## 2. NON-NEGOTIABLE TECHNICAL AND SAFETY RULES

1. **Indian primary sources first.** Use current Bureau of Indian Standards (BIS) standards, National Building Code (NBC), Central/State Government publications, official Gazette notifications, official local-authority rules and Government engineering manuals. A private blog, coaching note, contractor website or social-media post is not a primary technical authority.
2. **Verify every standard before publishing.** Check current edition, revision, amendments, reaffirmation, withdrawal and supersession in the BIS catalogue. Never assume a familiar code number is unchanged.
3. **Never invent a code value.** Do not fill a table with remembered values, generic internet values or values copied from an unverified textbook. When the exact standard text is unavailable, show the standard number, scope and official access link, and mark the detailed value **“Verify in the current licensed standard / project specification.”**
4. **Cite numerical technical claims at source level.** Every design value, tolerance, minimum, maximum, test frequency, cover, spacing, load, material property, coefficient, dimension or statutory limit must identify the source, edition/year, clause/table/figure/page where available, location/applicability, units and date last checked.
5. **Do not reproduce copyrighted standards wholesale.** Do not publish scanned IS-code pages, full proprietary tables, copied figures, paid manuals or unauthorised PDFs. Summarise concepts in original language, create original diagrams, quote only the minimum permitted text and link users to BIS access/purchase/download routes. Check reuse permissions for Government publications too.
6. **Do not make generic house-design prescriptions.** Never say that one footing size, column size, beam depth, slab thickness, reinforcement schedule, concrete grade, setback or foundation type suits every Indian house. These depend on site, loads, geometry, soil, exposure, local rules and engineering design.
7. **Do not replace professional services.** Structural design, geotechnical recommendations, architecture, electrical design, fire strategy, statutory approval and construction supervision must be undertaken/reviewed by appropriately qualified and locally registered professionals as required by law.
8. **Separate learning examples from real design.** Every worked example must carry a visible label: **ILLUSTRATIVE TRAINING EXAMPLE — NOT FOR CONSTRUCTION.** State assumptions and limitations. Do not issue construction-ready drawings or schedules as generic outputs.
9. **Do not infer local regulations from a neighbouring city or State.** Building rules vary by State, planning authority, municipality, panchayat, special planning area, plot category and occupancy. Always point users to the authority having jurisdiction (AHJ) and its latest Gazette/official rules.
10. **No untraceable images.** Prefer original vector diagrams, original site illustrations, openly licensed images or Government images with attribution and permitted reuse. Do not copy figures from IS standards or commercial books.
11. **Use SI units consistently.** Explain conversions only where useful. Label every axis, dimension and calculation with units. Distinguish kN, kN/m, kN/m², MPa, mm, m, m² and m³ carefully.
12. **Show uncertainty honestly.** If a source is outdated, inaccessible, ambiguous, under revision or inconsistent with another official source, flag it and give the reader the safer verification path.

---

## 3. SOURCE HIERARCHY AND EVIDENCE STANDARD

Use this hierarchy for technical and legal content:

1. Current Indian Standard published by BIS, including all applicable amendments.
2. Current NBC and official BIS special publications / handbooks, where applicable.
3. Central or State legislation, Rules, Gazette notifications, sanctioned regulations and circulars.
4. Official Government technical manuals (CPWD, MoHUA/CPHEEO, BMTPC, BEE, NDMA, IMD, CGWB, GSI, CWC, etc.).
5. Official technical publications from IITs, NITs, Government research bodies and recognised public institutions, only as supporting explanation and never as a replacement for a mandatory standard.
6. Peer-reviewed research only when primary Indian codes do not cover a specific emerging topic; clearly label it as research, not a statutory requirement.

### Evidence tags to show on every content page

- **[IS]** Indian Standard — give number, title, edition and amendments.
- **[NBC]** National Building Code — give Part/Section and edition.
- **[LAW]** Act, Rule, Gazette or local development regulation — give jurisdiction and effective date.
- **[GOVT MANUAL]** Official Government manual / specification.
- **[RESEARCH]** Research or academic support, not a code requirement.
- **[FIELD PRACTICE]** Practical explanation; explicitly state that the design/code document governs.

### Source record schema

Maintain a structured source register (JSON or Markdown data file) containing at least:

```text
source_id
issuing_body
standard_or_document_number
title
edition_or_year
amendments_or_reaffirmation
jurisdiction
subject
official_url
access_type (free / registration / purchase / library / unknown)
clauses_or_pages_used
last_verified_date
status (current / superseded / withdrawn / draft / verify)
content_reuse_note
```

Do not label a draft as a published standard. Do not label a model bye-law as an automatically applicable local law. Do not state that a code is “the latest” unless that status was checked on the official publisher’s catalogue on the stated date.

---

## 4. IMPORTANT EDITION-CHECK FLAGS FOR THE CONTENT TEAM

The following are **verification leads, not permission to stop checking the BIS catalogue**. Confirm the status and applicable amendments immediately before building each page:

- BIS’s dedicated NBC landing page currently identifies **SP 7:2016 — National Building Code of India 2016** and describes its Parts 0–12. Use that canonical page as the starting point. A BIS catalogue search may surface an entry displayed as **SP 7:2026 — National Building Construction Standards 2026**; do not assume that this is a full replacement of NBC 2016 without confirming the publication’s official scope, status and BIS clarification.
- BIS catalogue records now list **IS 1893 (Part 1):2025**, Seventh Revision, for general earthquake-resistant design provisions. Do not teach only the 2016 edition from older textbooks.
- BIS catalogue records now list **IS 875 (Part 1):2026** for dead loads / unit weights and identify it as superseding IS 875 (Part 1):1987. Do not keep the 1987 edition as the current basis without checking the official record.
- BIS catalogue records list **IS 875 (Part 3):2015** for wind loads; the catalogue record shows amendments in 2016 and 2020. Verify any later change before use.
- BIS lists **IS 456:2000** as reviewed in 2025. Verify current status, amendments and linked standards rather than presenting the original 2000 text as the complete current rule set.
- BIS lists **IS 1904:2021** and **IS 1892:2021** in foundation / subsurface investigation topics; confirm their current status and cross-references.
- BIS’s civil-engineering catalogue lists **IS 1077:2025** for common burnt-clay bricks (Sixth Revision). Avoid using only legacy brick specification references.
- BIS catalogue records include **IS 18168:2023** for earthquake-resistant design and detailing of steel buildings and **IS 16700:2023** for structural safety of tall concrete buildings.
- State rules change independently. Tamil Nadu’s Gazette portal records an amendment to the Tamil Nadu Combined Development and Building Rules, 2019 through **G.O. Ms. No.179 dated 7 October 2026**. Kerala’s official Gazette index records 2025 amendments to both Municipality and Panchayat Building Rules. Andhra Pradesh’s official portal lists a 9 January 2025 amendment to AP Building Rules, 2017. Telangana’s TG-bPASS / BuildNow portals publish permission rules and Government Orders.

For every standard and regulation, record the actual source consulted and the exact verification date in the website’s reference database.

---

## 5. COMPLETE BOOK STRUCTURE — FROM ZERO TO MASTERY

Create **at least 180 well-organised learning pages**. More pages are welcome when they improve clarity. Avoid filler pages. Use a clear chapter progression, breadcrumbs, previous/next navigation, a chapter index and a searchable glossary.

### PART 0 — START HERE: HOW A HOUSE IS REALLY BUILT

1. Welcome: the complete journey from plot to occupied home.
2. Who does what: owner, architect, structural engineer, geotechnical engineer, surveyor, contractor, supervisor, licensed plumber/electrician and local authority.
3. The project lifecycle: feasibility → survey → soil investigation → design → approval → procurement → construction → inspection → completion / occupancy → maintenance.
4. What a civil engineer actually does on a building project.
5. How to use this pocketbook, source tags, safety warnings and standard references.
6. Essential civil-engineering vocabulary with visual flash cards.

### PART 1 — LAND, SITE AND PRE-CONSTRUCTION DUE DILIGENCE

7. Land title and document checks: title chain, encumbrance, survey records, boundaries, access, easements and legal due diligence (legal professional required).
8. Site reconnaissance: neighbours, adjacent buildings, drainage paths, overhead/underground utilities, trees, access and visible distress.
9. Site measurement and boundary survey: benchmarks, north direction, total station / GNSS / tape basics, contour and level survey.
10. Reading a survey plan and preparing a site plan.
11. Spot levels, reduced levels, contour lines, slope, datum and benchmark.
12. Existing road level, proposed plinth level, site filling and cut/fill concepts.
13. Groundwater, waterlogging, flood history, coastal conditions and seasonal observations.
14. Site constraints: high-tension lines, road widening, airport zones, heritage, forest, CRZ, water bodies, drains and easements.
15. Site selection red flags and a printable first-visit checklist.

### PART 2 — SOIL, GEOLOGY AND FOUNDATION ENGINEERING

16. Soil and rock: visual identification versus laboratory classification.
17. Soil profile, strata, groundwater table and seasonal variation.
18. Why a geotechnical investigation is needed; what a soil investigation report contains.
19. Boreholes, trial pits, sampling, SPT and in-situ tests.
20. Soil laboratory tests: moisture content, grain-size distribution, Atterberg limits, specific gravity, compaction, shear strength, consolidation and permeability.
21. Bearing capacity versus settlement: not the same thing.
22. Expansive black-cotton soil, collapsible soil, loose fill, soft clay, lateritic soil, coastal / saline soil and rocky ground.
23. Shallow foundation types: isolated, strip, combined, strap and raft — selection logic, limitations and visual sections.
24. Deep foundations: piles, pile caps and pile load testing — conceptual introduction.
25. Excavation, dewatering, shoring, safe side slopes and adjacent-building protection.
26. Foundation inspection hold points and pre-concreting checklist.
27. Foundation failures: differential settlement, tilting, cracks, bearing failure and poor drainage.

### PART 3 — ARCHITECTURAL PLANNING AND INDIAN BUILDING REGULATIONS

28. Reading a plot: dimensions, orientation, access and buildable envelope.
29. Plot coverage, FSI/FAR, setbacks, height, open spaces, access width and parking — jurisdiction-specific concepts.
30. NBC Part 3 and State / local building rule relationship.
31. Room planning: living, dining, kitchen, bedrooms, toilets, utility, storage and circulation.
32. Functional adjacencies, privacy, daylight, ventilation and future flexibility.
33. Door, window, stair and ramp planning — explain values only after checking the relevant current rule / standard.
34. Stair geometry and safe circulation — never publish unsourced dimensions.
35. Accessibility and universal design for visitors and residents with disabilities or age-related mobility limitations.
36. Wet-area planning, plumbing shafts, service ducts and inspection access.
37. Architectural drawing set: key plan, site plan, floor plans, elevations, sections, schedules and details.
38. Local authority approvals: application stages, required drawings, professional signatures, NOCs, inspections, completion and occupancy documentation.
39. How to make a drawing review checklist as a homeowner.

### PART 4 — CLIMATE-RESPONSIVE AND REGION-SPECIFIC DESIGN

40. India’s building climate zones and what they mean for house design.
41. Hot-dry regions: shading, thermal mass, courtyards, dust and water conservation.
42. Warm-humid coastal regions: cross-ventilation, rain protection, corrosion, salt-laden air and moisture control.
43. Composite climates: seasonal adaptability, shading, thermal storage and ventilation.
44. Temperate regions: daylight, seasonal comfort and envelope choices.
45. Cold / high-altitude regions: heat loss, insulation, snow, frost and slope constraints.
46. Cyclone-prone coasts: roof anchorage, openings, load path, envelope integrity and debris risk.
47. Earthquake-prone regions: regular configuration, ductility, confinement, bands, connections and non-structural restraint.
48. Flood-prone sites: flood levels, drainage routes, resilient services and safe access.
49. Landslide / hill areas: slope, cut-and-fill, retaining systems, drainage and geotechnical review.
50. High rainfall and monsoon construction: sequencing, temporary drainage, protection and curing logistics.
51. Coastal durability: chloride exposure, reinforcement corrosion, concrete quality and material selection.
52. Regional construction traditions and appropriate modern use: laterite, stone, burnt clay, lime, bamboo, timber, stabilized earth, confined masonry and locally available materials.
53. A location comparison matrix: hazard → climate → soil → moisture → material durability → design response → required professional checks.

### PART 5 — STRUCTURAL ENGINEERING FROM FIRST PRINCIPLES

54. What makes a structure stable? Load path from roof to soil.
55. Dead, imposed/live, wind, earthquake, snow, temperature, earth and water loads — explain the relevant code families and applicability.
56. Tributary area and load transfer using a visual house-frame diagram.
57. Force, stress, strain, stiffness, strength, ductility and factor of safety.
58. Axial force, shear force, bending moment and torsion.
59. Structural systems: load-bearing masonry, RC framed, steel, composite, confined masonry and mixed systems.
60. Structural regularity, symmetry, soft storey, short column, torsion and discontinuity.
61. Slabs: one-way / two-way behaviour, support conditions and load path.
62. Beams: flexure, shear, deflection, anchorage and detailing concepts.
63. Columns: axial load, moment, slenderness, confinement and joints.
64. Footings and pedestals: load transfer and soil pressure concepts.
65. Staircases, lintels, chajjas, balconies, cantilevers and parapets.
66. Retaining walls and boundary walls: lateral pressure, drainage and stability concepts.
67. Roofs: flat, pitched, trussed and lightweight systems.
68. Load combinations and limit-state concepts — use only the current applicable code provisions.
69. Serviceability: deflection, crack control, vibration and durability.
70. Reinforcement detailing: cover, spacing, bends, hooks, laps, development length, anchorage, confinement and congestion — every numeric rule must be cited from the current standard.
71. Seismic detailing: strong-column/weak-beam intent, joint confinement, continuity and non-structural safety.
72. Reading structural drawings and bar bending schedules (BBS).
73. Structural design workflow: analysis assumptions, modelling, design checks, detailing, independent review and issue-for-construction control.

### PART 6 — MATERIALS, TESTING AND ACCEPTANCE

74. Cement types, grades, applications, storage, shelf-life and material certificates.
75. Fine and coarse aggregates: grading, cleanliness, shape, moisture and tests.
76. Water for concrete and construction: quality checks and source suitability.
77. Reinforcement steel: grades, ductility, identification, mill certificates, sampling and testing.
78. Bricks: types, dimensions, absorption, strength, efflorescence and acceptance.
79. Concrete masonry blocks, AAC blocks, fly-ash bricks and stabilized earth blocks.
80. Stone, laterite, timber, bamboo, glass and roofing materials.
81. Admixtures, fibres, waterproofing materials, sealants and repair materials.
82. Material submittals, sample approval, batch traceability, storage and rejection records.
83. BIS Standard Mark / ISI mark: how to verify certification and avoid counterfeit or misrepresented products.
84. Field tests versus laboratory tests: what each can and cannot prove.

### PART 7 — CONCRETE TECHNOLOGY AND REINFORCED CONCRETE WORK

85. Concrete ingredients and the role of water-cement ratio.
86. Nominal mix versus design mix — explain the distinction and where code-based mix design is needed.
87. Concrete mix proportioning: IS 10262 family; show an illustrative workflow, never a generic recipe.
88. Batching by weight, moisture correction, mixing, transport and placing.
89. Workability and slump testing — purpose, method and code-linked acceptance.
90. Compaction: needle vibrator, poker insertion, honeycombing prevention and over-vibration risks.
91. Construction joints, cold joints, pour planning and pour cards.
92. Curing: purpose, methods, duration and exposure-specific requirements with code citations.
93. Cube sampling and compressive strength testing: sample identity, curing, test age, result interpretation and limitations.
94. Other concrete tests: flexural, split tensile, rebound hammer, UPV and core testing; explain limitations.
95. Reinforcement cutting, bending, placing, tying, cover blocks and inspection.
96. Formwork: stability, line, level, plumb, dimensions, release agent, stripping and reshoring.
97. Pre-pour checklist for footing, column, beam, slab and staircase.
98. Concrete defects: segregation, bleeding, laitance, honeycombing, cracks and surface defects.
99. Repair, non-conformance reporting and engineer-approved remediation.

### PART 8 — MASONRY, WALLS, ROOFS AND FINISHES

100. Brick masonry: bonds, mortar, joints, corners, junctions and opening details.
101. Block masonry and AAC: handling, jointing, chases and compatibility with finishes.
102. Load-bearing masonry versus infill walls in a frame.
103. Confined masonry and seismic masonry principles; never misrepresent it as a universal substitute for engineered RC framing.
104. Reinforced masonry and earthquake-resistant masonry features.
105. Lintels, sills, sunshades, parapets and wall ties.
106. Plastering: surface preparation, coats, curing, cracks and finish quality.
107. Flooring: base preparation, screed, slope, tile layout, joints and skirting.
108. Roof construction, slope, rainwater outlets and parapet detailing.
109. Waterproofing principles: positive/negative side, membrane, cementitious system, liquid-applied systems and protection layer.
110. Wet-area waterproofing and a practical ponding-test inspection checklist.
111. Doors, windows, glazing, sealants and water-tightness.
112. Painting, surface preparation, primers, putty and coating systems.
113. Dampness, efflorescence, algae, leakage and crack diagnosis.

### PART 9 — BUILDING SERVICES AND SITE INFRASTRUCTURE

114. Plumbing system overview: supply, storage, distribution and pressure.
115. Water demand, overhead tank / underground sump planning and pump selection concepts.
116. Pipe materials, fittings, valves, supports and pressure testing.
117. Hot-water systems, solar water heating and safe routing.
118. Wastewater, soil/waste/vent pipes, traps, cleanouts and inspection chambers.
119. Sewer connection versus septic tank / soak pit — only where permitted and suitable.
120. Septic tank design principles and maintenance; use relevant current standards and local sanitation rules.
121. Rainwater harvesting: catchment, first flush, filtration, storage and recharge; local rules govern.
122. Stormwater drainage: roof, plot, surface channels and lawful discharge.
123. Electrical planning: load schedule, circuits, distribution board, protection and earthing.
124. Electrical safety: licensed electrician, relevant IS/NBC provisions, testing and inspection.
125. Lightning protection, surge protection and solar PV coordination.
126. Natural ventilation, daylight, fans and indoor environmental quality.
127. HVAC basics for houses and climate-responsive alternatives.
128. Fire and life safety: alarms, extinguishers, escape routes, LPG and electrical risks.
129. External development: compound wall, gates, driveway, paving, landscape and site drainage.
130. Service coordination: avoid beam/column cutting and unapproved structural penetrations.

### PART 10 — CONSTRUCTION EXECUTION: SITE FROM DAY ONE TO HANDOVER

131. Pre-start requirements: approved drawings, permissions, contract, BOQ, insurance, safety plan and setting-out.
132. Site mobilisation, temporary utilities, storage, access, barricades and housekeeping.
133. Setting out: grid lines, offsets, centre lines, diagonals and checks.
134. Clearing, excavation, dewatering, disposal, filling and compaction.
135. PCC / blinding and foundation sequence.
136. Reinforcement, formwork and concreting sequence.
137. Plinth beam, backfill, anti-termite treatment and floor sub-base.
138. Column, beam, slab and stair sequence for an RC framed house.
139. Masonry and service rough-ins.
140. Roof and terrace waterproofing.
141. Plaster, screed, tiling, joinery, painting and fixtures.
142. Testing and commissioning: plumbing, electrical, pumps, earthing, tanks and drainage.
143. Snag list, as-built drawings, warranties, test records and handover folder.
144. Daily site diary, work inspection request, material register and concrete pour card.
145. Coordination meetings, RFIs, drawing revisions and document control.

### PART 11 — QUALITY, SAFETY, ESTIMATION AND PROJECT CONTROL

146. QA/QC plan, inspection and test plan (ITP), hold points and witness points.
147. Quality records: checklists, test reports, material approvals and non-conformance reports.
148. Measurement basics and BOQ structure.
149. Quantity estimation: earthwork, PCC, RCC, reinforcement, masonry, plaster, flooring and paint.
150. Bar bending schedule and reinforcement quantity workflow.
151. Rate analysis: material, labour, plant, wastage, lead/lift, overheads and taxes — link to current local schedules; never treat Delhi CPWD rates as a universal market price.
152. Budget, contingency, cash flow and variation management.
153. Construction programme, critical path, look-ahead planning and monsoon planning.
154. Contractor selection, scope, exclusions, milestone payments and contract records.
155. Site safety: excavation, scaffolds, ladders, work at height, lifting, electrical safety, PPE and emergency arrangements.
156. Worker welfare, sanitation, first aid, fire prevention and safe housekeeping.
157. Common frauds and poor practices: fake material certificates, steel substitution, wrong cement storage, under-curing, concealed defects and unauthorised plan changes.

### PART 12 — INSPECTION, DEFECTS, REPAIR AND LONG-TERM MAINTENANCE

158. Before buying land: due diligence checklist.
159. Before starting work: design and permission readiness checklist.
160. Before every concrete pour: inspection checklist.
161. At masonry stage: plumb, line, level, openings and service coordination checklist.
162. Before waterproofing concealment: substrate and detail inspection.
163. Before handover: functional testing and document checklist.
164. Cracks: structural versus non-structural indicators and when to call an engineer.
165. Settlement, corrosion, dampness, leakage and roof distress.
166. Non-destructive testing and structural audit: when required and who can undertake it.
167. Repair and retrofitting principles; no DIY structural intervention.
168. Annual maintenance schedule for roof, plumbing, electrical, drainage, paint and structure.
169. Building life-cycle cost, durability and responsible renovation.

### PART 13 — INTEGRATED CASE STUDIES AND MASTERY

170. A small hypothetical single-family house: read the plot, list inputs and identify constraints.
171. Case study: hot-dry inland location.
172. Case study: warm-humid coastal location.
173. Case study: flood-prone low-lying location.
174. Case study: seismic-prone location.
175. Case study: hill / slope location.
176. Compare two structural systems and explain the selection, not a universal winner.
177. Build a project document register and approval checklist.
178. Build an inspection and quality plan for the hypothetical house.
179. Estimate illustrative quantities and create a work programme.
180. Final mastery challenge: explain the entire house-building process to a homeowner using drawings, checklists and verified references.

You may exceed 180 pages to split complex topics into digestible learning units. Each chapter must have a meaningful learning outcome and not simply repeat another chapter.

---

## 6. REGIONAL / LOCATION-BASED KNOWLEDGE SYSTEM

Build a prominent **“Choose your location”** learning section. Let users choose State/UT, district, local authority / panchayat / planning authority, broad terrain and site condition. This may be implemented as static data and local filters; do not call a remote API.

For each location, teach the learner to assemble a site-specific information pack:

1. Local planning authority and the latest applicable building rules / Gazette amendments.
2. Master plan / land-use zoning / road-widening line / layout approval / plot status.
3. Current seismic zone and design implications under the latest applicable seismic standard.
4. Basic wind speed and wind exposure / terrain considerations under the current wind code.
5. District-level earthquake, wind, cyclone, flood, landslide and thunderstorm hazard context using official hazard sources.
6. Rainfall, temperature, humidity, seasonal wind and monsoon data from IMD or other official source.
7. Groundwater depth / seasonal variation and water quality context from CGWB / local water agency.
8. Geological and landslide information from GSI where relevant.
9. Coastal Regulation Zone and approved Coastal Zone Management Plan where relevant.
10. Soil investigation specific to the actual plot. Never treat regional soil maps as a substitute for a project geotechnical investigation.
11. Material availability and regional construction systems, supported by BMTPC / Government / institutional references.
12. Local municipal / panchayat water, sewer, stormwater, solid waste and utility requirements.
13. Local construction cost references, clearly dated and geographically qualified.

### Regional learning profiles to include

- North-west arid / hot-dry belt.
- Indo-Gangetic plains and alluvial areas.
- Central Indian plateau and black-cotton soil regions.
- Western coastal belt and Konkan.
- Eastern coastal belt and cyclone-prone deltas.
- Warm-humid Kerala / west coast.
- Tamil Nadu inland and coastal regions.
- Deccan plateau and Telangana / Andhra Pradesh contexts.
- Himalayan and sub-Himalayan regions.
- North-eastern hill and high-rainfall regions.
- Cold / high-altitude regions.

These profiles are **educational climate / hazard context only**. District and parcel-level conditions vary. The website must never assign a foundation type or structural design solely from a broad regional label.

### Required regional comparison visual

Create a map or interactive table with columns:

`Region | Climate | Main exposure / hazard | Typical site concerns | Design response to investigate | Source | Last verified`

Do not display a false precision hazard map. If using BMTPC or GSI map images, link to the original interactive/source page and state the publication date and scale.

---

## 7. CORE INDIAN STANDARD REGISTER — TOPIC MAP

This is a starting register for the authoring team. **Check each standard in the live BIS catalogue before quoting a requirement.** Numbers and editions below may be revised, amended, withdrawn or superseded.

### A. Building-wide rules, planning and general requirements

- **NBC / SP 7** — National Building Code of India; Parts 0–12, including administration, development control, fire/life safety, materials, structural design, construction management, building services, plumbing, sustainability and asset management.
- **Model Building Bye-Laws 2016 (MoHUA)** — model guidance only; local adoption / amendments determine applicability.
- Applicable State building rules, master plan, development control regulations, municipal / panchayat bye-laws and local approval procedures.
- Harmonised Guidelines and Standards for Universal Accessibility in India — use current official edition and local adoption.

### B. Loads and structural design

- **IS 875 (Part 1)** — dead loads / unit weights; BIS now lists a 2026 edition. Verify the exact scope and transition from the 1987 edition.
- **IS 875 (Part 2)** — imposed loads.
- **IS 875 (Part 3)** — wind loads; catalogue record found for 2015 edition with amendments; verify current amendments.
- **IS 875 (Part 4)** — snow loads.
- **IS 875 (Part 5)** — special loads and load combinations.
- **IS 1893 (Part 1)** — general earthquake-resistant design; BIS now lists the 2025 Seventh Revision.
- Relevant other parts of IS 1893 for buildings / liquid-retaining or special structures, as applicable.
- **IS 456** — plain and reinforced concrete; BIS catalogue record found for IS 456:2000, reviewed 2025.
- **IS 800** — general construction in steel; catalogue record found for IS 800:2007.
- **IS 13920** — ductile design and detailing of RC structures subjected to seismic forces; confirm current edition and any revised linked provisions.
- **IS 4326** — earthquake-resistant design and construction of buildings.
- **IS 13827 / IS 13828** — earthquake resistance improvements for earthen / low-strength masonry buildings, where applicable.
- **IS 13935** — seismic evaluation, repair and strengthening of masonry buildings.
- **IS 15988** — seismic evaluation and strengthening of existing RC buildings.
- **IS 18168:2023** — earthquake-resistant design and detailing of steel buildings.
- **IS 16700:2023** — structural safety of tall concrete buildings; not a generic small-house design code.

### C. Soil, site investigation and foundations

- **IS 1892:2021** — subsurface investigation for foundations; verify current record.
- **IS 1904:2021** — general requirements for design and construction of foundations in soils; verify current record.
- **IS 6403** — bearing capacity of shallow foundations; check current edition/status.
- **IS 1080** — shallow foundations other than raft / ring / shell foundations; check current edition/status.
- **IS 2950 (Part 1)** — raft foundation design; check current edition/status.
- **IS 2911 series** — pile foundations and associated testing; select correct part and section.
- **IS 8009 series** — settlement calculations; choose applicable part.
- **IS 2720 series** — methods of tests for soils; identify the correct part for each test.
- **SP 36 series** — compendium of Indian Standards on soil engineering; verify availability and edition.

### D. Concrete, reinforcement and materials

- **IS 10262** — concrete mix proportioning; verify the current edition.
- **IS 383:2016** — coarse and fine aggregates for concrete; verify amendments and current status.
- **IS 1786:2008** — high-strength deformed steel bars and wires for concrete reinforcement; verify amendments and any current revision project / publication.
- **IS 269 / IS 8112 / IS 12269** — cement specifications; verify current editions and applicability to cement type.
- **IS 1489 series** — Portland pozzolana cement; verify current status.
- **IS 455** — Portland slag cement; verify current status.
- **IS 4926** — ready-mixed concrete; verify current edition.
- **IS 9103** — concrete admixtures; verify current edition.
- **IS 1199 series** — fresh concrete sampling / testing; identify applicable part.
- **IS 516 series** — hardened concrete strength and related testing; identify current parts / revisions.
- **IS 2386 series** — tests for aggregates.
- **IS 4031 series** — tests for hydraulic cement.

### E. Bricks, blocks, masonry and other building materials

- **IS 1077:2025** — common burnt-clay building bricks, Sixth Revision; verify current catalogue record.
- **IS 1905** — structural use of unreinforced masonry; verify current edition.
- **IS 2212** — brickwork code of practice; verify current edition.
- **IS 2185 series** — concrete masonry units; use relevant part for the block type.
- **IS 12894** — pulverized fuel ash-lime bricks; verify current status.
- **IS 1725:2023** — stabilized soil blocks used in general building construction; verify status and scope.
- Relevant standards for AAC, stone, timber, bamboo, roofing tiles, glass and prefabricated systems; select the standard from the current BIS catalogue rather than relying on a generic material summary.

### F. Water supply, drainage, sanitation and water quality

- **IS 10500:2012** — drinking water specification; BIS record shows amendments. Verify current revision and all amendments before use.
- **IS 1172** — basic requirements for water supply, drainage and sanitation; verify current edition.
- **IS 2065** — water supply in buildings; verify current edition.
- **IS 1742** — building drainage; verify current edition.
- **IS 2470 series** — septic tank design and construction; select the applicable part and verify local sanitation rules.
- **IS 3370 series** — concrete structures for retaining aqueous liquids; for tanks where applicable.
- NBC Part 9 and relevant plumbing / water-efficiency standards.

### G. Electrical, fire and safety

- **IS 732** — electrical wiring installations; verify current edition.
- **IS 3043** — earthing; verify current edition.
- **IS 1646** — fire safety of buildings, electrical installations; verify current edition.
- **IS 1642** — fire safety of buildings, construction details; verify current edition.
- Relevant current NBC Part 4 and Part 8 provisions, CEA regulations, local fire-service requirements and electrical inspectorate rules.
- Relevant construction safety standards, BOCW requirements and current labour / occupational safety laws.

### H. Waterproofing, measurement, workmanship and project management

- **IS 3067** — general design details / preparatory work for damp-proofing and waterproofing; verify current edition.
- **IS 1346** — waterproofing of roofs with bitumen felts; verify current edition and applicability.
- **IS 1200 series** — methods of measurement of building and civil engineering works; use the correct part and edition.
- CPWD Specifications and CPWD Delhi Schedule of Rates / Analysis of Rates as a public-sector reference, not as an automatic local private-market rate.
- NBC Part 7 — construction management, practices and safety.

### I. Standards referenced in the BIS handbook / learning ecosystem

Explore BIS special publications and handbooks such as SP 16 (design aids for RC), SP 21 (summaries for building materials), SP 24 (explanatory handbook on IS 456), SP 35 (water supply and drainage), SP 36 (soil engineering), SP 62 (causes and prevention of cracks), and relevant BIS handbooks. Confirm title, availability, edition and copyright conditions in BIS before including them.

---

## 8. OFFICIAL REFERENCE LIBRARY — VERIFIED STARTING LINKS

Prefer the official landing page or current source register over a copied third-party PDF. Links below are starting points; check for updates and local applicability before publishing.

### A. BIS — standards and NBC

1. **BIS National Building Code landing page (NBC 2016 / SP 7:2016):**  
   https://www.bis.gov.in/standards/national-building-code/?lang=en
2. **BIS e-Sale / Indian Standards access portal:**  
   https://standardsbis.bsbedge.com/
3. **BIS Standards portal / standard details:**  
   https://standards.bis.gov.in/
4. **BIS official website:**  
   https://www.bis.gov.in/
5. **BIS Standards overview and published / revised / new standards navigation:**  
   https://www.bis.gov.in/standards/
6. **BIS laboratory information system — test facilities / laboratories:**  
   https://lims.bis.gov.in/
7. **BIS product certification information:**  
   https://www.bis.gov.in/product-certification/
8. **BIS product manual for IS 1786:2008 (reinforcement steel certification reference):**  
   https://www.bis.gov.in/wp-content/uploads/2020/07/PM-IS-1786-JULY-2020-Revised-4.pdf
9. **BIS article / handbook context on teaching civil engineering using Indian Standards:**  
   https://www.bis.gov.in/wp-content/uploads/2025/03/news_2024-10-24.pdf

### B. MoHUA, local development control and building permission

10. **MoHUA Model Building Bye-Laws 2016 (official 2026-hosted PDF):**  
    https://www.mohua.gov.in/static/uploads/2026/07/0e33558a9326c8a89f945cae00cc3647.pdf
11. **MoHUA manuals and advisories:**  
    https://www.mohua.gov.in/documents/publications/manuals-and-advisories-MDMwYTMtQWa?pageTitle=Manuals-And-Advisories
12. **India Code — official Central and State legislation search:**  
    https://www.indiacode.nic.in/
13. **Tamil Nadu Urban Local Bodies — Acts, rules and manuals:**  
    https://www.tnurbantree.tn.gov.in/acts-and-rules-documents/
14. **Tamil Nadu Government Gazette — Extraordinary notifications (2026 list):**  
    https://stationeryprinting.tn.gov.in/extra_ordinary_lists.php?id=MjAyNg%3D%3D
15. **Tamil Nadu Combined Development and Building Rules, 2019 — official document index:**  
    Use the Tamil Nadu Urban Local Bodies Acts & Rules portal above; check every subsequent Gazette amendment. The 2026 Gazette index includes G.O. Ms. No.179 dated 7 October 2026.
16. **Kerala Local Self Government Department — Municipality / Panchayat building rules:**  
    https://lsgkerala.gov.in/en/news-scroll-news-departmentnews/kerala-municipality-building-rules-2019-kerala-panchayat-building
17. **Kerala official Gazette / Government Orders index:**  
    https://go.lsgkerala.gov.in/pages/orderGlance.php?select=gazette
18. **Kerala building permit portal:**  
    https://buildingpermit.lsgkerala.gov.in/
19. **Telangana BuildNow — Government Orders and Acts:**  
    https://buildnow.telangana.gov.in/go-and-act/
20. **Telangana TG-bPASS — building permission portal:**  
    https://tgbpass.telangana.gov.in/
21. **Telangana TG-bPASS FAQ / eligibility and process:**  
    https://tgbpass.telangana.gov.in/others/faq
22. **Andhra Pradesh Capital Region Development Authority — official GOs / Acts / Rules:**  
    https://crda.ap.gov.in/APCRDAV2/Views/DynamicHorizantalGovTab.aspx
23. **Andhra Pradesh Building Rules amendment, G.O. Ms. No.4 dated 9 January 2025 (official APCRDA-hosted PDF):**  
    https://crda.ap.gov.in/APCRDADOCS/GOSACTSRULES/Rules/01~15422025MAUD_35090_MS4.pdf
24. **Maharashtra UDCPR 2020 — official MMRDA-hosted copy:**  
    https://www.mmrda.maharashtra.gov.in/sites/default/files/2023-10/UDCPR_compressed_2.pdf
25. **Hyderabad Metropolitan Development Authority — GOs, Acts and building rules:**  
    https://www.hmda.gov.in/gos-acts/
26. **Bengaluru / BBMP — municipal and building-related official documents:**  
    https://site.bbmp.gov.in/  
    Check current State laws, BBMP regulations, amendments, zoning and applicable authority records. Do not treat an old bye-law PDF as current merely because it remains online.

### C. Disaster, hazard, geology and location data

27. **BMTPC — Vulnerability Atlas of India, Third Edition / hazard maps:**  
    https://www.bmtpc.org/topics.aspx?Mid1=180&mid=56
28. **BMTPC — hazard maps of India:**  
    https://www.bmtpc.org/topics.aspx?Mid1=178&mid=56
29. **BMTPC — earthquake hazard guidance:**  
    https://www.bmtpc.org/topics.aspx?Mid1=334&mid=56
30. **BMTPC — wind and cyclone hazard guidance:**  
    https://www.bmtpc.org/topics.aspx?Mid1=385&mid=56
31. **BMTPC — flood hazard guidance:**  
    https://www.bmtpc.org/topics.aspx?Mid1=386&mid=56
32. **BMTPC — Vulnerability Atlas interactive portal:**  
    https://vai.bmtpc.org/
33. **BMTPC — publications / emerging construction systems / confined masonry resources:**  
    https://www.bmtpc.org/topics.aspx?mid=520&type=main  
    https://www.bmtpc.org/topics.aspx?mid=526&type=main
34. **BMTPC — e-learning course on Vulnerability Atlas:**  
    https://www.bmtpc.org/Topics.aspx?mid=528&type=sub
35. **Geological Survey of India — landslide hazard and susceptibility reports:**  
    https://gsi.gov.in/landslide-hazard/
36. **GSI Bhusanket public portal — landslide inventory, maps and bulletins:**  
    https://bhusanket.gsi.gov.in/
37. **National Disaster Management Authority (NDMA):**  
    https://ndma.gov.in/
38. **NDMA earthquake management guidelines (official PDF linked by PIB):**  
    https://ndma.gov.in/sites/default/files/PDF/Guidelines/earthquakes.pdf
39. **PIB / MoHUA — National Framework for Structural Safety Audits and Seismic Resilience of Buildings, 23 July 2026:**  
    https://www.pib.gov.in/PressReleasePage.aspx?PRID=2288502&lang=1&reg=3

### D. Climate, rainfall, groundwater and coastal conditions

40. **India Meteorological Department — rainfall statistics:**  
    https://mausam.imd.gov.in/responsive/rainfall_statistics.php
41. **IMD — district / state / river-basin rainfall information:**  
    https://mausam.imd.gov.in/imd_latest/contents/rainfallinformation.php?msg=C
42. **IMD Thiruvananthapuram — meteorological data supply, including rainfall, temperature, humidity, wind and climate normals:**  
    https://mausam.imd.gov.in/thiruvananthapuram/Datasupply.php
43. **Central Ground Water Board — groundwater level monitoring and State yearbooks:**  
    https://cgwb.gov.in/en/ground-water-level-monitoring
44. **CGWB publications repository — groundwater yearbooks and reports:**  
    https://cgwb.gov.in/cgwbpnm/
45. **PARIVESH — Environment / CRZ notifications and clearances:**  
    https://parivesh.nic.in/
46. **MoEFCC / PARIVESH — coastal regulation documentation:**  
    https://cpc.parivesh.nic.in/acts.aspx?id=CAMPA

### E. Construction specifications, project execution and public works

47. **CPWD official website — specifications, manuals, DSR / DAR and publications:**  
    https://cpwd.gov.in/
48. **CPWD Works Manual 2022 (official PDF):**  
    https://www.cpwd.gov.in/Publication/CPWD_Works_Manual_2022_13122022.pdf
49. **CPWD Plinth Area Rates 2025 (official PDF):**  
    https://cpwd.gov.in/Publication/PLINTH_AREA_RATES_2025.pdf
50. **CPWD publication / circulars index:**  
    https://cpwd.gov.in/  
    Search the official site for the current CPWD Specifications, Delhi Schedule of Rates (DSR), Delhi Analysis of Rates (DAR), correction slips and addenda. Always record the version and correction date. CPWD rates are not automatically local market rates.

### F. Water, sanitation, services and energy efficiency

51. **CPHEEO — manuals and official technical guidance:**  
    https://cpheeo.gov.in/
52. **MoHUA manuals and advisories — water supply / treatment, operation and maintenance:**  
    https://www.mohua.gov.in/documents/publications/manuals-and-advisories-MDMwYTMtQWa?pageTitle=Manuals-And-Advisories
53. **Bureau of Energy Efficiency — energy efficiency in buildings:**  
    https://www.beeindia.gov.in/show_content.php?lang=1&level=1&lid=5&ls_id=111
54. **BEE — residential energy code / Eco-Niwas Samhita / ECSBC Residential:**  
    https://beeindia.gov.in/show_content.php?level=2&lid=328&ls_id=202
55. **BEE — energy-efficient residential buildings and related resources:**  
    https://www.beeindia.gov.in/view_content.php?lang=1&lid=615
56. **BEE — ECBC 2017 (commercial buildings, where applicable):**  
    https://beeindia.gov.in/sites/default/files/BEE_ECBC%202017.pdf
57. **CPHEEO — manuals list and technical publications:**  
    https://cpheeo.gov.in/

### G. Additional official technical libraries

58. **BIS Know Your Standard / revised standards / new standards links:** Start from https://www.bis.gov.in/ and use its Standards navigation.
59. **BIS recognized laboratory and test-facility lookup:** https://lims.bis.gov.in/
60. **BMTPC publications:** https://www.bmtpc.org/ — use original Government / institution publications for technology comparisons.
61. **India Code:** https://www.indiacode.nic.in/ — use for legal texts; verify current amendments and State rules.

**Link integrity task:** During implementation, test every link, record the final URL and title, remove dead / redirected / unofficial duplicates, and provide a “Report a broken reference” mailto-free local feedback note or link to the source directory. Never fabricate a deep link.

---

## 9. REQUIRED VISUAL LEARNING APPROACH

Use **more diagrams than paragraphs**. Every technical chapter should teach visually before explaining in text.

### Required original visual types

- 3D axonometric house cutaway: plot → foundation → plinth → frame → walls → roof → finishes → services.
- Exploded assembly views for footing, column starter, beam-column joint, slab, staircase, wall and roof.
- Section drawings with dimensions and labels (only sourced values where numerical requirements are shown).
- Load-path flow diagrams from slab to beam to column to footing to soil.
- Soil profile and bore-log interpretation diagrams.
- Foundation comparison illustrations with use cases and limitations.
- Concrete production sequence: weigh → batch → mix → transport → place → compact → cure → test.
- Reinforcement placement illustrations, including common incorrect placements.
- Brick bonds and masonry junction illustrations.
- Waterproofing layers and water-flow paths.
- Plumbing / drainage isometric diagrams with traps, vents, inspection points and falls (all dimensions sourced).
- Electrical single-line / circuit concept diagrams and earthing path visuals.
- Construction sequence timelines and inspection hold-point flow charts.
- “Correct vs incorrect” detail comparisons.
- Site-photo style visual cards for defects, with original illustrative images and explicit labels.
- Regional climate response illustrations (sun path, wind direction, rain exposure, coastal exposure and slope drainage).

### Visual quality rules

- Draw technically correct original diagrams using SVG / CSS / locally stored illustrations. Every drawing must have a legend, scale disclaimer where relevant and readable labels on mobile.
- Do not use decorative 3D art that hides the engineering concept.
- Keep labels short and use consistent colour semantics (structure, water, electrical, soil, hazard, inspection).
- Use a neutral light interface, strong contrast, readable typography and generous spacing.
- Use diagrams, comparison tables, annotated details and small data cards instead of long essay paragraphs.
- Every image must have alt text and a text equivalent for accessibility.
- Use a source credit directly below any third-party / official image.
- Avoid generic Western construction illustrations where Indian construction practice, materials or climate are materially different.

---

## 10. PAGE TEMPLATE — APPLY TO EVERY LEARNING PAGE

Every page should use the same compact learning rhythm:

1. **Page title + one-sentence objective.**
2. **At a glance:** 3–6 key takeaways, using visual cards.
3. **Hero technical diagram:** one original large visual with numbered annotations.
4. **How it works:** short sequential explanation, preferably 4–8 steps.
5. **Reference values / code panel:** only verified values; include code, edition, clause/table, units, applicability and last-checked date. If inaccessible, link and say what the learner must verify.
6. **Field / drawing checklist:** practical actions and inspection prompts.
7. **Common mistakes:** show why they happen, what the consequence can be and who should resolve them.
8. **One worked example:** short and fully labelled as illustrative training only; show assumptions and units.
9. **Knowledge check:** 3–5 quick questions with local feedback; include explanation after answer.
10. **Related pages + glossary links + source list.**

Text guideline: target 250–600 words on a standard learning page, but do not omit a safety-critical qualification, exception or reference. Split long topics into multiple pages rather than shrinking type or removing important conditions.

### Reference-value table schema

| Item | Value / requirement | Unit | Applicability / condition | Source (edition, clause/table) | Verified |
|---|---:|---|---|---|---|

Use “Not stated here — check licensed standard” instead of leaving a blank or guessing.

---

## 11. INTERACTIVE LEARNING FEATURES — ALL CLIENT-SIDE

Add useful interaction without making it feel like a software dashboard:

- Chapter progress indicator and “continue learning” card.
- Search across chapter titles, content, code numbers and glossary terms.
- Filterable Indian Standards index by discipline and work stage.
- Select-a-location panel with state / district / authority and official source links.
- Interactive house-building sequence timeline.
- Clickable exploded house model / 2D sectional diagram with layer labels.
- Drawing-reading practice: identify plan, elevation, section, grid, dimension, level and revision.
- Load-path visual quiz.
- Soil-test matching activity.
- Material acceptance quiz.
- Concrete-work sequence ordering exercise.
- Site inspection checklists that can be ticked locally and printed.
- Non-structural learning calculators: unit conversion, area, volume, concrete quantity estimate, plaster / paint area and preliminary material quantity. Display formulas, assumptions, exclusions and warnings.
- Optional structural concept calculators only when the relevant current code formula, boundary conditions and full assumptions can be properly taught. They must never output a construction-ready member size or declare a building safe.
- Bookmark / completed-page state using localStorage only, with a “clear local progress” option.
- Glossary flash cards and short quizzes.
- Copy/share a page link; do not transmit user inputs to a server.

Every calculator must distinguish **quantity estimation** from **structural design**. An estimate is not a design. A calculator must show input validation, units, formula, calculation steps and limitations.

---

## 12. WEBSITE STRUCTURE AND NAVIGATION

Build as a true multi-page pocketbook, not one enormous landing page.

### Main navigation

- Home
- Start Learning
- Chapters
- Build a House (project journey)
- Site & Soil
- Structural Basics
- Materials & Testing
- Construction Practice
- Region & Climate
- Indian Standards Index
- Field Checklists
- Calculators
- Glossary
- References
- About / Safety

### Home page sections

1. Strong hero: “From empty plot to a safe, durable home — understand every stage.”
2. Three clear entry choices: **I am a student**, **I am a homeowner**, **I work on site**. These filter/recommend learning routes, not separate incomplete content.
3. Interactive house construction journey.
4. Browse by discipline and by project stage.
5. Region / climate explorer.
6. Standards and official-source library.
7. Featured field checklists.
8. Progress card stored locally.
9. Download complete pocketbook PDF.
10. Visible safety disclaimer and last reference audit date.

### Every page must include

- Breadcrumbs.
- Consistent chapter / page identity.
- Previous and next page.
- Chapter completion state.
- Link to applicable sources.
- Print this page.
- Back to top.
- Mobile-friendly table and diagram behaviour.

---

## 13. RESPONSIVE DESIGN AND ACCESSIBILITY

Mobile is the primary experience. Design and test from narrow Android screens upwards.

- Mobile-first responsive layout; no horizontal page scrolling.
- Persistent but compact bottom navigation or collapsible chapter menu.
- Large touch targets and clear focus states.
- Collapsible tables / stacked reference cards on mobile.
- Diagrams must zoom or open in a full-screen viewer; labels cannot become unreadable.
- Use semantic HTML, heading hierarchy, keyboard navigation, descriptive buttons, accessible forms and sufficient contrast.
- Respect reduced-motion preferences.
- Keep loading fast; optimise images and avoid unnecessary animation.
- Provide a low-bandwidth mode or make all non-essential visuals optional.
- Do not use tiny text, intrusive pop-ups, full-screen marketing banners or excessive card decoration.
- Test at least 320 px, 360 px, 390 px, 430 px, tablet and desktop widths.

---

## 14. STATIC WEBSITE ARCHITECTURE

Use a maintainable static architecture. Preferred choices:

- Astro static output, or a clean vanilla HTML/CSS/JavaScript site if that is simpler for the content volume.
- Markdown / MDX content files for chapter pages.
- A central JSON / YAML data source for chapters, standards, glossary, reference links, location profiles and quizzes.
- Reusable accessible components for source panels, checklists, reference tables, figures, callouts and quizzes.
- Build-time validation for missing citations, broken local links, missing alt text and empty chapter pages.
- Static search index generated at build time (for example, Pagefind or a small locally bundled search index).
- No server database and no private API key.
- Do not require third-party requests for core reading, diagrams, navigation or calculators.
- Bundle dependencies locally where possible and record licences.
- Optional PWA/offline cache only if it remains simple, reliable and does not compromise PDF export.

### Suggested directory structure

```text
/
  index.html (or generated home route)
  /chapters/
    /start-here/
    /site-and-land/
    /soil-and-foundations/
    /planning-and-approvals/
    /climate-and-regions/
    /structural-engineering/
    /materials-and-testing/
    /concrete-technology/
    /masonry-and-finishes/
    /building-services/
    /construction-execution/
    /quality-safety-estimation/
    /defects-maintenance/
    /case-studies/
  /standards/
  /locations/
  /checklists/
  /calculators/
  /glossary/
  /references/
  /content/                 # Markdown source files
  /data/                    # Standards, sources, location data, quiz data
  /assets/
    /images/
    /diagrams/
    /icons/
    /fonts/
    /pdf/
  /styles/
  /scripts/
  /print-book/              # Complete print-friendly book route
  /scripts/build-pdf.*      # Build-time PDF generation script
  README.md
  SOURCES.md
  CHANGELOG.md
```

Use meaningful, stable URLs such as `/chapters/site-survey/` and `/standards/concrete/`. No broken links, placeholder routes, “coming soon” chapters or empty category cards in the final release.

---

## 15. COMPLETE BOOK PDF — REQUIRED DOWNLOAD FEATURE

The website must provide two distinct actions:

1. **Download Complete Pocketbook (PDF)** — the complete book in chapter order as one consolidated, searchable PDF.
2. **Print / Save This Page** — print the current chapter only.

### Preferred implementation

- Generate a consolidated PDF at build time from a dedicated print-book route or static book source using Playwright / Chromium or another reliable open-source renderer.
- Publish the resulting file at a stable local path, for example `/assets/pdf/indian-civil-engineering-pocketbook.pdf`.
- The website download control must link directly to that actual generated PDF.
- Keep the PDF selectable/searchable (not a collection of screenshots).
- Include a designed cover, contents, chapter numbers, source notes, page numbers, running title, glossary and references.
- Use print CSS for A4 portrait by default, sensible margins, readable body type, controlled page breaks and tables that do not split badly.
- Avoid cutting diagrams, headings, captions or source notes between pages.
- Ensure hyperlinks remain clickable in the PDF.
- Use fonts with appropriate Indic language coverage if local-language terminology is added.
- Keep the PDF version / publication date / reference-audit date visible.

### Fallback

If build-time PDF generation is unavailable, create a dedicated all-chapters print route that expands every chapter in the correct order, hides navigation and interactive controls, and invokes the browser print dialog with `window.print()`. Clearly label this as **Print → Save as PDF**. Do not claim a direct PDF download exists unless a real PDF file is present and tested.

### PDF QA

- Verify the PDF exists at the linked path after the build.
- Check total page count, cover, table of contents, page order, links, diagrams, tables, Unicode text, page breaks and last page.
- Confirm the PDF contains the complete content, not just the homepage or currently visible page.
- Compare website page count / chapter manifest against PDF contents.
- Test on desktop and Android browser where possible.

---

## 16. CONTENT WRITING RULES

- Write in clear, professional Indian English; explain engineering terminology naturally.
- Use compact sentences and explain one new concept at a time.
- Avoid motivational filler, generic career advice and vague statements such as “use good quality material.”
- Replace vague claims with a checkable action: identify the test report, inspect the material certificate, record the batch number, check the drawing revision, or obtain an engineer’s approval.
- Never state an unsourced percentage, dimension, mix ratio, strength, cover, spacing, test frequency, curing period, load or permission threshold.
- When several codes interact, show a “read these together” box.
- Clearly distinguish code requirement, local rule, project specification, manufacturer instruction and common practice.
- Explain why a procedure matters, what can go wrong and what record should be kept.
- Explain the difference between a drawing, calculation, specification, BOQ, BBS, method statement, ITP, inspection request and as-built drawing.
- For homeowners, add a simple “Ask your engineer / architect / contractor” box with practical questions.
- Use real Indian terminology and metric units; include common site terminology in brackets where helpful.
- Use regional words only as supplemental labels, not as substitutes for technical definitions.

---

## 17. QUALITY ASSURANCE AND TECHNICAL AUDIT

Before publication, perform these audits:

### A. Code audit

- Every IS number exists in the BIS catalogue.
- Correct title, part, edition and amendments.
- Correct status: current / superseded / withdrawn / draft / not verified.
- Every numeric value is traceable to clause/table/page.
- No old standard has been accidentally presented as current.
- No value has been copied from an unofficial summary.

### B. Jurisdiction audit

- Model Bye-Laws are not presented as automatically enforceable local law.
- State and city pages link to actual official portals / Gazette documents.
- Effective dates and amendments are recorded.
- Coastal, forest, airport, heritage, floodplain and other special permissions are not overlooked.

### C. Engineering audit

- Load-path explanations are mechanically correct.
- Units and calculations are dimensionally correct.
- Drawings align with the accompanying explanation.
- Site procedures include inspection and safety hold points.
- No generic design detail is represented as construction-ready.
- A practicing structural engineer and geotechnical engineer review the relevant sections.

### D. UX / PDF audit

- Mobile layout is usable without horizontal scrolling.
- Search returns useful pages.
- Navigation has no dead ends.
- Interactive controls work without a backend.
- Progress remains local and can be reset.
- Full PDF export is complete and readable.
- Broken external links are listed for repair.

### E. Content integrity audit

- Every chapter is fully written and has diagrams, sources and a knowledge check.
- No placeholder “insert diagram here” or “write later” text remains.
- No duplicate chapters or conflicting values remain.
- Date of last code check is visible.

---

## 18. RELEASE DELIVERABLES

Deliver all of the following:

1. Fully working responsive static website.
2. At least 180 complete learning pages in the sequence defined above.
3. Original diagrams and visual learning assets.
4. Searchable standards / Indian code index.
5. Region and climate learning section with official source links.
6. Field checklists and non-structural quantity-learning tools.
7. Glossary with cross-links.
8. Master references page and structured source register.
9. Consolidated downloadable PDF containing all pages.
10. Print-current-page option.
11. `README.md` with build / deploy / content update instructions.
12. `SOURCES.md` with official links, source status and last-verified date.
13. `CHANGELOG.md` showing updates to codes, regulations and content.
14. A QA report covering code audit, broken links, mobile testing and PDF testing.
15. A clear disclaimer that this is an educational reference and not a substitute for professional design, statutory approval or supervision.

### Final acceptance test

A fresh civil-engineering graduate should be able to use the site to understand the main work stages, identify the drawings and reports required, read a basic site / structural / services drawing, recognise major construction quality checks, follow a safe construction sequence and find the official Indian source for a technical requirement.

A homeowner should be able to follow the project journey, understand why survey and soil investigation matter, know which professionals to appoint, understand permission requirements, ask informed questions, check documented quality records and avoid attempting unsafe structural or electrical work.

**Build the actual product to this standard. Do not reduce the scope to a short brochure, a static landing page or a list of external links.**

---

## 19. EDITORIAL DISCLAIMER TO DISPLAY ON THE WEBSITE AND PDF

> This pocketbook is an educational guide to Indian civil engineering and residential construction. It is not a structural design, geotechnical report, architectural service, electrical design, statutory approval, contract document or site-specific construction specification. Indian Standards, NBC provisions, State rules, local development regulations and project requirements may be amended. Always verify the current official edition and obtain site-specific advice, drawings, calculations, approvals and supervision from appropriately qualified and registered professionals. Never use an illustrative example as a construction instruction.

---

## 20. BUILD ORDER

Execute in this order while keeping the entire scope in view:

1. Create the content model, navigation, design system and source-register schema.
2. Build the homepage and all chapter / reference / location templates.
3. Complete the foundational chapters first, then progress through the full book sequence.
4. Produce original diagrams alongside the chapter they teach; do not postpone all illustrations to the end.
5. Populate and verify the Indian Standards index and official link library.
6. Build the region / climate explorer and homeowner project journey.
7. Add quizzes, checklists, glossary and safe estimation tools.
8. Generate the complete print-book route and consolidated PDF.
9. Run engineering, source, mobile, accessibility and PDF audits.
10. Publish only after the acceptance tests pass.

**Success is measured by technical traceability, visual clarity, completeness, usability on a phone and a genuinely useful PDF — not by the number of animations or decorative 3D effects.**
