import React from 'react';
import QuestionForm from './QuestionForm';

function ExpandAndAdd({ setMoreQuestions, displayMore, currProductName, currProductId }) {
  const expandOrCollapse = () => {
    setMoreQuestions(true);
  };

  const expandOrCollapseButtons = () => {
    if (displayMore) {
      return <button id="expand-questions-btn" type="button" onClick={expandOrCollapse}>MORE ANSWERED QUESTIONS</button>;
    }
  };

  return (
    <div className="ExpandAndAdd-container">
      {
        expandOrCollapseButtons()
      }
      <QuestionForm currProductName={currProductName} currProductId={currProductId} />
    </div>
  );
}

export default ExpandAndAdd;
