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

import bulkWrittenTasks from './written_tasks.json';

// High-fidelity Written Tasks (Tasks 1, 2, and 3) specifically for the Writing Practice Simulator
export const writtenTasks: TcfWrittenTaskData[] = bulkWrittenTasks as TcfWrittenTaskData[];

import bulkOralTasks from './oral_tasks.json';

// High-fidelity Oral Tasks (Tasks 1, 2, and 3) specifically for the Speaking Practice Simulator
export const oralTasks: TcfOralTaskData[] = bulkOralTasks as TcfOralTaskData[];

// Generate simple mock questions for other sections to allow general robust simulator function
export const generateMockQuestions = (section: 'WRITING' | 'LISTENING' | 'SPEAKING'): TcfQuestionData[] => {
  return Array.from({ length: 39 }, (_, i) => {
    const id = i + 1;
    const diffs: ('A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2')[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const diff = diffs[i % 6];
    const points = i % 2 === 0 ? 5 : 8;
    return {
      id,
      difficulty: diff,
      points,
      sectionTitle: `${section} Section Module Task ${id}`,
      posterText: `TCF Canada ${section} Task Instruction Card [Series ${id}]\n\nCeci est un exemple de consigne officielle de l'épreuve de ${section.toLowerCase()} niveau ${diff}.\n\nTravaillez le vocabulaire et répondez de manière structurée.`,
      questionText: `What is the key objective of TCF ${section} task ${id}?`,
      options: [
        'Demonstrate clear linguistic adaptability',
        'Formulate complex grammatical structures',
        'Answer concisely within the time parameters',
        'All of the above'
      ],
      correctKey: 'D'
    };
  });
};
