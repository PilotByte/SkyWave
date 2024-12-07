import { Database } from '@/lib/supabase/database.types';

type Answer = Database['public']['Tables']['answers']['Row'];
type Question = Database['public']['Tables']['questions']['Row'];

interface Filter {
  name: string;
  description: string;
  value: string;
  getFilterFn: (answers: Answer[]) => (question: Question) => boolean;
}

export const filter: Filter[] = [
  {
    name: 'Not Answered',
    description:
      'Filters out all questions that you have not seen in tests before',
    value: 'not-answered',
    getFilterFn: (answers: Answer[]) => () => {
      return answers?.length === 0 || !answers.some((a) => a.selectedAnswer); // true if there are no answers for this question
    },
  },
  {
    name: 'Has Image',
    value: 'has-image',
    description: 'Allows only questions that have an image attached',
    getFilterFn: () => (question: Question) => {
      return question.image !== null;
    },
  },
  {
    name: 'Mostly answered wrong',
    value: 'wrong-more-than-75',
    description: 'Only questions answered wrong more than 75% of the time',
    getFilterFn: (answers: Answer[]) => () => {
      const wrongAnswers = answers?.filter((a) => !a.isCorrect);
      const wrongPercentage = wrongAnswers.length / answers.length;
      return answers && wrongPercentage > 0.75;
    },
  },

  {
    name: 'Often answered wrong',
    value: 'wrong-less-than-75',
    description:
      'Only questions answered wrong between 50% and 75% of the time',
    getFilterFn: (answers: Answer[]) => () => {
      const wrongAnswers = answers?.filter((a) => !a.isCorrect);
      const wrongPercentage = wrongAnswers.length / answers.length;

      return wrongPercentage <= 0.75 && wrongPercentage > 0.5;
    },
  },
  {
    name: 'Frequently answered wrong',
    value: 'wrong-less-than-50',
    description:
      'Only questions answered wrong between 25% and 50% of the time',
    getFilterFn: (answers: Answer[]) => () => {
      const wrongAnswers = answers?.filter((a) => !a.isCorrect);
      const wrongPercentage = wrongAnswers.length / answers.length;
      return wrongPercentage <= 0.5 && wrongPercentage > 0.25;
    },
  },
  {
    name: 'Rarely answered wrong',
    value: 'wrong-less-than-25',
    description: 'Only questions answered less than 25% of the time',
    getFilterFn: (answers: Answer[]) => (question: Question) => {
      const wrongAnswers = answers?.filter((a) => !a.isCorrect);
      const wrongPercentage = wrongAnswers.length / answers.length;
      return wrongPercentage <= 0.25;
    },
  },
];
