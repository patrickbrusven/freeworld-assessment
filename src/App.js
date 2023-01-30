import "./App.css";
import { useState } from "react";
import EnterConstraints from "./EnterConstraints";
import EnterStudent from "./EnterStudent";
import BestCombination from "./BestCombination";
const testData = [
  {
    name: "Jane",
    earnings: 1000,
    hours: 3,
  },
  {
    name: "Bob",
    earnings: 3000,
    hours: 5,
  },
  {
    name: "Mark",
    earnings: 2700,
    hours: 4,
  },
  {
    name: "Jill",
    earnings: 5000,
    hours: 8,
  },
  {
    name: "Don",
    earnings: 3600,
    hours: 5,
  },
];

function App() {
  const [data, setData] = useState(null);
  const [enteringData, setEnteringStudents] = useState(false);

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

  const handleClearData = () => {
    setEnteredStudents([]);
    setData(null);
    setMaxCreditHours("");
    setNumOfStudents("");
    setEnteringStudents(false);
  };

  return (
    <div className="App">
      {maxCreditHours && numOfStudents ? (
        <>
          <p>Max Credit Hours: {maxCreditHours}</p>
          <p>Total number of Students: {numOfStudents}</p>
        </>
      ) : (
        <EnterConstraints handleSubmitedConstraints={handleConstraints} />
      )}
      {enteringData && (
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
          <button onClick={handleClearData}>Clear Data</button>
        </>
      )}
    </div>
  );
}

export default App;
