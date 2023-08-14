import React, { useState } from 'react';

function AnswerPhoto({ photo, index }) {
  const [fullPhoto, setFullPhoto] = useState(false);

  const close = () => {
    setFullPhoto(false);
  }

  return (
    <div>
      <img className="answer-photo" key={photo.id} alt={`photo${index}`} src={photo.url} onClick={() => setFullPhoto(true)} />
      {
        fullPhoto && <div className="full-answer-photo"><img  alt={`fphoto${index}`} src={photo.url} /> <i onClick={() => close()} className="fa-solid fa-x fa-xl" style={{ color: "#ff007b" }} /> </div>
      }
    </div>
  );
}

export default AnswerPhoto;
