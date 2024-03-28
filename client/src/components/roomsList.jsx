import React from "react";
import RoomCard from "./roomCard";
import { Typography } from "@mui/material";

function RoomList({ rooms, hotels }) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {rooms.length > 0 ? (
        rooms.map((room) => {
          const hotel = hotels.find(
            (hotel) => hotel.hotel_ID === room.hotel_ID
          );
          return <RoomCard key={room.room_number} room={room} hotel={hotel} />;
        })
      ) : (
        <Typography>No rooms available with the selected filters.</Typography>
      )}
    </div>
  );
}

export default RoomList;
