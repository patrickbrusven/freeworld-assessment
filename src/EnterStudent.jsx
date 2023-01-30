import { useState, useRef } from "react";
import BaseInput from "./BaseInput";

const initialValues = {
  studentName: "",
  studentEarnings: "",
  studentHours: "",
};

function EnterStudent({
  handleSubmitedStudent,
  enteredStudents,
  numOfStudents,
}) {
  const [studentValues, setStudentValues] = useState(initialValues);
  const firstInput = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentValues({ ...studentValues, [name]: value });
  };

  const submitStudent = (e) => {
    e.preventDefault();
    handleSubmitedStudent({
      name: studentValues.studentName,
      earnings: parseInt(studentValues.studentEarnings),
      hours: parseInt(studentValues.studentHours),
    });
    setStudentValues(initialValues);
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
          name="studentName"
          inputChanged={handleInputChange}
          inputValue={studentValues.studentName}
          ref={firstInput}
        />
        <BaseInput
          label="Earnings Potential"
          placeholder="$1,000"
          name="studentEarnings"
          inputChanged={handleInputChange}
          inputValue={studentValues.studentEarnings}
        />
        <BaseInput
          label="Instruction Hours Needed"
          placeholder="5"
          name="studentHours"
          inputChanged={handleInputChange}
          inputValue={studentValues.studentHours}
        />
        <button
          type="submit"
          disabled={
            !studentValues.studentName.length ||
            !studentValues.studentEarnings.length ||
            !studentValues.studentHours.length
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
