import React from 'react';
import Question from './Question';

function QuestionList({ questions }) {
  return (
    <div>
      {
        questions.map((question) => (<Question question={question} key={question.question_id} />))
      }
    </div>
  );
}

export default QuestionList;
