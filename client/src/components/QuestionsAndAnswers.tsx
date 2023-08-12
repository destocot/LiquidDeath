import React, { useState } from 'react';
// import './QuestionsAndAnswers.css';
import './QARAWTEMPCSS.css';
import Search from './Questions-Answers/Search';
import ExpandAndAdd from './Questions-Answers/ExpandAndAdd';
import QuestionList from './Questions-Answers/QuestionList';

function QuestionsAndAnswers({ currProductId, currProductName }) {
  const [displayMore, setDisplayMore] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(2);
  const [query, setQuery] = useState('');

  // I WILL HAVE TO GET THE PRODUCT ID HERE
    // AND PASS THE PRODUCT ID TO QUESTIONLIST
    // console.log('khurram', currProductId);

  // I WILL HAVE TO GET THE PRODUCT NAME HERE
    // AND PASS THE PRODUCT NAME TO EXPANDANDADD
    // console.log('khurram', currProductName);

  return (
    <div className="qa-main-container">
      <h2 id="qa-main-title">QUESTIONS & ANSWERS</h2>
      <Search setQuery={setQuery} />
      <QuestionList
      setDisplayMore={setDisplayMore}
      numOfQuestions={numOfQuestions}
      query={query}
      currProductId={currProductId} />
      <ExpandAndAdd
      displayMore={displayMore}
      setNumOfQuestions={setNumOfQuestions}
      currProductName={currProductName}
      currProductId={currProductId}
      />
    </div>
  );
}

export default QuestionsAndAnswers;