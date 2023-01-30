import { useState } from "react";
import BaseInput from "./BaseInput";

function EnterStudent({
  handleSubmitedStudent,
  enteredStudents,
  numOfStudents,
}) {
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

  const submitStudent = () => {
    handleSubmitedStudent(studentName, studentEarnings, studentHours);
    setStudentName("");
    setStudentEarnings("");
    setStudentHours("");
  };
  return (
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
      <button onClick={submitStudent}>Submit Student</button>
    </>
  );
}

export default EnterStudent;
