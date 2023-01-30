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
        Entering student: {enteredStudents.length + 1} / {numOfStudents}
      </p>
      <form onSubmit={submitStudent} id="enterStudentForm">
        <BaseInput
          autoFocus={true}
          label="Name"
          placeholder="John"
          inputChanged={handleNamechange}
          inputValue={studentName}
          ref={firstInput}
        />
        <BaseInput
          label="Earnings Potential"
          placeholder="$1,000"
          inputChanged={handleEarningschange}
          inputValue={studentEarnings}
        />
        <BaseInput
          label="Instruction Hours Needed"
          placeholder="5"
          inputChanged={handleHourschange}
          inputValue={studentHours}
        />
        <button
          type="submit"
          disabled={
            !studentName.length ||
            !studentEarnings.length ||
            !studentHours.length
              ? true
              : false
          }
        >
          {enteredStudents.length + 1 === parseInt(numOfStudents)
            ? "Add Student & Generate Best Combination"
            : "Add Student"}
        </button>
      </form>
    </>
  );
}

export default EnterStudent;
