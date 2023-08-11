import React, { useState } from 'react';
import axios from 'axios';
import Answer from './Answer';
// import utils from './Helpers/helpers';

function Question({ question }) {
  const [answersDatabase, setAnswersDatabase] = useState([]);

  // const [numOfAns, setNumOfAns] = React.useState(2);
  // const [maxLen, setMaxLen] = React.useState(0);
  // const [loadAns, setLoadAns] = React.useState(true);
  // const [helpfulness, setHelpfulness] = useState([question.question_helpfulness, false]);

  const [answers, setAnswers] = useState([]);

  const answersFetcher = () => {
    axios.get(`/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        setAnswersDatabase(res.data);
        setAnswers(res.data);
      })
      .catch(() => {
        console.log('err obtaining answers');
      });
  };

  React.useEffect(() => {
    answersFetcher();
  }, []);

  // React.useEffect(() => {
  //   setAnswersList(answersDatabase.slice(0, numOfAns));
  // }, [numOfAns]);

  // const add2 = () => {
  //   setNumOfAns(numOfAns + 2);
  //   if (numOfAns + 2 >= maxLen) {
  //     setLoadAns(false);
  //   }
  // };

  // const collapse = () => {
  //   setNumOfAns(2);
  //   setLoadAns(true);
  // };

  // const addHelpfulness = () => {
  //   if (!helpfulness[1]) {
  //     setHelpfulness([helpfulness[0] + 1, true]);
  //   }
  // };

  const addAnswerModule = () => {
    console.log('ADD ANSWER FORM HERE');
  };


  return (
    <div className="question-container">
      <div className="question-title-container">
        <div>
          {`Q: ${question.question_body}`}
        </div>
        <div>
          {'Helpful? '}
          {/* <button type="button" id="question-yes" onClick={() => addHelpfulness()} onKeyDown={() => addHelpfulness()}>Yes</button> */}
          {/* {` (${helpfulness[0]}) | `} */}
          {/* <button type="button" id="add-answer-btn" onClick={() => addAnswerModule()} onKeyDown={() => addAnswerModule()}>Add Answer</button> */}
        </div>
      </div>
      {
        answers.map((answer) => <Answer answer={answer} key={answer.answer_id} />)
      }
      {
        // loadAns && <button type="button" onClick={() => add2()}>LOAD MORE ANSWERS</button>
      }
      {
        // !loadAns && <button type="button" onClick={() => collapse()}>COLLAPSE ANSWERS</button>
      }
    </div>
  );
}

export default Question;
