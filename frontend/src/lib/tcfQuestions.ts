export interface TcfQuestionData {
  id: number;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  points: number;
  sectionTitle: string;
  posterText: string;
  questionText: string;
  options: string[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  seriesId?: number;
}

export interface TcfWrittenTaskData {
  id: number;
  seriesId: number;
  taskNumber: 1 | 2 | 3;
  difficulty: 'A1-A2' | 'B1-B2' | 'C1-C2';
  minWords: number;
  maxWords: number;
  points: number;
  title: string;
  prompt: string;
  contextAdvice: string;
}

export interface TcfOralTaskData {
  id: number;
  seriesId: number;
  taskNumber: 1 | 2 | 3;
  difficulty: 'A1-A2' | 'B1-B2' | 'C1-C2';
  minDurationSec: number;
  maxDurationSec: number;
  points: number;
  title: string;
  prompt: string;
  contextAdvice: string;
}

import bulkReadingQuestions from './reading_questions.json';

// Generate 39 high-quality progressive TCF Reading questions
export const readingQuestions: TcfQuestionData[] = bulkReadingQuestions as TcfQuestionData[];

import bulkListeningQuestions from './listening_questions.json';

// High-quality progressive TCF Listening questions
export const listeningQuestions: TcfQuestionData[] = bulkListeningQuestions as TcfQuestionData[];

import bulkWrittenTasks from './written_tasks.json';

// High-fidelity Written Tasks (Tasks 1, 2, and 3) specifically for the Writing Practice Simulator
export const writtenTasks: TcfWrittenTaskData[] = bulkWrittenTasks as TcfWrittenTaskData[];

import bulkOralTasks from './oral_tasks.json';

// High-fidelity Oral Tasks (Tasks 1, 2, and 3) specifically for the Speaking Practice Simulator
export const oralTasks: TcfOralTaskData[] = bulkOralTasks as TcfOralTaskData[];

