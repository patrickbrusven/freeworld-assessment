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
    let { name, value } = e.target;
    if (name !== "studentName") {
      value = value.replace(/[^0-9]/g, "");
    }
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
    <div className="form-wrapper">
      <h2>
        Entering Student: {enteredStudents.length + 1} of {numOfStudents}
      </h2>
      <form
        onSubmit={submitStudent}
        id="enterStudentForm"
        className="flex-container"
      >
        <BaseInput
          autoFocus={true}
          className="freeworld-input"
          label="Name:"
          placeholder="John"
          name="studentName"
          inputChanged={handleInputChange}
          inputValue={studentValues.studentName}
          ref={firstInput}
        />
        <BaseInput
          className="freeworld-input"
          label="Earnings Potential:"
          placeholder="$1,000"
          name="studentEarnings"
          inputChanged={handleInputChange}
          inputValue={studentValues.studentEarnings}
        />
        <BaseInput
          className="freeworld-input"
          label="Instruction Hours Needed:"
          placeholder="5"
          name="studentHours"
          inputChanged={handleInputChange}
          inputValue={studentValues.studentHours}
        />
        <button
          type="submit"
          className={
            !studentValues.studentName.length ||
            !studentValues.studentEarnings.length ||
            !studentValues.studentHours.length
              ? "base-button base-button--disabled"
              : "base-button base-button--enabled"
          }
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
    </div>
  );
}

export default EnterStudent;
