import React from 'react';
// currently all expanding / collapse behavior pulls from local database
function ExpandAndAdd({ setNumOfQuestions, displayMore }) {

  const addQuestionModule = () => {
    console.log('ADD QUESTION FORM HERE');
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
    </div>
  );
}

export default ExpandAndAdd;
