import { forwardRef } from "react";

const BaseInput = forwardRef((props, ref) => {
  const {
    className,
    label = "example label",
    placeholder = "example placeholder",
    type = "text",
    name,
    inputChanged,
    inputValue,
    autoFocus,
  } = props;
  const handleInput = (e) => {
    inputChanged(e);
  };
  return (
    <label className={className}>
      {label}
      <input
        autoFocus={autoFocus}
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInput}
        ref={ref}
      />
    </label>
  );
});

export default BaseInput;
