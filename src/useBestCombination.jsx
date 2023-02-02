function* subsets(array, offset = 0) {
  while (offset < array.length) {
    let first = array[offset++];
    for (let subset of subsets(array, offset)) {
      subset.push(first);
      yield subset;
    }
  }
  yield [];
}

/**
 * Find the subset of potential students that produce max earning potential without going over totalHours.
 * @param  {Array} potentialStudents Array of student objects containing name of student, earnings, and hours needed.
 * @param  {Number} totalHours the total hours available not to be exceededl
 * @return {Object} containing: possibleCombination: Array of student subset, possibleEarnings: total potential earnings of subset, totalHours: total instruction hours needed of subset
 */
function useBestCombination(potentialStudents, totalHours) {
  const powerSetWithTotals = [];
  for (let subset of subsets(potentialStudents)) {
    const totals = subset.reduce(
      (totals, student) => {
        totals.totalEarnings += student.earnings;
        totals.totalHours += student.hours;
        return totals;
      },
      { totalEarnings: 0, totalHours: 0 }
    );
    powerSetWithTotals.push({
      possibleCombination: [...subset],
      possibleEarnings: totals.totalEarnings,
      totalHours: totals.totalHours,
    });
  }
  const sortedData = powerSetWithTotals.sort((s1, s2) =>
    s1.possibleEarnings < s2.possibleEarnings
      ? 1
      : s1.possibleEarnings > s2.possibleEarnings
      ? -1
      : 0
  );
  const bestCombination = sortedData.find(
    (subset) => subset.totalHours <= totalHours
  );
  return bestCombination;
}

export default useBestCombination;
