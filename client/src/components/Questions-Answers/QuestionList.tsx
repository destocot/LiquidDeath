import React, { useState, useEffect } from 'react';
import axios from 'axios';
import utils from './Helpers/helpers';
import Question from './Question';

function QuestionList({ setDisplayMore, numOfQuestions, query }) {
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [khurramsQuestions, setKhurramsQuestions] = useState([]);

  useEffect(() => {
    axios.get('/qa/questions')
      .then((res) => res.data.results.sort(utils.compare('question_helpfulness')))
      .then((sorted) => {
        setQuestionsDatabase(sorted);
        setKhurramsQuestions(sorted.slice(0, numOfQuestions));
        setDisplayMore(sorted.length > 2);
      })
  }, []);

  useEffect(() => {
    setKhurramsQuestions(questionsDatabase.slice(0, numOfQuestions))
    if (numOfQuestions >= questionsDatabase.length) {
      setDisplayMore(false);
    }
  }, [numOfQuestions])

  useEffect(() => {
    if (query.length > 2) {
      setKhurramsQuestions(questionsDatabase.filter((q: any) => q.question_body.includes(query)));
      setDisplayMore(false);
    } else {
      setKhurramsQuestions(questionsDatabase.slice(0, numOfQuestions))
      if (numOfQuestions >= questionsDatabase.length) {
        setDisplayMore(false)
      } else {
        setDisplayMore(true)
      }
    }
  }, [query])

  return (
    <div className="questions-container">
      { // remove index later
        khurramsQuestions.map((question, index) => (<Question question={question} key={index} />))
      }
    </div>
  );
}

export default QuestionList;
