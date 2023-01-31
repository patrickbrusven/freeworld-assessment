import "./Main.scss";
import { useState } from "react";
import EnterConstraints from "./EnterConstraints";
import EnterStudent from "./EnterStudent";
import BestCombination from "./BestCombination";

function App() {
  const [data, setData] = useState(null);
  const [enteringStudents, setEnteringStudents] = useState(false);

  // constraints logic
  const [maxCreditHours, setMaxCreditHours] = useState("");
  const [numOfStudents, setNumOfStudents] = useState("");

  const handleConstraints = (constraints) => {
    setMaxCreditHours(constraints.maxCreditHours);
    setNumOfStudents(constraints.numOfStudents);
    setEnteringStudents(true);
  };

  // enter student data logic
  const [enteredStudents, setEnteredStudents] = useState([]);

  const handleStudent = (student) => {
    setEnteredStudents((current) => {
      const newStudentArray = [...current, student];
      if (newStudentArray.length === parseInt(numOfStudents)) {
        setData(newStudentArray);
        setEnteringStudents(false);
      }
      return newStudentArray;
    });
  };

  return (
    <div className="App">
      <h1 className="app-heading">Optimize Candidate Selection</h1>
      {maxCreditHours && numOfStudents ? (
        <div className="constraints-section">
          <p>Max Credit Hours: {maxCreditHours}</p>
          <p>Total number of Students: {numOfStudents}</p>
        </div>
      ) : (
        <EnterConstraints handleSubmitedConstraints={handleConstraints} />
      )}
      {enteringStudents && (
        <EnterStudent
          handleSubmitedStudent={handleStudent}
          enteredStudents={enteredStudents}
          numOfStudents={numOfStudents}
        />
      )}
      {enteredStudents && enteredStudents.length >= 1 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Students for Consideration</th>
                <th>Earnings Potential</th>
                <th>Instruction Hours Needed</th>
              </tr>
            </thead>
            <tbody>
              {enteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.earnings}</td>
                  <td>{student.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {data && (
        <>
          <BestCombination
            potentialStudents={data}
            totalHours={maxCreditHours}
          />
          <button
            onClick={() => {
              setEnteredStudents([]);
              setData(null);
              setMaxCreditHours("");
              setNumOfStudents("");
              setEnteringStudents(false);
            }}
          >
            Clear Data
          </button>
        </>
      )}
    </div>
  );
}

export default App;
