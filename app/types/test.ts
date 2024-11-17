import { Subject } from './Subject';
import { Answer, Question } from './question';

export interface Test {
  id: string;
  user: string;
  questions: string[];
  practice: boolean;
  excludeFromStatistics: boolean;
  subject: string;
  finishedAt: string;
  expand?: {
    subject: Subject;
    user: User;
    questions?: PocketBaseRecord<Question>[];
    answers?: Answer[];
    [key: string]: any;
  };
}
