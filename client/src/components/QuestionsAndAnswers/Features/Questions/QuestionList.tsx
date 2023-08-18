import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import axios from 'axios';
import utils from '../../helpers/helpers';
import Question from './Question';

interface QuestionListProps {
  setDisplayMore: Dispatch<SetStateAction<boolean>>;
  query: string;
  currProductId: number;
  currProductName: string;
  moreQuestions: boolean
}

function QuestionList({ setDisplayMore, query, currProductId, currProductName, moreQuestions }: QuestionListProps) {
  const [questionsDatabase, setQuestionsDatabase] = useState([]);
  const [questions, setQuestions] = useState([]);

  const questionsFetcher = async () => {
    await axios.get('/qa/questions', { params: { currProductId } })
      .then((res) => {
        return res.data.results.sort(utils.compare('question_helpfulness'))
      })
      .then((sorted) => {
        setQuestionsDatabase(sorted);
        setQuestions(sorted.slice(0, 2));
        setDisplayMore(sorted.length > 2);
      })
      .catch(() => console.log('error fetching questions', currProductId));
  }

  useEffect(() => {
    questionsFetcher();
  }, [currProductId]);

  useEffect(() => {
    setQuestions(questionsDatabase);
    setDisplayMore(false);
  }, [moreQuestions])

  useEffect(() => {
    if (query.length >= 3) {
      setQuestions(questionsDatabase.filter((q: any) => {
        const answerHasQuery = Object.values(q.answers)
          .map((answer: any) => answer.body)
          .filter(body => body.toLowerCase().includes(query.toLowerCase())).length;

        if (q.question_body.toLowerCase().includes(query.toLowerCase()) || answerHasQuery) {
          if (q.question_body.toLowerCase().includes(query.toLowerCase())) {
            const qIDX = q.question_body.toLowerCase().indexOf(query.toLowerCase());
            q.question_body2 = utils.highlighter(q.question_body, qIDX, query.length);
          }
          return true;
        }
      }));
      setDisplayMore(false);
    } else {
      questionsFetcher();
    }
  }, [query])

  return (
    <div className="questions-container">
      {
        questions.map((question: any) => (<Question question={question} key={question.question_id} currProductName={currProductName}
          query={query} />))
      }
    </div>
  );
}

export default QuestionList;
