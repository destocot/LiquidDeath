import React, { useState } from 'react';
import utils from './Helpers/helpers';

// currently all expanding / collapse behavior pulls from local database
function ExpandAndAdd({ questionsDatabase, setQuestions, numOfQuestions, setNumOfQuestions }) {
  const [more, setMore] = useState(true);

  const addQuestionModule = () => {
    console.log('ADD QUESTION FORM HERE');
  };

  const expandOrCollapse = () => {
    if (more) {
      // setMore(!utils.expand(numOfQuestions, setNumOfQuestions));
      setQuestions(questionsDatabase);
      setMore(false);
    } else {
      // setMore(utils.collapse(setNumOfQuestions, 4));
      setQuestions(questionsDatabase.slice(0, 4));
      setMore(true);
    }
  };

  const expandOrCollapseButtons = () => {
    if (questionsDatabase.length > 4) {
      if (more) {
        return <button className="expand-questions-btn" type="button" onClick={expandOrCollapse}>MORE ANSWERED QUESTIONS</button>;
      }
      return <button className="expand-questions-btn" type="button" onClick={expandOrCollapse}>COLLAPSE QUESTIONS</button>;
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
