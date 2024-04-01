import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmBookingModal = ({ open, onClose, booking, onConfirm }) => {
  // Initialize the state with structure for rental info
  const [rentInfo, setRentInfo] = useState({
    employeeSin: "",
    paymentInfo: "",
    cvv: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRentInfo({ ...rentInfo, [name]: value });
  };

  const handleConfirm = async () => {
    try {
      await fetch(`http://localhost:7777/renting`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingID: booking[0],
          employeeSin: rentInfo.employeeSin,
        }),
      });
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to confirm booking:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Booking #{booking[0]}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Card Number"
          type="text"
          fullWidth
          variant="outlined"
          name="paymentInfo" // Match state key
          value={rentInfo.paymentInfo}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="CVV"
          type="text"
          fullWidth
          variant="outlined"
          name="cvv" // Match state key
          value={rentInfo.cvv}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Expiration Date"
          type="date"
          fullWidth
          variant="outlined"
          name="date" // Match state key
          value={rentInfo.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <Typography variant="h6" gutterBottom>
          Employee Information
        </Typography>
        <TextField
          margin="dense"
          label="Employee SIN"
          type="text"
          fullWidth
          variant="outlined"
          name="employeeSin" // Match state key
          value={rentInfo.employeeSin}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm Booking</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBookingModal;
