module.exports = {
  sortHelpfulness: (a, b) => {
    const revA = a.helpfulness;
    const revB = b.helpfulness;
    if (revA < revB) {
      return 1;
    }
    if (revA > revB) {
      return -1;
    }
    return 0;
  },
  sortNewest: (a, b) => {
    const revA = a.date;
    const revB = b.date;
    if (revA < revB) {
      return 1;
    }
    if (revA > revB) {
      return -1;
    }
    return 0;
  },
  // I do plan to refactor this to be more concise, but could use insight as to if the method does a good job of weighting a rating's recent-ness vs. it's helpfulness
  sortRelevance: (a, b) => {
    let valA;
    let valB;
    const rateA = a.helpfulness;
    const rateB = b.helpfulness;
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const currentDate = new Date();
    // translate to value of 1 - 5
    const daysFromNowA = (currentDate - dateA) / 86400000;
    const daysFromNowB = (currentDate - dateB) / 86400000;

    if (daysFromNowA <= 90) {
      valA = 5 * rateA;
    } else if (daysFromNowA <= 180) {
      valA = 4 * rateA;
    } else if (daysFromNowA <= 270) {
      valA = 3 * rateA;
    } else if (daysFromNowA <= 360) {
      valA = 2 * rateA;
    } else {
      valB = rateA;
    }

    if (daysFromNowB <= 90) {
      valB = 5 * rateB;
    } else if (daysFromNowB <= 180) {
      valB = 4 * rateB;
    } else if (daysFromNowB <= 270) {
      valB = 3 * rateB;
    } else if (daysFromNowB <= 360) {
      valB = 2 * rateB;
    } else {
      valB = rateB;
    }

    if (valA < valB) {
      return 1;
    }
    if (valA > valB) {
      return -1;
    }
    return 0;
  },
};