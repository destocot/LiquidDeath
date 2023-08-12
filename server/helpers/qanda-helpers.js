const axios = require('axios');

require('dotenv').config();

const base_uri = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe';
axios.defaults.headers.common['Authorization'] = process.env.AUTH;

//  coded for product_id=37324 via App.tsx
const questionsFetcher = (productId) => {
  const uri = `${base_uri}/qa/questions/?product_id=${productId}&page=1&count=100`;
  return axios.get(uri);
};

const answersFetcher = (questionId) => {
  const uri = `${base_uri}/qa/questions/${questionId}/answers`;
  return axios.get(uri);
};

const questionsPoster = (data) => {
  const uri = `${base_uri}/qa/questions/`;
  return axios.post(uri, data);
};

module.exports = {
  questionsFetcher,
  answersFetcher,
  questionsPoster,
};
