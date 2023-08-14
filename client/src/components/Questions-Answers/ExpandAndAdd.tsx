import React, { useState } from 'react';
import QuestionForm from './QuestionForm';

function ExpandAndAdd({ setNumOfQuestions, displayMore, currProductName, currProductId }) {
  const [qForm, setQForm] = useState(false);

  const expandOrCollapse = () => {
    setNumOfQuestions((state) => state + 2);
  };

  const expandOrCollapseButtons = () => {
    if (displayMore) {
      return <button className="expand-questions-btn" type="button" onClick={expandOrCollapse}>MORE ANSWERED QUESTIONS</button>;
    }
  };

  return (
    <div className="ExpandAndAdd-container">
      {
        expandOrCollapseButtons()
      }
      <button className="expand-questions-btn" type="button" onClick={() => setQForm(true)}>
        {'ADD A QUESTION '}
        <i className="fa-solid fa-plus" />
      </button>
      {
        qForm && <QuestionForm setQForm={setQForm}
        currProductName={currProductName}
        currProductId={currProductId} />
      }
    </div>
  );
}

export default ExpandAndAdd;
