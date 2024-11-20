'use client';

import { ActiveQuestionCard } from '../_components/ActiveQuestionCard';

function TestInProgress() {
  return (
    <div className="my-4">
      <ActiveQuestionCard
        question={'What is the capital of France?'}
        answers={[
          'Paris',
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          'Berlin',
          'Madrid',
        ]}
      />
    </div>
  );
}

export default TestInProgress;
