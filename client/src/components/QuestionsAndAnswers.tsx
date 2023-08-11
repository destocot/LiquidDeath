import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionsAndAnswers.css';
import QuestionList from './Questions-Answers/QuestionList';

function QuestionsAndAnswers() {
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [questions, setQuestions] = useState([]);

  const realQuestionsFetcher = () => {
    axios.get('/qa/questions')
      .then((res) => {
        setQuestionsDatabase(res.data.results); // this will be used to filter
        setQuestions(res.data.results); // this will be what it displayed
      })
      .catch(() => console.log('err obtaining questions'));
  };

  useEffect(() => {
    realQuestionsFetcher();
  }, []);

  return (
    <div className="qa-main-container">
      <div>QUESTIONS & ANSWERS</div>
      <div>SEARCH COMPONENT HIDDEN</div>
      {/* <Search filterQs={filterQs} /> */}
      <QuestionList questions={questions} />
      {/* <ExpandAndAdd add2={add2} collapse={collapse} loadQuestions={loadQuestions} /> */}
      <div>EXPAND AND ADD COMPONENT HIDDEN</div>
    </div>
  );
}

export default QuestionsAndAnswers;

// IGNORANCE IS BLISS

// import Search from './Questions-Answers/Search';
// import ExpandAndAdd from './Questions-Answers/ExpandAndAdd';
// import utils from './Questions-Answers/Helpers/helpers';

// const [numOfQuestions, setNumOfQuestions] = useState(4);
// const [loadQuestions, setLoadQuestions] = React.useState(true);

  // const add2 = () => {
  //   setNumOfQuestions(numOfQuestions + 2);
  //   if (numOfQuestions + 2 >= A) {
  //     setLoadQuestions(false);
  //   }
  // };

  // const collapse = () => {
  //   setNumOfQuestions(4);
  //   setLoadQuestions(true);
  // };

  // const filterQs = (query) => {
  //   // only checks question edit for answers later
  //   // try to reset search to 4 at a time;
  //   // const filtered = listOfQuestions.filter(question => question.question_body.toLowerCase().includes(query.toLowerCase()));
  //   const filtered = questionsDatabase.filter(question => question.question_body.toLowerCase().includes(query.toLowerCase()));

  //   if (query.length >= 3) {
  //     setRealData(filtered);
  //     // setFakeData(filtered);
  //   } else {
  //     // setFakeData(listOfQuestions);
  //     setRealData(listOfQuestions);
  //   }
  // };



