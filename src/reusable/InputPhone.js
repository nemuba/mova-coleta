import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { mask } from "remask";

function InputPhone({ name, ...rest }) {

  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(mask(event.target.value, ['(99)99999-9999']));
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      clearValue: (ref) => {
        ref.setInputValue('');
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input
        className="form-control"
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        onChange={handleChange}
        value={value}
      />
      {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
    </>
  );
}

export default InputPhone;
