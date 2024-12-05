import { Question } from './question';

export interface Import {
  id: string;
  url: string;
  status: 'waiting' | 'running' | 'success' | 'error';
  message?: string;
  questions: string[];
  totalQuestions: number;
  expand?: {
    questions: Question[];
  };
}
