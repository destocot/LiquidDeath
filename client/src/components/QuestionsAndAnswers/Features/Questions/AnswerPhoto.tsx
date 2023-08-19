// @ts-nocheck
import React from 'react';
import Popup from 'reactjs-popup';

interface AnswerPhotoProps {
  photo: {
    id: number;
    url: string;
  }
}

function AnswerPhoto({ photo }: AnswerPhotoProps) {
  return (
    <Popup Popup trigger={<img className="answer-photo aspect-[3/2] max-h-[80px] object-cover border border-solid border-transparent hover:border-[black] cursor-pointer" key={photo.id} alt={`photo${photo.id}`} src={photo.url} />} modal >
      {(close) => (
        <div className="popup-modal-container">
          <img
            className="max-w-[98vw] max-h-[98vh] absolute top-0 bottom-0 right-0 left-0 m-auto"
            alt={`fphoto${photo.id}`}
            src={photo.url} />
          <i
            className="fa-regular fa-circle-xmark fa-2xl cursor-pointer absolute z-[2] top-[4vh] right-[4vh] hover:text-[36px] text-[30px]"
            onClick={close} />
        </div>
      )
      }
    </Popup >
  );
}

export default AnswerPhoto;
