import "./App.css";
import { useState } from "react";
import BaseInput from "./BaseInput";
import BestCombination from "./BestCombination";
import EnterStudent from "./EnterStudent";

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
  const [enteringData, setEnteringData] = useState(false);

  // enter hours and # of students logic
  const [maxCreditHours, setMaxCreditHours] = useState("");
  const [numOfStudents, setNumOfStudents] = useState("");

  const handleMaxHoursChanged = (e) => {
    setMaxCreditHours(e.target.value);
  };
  const handleNumOfStudentsChanged = (e) => {
    setNumOfStudents(e.target.value);
  };
  const handleProceede = () => {
    setEnteringData(true);
  };

  // enter student data logic
  const [enteredStudents, setEnteredStudents] = useState([]);

  const handleSubmitedStudent = (
    student
  ) => {
    setEnteredStudents((current) => {
      const newStudentArray = [...current, student];
      if (newStudentArray.length === parseInt(numOfStudents)) {
        setData(newStudentArray);
        setEnteringData(false);
      }
      return newStudentArray;
    });
  };

  const handleClearData = () => {
    setEnteredStudents([]);
    setData(null);
    setMaxCreditHours("");
    setNumOfStudents("");
    setEnteringData(false);
  };

  return (
    <div className="App">
      <BaseInput
        label="Max Credit Hours"
        placeholder="20"
        inputChanged={handleMaxHoursChanged}
        inputValue={maxCreditHours}
      />
      <BaseInput
        label="# of Students for Consideration"
        placeholder="5"
        inputChanged={handleNumOfStudentsChanged}
        inputValue={numOfStudents}
      />
      <button onClick={handleProceede}>Proceede to enter Data</button>
      {enteringData && (
        <EnterStudent
          handleSubmitedStudent={handleSubmitedStudent}
          enteredStudents={enteredStudents}
          numOfStudents={numOfStudents}
        />
      )}
      {enteredStudents && (
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
