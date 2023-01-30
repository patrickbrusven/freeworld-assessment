import { forwardRef } from "react";

const BaseInput = forwardRef((props, ref) => {
  const {
    placeholder = "example placeholder",
    type = "text",
    inputChanged,
    inputValue,
    autoFocus,
  } = props;
  const handleInput = (e) => {
    inputChanged(e.target.value);
  };
  return (
    <label>
      {placeholder}
      <input
        autoFocus={autoFocus}
        type={type}
        value={inputValue}
        onChange={handleInput}
        ref={ref}
      />
    </label>
  );
});

export default BaseInput;
