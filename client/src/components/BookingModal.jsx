import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";

function BookingModal({ isOpen, onClose, room }) {
  // Adding state for all required customer fields
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    streetNumber: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",

    // Add other fields as necessary
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bookingDetails = {
      ...customerDetails,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value,
      roomNumber: room[1],
    };

    try {
      const response = await fetch("http://localhost:7777/bookRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) throw new Error("Booking failed");
      alert("Booking successful!");
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to make booking");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: "auto",
        }}
      >
        <h2>Book Room {room[1]}</h2>
        {/* Input fields for customer details */}
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          required
          value={customerDetails.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          required
          value={customerDetails.firstName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          required
          value={customerDetails.lastName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="streetNumber"
          label="Street Number"
          fullWidth
          required
          value={customerDetails.streetNumber}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="streetAddress"
          label="Street Address"
          fullWidth
          required
          value={customerDetails.streetAddress}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="city"
          label="City"
          fullWidth
          required
          value={customerDetails.city}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="province"
          label="Province"
          fullWidth
          required
          value={customerDetails.province}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="postalCode"
          label="Postal Code"
          fullWidth
          required
          value={customerDetails.postalCode}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />

        {/* Add other fields as necessary */}
        <TextField
          name="startDate"
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="endDate"
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit">Submit Booking</Button>
      </Box>
    </Modal>
  );
}

export default BookingModal;
