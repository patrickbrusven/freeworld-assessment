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
      <form
        onSubmit={submitConstraints}
        id="enterConstraintsForm"
        className="input-form"
      >
        <BaseInput
          className="freeworld-input"
          label="Max Credit Hours:"
          placeholder="20"
          name="maxCreditHours"
          inputChanged={handleInputChange}
          inputValue={constraints.maxCreditHours}
        />
        <BaseInput
          className="freeworld-input"
          label="Number of Students for Consideration:"
          placeholder="5"
          name="numOfStudents"
          inputChanged={handleInputChange}
          inputValue={constraints.numOfStudents}
        />
        <button
          type="submit"
          className={
            !constraints.maxCreditHours || !constraints.numOfStudents
              ? "base-button base-button--disabled"
              : "base-button base-button--enabled"
          }
          disabled={!constraints.maxCreditHours || !constraints.numOfStudents}
        >
          Proceed to Enter Students
        </button>
      </form>
    </>
  );
}
export default EnterConstraints;
