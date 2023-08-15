let helpers = {
  reviewScore: (meta) => {
    let totalCount = 0;
    let totalScore = 0;
    for (const [score, count] of Object.entries(meta.ratings)) {
      totalCount += Number(count);
      totalScore += Number(score) * Number(count);
    }
    if (totalCount === 0) {
      return null;
    }
    return { score: totalScore / totalCount, count: totalCount };
  },
}

export default helpers;
