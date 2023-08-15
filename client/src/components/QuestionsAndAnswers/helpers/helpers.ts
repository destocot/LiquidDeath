// here lies the helpers

const compare = (identifier) =>
  (a, b) => {
    if (a[identifier] < b[identifier]) {
      return 1;
    }
    if (a[identifier] > b[identifier]) {
      return -1;
    }
    return 0;
  };

  const sortSellers = (sortedAnswers) => {
    const Sellers = sortedAnswers.filter(answer => answer.answerer_name === 'Seller');
    const nonSellers = sortedAnswers.filter(answer => answer.answerer_name !== 'Seller');

    return Sellers.concat(nonSellers);
  }

const expandAnswers = (answersDatabase, setAnswers, shouldExpand) => {
  if (shouldExpand) {
    setAnswers(answersDatabase);
  } else {
    setAnswers(answersDatabase.slice(0, 2));
  }
  return !shouldExpand;
};

// const expand = (getter, setter) => {
//   setter([getter[0] + 2, getter[1]]);
//   return getter[0] + 2 >= getter[1];
// };

// const collapse = (setter, reset) => {
//   setter((state) => [reset, state[1]]);
//   return true;
// };

// const search = (questionsDatabase, query) =>
//   questionsDatabase
//     .filter(question =>
//       question.question_body.includes(query));

// export default { compare, expand, collapse, search, expandAnswers, sortSellers };
export default { expandAnswers, compare, sortSellers };
