import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExamState {
  attemptId: string | null;
  examId: string | null;
  currentSectionIndex: number;
  answers: Record<string, string>;
  timeRemainingSeconds: number;
  isRunning: boolean;
  completedSections: number[];
  lastTimerSectionIndex: number | null;
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

export const useExamStore = create<ExamState>()(
  persist(
    (set) => ({
      attemptId: null,
      examId: null,
      currentSectionIndex: 0,
      answers: {},
      timeRemainingSeconds: 0,
      isRunning: false,
      completedSections: [],
      lastTimerSectionIndex: null,

      setAttempt: (attemptId, examId) =>
        set((state) => {
          if (state.attemptId === attemptId) {
            // Keep state to resume the active attempt
            return {};
          }
          // Reset state for a new/different attempt
          return {
            attemptId,
            examId,
            answers: {},
            currentSectionIndex: 0,
            completedSections: [],
            timeRemainingSeconds: 0,
            isRunning: false,
            lastTimerSectionIndex: null,
          };
        }),

      setAnswer: (questionId, answer) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: answer } })),

      nextSection: () =>
        set((state) => ({ currentSectionIndex: state.currentSectionIndex + 1 })),

      markSectionComplete: (sectionIndex: number) =>
        set((state) => ({
          completedSections: state.completedSections.includes(sectionIndex)
            ? state.completedSections
            : [...state.completedSections, sectionIndex],
        })),

      setTimer: (seconds) =>
        set((state) => {
          // If we already have time remaining for the current section index, keep it
          if (state.lastTimerSectionIndex === state.currentSectionIndex && state.timeRemainingSeconds > 0) {
            return {};
          }
          return {
            timeRemainingSeconds: seconds,
            lastTimerSectionIndex: state.currentSectionIndex,
          };
        }),

      tickTimer: () =>
        set((state) => ({ timeRemainingSeconds: Math.max(0, state.timeRemainingSeconds - 1) })),

      startTimer: () => set({ isRunning: true }),

      stopTimer: () => set({ isRunning: false }),

      resetExam: () =>
        set({
          attemptId: null,
          examId: null,
          currentSectionIndex: 0,
          answers: {},
          timeRemainingSeconds: 0,
          isRunning: false,
          completedSections: [],
          lastTimerSectionIndex: null,
        }),
    }),
    {
      name: 'evora-exam-attempt-store',
    }
  )
);

