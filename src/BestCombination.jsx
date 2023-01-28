import useBestCombination from "./useBestCombination";


function BestCombination({ potentialStudents, totalHours }) {
  const bestCombination= useBestCombination(potentialStudents, totalHours)
  return (
    <>
      <h3>Students that have max earning potential for this cohort</h3>
      <ul>
        {bestCombination.possibleCombination.map((studentName, index) => (
          <li key={index}>{studentName}</li>
        ))}
      </ul>
      <p>Max Potential Earnings: ${bestCombination.possibleEarnings}</p>
      <p>Total Hours: {bestCombination.totalHours}</p>
    </>
  );
}

export default BestCombination;
