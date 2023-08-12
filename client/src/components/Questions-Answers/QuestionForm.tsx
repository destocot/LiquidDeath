import React from 'react';
import './QuestionFormStyles.css';

function QuestionForm() {

  // prevents form from being submitted on enter
  const form = document.getElementById('question-form');
  form?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  })

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);
  }

  return (
    <div id="question-form-container">
      <div id="question-form-subcontainer">
        <h2>Ask Your Question</h2>
        <h3>About the [Product Name Here]</h3>
        <form id="question-form" onSubmit={(e) => submitHandler(e)}>
          <label>Your Question<br />
            <textarea maxLength="1000" rows="3" value="does this run large?" required /></label>
          <label>Name<br />
            <input type="text" maxLength="60" placeholder="Example: jackson11!" value="fake jack" required /></label>
          <label >E-mail<br />
            <input type="email" maxLength="60" placeholder="jack@email.com" value="jack@email.com" required /></label>
          <input id="q-submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;
