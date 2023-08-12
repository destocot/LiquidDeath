import React from 'react';
import './QuestionFormStyles.css';
import axios from 'axios';

function QuestionForm({ setQForm }) {

  // prevents form from being submitted on enter
  const form = document.getElementById('question-form');
  form?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  })

  const submitHandler = (e) => {
    e.preventDefault();
    const body = e.target.body.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    // // hard coded for product_id 37340
    const product_id = 37340;
    sendQuestion({ body, name, email, product_id });
    close();
    // console.log({ body, name, email, product_id });
  }

  const sendQuestion = (data) => {
    axios.post('/qa/questions', data)
      .then(() => console.log('post succ'))
      .catch(() => console.log('post errr'));
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
        <h3>About the [Product Name Here]</h3>
        <form id="question-form" onSubmit={(e) => submitHandler(e)}>
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
