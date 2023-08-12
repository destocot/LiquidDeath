const express = require('express');

const router = express.Router();

const utils = require('../helpers/qanda-helpers');

// Get Questions
router.get('/', (req, res) => {
  utils.questionsFetcher()
    .then((questions) => {
      res.status(200).send(questions.data);
    })
    .catch(() => {
      res.status(400).send();
    });
});

// Get Answers
router.get('/:questionId/answers', (req, res) => {
  utils.answersFetcher(req.params.questionId)
    .then((answers) => {
      res.status(200).send(answers.data.results);
    })
    .catch(() => {
      res.status(400).send();
    });
});

// Post Questions
router.post('/', (req, res) => {
  utils.questionsPoster(req.body)
  .then(() => {
    res.status(200).send('POST SUCCESSFUL');
  })
  .catch(() => {
    res.status(400).send();
  });
});

module.exports = router;
