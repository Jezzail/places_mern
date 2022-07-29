import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import AuthContext from "../../shared/context/auth-context";
import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const deletePlaceHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };
  return (
    <Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!(
        authCtx.userId === userId &&
        error === "Could not find places for the provided user id"
      ) && <ErrorModal error={error} onClear={clearError} />}

      {!isLoading && (loadedPlaces || authCtx.userId === userId) && (
        <PlaceList items={loadedPlaces} onDelete={deletePlaceHandler} />
      )}
    </Fragment>
  );
};

export default UserPlaces;
