import { SubSubject } from './Subject';
import { Import } from './imports';
import { Test } from './test';

export interface ChoiceAnswer {
  answer: string;
  isCorrect: boolean;
}
interface NumberAnswer {
  minAllowed: number;
  maxAllowed: number;
}

interface ChoiceQuestion {
  answers: ChoiceAnswer[];
  questionType: 'choice';
}

interface NumberQuestion {
  answers: NumberAnswer;
  questionType: 'number';
}

export type Question = (ChoiceQuestion | NumberQuestion) & {
  id: string;
  title: string;
  name: string;
  lmsQuestionPool: string;
  image: string;
  subSubject: string;
  subject: string;
  expand?: {
    [key: string]: any;
    subSubject?: SubSubject;
  };
};

export interface Answer {
  id: string;
  user: string;
  question: string;
  test: string;
  selectedAnswer: number;
  numberAnswer: number;
  isCorrect: boolean;
  expand?: {
    question?: Question;
    test?: Test;
    imports_via_question: Import[];
  };
}
