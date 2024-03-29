import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import BookingModal from "./BookingModal"; // This will be your custom modal component

function RoomCard({ room }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <Card
      variant="outlined"
      style={{ margin: "10px", width: "300px", display: "inline-block" }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          Room {room[1]}
        </Typography>
        <Typography color="textSecondary">Hotel: {room[0]}</Typography>
        <Typography color="textSecondary">
          Location: {room[3]}, {room[2]}
        </Typography>
        <Typography variant="body2">
          Price: ${parseFloat(room[8]).toFixed(2)} per night
        </Typography>
        <Typography variant="body2">Capacity: {room[6]} guest(s)</Typography>
        <Typography variant="body2">View: {room[7]}</Typography>
        <div style={{ marginTop: "10px" }}>
          {/* Assuming amenities are not provided in the current data */}
          {/* You can add logic here to display amenities if available */}
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={handleOpenModal}
        >
          Book Now
        </Button>
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          room={room}
        />
      </CardContent>
    </Card>
  );
}

export default RoomCard;
