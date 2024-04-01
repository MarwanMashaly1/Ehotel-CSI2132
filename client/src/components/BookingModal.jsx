import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Typography,
  DialogTitle,
} from "@mui/material";

function BookingModal({ isOpen, onClose, room }) {
  // Adding state for all required customer fields
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    password: "",
    identification: "",
    firstName: "",
    lastName: "",
    streetNumber: "",
    streetName: "",
    aptNumber: "",
    city: "",
    province: "",
    postalCode: "",
    registerDate: new Date().toISOString().slice(0, 10),
  });

  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCustomerDetails((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async () => {
    let method = "POST";
    try {
      // Attempt to create or update customer
      let customerResponse = await fetch(
        `http://localhost:7777/customer?email=${encodeURIComponent(
          customerDetails.email
        )}`,
        {
          method: "GET", // Check if customer exists
        }
      );

      if (customerResponse.ok) {
        method = "PUT"; // Customer exists, so we'll need to update
      }

      // Create or update customer
      customerResponse = await fetch("http://localhost:7777/customer", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerDetails),
      });

      if (!customerResponse.ok)
        throw new Error("Failed to create/update customer");

      // Create booking
      const bookingResponse = await fetch("http://localhost:7777/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingDetails,
          roomNumber: room[1],
          customerEmail: customerDetails.email,
        }),
      });

      if (!bookingResponse.ok) throw new Error("Failed to create booking");

      // Further actions upon successful booking...

      onClose(); // Close modal
    } catch (error) {
      console.error("Error in creating booking:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Booking</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Customer Information
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          name="email"
          value={customerDetails.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          name="password"
          value={customerDetails.password}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Identification"
          type="text"
          fullWidth
          variant="outlined"
          name="identification"
          value={customerDetails.identification}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          name="firstName"
          value={customerDetails.firstName}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          name="lastName"
          value={customerDetails.lastName}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Street Number"
          type="text"
          fullWidth
          variant="outlined"
          name="streetNumber"
          value={customerDetails.streetNumber}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Street Name"
          type="text"
          fullWidth
          variant="outlined"
          name="streetName"
          value={customerDetails.streetName}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Apt Number"
          type="text"
          fullWidth
          variant="outlined"
          name="aptNumber"
          value={customerDetails.aptNumber}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="City"
          type="text"
          fullWidth
          variant="outlined"
          name="city"
          value={customerDetails.city}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Province"
          type="text"
          fullWidth
          variant="outlined"
          name="province"
          value={customerDetails.province}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Postal Code"
          type="text"
          fullWidth
          variant="outlined"
          name="postalCode"
          value={customerDetails.postalCode}
          onChange={handleInputChange}
        />
        <Typography variant="h6" gutterBottom>
          Booking Information
        </Typography>
        <TextField
          margin="dense"
          label="Room Number"
          type="text"
          fullWidth
          variant="outlined"
          name="roomNumber"
          value={room[1]}
          disabled
          onChange={handleBookingChange}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="date"
          fullWidth
          variant="outlined"
          name="startDate"
          value={bookingDetails.startDate}
          onChange={handleBookingChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          variant="outlined"
          name="endDate"
          value={bookingDetails.endDate}
          onChange={handleBookingChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BookingModal;
