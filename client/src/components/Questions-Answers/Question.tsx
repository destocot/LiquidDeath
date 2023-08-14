import React, { useState } from 'react';
import axios from 'axios';
import Answer from './Answer';
import utils from './helpers/helpers';
import requests from './helpers/requests';
import AnswerForm from './AnswerForm';

function Question({ question, currProductName }) {
  const [answersDatabase, setAnswersDatabase] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [more, setMore] = useState(true);
  const [aForm, setAForm] = useState(false);

  const { question_helpfulness } = question;
  const [helpfulness, setHelpfulness] = useState([question_helpfulness, false]);

  React.useEffect(() => {
    axios.get(`/qa/questions/${question.question_id}/answers`)
      .then((res) => res.data.sort(utils.compare('helpfulness')))
      .then((sortedHelpfulness) => utils.sortSellers(sortedHelpfulness))
      .then((sortedSellers) => {
        setAnswersDatabase(sortedSellers);
        setAnswers(sortedSellers.slice(0, 2));
      });
  }, []);

  const expandOrCollapse = () => {
    setMore(utils.expandAnswers(answersDatabase, setAnswers, more));
  };

  const expandOrCollapseButtons = () => {
    if (answersDatabase.length > 2) {
      if (more) {
        return <button className="expand-answers-btn" type="button" onClick={expandOrCollapse}>LOAD MORE ANSWERS</button>
      }
      return <button className="expand-answers-btn" type="button" onClick={expandOrCollapse}>COLLAPSE ANSWERS</button>
    }
  };

  const addHelpfulness = () => {
    if (!helpfulness[1]) {
      setHelpfulness([helpfulness[0] + 1, true]);
      requests.markQuestionHelpful(question.question_id);
    }
  };

  return (
    <div className="question-container">
      <div className="question-title-container">
        <div>
          {`Q: ${question.question_body}`}
        </div>
        <div>
          {'Helpful? '}
          <button type="button" id="question-yes" onClick={() => addHelpfulness()} onKeyDown={() => addHelpfulness()}>Yes</button>
          {` (${helpfulness[0]}) | `}
          <button type="button" id="add-answer-btn" onClick={() => setAForm(true)} onKeyDown={() => addAnswerModule()}>Add Answer</button>
        </div>
      </div>
      <div className="answers-container">
        {
          answers.map((answer: any) => <Answer answer={answer} key={answer.answer_id} />)
        }
        {
          expandOrCollapseButtons()
        }
      </div>
      {
        aForm && <AnswerForm setAForm={setAForm} currProductName={currProductName} questionBody={question.question_body} questionId={question.question_id} />
      }
    </div>
  );
}

export default Question;
