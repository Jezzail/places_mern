import React from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
  if (!props.items || props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new" icon={<AddLocationAltIcon />}>
            Add Place
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creator={place.creator}
          coordinates={place.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
