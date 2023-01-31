import { useState } from "react";
import BaseInput from "./BaseInput";

const initialValues = {
  maxCreditHours: "",
  numOfStudents: "",
};

function EnterConstraints({ handleSubmitedConstraints }) {
  const [constraints, setConstraints] = useState(initialValues);
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let number = value.replace(/[^0-9]/g, "");
    setConstraints({ ...constraints, [name]: number });
  };
  const submitConstraints = (e) => {
    e.preventDefault();
    handleSubmitedConstraints({
      maxCreditHours: constraints.maxCreditHours,
      numOfStudents: constraints.numOfStudents,
    });
  };
  return (
    <div className="form-wrapper">
      <h2>Enter Constraints</h2>
      <form
        onSubmit={submitConstraints}
        id="enterConstraintsForm"
        className="flex-container"
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
    </div>
  );
}
export default EnterConstraints;
