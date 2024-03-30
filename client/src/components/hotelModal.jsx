import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const HotelModal = ({ open, onClose, hotel, onSave }) => {
  const [hotelDetails, setHotelDetails] = useState({
    name: "",
    street_number: "",
    street_name: "",
    city: "",
    province: "",
    postal_code: "",
    rating: "",
    num_rooms: "",
    contact_email: "",
    contact_phone: "",
    hotel_chain_name: "",
  });

  useEffect(() => {
    if (hotel) {
      setHotelDetails(hotel);
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(hotelDetails);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{hotel ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
      <DialogContent>
        {/* Generate TextFields for each hotel detail */}
        {Object.keys(hotelDetails).map((key) => (
          <TextField
            key={key}
            name={key}
            label={key.replace(/_/g, " ").toUpperCase()}
            value={hotelDetails[key]}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HotelModal;
