import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../shared/context/auth-context";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

const UserItem = (props) => {
  const authCtx = useContext(AuthContext);

  if (props.placeCount === 0 && props.id !== authCtx.userId) {
    return (
      <li className="user-item">
        <Card className="user-item__content">
          <Link
            to={`/${props.id}/places`}
            onClick={(event) => event.preventDefault()}
            style={{ cursor: "not-allowed" }}
          >
            <div className="user-item__image">
              <Avatar
                image={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
                alt={props.name}
              />
            </div>
            <div className="user-item__info">
              <h2>{props.name}</h2>
              <h3>
                {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
              </h3>
            </div>
          </Link>
        </Card>
      </li>
    );
  }

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
