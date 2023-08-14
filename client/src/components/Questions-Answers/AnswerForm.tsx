import React from 'react';
import './QuestionFormStyles.css';
import axios from 'axios';

function AnswerForm({ setAForm, currProductName, questionBody, questionId }) {

  // prevents form from being submitted on enter
  const checkKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const body = e.target.body.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const question_id = questionId;
    sendAnswer(question_id, { body, name, email });
    // console.log({ body, name, email, question_id });
    close();
  }

  const sendAnswer = (question_id, data) => {
    axios.post(`/qa/questions/${question_id}/answers`, data)
      .catch(() => console.log('error posting question'));
  }

  const close = () => {
    setAForm(false);
  }

  return (
    <div id="answer-form-container">
      <div id="answer-form-subcontainer">
        <div id="answer-form-title">
          <h2>Submit your Answer</h2>
          <i onClick={() => close()} className="fa-solid fa-x fa-xl" style={{ color: "#ff007b" }} />
        </div>
        <h3>{currProductName}:</h3>
        <h3>{questionBody}</h3>
        <form id="answer-form" onSubmit={(e) => submitHandler(e)} onKeyDown={(e) => checkKeyDown(e)}>
          <label>Answer<br />
            <textarea maxLength="1000" rows="3" defaultValue="Woah!" name="body" required /></label>
          <label>Name<br />
            <input type="text" maxLength="60" placeholder="Example: jackson543!" name="name" defaultValue="Crash" required /></label>
          <label >E-mail<br />
            <input type="email" maxLength="60" placeholder="jack@email.com" defaultValue="cbandicoot@aol.com" name="email" required /></label>
          <label >Upload your photos<br />
            <input type="file" name="photos" disabled /></label>
          <input id="a-submit-btn" type="submit" />
        </form>
      </div>
    </div >
  )
};

export default AnswerForm;