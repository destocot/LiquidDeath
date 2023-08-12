import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
// currently all expanding / collapse behavior pulls from local database
function ExpandAndAdd({ setNumOfQuestions, displayMore }) {
  const [qForm, setQForm] = useState(true);

  const addQuestionModule = () => {
    console.log('ADD QUESTION FORM HERE');
    setQForm(true);
  };

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
      <button className="expand-questions-btn" type="button" onClick={() => addQuestionModule()}>
        {'ADD A QUESTION '}
        <i className="fa-solid fa-plus" />
      </button>
      {
        qForm && <QuestionForm />
      }
    </div>
  );
}

export default ExpandAndAdd;
