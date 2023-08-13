import React, { useState } from 'react';
import requests from './helpers/requests';

function Answer({ answer }) {
  const { body, answerer_name, date } = answer;
  const newDate = new Date(date);
  const formatDate = `${newDate.toLocaleString('default', { month: 'long' })} ${newDate.getDate() + 1}, ${newDate.getFullYear()}`;

  const [helpfulness, setHelpfulness] = useState([answer.helpfulness, false]);
  const [report, setReport] = useState(['Report', false]);

  const addHelpfulness = () => {
    if (!helpfulness[1]) {
      setHelpfulness([helpfulness[0] + 1, true]);
      requests.markAnswerHelpful(answer.answer_id);
    }
  };

  const reportFunction = () => {
    if (!report[1]) {
      setReport(['Reported', true]);
      requests.reportAnswer(answer.answer_id);
    }
  };

  const usernameCheck = () => {
    if (answerer_name === 'Seller') {
      return <span className='user-seller'>{answerer_name}</span>
    }
    return <span>{answerer_name}</span>
  }

  return (
    <div className="answer-container">
      <div className="answer-body">{`A: ${body}`}</div>
      <div className="answer-info">
        {'by '}
        {usernameCheck()}
        {`, ${formatDate} | Helpful? `}
        <button type="button" id="answer-yes" onClick={() => addHelpfulness()} onKeyDown={() => addHelpfulness()}>Yes</button>
        {` (${helpfulness[0]}) | `}
        <button type="button" id="report-btn" onClick={() => reportFunction()} onKeyDown={() => reportFunction()}>{report[0]}</button>
      </div>
    </div>

  );
}

export default Answer;
