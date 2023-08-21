// @ts-nocheck
import React from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import swal from 'sweetalert';

function AnswerForm({ currProductName, questionBody, questionId }) {
  const imageChecker = (e) => {
    const files = e.target.files;
    let imageDiv = document.getElementById('my-images-div');
    let imageInput = document.getElementById('ans-photos');
    imageDiv.innerHTML = '';
    if (files.length > 5) {
      swal({
        title: 'You can only upload up to 5 photos!',
        icon: 'warning',
        buttons: false,
        timer: 1500,
      });
      imageInput.value = '';
    } else {
      for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.addEventListener("load", (event) => {
          const picFile = event.target;
          const div = document.createElement('div');
          div.innerHTML = `<img className="thumbnail" src="${picFile.result}" alt="${picFile.name}" />`;
          imageDiv?.appendChild(div);
        })
        reader.readAsDataURL(files[i])
      }
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const form = document.getElementById('answer-form');
    const formData = new FormData(form);
    sendAnswer(questionId, formData);
  }

  const sendAnswer = (question_id, data) => {
    axios.post(`/qa/questions/${question_id}/answers`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .catch(() => console.log('error posting answer', data));
  }

  return (
    <Popup Popup trigger={<button data-testid="add-answer-btn" id="add-answer-btn" >Add Answer</button >} modal >
      {(close) => (
        <div className="popup-modal-container">
          <div className="modal">
            <div className="flex flex-col mb-3 border-b-[black] border-b border-solid">
              <div className="flex justify-between items-center relative ">
                <div className="text-[1.5em]">Submit your Answer</div>
                <i
                  className="fa-regular fa-circle-xmark fa-2xl cursor-pointer absolute z-2 top-[-20px] right-[-20px] bg-white leading-5 text-[24px] hover:leading-6 hover:text-[32px]"
                  onClick={close}
                />
              </div>
              <div className="text-[1.17em]">{currProductName}</div>
              <div className="text-[1.17em]">{questionBody}</div>
            </div>
            <form
              id="answer-form"
              className="flex flex-col justify-between h-[40vh] text-base p-2"
              onSubmit={(e) => { submitHandler(e); close(); }}
              onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}
              encType="multipart/form-data">
              <label>Answer*<br />
                <textarea
                  className="w-full border-2 p-1" maxLength="1000" rows="2" name="body" required /></label>
              <div>
                <label>Name*<br />
                  <input
                    className="w-full border-2 p-1" type="text" maxLength="60" placeholder="Example: jackson543!" name="name" required /></label>
                <h6 className="text-[#ff6700] italic">For privacy reasons, do not use your full name or email address</h6>
              </div>
              <div>
                <label >E-mail*<br />
                  <input
                    className="w-full border-2 p-1" type="email" maxLength="60" placeholder="jack@email.com" name="email" required /></label>
                <h6 className="text-[#ff6700] italic">For authentication reasons, you will not be emailed</h6></div>
              <label >Upload your photos<br />
                <input id="ans-photos" type="file" name="photos" accept="image/png, image/jpeg" onChange={(e) => imageChecker(e)} multiple /></label>
              <div id="my-images-div"></div>
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

export default AnswerForm