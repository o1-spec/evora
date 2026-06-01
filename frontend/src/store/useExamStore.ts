import { create } from 'zustand';

interface ExamAnswer {
  questionId: string;
  answer: string;
}

interface ExamState {
  attemptId: string | null;
  examId: string | null;
  currentSectionIndex: number;
  answers: Record<string, string>;
  timeRemainingSeconds: number;
  isRunning: boolean;
  completedSections: Set<number>;
  setAttempt: (attemptId: string, examId: string) => void;
  setAnswer: (questionId: string, answer: string) => void;
  nextSection: () => void;
  markSectionComplete: (sectionIndex: number) => void;
  setTimer: (seconds: number) => void;
  tickTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  attemptId: null,
  examId: null,
  currentSectionIndex: 0,
  answers: {},
  timeRemainingSeconds: 0,
  isRunning: false,
  completedSections: new Set(),

  setAttempt: (attemptId, examId) => set({ attemptId, examId, answers: {}, currentSectionIndex: 0, completedSections: new Set() }),
  setAnswer: (questionId, answer) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: answer } })),
  nextSection: () =>
    set((state) => ({ currentSectionIndex: state.currentSectionIndex + 1 })),
  markSectionComplete: (sectionIndex: number) =>
    set((state) => {
      const newCompleted = new Set(state.completedSections);
      newCompleted.add(sectionIndex);
      return { completedSections: newCompleted };
    }),
  setTimer: (seconds) => set({ timeRemainingSeconds: seconds }),
  tickTimer: () =>
    set((state) => ({ timeRemainingSeconds: Math.max(0, state.timeRemainingSeconds - 1) })),
  startTimer: () => set({ isRunning: true }),
  stopTimer: () => set({ isRunning: false }),
  resetExam: () =>
    set({ attemptId: null, examId: null, currentSectionIndex: 0, answers: {}, timeRemainingSeconds: 0, isRunning: false, completedSections: new Set() }),
}));
