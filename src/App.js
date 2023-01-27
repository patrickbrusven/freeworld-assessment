import "./App.css";
import { useEffect, useState } from "react";
import BaseInput from "./BaseInput";

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

function App() {
  const [data, setData] = useState([]);
  const [bestCombination, setBestCombination] = useState(null);
  const [enteringData, setEnteringData] = useState(false);

  const findBestCombination = (potentialStudents, totalHours) => {
    const flattenArrayByName = potentialStudents.map((student) => student.name);
    const powerSetArrayByNames = getAllSubsets(flattenArrayByName);
    const powerSetWithTotals = totalSubsetsEarningsAndHours(
      powerSetArrayByNames,
      testData
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
  };

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

  useEffect(() => {
    setBestCombination(findBestCombination(data, maxCreditHours));
  }, [data, maxCreditHours]);

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
      {bestCombination && (
        <>
          <h3>Students that have max earning potential for this cohort</h3>
          <ul>
            {bestCombination.possibleCombination.map((studentName, index) => (
              <li key={index}>{studentName}</li>
            ))}
          </ul>
          <p>Max Potential Earnings: ${bestCombination.possibleEarnings}</p>
          <p>Total Hours: {bestCombination.totalHours}</p>
          <button onClick={handleClearData}>Clear Data</button>
        </>
      )}
    </div>
  );
}

export default App;
