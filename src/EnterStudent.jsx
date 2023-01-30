import { useState, useRef } from "react";
import BaseInput from "./BaseInput";

function EnterStudent({
  handleSubmitedStudent,
  enteredStudents,
  numOfStudents,
}) {
  const [studentName, setStudentName] = useState("");
  const [studentEarnings, setStudentEarnings] = useState("");
  const [studentHours, setStudentHours] = useState("");
  const firstInput = useRef(null);

  const handleNamechange = (string) => {
    setStudentName(string);
  };
  const handleEarningschange = (num) => {
    setStudentEarnings(num);
  };
  const handleHourschange = (num) => {
    setStudentHours(num);
  };

  const submitStudent = (e) => {
    e.preventDefault();
    handleSubmitedStudent(studentName, studentEarnings, studentHours);
    setStudentName("");
    setStudentEarnings("");
    setStudentHours("");
    firstInput.current.focus();
  };
  return (
    <>
      <p>
        entering student {enteredStudents.length + 1} / {numOfStudents}
      </p>
      <form onSubmit={submitStudent} id="enterStudentForm">
        <BaseInput
          autoFocus={true}
          placeholder="Name"
          inputChanged={handleNamechange}
          inputValue={studentName}
          ref={firstInput}
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
        <button type="submit">Submit Student</button>
      </form>
    </>
  );
}

export default EnterStudent;
