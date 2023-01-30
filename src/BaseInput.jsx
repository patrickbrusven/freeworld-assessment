import { forwardRef } from "react";

const BaseInput = forwardRef((props, ref) => {
  const {
    label = "example label",
    placeholder="example placeholder",
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
      {label}
      <input
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInput}
        ref={ref}
      />
    </label>
  );
});

export default BaseInput;
