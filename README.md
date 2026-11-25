# The Indian House-Building & Civil Engineering Pocketbook

*Understand the ground. Read the drawing. Build it right.*

A crisp, white-paper, mobile-first, 100% local and offline static educational web application and PDF reference for Indian residential house-building and civil engineering — grounded in verified Indian primary authorities (BIS Indian Standards, NBC 2016 / SP 7:2016, State Building Rules & Gazettes, CPWD, BMTPC, IMD, CGWB, GSI, BEE, and CPHEEO).

## Key Capabilities

- **180 Structured Chapters (Parts 0–13)**: Plot-to-occupancy learning path covering due diligence, site surveying, soil investigation, State building rules, climate-responsive design, structural fundamentals, materials & testing, concrete & RCC, masonry & waterproofing, MEP services, site execution, QA/safety/estimation, inspection & crack forensics, and 5 Indian regional case studies.
- **Visual-First Engineering Diagrams**: 16 interactive, zoomable white-paper SVG engineering drawings with clickable numbered callouts.
- **Design Engineer Tips & Field Hold Points**: Ready-to-use design engineer checklists, common site mistakes, and 7 locally persisted stage hold-point inspection checklists.
- **100% Offline & Local-Only**: Zero AI calls, zero external API dependencies, and zero trackers. Reading progress, bookmarks, checklist ticks, quiz scores, text scaling (`Compact / Auto / Comfortable / Large`), distraction-free mode, and low-bandwidth diagram preference are stored solely in browser `localStorage`.
- **Instant Offline Search**: Full-text client-side search (`/` or `Ctrl/Cmd + K`) across all 180 chapters, BIS codes, glossary entries, regional profiles, and site checklists.
- **Offline Export to PDF**:
  - Direct downloadable searchable A4 PDF via `jsPDF` (Complete 180-Chapter Edition, Selected Part, or Current Chapter).
  - Illustrated A4 Print-Book mode embedding vector SVG engineering diagrams ready for browser `Print → Save as PDF`.
- **Safe Non-Structural Estimators & Interactive Labs**: Transparent SI unit converter, excavation volume, wet/dry concrete volume, plaster/paint area, and IS 1786 rebar weight (`d²/162.2`) estimators plus Drawing-Reading, Concrete Pour Sequencing, and Soil/Material QA labs.

## Educational Boundary

This pocketbook is an educational reference only. It is **not** a structural design, geotechnical report, architectural sanction drawing, or site-specific specification. Every worked example is explicitly labelled `ILLUSTRATIVE TRAINING EXAMPLE — NOT FOR CONSTRUCTION`. Always verify current licensed BIS/NBC editions and State Gazette rules with qualified, registered professionals.

## Local Development

```bash
npm install
npm run dev
npm run build
npm run lint
```
