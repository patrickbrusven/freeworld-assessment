import useBestCombination from "./useBestCombination";

function BestCombination({ potentialStudents, totalHours }) {
  const bestCombination = useBestCombination(potentialStudents, totalHours);
  return (
    <>
      {bestCombination && (
        <div className="flex-container best-combination">
          <h2>Max Earning Potential</h2>
          <p>
            Max Earnings of ${bestCombination.possibleEarnings} with{" "}
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
        </div>
      )}
    </>
  );
}

export default BestCombination;
