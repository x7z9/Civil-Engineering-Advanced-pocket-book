import { useEffect, useState } from 'react';
import type { AudienceRole, LocalUserState, TextScale } from '../types/pocketbook';

const STORAGE_KEY = 'ice_pocketbook_state_v1';

export const DEFAULT_USER_STATE: LocalUserState = {
  completedChapters: [],
  bookmarkedChapters: [],
  checkedItems: {},
  quizScores: {},
  lastVisitedChapter: 1,
  audienceFilter: 'all',
  textScale: 'auto',
  distractionFree: false,
  lowBandwidthDiagrams: false,
};

function loadInitialState(): LocalUserState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_STATE;
    const parsed = JSON.parse(raw) as Partial<LocalUserState>;
    return {
      ...DEFAULT_USER_STATE,
      ...parsed,
      completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
      bookmarkedChapters: Array.isArray(parsed.bookmarkedChapters) ? parsed.bookmarkedChapters : [],
      checkedItems: parsed.checkedItems && typeof parsed.checkedItems === 'object' ? parsed.checkedItems : {},
      quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
    };
  } catch {
    return DEFAULT_USER_STATE;
  }
}

export function usePocketbookState() {
  const [state, setState] = useState<LocalUserState>(() => loadInitialState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in restricted browsing contexts
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute('data-scale', state.textScale);
  }, [state.textScale]);

  const toggleCompleted = (chapterNumber: number) => {
    setState((prev) => {
      const exists = prev.completedChapters.includes(chapterNumber);
      return {
        ...prev,
        completedChapters: exists
          ? prev.completedChapters.filter((n) => n !== chapterNumber)
          : [...prev.completedChapters, chapterNumber].sort((a, b) => a - b),
      };
    });
  };

  const toggleBookmark = (chapterNumber: number) => {
    setState((prev) => {
      const exists = prev.bookmarkedChapters.includes(chapterNumber);
      return {
        ...prev,
        bookmarkedChapters: exists
          ? prev.bookmarkedChapters.filter((n) => n !== chapterNumber)
          : [...prev.bookmarkedChapters, chapterNumber].sort((a, b) => a - b),
      };
    });
  };

  const toggleChecklistItem = (itemId: string) => {
    setState((prev) => ({
      ...prev,
      checkedItems: {
        ...prev.checkedItems,
        [itemId]: !prev.checkedItems[itemId],
      },
    }));
  };

  const recordQuizScore = (chapterNumber: number, scorePercent: number) => {
    setState((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [chapterNumber]: Math.max(prev.quizScores[chapterNumber] ?? 0, scorePercent),
      },
    }));
  };

  const setLastVisitedChapter = (chapterNumber: number) => {
    setState((prev) =>
      prev.lastVisitedChapter === chapterNumber
        ? prev
        : { ...prev, lastVisitedChapter: chapterNumber }
    );
  };

  const setAudienceFilter = (audienceFilter: AudienceRole | 'all') => {
    setState((prev) => ({ ...prev, audienceFilter }));
  };

  const setTextScale = (textScale: TextScale) => {
    setState((prev) => ({ ...prev, textScale }));
  };

  const toggleDistractionFree = () => {
    setState((prev) => ({ ...prev, distractionFree: !prev.distractionFree }));
  };

  const toggleLowBandwidthDiagrams = () => {
    setState((prev) => ({ ...prev, lowBandwidthDiagrams: !prev.lowBandwidthDiagrams }));
  };

  const resetAllProgress = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage clear errors
    }
    setState(DEFAULT_USER_STATE);
  };

  return {
    state,
    toggleCompleted,
    toggleBookmark,
    toggleChecklistItem,
    recordQuizScore,
    setLastVisitedChapter,
    setAudienceFilter,
    setTextScale,
    toggleDistractionFree,
    toggleLowBandwidthDiagrams,
    resetAllProgress,
  };
}
