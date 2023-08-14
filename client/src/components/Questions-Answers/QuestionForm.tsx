import React from 'react';
import './QuestionFormStyles.css';
import axios from 'axios';

function QuestionForm({ setQForm, currProductId, currProductName }) {

  // prevents form from being submitted on enter
  const checkKeyDown = (e) => {
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
    const product_id = currProductId;
    sendQuestion({ body, name, email, product_id });
    close();
    // console.log({ body, name, email, product_id });
  }

  const sendQuestion = (data) => {
    axios.post('/qa/questions', data)
      .catch(() => console.log('error posting question'));
  }

  const close = () => {
    setQForm(false);
  }


  return (
    <div id="question-form-container">
      <div id="question-form-subcontainer">
        <div id="question-form-title">
          <h2>Ask Your Question</h2>
          <i onClick={() => close()} className="fa-solid fa-x fa-xl" style={{ color: "#ff007b" }} />
        </div>
        <h3>About the {currProductName}</h3>
        <form id="question-form" onSubmit={(e) => submitHandler(e)} onKeyDown={(e) => checkKeyDown(e)}>
          <label>Your Question<br />
            <textarea maxLength="1000" rows="3" defaultValue="does this run large?" name="body" required /></label>
          <label>Name<br />
            <input type="text" maxLength="60" placeholder="Example: jackson11!" name="name" defaultValue="fake jack" required /></label>
          <label >E-mail<br />
            <input type="email" maxLength="60" placeholder="jack@email.com" defaultValue="jack@email.com" name="email" required /></label>
          <input id="q-submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;
