import useBestCombination from "./useBestCombination";
const USDollar = new Intl.NumberFormat("en-US", {});
function BestCombination({ potentialStudents, totalHours }) {
  const bestCombination = useBestCombination(potentialStudents, totalHours);
  return (
    <><div className="flex-container best-combination">
      {bestCombination && bestCombination.possibleCombination.length >= 1 ? (
        <>
          <h2>Max Earning Potential</h2>
          <p>
            Max Earnings of ${USDollar.format(bestCombination.possibleEarnings)}{" "}
            with{" "}
            {bestCombination.possibleCombination.map((student, index) => (
              <span key={index}>
                {index + 1 !== bestCombination.possibleCombination.length
                  ? `${student.name}, `
                  : bestCombination.possibleCombination.length === 1
                  ? `${student.name}.`
                  : `and ${student.name}.`}
              </span>
            ))}
          </p>
        </>
      ) : (
        <p>There are no students that require less than {totalHours}hrs.</p>
      )}</div>
    </>
  );
}

export default BestCombination;
