import React from "react";
import { Link } from "react-router-dom";
import { Button as ButtonMui } from "@mui/material";

import "./Button.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`button  ${props.inverse && "button--inverse"} ${
          props.danger && "button--danger"
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <ButtonMui
        color="success"
        component={Link}
        to={props.to}
        exact={props.exact}
        variant={props.inverse ? "outlined" : "contained"}
        startIcon={props.icon ? props.icon : false}
        className={`button ${props.danger && "button--danger"}`}
      >
        {props.children}
      </ButtonMui>
    );
  }
  return (
    <ButtonMui
      startIcon={props.icon ? props.icon : false}
      color={props.danger ? "error" : "success"}
      variant={props.inverse ? "outlined" : "contained"}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </ButtonMui>
  );
};

export default Button;
