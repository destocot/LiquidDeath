import React from 'react';
import './app.css';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import ReviewsRatings from './components/Reviews-Ratings/ReviewsRatings';

// nothing special here
function App() {
  return (
    <div>
      <h1>Ben Component</h1>
      <ReviewsRatings />
      <QuestionsAndAnswers />
      <h1>Jon Component</h1>
    </div>
  );
}

export default App;
