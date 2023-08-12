import React, { useState } from 'react';
// import './QuestionsAndAnswers.css';
import './QARAWTEMPCSS.css';
import Search from './Questions-Answers/Search';
import ExpandAndAdd from './Questions-Answers/ExpandAndAdd';
import QuestionList from './Questions-Answers/QuestionList';

function QuestionsAndAnswers() {
  const [displayMore, setDisplayMore] = useState(false);
  const [numOfQuestions, setNumOfQuestions] = useState(2);
  const [query, setQuery] = useState('');

  // I WILL HAVE TO GET THE PRODUCT ID HERE
    // AND PASS THE PRODUCT ID TO QUESTIONLIST

  // I WILL HAVE TO GET THE PRODUCT NAME HERE
    // AND PASS THE PRODUCT NAME TO EXPANDANDADD

  return (
    <div className="qa-main-container">
      <h2 id="qa-main-title">QUESTIONS & ANSWERS</h2>
      <Search setQuery={setQuery} />
      <QuestionList setDisplayMore={setDisplayMore} numOfQuestions={numOfQuestions} query={query} />
      <ExpandAndAdd
      displayMore={displayMore}
      setNumOfQuestions={setNumOfQuestions}
      />
    </div>
  );
}

export default QuestionsAndAnswers;