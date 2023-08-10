import React from 'react';
import './QuestionsAndAnswers.css';
import Search from './Questions-Answers/Search';

function QuestionsAndAnswers() {
  return (
    <div className="q-and-a-container">
      <div>QUESTIONS & ANSWERS</div>
      <Search />
      <div>QUESTIONS AND ANSWERS COMPONENT</div>
      <div>EXPAND QUESTIONS / ADD QUESTIONS COMPONENT</div>
    </div>
  );
}

export default QuestionsAndAnswers;
