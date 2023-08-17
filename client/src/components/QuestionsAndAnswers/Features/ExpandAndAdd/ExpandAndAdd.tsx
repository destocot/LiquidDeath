import React, { useState } from 'react';
// import OldQuestionForm from '../Forms/OldQuestionForm';
import '../../qa-styles/ExpandAndAdd.styles.css';

import QuestionForm from './QuestionForm';

function ExpandAndAdd({ setNumOfQuestions, setTriggor, displayMore, currProductName, currProductId }) {
  // const [qForm, setQForm] = useState(false);

  const expandOrCollapse = () => {
    // setNumOfQuestions((state) => state + 2);
    setTriggor(true);
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
      {/* <button id="add-questions-btn" type="button" onClick={() => {
        document.body.style.overflow = 'hidden';
        setQForm(true)
      }}>
        {'ADD A QUESTION '}
        <i className="fa-solid fa-plus" />
      </button> */}
      {/* {
        qForm && <OldQuestionForm setQForm={setQForm}
          currProductName={currProductName}
          currProductId={currProductId} />
      } */}
      <QuestionForm currProductName={currProductName} currProductId={currProductId} />
    </div>
  );
}

export default ExpandAndAdd;
