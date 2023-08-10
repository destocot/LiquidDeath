import React from 'react';
import './QuestionsAndAnswers.css';
import Search from './Questions-Answers/Search';
import QandA from './Questions-Answers/QandA';

function QuestionsAndAnswers() {
  return (
    <div className="main-QandA-container">
      <div>QUESTIONS & ANSWERS</div>
      <Search />
      <QandA />
      <div>EXPAND QUESTIONS / ADD QUESTIONS COMPONENT</div>
    </div>
  );
}

export default QuestionsAndAnswers;
