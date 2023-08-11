import React, { useState } from 'react';
import './QuestionsAndAnswers.css';
// import Search from './Questions-Answers/Search';
import QandA from './Questions-Answers/QandA';
// import ExpandAndAdd from './Questions-Answers/ExpandAndAdd';
import myData from './Questions-Answers/Helpers/fakeData';

function QuestionsAndAnswers() {
  const [fakeData, setFakeData] = useState(myData.fakeData);

  return (
    <div className="qa-main-container">
      <div>QUESTIONS & ANSWERS</div>
      <div>SEARCH COMPONENT HIDDEN</div>
      {/* <Search /> */}
      <QandA fakeData={fakeData} />
      {/* <ExpandAndAdd /> */}
      <div>EXPAND AND ADD COMPONENT HIDDEN</div>
    </div>
  );
}

export default QuestionsAndAnswers;
