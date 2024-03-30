import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmBookingModal = ({ open, onClose, booking, onConfirm }) => {
  const [paymentInfo, setPaymentInfo] = useState("");

  const handleConfirm = async () => {
    // Here, you would send the request to your backend to update the booking's status
    // and include payment information. This is a placeholder example.
    try {
      await fetch(`http://localhost:7777/confirmBooking/${booking.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentInfo }),
      });
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Failed to confirm booking:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Booking #{booking.id}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Payment Information"
          type="text"
          fullWidth
          variant="outlined"
          value={paymentInfo}
          onChange={(e) => setPaymentInfo(e.target.value)}
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
