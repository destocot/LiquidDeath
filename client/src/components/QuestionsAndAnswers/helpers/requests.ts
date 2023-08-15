import axios from 'axios';

const markQuestionHelpful = (questionId) => {
  axios.put(`qa/questions/${questionId}/helpful`)
    .catch(() => console.log('err marking question helpful'));
}

const reportQuestion = (answerId) => {
  axios.put(`qa/answers/${answerId}/report`)
    .catch(() => console.log('err reporting question'));
}

const markAnswerHelpful = (answerId) => {
  axios.put(`qa/answers/${answerId}/helpful`)
    .catch(() => console.log('err marking answer helpful'));
}

const reportAnswer = (answerId) => {
  axios.put(`qa/answers/${answerId}/report`)
    .catch(() => console.log('err reporting answer'));
}

export default { markQuestionHelpful, reportQuestion, markAnswerHelpful, reportAnswer };