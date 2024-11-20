import { Question } from './question';

export interface SubSubject {
  id: string;
  name: string;
  questions: string[];
  expand: {
    questions: Question[];
    [key: string]: any;
  };
}

export interface Subject {
  id: string;
  name: string;
  sub_subjects: string[];
  expand: {
    sub_subjects: SubSubject[];
    [key: string]: any;
  };
}
