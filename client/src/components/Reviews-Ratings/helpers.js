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
  sortRelevance: (a, b) => {
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
};