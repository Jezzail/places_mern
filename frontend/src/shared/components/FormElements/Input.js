import React, { useEffect, useReducer } from "react";
import TextField from "@mui/material/TextField";

import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [value, isValid, onInput, id]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "textarea" ? (
      <TextField
        fullWidth
        multiline
        required
        id={props.id}
        rows={props.row || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        label={props.label}
        helperText={
          !inputState.isValid && inputState.isTouched && props.errorText
        }
        error={!inputState.isValid && inputState.isTouched}
      />
    ) : (
      <TextField
        fullWidth
        required
        variant="standard"
        color='success'
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        label={props.label}
        helperText={
          !inputState.isValid && inputState.isTouched && props.errorText
        }
        error={!inputState.isValid && inputState.isTouched}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      {/* <label htmlFor={props.id}>{props.label}</label> */}
      {element}
      {/* {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default Input;
