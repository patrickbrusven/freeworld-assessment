import "./App.css";
import { useState } from "react";
import BaseInput from "./BaseInput";
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
  const [data, setData] = useState([]);
  const [enteringData, setEnteringData] = useState(false);

  // enter hours and # of students logic
  const [maxCreditHours, setMaxCreditHours] = useState("");
  const [numOfStudents, setNumOfStudents] = useState("");

  const handleMaxHoursChanged = (num) => {
    setMaxCreditHours(num);
  };
  const handleNumOfStudentsChanged = (num) => {
    setNumOfStudents(num);
  };
  const handleProceede = () => {
    setEnteringData(true);
  };

  // enter student data logic
  const [enteredStudents, setEnteredStudents] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [studentEarnings, setStudentEarnings] = useState("");
  const [studentHours, setStudentHours] = useState("");

  const handleNamechange = (string) => {
    setStudentName(string);
  };
  const handleEarningschange = (num) => {
    setStudentEarnings(num);
  };
  const handleHourschange = (num) => {
    setStudentHours(num);
  };

  const handleSubmitStudent = () => {
    const student = {
      name: studentName,
      earnings: parseInt(studentEarnings),
      hours: parseInt(studentHours),
    };
    setEnteredStudents((current) => {
      const newStudentArray = [...current, student];
      if (newStudentArray.length === parseInt(numOfStudents)) {
        setData(newStudentArray);
        setEnteringData(false);
      }
      return newStudentArray;
    });
    setStudentName("");
    setStudentEarnings("");
    setStudentHours("");
  };

  const handleClearData = () => {
    setEnteredStudents([]);
    setData([]);
    setMaxCreditHours("");
    setNumOfStudents("");
    setEnteringData(false);
  };

  return (
    <div className="App">
      <BaseInput
        placeholder="Max Credit Hours"
        inputChanged={handleMaxHoursChanged}
        inputValue={maxCreditHours}
      />
      <BaseInput
        placeholder="# of Students for Consideration"
        inputChanged={handleNumOfStudentsChanged}
        inputValue={numOfStudents}
      />
      <button onClick={handleProceede}>Proceede to enter Data</button>
      {enteringData && (
        <>
          <p>
            entering student {enteredStudents.length + 1} / {numOfStudents}
          </p>
          <BaseInput
            placeholder="Name"
            inputChanged={handleNamechange}
            inputValue={studentName}
          />
          <BaseInput
            placeholder="Earnings Potential"
            inputChanged={handleEarningschange}
            inputValue={studentEarnings}
          />
          <BaseInput
            placeholder="Instruction Hours Needed"
            inputChanged={handleHourschange}
            inputValue={studentHours}
          />
          <button onClick={handleSubmitStudent}>Submit Student</button>
        </>
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
      <BestCombination potentialStudents={data} totalHours={maxCreditHours} />
      <button onClick={handleClearData}>Clear Data</button>
    </div>
  );
}

export default App;
