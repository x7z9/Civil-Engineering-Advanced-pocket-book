import { jsPDF } from 'jspdf';
import { CHAPTERS } from '../data/chapters';
import { GLOSSARY } from '../data/glossary';
import { AUDIT_DATE, EDITORIAL_DISCLAIMER, PARTS } from '../data/parts';
import { REGIONAL_PROFILES } from '../data/regions';
import { STANDARDS_REGISTER } from '../data/standards';
import type { Chapter } from '../types/pocketbook';

export type PdfExportScope =
  | { type: 'complete' }
  | { type: 'part'; partId: number }
  | { type: 'chapter'; chapterNumber: number };

function cleanText(text: string): string {
  return text
    .replace(/[—–]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/→/g, '->')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/×/g, 'x')
    .replace(/°/g, ' deg')
    .replace(/Ω/g, 'Ohm')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/·/g, ' | ')
    .replace(/[^\x20-\x7E\n]/g, ' ');
}

export function generateOfflinePocketbookPdf(scope: PdfExportScope): { filename: string; pageCount: number } {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  const pageW = 210;
  const pageH = 297;
  const marginX = 16;
  const maxW = pageW - marginX * 2;
  let y = 20;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > pageH - 18) {
      doc.addPage();
      y = 20;
    }
  };

  const writeHeading = (text: string, size = 14, color: [number, number, number] = [17, 24, 39]) => {
    ensureSpace(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(cleanText(text), maxW);
    doc.text(lines, marginX, y);
    y += lines.length * (size * 0.44) + 2.5;
  };

  const writeSubheading = (text: string) => {
    ensureSpace(9);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 58, 138);
    const lines = doc.splitTextToSize(cleanText(text), maxW);
    doc.text(lines, marginX, y);
    y += lines.length * 4.4 + 1.5;
  };

  const writeBody = (text: string, indent = 0, size = 9, color: [number, number, number] = [31, 41, 55]) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(cleanText(text), maxW - indent);
    const blockHeight = lines.length * (size * 0.44) + 1.6;
    ensureSpace(Math.min(blockHeight, 24));
    for (const line of lines) {
      ensureSpace(5);
      doc.text(line, marginX + indent, y);
      y += size * 0.44;
    }
    y += 1.5;
  };

  const drawRule = (color: [number, number, number] = [229, 231, 235]) => {
    ensureSpace(4);
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, pageW - marginX, y);
    y += 4;
  };

  // Determine target chapters
  let selectedChapters: Chapter[] = CHAPTERS;
  let coverSubtitle = 'Complete 180-Chapter Edition (Parts 0 to 13) + Standards Register + Regional Matrix + Glossary';
  let filename = 'indian-civil-engineering-pocketbook-complete.pdf';

  if (scope.type === 'part') {
    const part = PARTS.find((p) => p.id === scope.partId);
    selectedChapters = CHAPTERS.filter((c) => c.partId === scope.partId);
    coverSubtitle = part ? `${part.code}: ${part.title}` : 'Selected Part Extract';
    filename = `indian-civil-engineering-pocketbook-part-${scope.partId}.pdf`;
  } else if (scope.type === 'chapter') {
    const ch = CHAPTERS.find((c) => c.number === scope.chapterNumber);
    selectedChapters = ch ? [ch] : [CHAPTERS[0]];
    coverSubtitle = ch ? `Chapter ${ch.number}: ${ch.title}` : 'Chapter Extract';
    filename = `indian-civil-engineering-pocketbook-ch-${String(scope.chapterNumber).padStart(3, '0')}.pdf`;
  }

  // COVER PAGE
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageW, pageH, 'F');
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.8);
  doc.line(marginX, 24, pageW - marginX, 24);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 58, 138);
  doc.text('INDIA JURISDICTION  |  OFFLINE TECHNICAL REFERENCE', marginX, 34);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(17, 24, 39);
  const titleLines = doc.splitTextToSize('The Indian House-Building & Civil Engineering Pocketbook', maxW);
  doc.text(titleLines, marginX, 54);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(75, 85, 99);
  doc.text('Understand the ground. Read the drawing. Build it right.', marginX, 76);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 58, 138);
  const subLines = doc.splitTextToSize(cleanText(coverSubtitle), maxW);
  doc.text(subLines, marginX, 92);

  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.3);
  doc.rect(marginX, 110, maxW, 44);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(17, 24, 39);
  doc.text('REFERENCE AUDIT & EDITION SCOPE', marginX + 5, 118);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(55, 65, 81);
  const scopeMeta = [
    `Reference Audit Date: ${AUDIT_DATE}`,
    `Chapters Included: ${selectedChapters.length} of 180`,
    'Primary Authority Basis: BIS Indian Standards, NBC 2016 (SP 7:2016), State Building Rules, CPWD, BMTPC, IMD, CGWB, GSI, BEE',
    'Key Edition-Check Flags: IS 1893 (Part 1):2025 | IS 875 (Part 1):2026 | IS 456:2000 (Rev 2025) | IS 1077:2025 | IS 1892/1904:2021',
  ];
  let metaY = 125;
  for (const row of scopeMeta) {
    const rLines = doc.splitTextToSize(cleanText(row), maxW - 10);
    doc.text(rLines, marginX + 5, metaY);
    metaY += rLines.length * 4.2 + 1.5;
  }

  // Disclaimer Box on Cover
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(185, 28, 28);
  doc.setLineWidth(0.35);
  doc.rect(marginX, 170, maxW, 48, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(185, 28, 28);
  doc.text('EDITORIAL & PROFESSIONAL SAFETY DISCLAIMER', marginX + 5, 178);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(31, 41, 55);
  const discLines = doc.splitTextToSize(cleanText(EDITORIAL_DISCLAIMER), maxW - 10);
  doc.text(discLines, marginX + 5, 185);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text('Generated offline directly from local pocketbook data — searchable selectable A4 text.', marginX, 274);

  // TABLE OF CONTENTS (for complete or part exports)
  if (selectedChapters.length > 1) {
    doc.addPage();
    y = 20;
    writeHeading('Table of Contents', 16, [30, 58, 138]);
    drawRule();
    let currentPart = -1;
    for (const ch of selectedChapters) {
      if (ch.partId !== currentPart) {
        currentPart = ch.partId;
        const p = PARTS[ch.partId];
        ensureSpace(9);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(30, 58, 138);
        doc.text(cleanText(`${p.code}: ${p.title}`), marginX, y);
        y += 5;
      }
      ensureSpace(4.6);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.2);
      doc.setTextColor(31, 41, 55);
      const line = cleanText(`${String(ch.number).padStart(3, '0')}. ${ch.title}  [${ch.evidenceTags.join(', ')}]`);
      const split = doc.splitTextToSize(line, maxW - 4);
      doc.text(split, marginX + 3, y);
      y += split.length * 3.8 + 0.6;
    }
  }

  // CHAPTER BODY PAGES
  let lastPartId = -1;
  for (const ch of selectedChapters) {
    if (scope.type === 'chapter' || ch.partId !== lastPartId || y > 225) {
      doc.addPage();
      y = 20;
    } else {
      y += 4;
      drawRule([156, 163, 175]);
    }

    if (ch.partId !== lastPartId) {
      lastPartId = ch.partId;
      const p = PARTS[ch.partId];
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 58, 138);
      doc.text(cleanText(`${p.code.toUpperCase()}  |  ${p.title.toUpperCase()}`), marginX, y);
      y += 5.5;
    }

    writeHeading(`Chapter ${ch.number}: ${ch.title}`, 12.5, [17, 24, 39]);
    writeBody(`Objective: ${ch.objective}`, 0, 9, [55, 65, 81]);
    writeBody(`Evidence Tags: [${ch.evidenceTags.join(']  [')}]  |  Visual Focus: ${ch.diagramFocusNote}`, 0, 8, [107, 114, 128]);

    writeSubheading('At a Glance');
    for (const item of ch.atAGlance) {
      writeBody(`- ${item.label}: ${item.detail}`, 2, 8.5);
    }

    writeSubheading('Design Engineer Tips & Industry Techniques');
    for (const tip of ch.engineerTips) {
      writeBody(`* ${tip}`, 2, 8.5);
    }

    writeSubheading('Reference & Code Verification');
    for (const r of ch.referenceValues) {
      writeBody(`- ${r.item}: ${r.value} (${r.unit}) | Source: ${r.source} | Verified: ${r.verified}`, 2, 8);
    }

    writeSubheading('Field & Drawing Checklist');
    for (const ck of ch.checklist) {
      writeBody(`[ ] ${ck}`, 2, 8.3);
    }

    writeSubheading('Common Mistakes & Resolution');
    for (const m of ch.commonMistakes) {
      writeBody(`! ${m.mistake} -> Consequence: ${m.consequence} | Resolved by: ${m.whoResolves}`, 2, 8);
    }

    writeSubheading(`Worked Example: ${ch.workedExample.title} (ILLUSTRATIVE TRAINING EXAMPLE - NOT FOR CONSTRUCTION)`);
    writeBody(`Steps: ${ch.workedExample.steps.join(' -> ')}`, 2, 8);
    writeBody(`Result: ${ch.workedExample.result} | Note: ${ch.workedExample.limitation}`, 2, 8, [75, 85, 99]);

    writeSubheading('Ask Your Engineer / Architect / Contractor');
    for (const q of ch.askYourTeam) {
      writeBody(`? ${q}`, 2, 8.2);
    }
  }

  // APPENDICES FOR COMPLETE EDITION
  if (scope.type === 'complete') {
    doc.addPage();
    y = 20;
    writeHeading('Appendix A: Indian Standards Register (Verified 23 Nov 2026)', 14, [30, 58, 138]);
    drawRule();
    for (const s of STANDARDS_REGISTER) {
      writeBody(
        `${s.standard_or_document_number} (${s.edition_or_year}) — ${s.title}. Status: ${s.status.toUpperCase()}. ${s.amendments_or_reaffirmation}. Official URL: ${s.official_url}`,
        0,
        8
      );
    }

    doc.addPage();
    y = 20;
    writeHeading('Appendix B: Regional Climate & Hazard Matrix', 14, [30, 58, 138]);
    drawRule();
    for (const r of REGIONAL_PROFILES) {
      writeSubheading(`${r.region} (${r.climate})`);
      writeBody(`Hazards: ${r.mainHazards}. Site Concerns: ${r.typicalSiteConcerns}. Design Response: ${r.designResponse} [Source: ${r.source}]`, 2, 8);
    }

    doc.addPage();
    y = 20;
    writeHeading('Appendix C: Civil Engineering & Indian Site Glossary', 14, [30, 58, 138]);
    drawRule();
    for (const g of GLOSSARY) {
      writeBody(
        `${g.term}${g.siteAlias ? ` (${g.siteAlias})` : ''}${g.unit ? ` [${g.unit}]` : ''}: ${g.definition} (Ref: ${g.codeRef}, Ch. ${g.relatedChapter})`,
        0,
        8
      );
    }
  }

  // Add running headers & page numbers to all content pages (page 2+)
  const totalPages = doc.getNumberOfPages();
  for (let p = 2; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.2);
    doc.line(marginX, 12, pageW - marginX, 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(107, 114, 128);
    doc.text('The Indian House-Building & Civil Engineering Pocketbook', marginX, 9.5);
    doc.text(`Audit: ${AUDIT_DATE}`, pageW - marginX, 9.5, { align: 'right' });

    doc.line(marginX, pageH - 12, pageW - marginX, pageH - 12);
    doc.text('Educational Reference Only — Verify Licensed BIS Standards & Local AHJ Rules', marginX, pageH - 8);
    doc.text(`Page ${p} of ${totalPages}`, pageW - marginX, pageH - 8, { align: 'right' });
  }

  doc.save(filename);
  return { filename, pageCount: totalPages };
}
