import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import AuthContext from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        {/* <NavLink to="/" exact> */}
        <Button
          exact
          variant="contained"
          startIcon={<PeopleAltIcon />}
          component={NavLink}
          to="/"
        >
          ALL USERS
        </Button>
        {/* </NavLink> */}
      </li>
      {authCtx.isLoggedIn && (
        <li>
          {/* <NavLink to={`/${authCtx.userId}/places`}> */}
          <Button
            variant="contained"
            startIcon={<FmdGoodIcon />}
            component={NavLink}
            to={`/${authCtx.userId}/places`}
          >
            MY PLACES
          </Button>
          {/* </NavLink> */}
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          {/* <NavLink to="/places/new"> */}
          <Button variant="contained" startIcon={<AddLocationAltIcon />} component={NavLink} to="/places/new">
            ADD PLACE
          </Button>
          {/* </NavLink> */}
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          {/* <NavLink to="/login"> */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LoginIcon />}
            component={NavLink}
            to="/login"
          >
            LOGIN
          </Button>
          {/* </NavLink> */}
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <Button onClick={authCtx.logout} variant="outlined" color="error" startIcon={<LogoutIcon />}>
            LOGOUT
          </Button>
          {/* <button onClick={authCtx.logout}>LOGOUT</button> */}
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
