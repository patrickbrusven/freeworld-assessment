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
