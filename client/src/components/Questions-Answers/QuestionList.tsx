import React, { useState, useEffect } from 'react';
import axios from 'axios';
import utils from './helpers/helpers';
import Question from './Question';

function QuestionList({ setDisplayMore, numOfQuestions, query, currProductId, currProductName }) {
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('/qa/questions', { params: { currProductId } })
      .then((res) => {
        return res.data.results.sort(utils.compare('question_helpfulness'))
      })
      .then((sorted) => {
        setQuestionsDatabase(sorted);
        setQuestions(sorted.slice(0, numOfQuestions));
        setDisplayMore(sorted.length > 2);
      })
      .catch(() => console.log('error fetching questions', currProductId));
  }, [currProductId]);

  useEffect(() => {
    setQuestions(questionsDatabase.slice(0, numOfQuestions))
    if (numOfQuestions >= questionsDatabase.length) {
      setDisplayMore(false);
    }
  }, [numOfQuestions, query])

  useEffect(() => {
    if (query.length > 2) {
      setQuestions(questionsDatabase.filter((q: any) => q.question_body.includes(query)));
      setDisplayMore(false);
    } else {
      setQuestions(questionsDatabase.slice(0, numOfQuestions))
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
        questions.map((question) => (<Question question={question} key={question.question_id} currProductName={currProductName} />))
      }
    </div>
  );
}

export default QuestionList;
