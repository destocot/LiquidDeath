import React from 'react';
import './app.css';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import Overview from './components/Overview';
import ReviewsRatings from './components/Reviews-Ratings/ReviewsRatings';

// nothing special here
function App() {
  return (
    <div>
      <Overview />
      <ReviewsRatings />
      <QuestionsAndAnswers />
      <h1>Jon Component</h1>
    </div>
  );
}

export default App;
