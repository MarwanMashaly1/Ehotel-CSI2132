import React from "react";
import { Card, CardContent, Typography, Chip, Button } from "@mui/material";

function RoomCard({ room, hotel }) {
  return (
    <Card
      variant="outlined"
      style={{ margin: "10px", width: "300px", display: "inline-block" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          Room {room.room_number}
        </Typography>
        <Typography color="textSecondary">Hotel: {hotel.name}</Typography>
        <Typography color="textSecondary">
          Location: {hotel.city}, {hotel.province}
        </Typography>
        <Typography variant="body2">Price: ${room.price} per night</Typography>
        <Typography variant="body2">
          Capacity: {room.capacity} guest(s)
        </Typography>
        <Typography variant="body2">View: {room.view}</Typography>
        <div style={{ marginTop: "10px" }}>
          {room.amenities.map((amenity, index) => (
            <Chip key={index} label={amenity} style={{ margin: "2px" }} />
          ))}
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
