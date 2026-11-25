import React, { useState } from 'react';
import { Printer, RotateCcw } from 'lucide-react';
import { FIELD_CHECKLISTS } from '../data/checklists';
import type { LocalUserState } from '../types/pocketbook';

interface ChecklistsViewProps {
  userState: LocalUserState;
  onToggleChecklistItem: (itemId: string) => void;
  onOpenChapter: (chapterNumber: number) => void;
  onPrintCurrentPage: () => void;
}

export const ChecklistsView: React.FC<ChecklistsViewProps> = ({
  userState,
  onToggleChecklistItem,
  onOpenChapter,
  onPrintCurrentPage,
}) => {
  const [activeGroupId, setActiveGroupId] = useState<string>('all');

  const totalItems = FIELD_CHECKLISTS.reduce((acc, g) => acc + g.items.length, 0);
  const totalChecked = FIELD_CHECKLISTS.reduce(
    (acc, g) => acc + g.items.filter((i) => Boolean(userState.checkedItems[`fc-${i.id}`])).length,
    0
  );

  const visibleGroups =
    activeGroupId === 'all'
      ? FIELD_CHECKLISTS
      : FIELD_CHECKLISTS.filter((g) => g.id === activeGroupId);

  const clearGroup = (groupId: string) => {
    const group = FIELD_CHECKLISTS.find((g) => g.id === groupId);
    if (!group) return;
    group.items.forEach((item) => {
      const key = `fc-${item.id}`;
      if (userState.checkedItems[key]) {
        onToggleChecklistItem(key);
      }
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-wider text-neutral-500">
            FIELD QA/QC HOLD-POINT PACKS · 7 STAGE CHECKLISTS · SAVED LOCALLY
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-900">
            Site Inspection &amp; Hold-Point Checklists
          </h1>
          <p className="text-sm text-neutral-600 max-w-2xl">
            Tick items directly on site without internet access. Items marked{' '}
            <strong className="text-red-800 font-mono text-xs">HOLD POINT</strong> must be
            witnessed and signed off before proceeding to the next activity.
          </p>
        </div>

        <div className="no-print flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <span className="font-mono text-xs text-neutral-600 tabular-nums border border-neutral-200 bg-neutral-50 px-3 py-2">
            {totalChecked} / {totalItems} checked
          </span>
          <button
            type="button"
            onClick={onPrintCurrentPage}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-neutral-300 bg-white hover:bg-neutral-50 min-h-[40px]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Checklists</span>
          </button>
        </div>
      </header>

      {/* Stage Filter Buttons */}
      <div className="no-print flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveGroupId('all')}
          className={`px-3 py-2 text-xs font-medium border transition-colors min-h-[40px] ${
            activeGroupId === 'all'
              ? 'bg-blue-900 text-white border-blue-900'
              : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
          }`}
        >
          All 7 Stages
        </button>
        {FIELD_CHECKLISTS.map((group) => {
          const done = group.items.filter((i) => Boolean(userState.checkedItems[`fc-${i.id}`])).length;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveGroupId(group.id)}
              className={`px-3 py-2 text-xs font-medium border transition-colors min-h-[40px] ${
                activeGroupId === group.id
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <span>{group.stage.split('·')[0].trim()}</span>
              <span className="font-mono ml-1.5 opacity-80 tabular-nums">
                ({done}/{group.items.length})
              </span>
            </button>
          );
        })}
      </div>

      {/* Checklist Groups */}
      <div className="space-y-8">
        {visibleGroups.map((group) => {
          const done = group.items.filter((i) => Boolean(userState.checkedItems[`fc-${i.id}`])).length;
          return (
            <section
              key={group.id}
              className="border border-neutral-200 bg-white print-avoid-break"
            >
              <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50/70 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-blue-900 font-semibold uppercase">
                    {group.stage}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-neutral-600 tabular-nums">
                      {done} / {group.items.length} verified
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenChapter(group.chapterNumber)}
                      className="no-print text-xs font-semibold text-blue-900 hover:underline"
                    >
                      Ch. {group.chapterNumber} →
                    </button>
                    {done > 0 && (
                      <button
                        type="button"
                        onClick={() => clearGroup(group.id)}
                        className="no-print inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900"
                        title="Reset this checklist"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-900">
                  {group.title}
                </h2>
                <div className="font-mono text-[11px] text-neutral-500">
                  Basis: {group.codeBasis}
                </div>
                <p className="text-xs text-amber-900 bg-amber-50/60 border border-amber-200 p-2.5">
                  <strong>Gate Control:</strong> {group.holdPointNote}
                </p>
              </div>

              <div className="divide-y divide-neutral-200">
                {group.items.map((item) => {
                  const key = `fc-${item.id}`;
                  const checked = Boolean(userState.checkedItems[key]);
                  return (
                    <label
                      key={key}
                      className="flex items-start gap-3 p-4 cursor-pointer hover:bg-neutral-50/60 transition-colors min-h-[48px]"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleChecklistItem(key)}
                        className="mt-1 w-4 h-4 accent-blue-900 shrink-0"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          {item.holdPoint && (
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-800">
                              [HOLD POINT]
                            </span>
                          )}
                          <span
                            className={`text-sm leading-relaxed ${
                              checked ? 'line-through text-neutral-400' : 'text-neutral-900'
                            }`}
                          >
                            {item.check}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-neutral-500">
                          Verification: {item.verificationMethod}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
