// efficient produce powerset with generator function
function* subsets(array, offset = 1) {
  while (offset < array.length) {
    let first = array[offset++];
    for (let subset of subsets(array, offset)) {
      subset.push(first);
      yield subset;
    }
  }
  yield [];
}

// inefficient produce powerset
const getAllSubsets = (arr) =>
  arr.reduce(
    (subsets, value) => subsets.concat(subsets.map((set) => [value, ...set])),
    [[]]
  );

// serialize subsets with toatals
function totalSubsetsEarningsAndHours(powerSet, dataSet) {
  return powerSet.map((combo) => {
    const totalHours = dataSet.reduce((total, student) => {
      if (combo.includes(student.name)) {
        return (total += student.hours);
      } else {
        return total;
      }
    }, 0);
    const totalEarnings = dataSet.reduce((total, student) => {
      if (combo.includes(student.name)) {
        return (total += student.earnings);
      } else {
        return total;
      }
    }, 0);

    return {
      possibleCombination: combo,
      possibleEarnings: totalEarnings,
      totalHours: totalHours,
    };
  });
}

function useBestCombination(potentialStudents, totalHours) {
  const flattenArrayByName = potentialStudents.map((student) => student.name);
  const powerSetArrayByNames = getAllSubsets(flattenArrayByName);
  const powerSetWithTotals = totalSubsetsEarningsAndHours(
    powerSetArrayByNames,
    potentialStudents
  );
  const sortedData = powerSetWithTotals.sort((s1, s2) =>
    s1.totalEarings > s2.totalEarings
      ? 1
      : s1.totalEarings < s2.totalEarings
      ? -1
      : 0
  );

  const bestCombination = sortedData
    .reverse()
    .find((subset) => subset.totalHours <= totalHours);
  return bestCombination;
}

export default useBestCombination;
