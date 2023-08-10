import React from 'react';
import './QuestionsAndAnswers.css';
import Search from './Questions-Answers/Search';
import QandA from './Questions-Answers/QandA';
import ExpandAndAdd from './Questions-Answers/ExpandAndAdd';

function QuestionsAndAnswers() {
  return (
    <div className="main-QandA-container">
      <div>QUESTIONS & ANSWERS</div>
      <Search />
      <QandA />
      <ExpandAndAdd />
    </div>
  );
}

export default QuestionsAndAnswers;
