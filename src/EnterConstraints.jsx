import { useState } from "react";
import BaseInput from "./BaseInput";

const initialValues = {
  maxCreditHours: "",
  numOfStudents: "",
};

function EnterConstraints({ handleSubmitedConstraints }) {
  const [constraints, setConstraints] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConstraints({ ...constraints, [name]: value });
  };
  const submitConstraints = (e) => {
    e.preventDefault();
    handleSubmitedConstraints({
      maxCreditHours: constraints.maxCreditHours,
      numOfStudents: constraints.numOfStudents,
    });
  };
  return (
    <>
      <form onSubmit={submitConstraints} id="enterConstraintsForm">
        <BaseInput
          label="Max Credit Hours"
          placeholder="20"
          name="maxCreditHours"
          inputChanged={handleInputChange}
          inputValue={constraints.maxCreditHours}
        />
        <BaseInput
          label="# of Students for Consideration"
          placeholder="5"
          name="numOfStudents"
          inputChanged={handleInputChange}
          inputValue={constraints.numOfStudents}
        />
        <button
          type="submit"
          disabled={!constraints.maxCreditHours || !constraints.numOfStudents}
        >
          Proceede to enter Data
        </button>
      </form>
    </>
  );
}
export default EnterConstraints;
