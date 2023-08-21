// @ts-nocheck
import React from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';

function QuestionForm({ currProductName, currProductId }) {
  const submitHandler = (e) => {
    e.preventDefault();
    const body = e.target.body.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const product_id = currProductId;
    sendQuestion({ body, name, email, product_id });
  }

  const sendQuestion = (data) => {
    axios.post('/qa/questions', data)
      .catch(() => console.log('error posting question'));
  }
  return (
    <Popup Popup trigger={<button data-testid="add-questions-btn" id="add-questions-btn" > ADD A QUESTION < i className="fa-solid fa-plus" /> </button >} modal >
      {(close) => (
        <div className="popup-modal-container">
          <div className="modal">
            <div className="flex flex-col mb-3 border-b-[black] border-b border-solid">
              <div className="flex justify-between items-center relative ">
                <div className="text-[1.5em]">Ask Your Question</div>
                <i
                  className="fa-regular fa-circle-xmark fa-2xl cursor-pointer absolute z-2 top-[-20px] right-[-20px] bg-white leading-5 text-[24px] hover:leading-6 hover:text-[32px]"
                  onClick={close}
                />
              </div>
              <div className="text-[1.17em]">About the {currProductName}</div>
            </div>

            <form
              className="flex flex-col justify-around h-[40vh] text-base p-2"
              onSubmit={(e) => { submitHandler(e); close(); }}
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}>
              <label>Your Question*<br />
                <textarea
                  className="w-full border-2 p-1"
                  maxLength="1000"
                  rows="3"
                  name="body"
                  required /></label>
              <div>
                <label>Name*<br />
                  <input
                    className="w-full border-2 p-1"
                    type="text"
                    maxLength="60"
                    placeholder="Example: jackson11!"
                    name="name"
                    required /></label>
                <h6 className="text-[#ff6700] italic">For privacy reasons, do not use your full name or email address</h6>
              </div>
              <div>
                <label >E-mail*<br />
                  <input
                    className="w-full border-2 p-1"
                    type="email"
                    maxLength="60"
                    placeholder="jack@email.com"
                    name="email"
                    required /></label>
                <h6 className="text-[#ff6700] italic">For authentication reasons, you will not be emailed</h6>
              </div>
              <input
                className="border-2 hover:border-[black] cursor-pointer self-center px-6 py-[0.313rem] m-1"
                type="submit" />
              <button className="border hover:border-[black] self-center px-2 py-1" onClick={close}>Close</button>
            </form>
          </div>
        </div >
      )
      }
    </Popup >
  );
}

export default QuestionForm