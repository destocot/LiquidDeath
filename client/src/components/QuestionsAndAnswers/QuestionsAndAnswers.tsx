import React, { useState } from 'react';
import './QuestionsAndAnswers.styles.css';
import Search from './Features/Search/Search';
import ExpandAndAdd from './Features/ExpandAndAdd/ExpandAndAdd';
import QuestionList from './Features/Questions/QuestionList';

function QuestionsAndAnswers({ currProductId, currProductName }) {
  const [displayMore, setDisplayMore] = useState(false);
  const [query, setQuery] = useState('');
  const [moreQuestions, setMoreQuestions] = useState(false);

  return (
    <div className="qa-main-container">
      <h2 id="qa-main-title" className="h-[5vh] text-[2rem]">QUESTIONS & ANSWERS</h2>
      <Search setQuery={setQuery} />
      <QuestionList
        setDisplayMore={setDisplayMore}
        query={query}
        currProductName={currProductName}
        currProductId={currProductId}
        moreQuestions={moreQuestions} />
      <ExpandAndAdd
        displayMore={displayMore}
        currProductName={currProductName}
        currProductId={currProductId}
        setMoreQuestions={setMoreQuestions}
      />
    </div>
  );
}

export default QuestionsAndAnswers;