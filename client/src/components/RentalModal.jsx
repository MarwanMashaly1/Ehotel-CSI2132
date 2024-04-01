import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Popover,
} from "@mui/material";

const RentalModal = ({ open, onClose, onSave }) => {
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
    roomNumber: "",
    startDate: "",
    endDate: "",
  });

  const [employeeSin, setEmployeeSin] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeSinChange = (e) => {
    setEmployeeSin(e.target.value);
  };

  const CustomerHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "aptNumber" && value.trim() === "") {
      setCustomerDetails({ ...customerDetails, [name]: "-" });
    } else {
      setCustomerDetails({ ...customerDetails, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      // Create or Update Customer
      const customerResponse = await fetch("http://localhost:7777/customer", {
        method: "POST", // Adjust method as necessary
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...customerDetails,
        }),
      });

      if (customerResponse[0] === "Email already exists") {
        // send a put request to update the customer
        const customerResponse = await fetch("http://localhost:7777/customer", {
          method: "PUT", // Adjust method as necessary
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...customerDetails,
          }),
        });

        console.log("Customer Details: ");
        console.log(customerDetails);
        console.log(customerResponse);
      }

      // Create Booking
      const bookingResponse = await fetch("http://localhost:7777/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingDetails,
          customerEmail: customerDetails.email,
        }),
      });

      if (!bookingResponse.ok) throw new Error("Failed to create booking");
      const bookingResponseData = await bookingResponse.json();
      const bookingId = bookingResponseData[0][0];

      // Create Rental
      await fetch("http://localhost:7777/renting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingID: bookingId, employeeSin }),
      });

      //   onSave(); // Refresh list or other post-action
      onClose(); // Close modal
    } catch (error) {
      console.error("Error creating rental:", error);
      <Popover open={true} anchorEl={document.body}>
        <Typography>Error creating rental</Typography>
      </Popover>;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Rental</DialogTitle>
      <DialogContent>
        {/* Customer Details Inputs */}
        <Typography variant="h6">Customer Info</Typography>

        <TextField
          margin="dense"
          name="email"
          label="Customer Email"
          type="email"
          fullWidth
          variant="outlined"
          value={customerDetails.email}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={customerDetails.password}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="identification"
          label="Identification"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.identification}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.firstName}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.lastName}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="streetNumber"
          label="Street Number"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.streetNumber}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="streetName"
          label="Street Name"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.streetName}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="aptNumber"
          label="Apt Number"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.aptNumber}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="City"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.city}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="province"
          label="Province"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.province}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="postalCode"
          label="Postal Code"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.postalCode}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="registerDate"
          label="Register Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={customerDetails.registerDate}
          onChange={CustomerHandleChange}
        />

        {/* payment info */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Payment Info
        </Typography>
        <TextField
          margin="dense"
          name="cardNumber"
          label="Card Number"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.cardNumber}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="cvv"
          label="CVV"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.cvv}
          onChange={CustomerHandleChange}
        />
        <TextField
          margin="dense"
          name="expirationDate"
          label="Expiration Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={customerDetails.expirationDate}
          onChange={CustomerHandleChange}
        />

        {/* Booking Details Inputs */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Booking Info
        </Typography>
        <TextField
          margin="dense"
          name="roomNumber"
          label="Room Number"
          type="text"
          fullWidth
          variant="outlined"
          value={bookingDetails.roomNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="startDate"
          label="Start Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={bookingDetails.startDate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="endDate"
          label="End Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={bookingDetails.endDate}
          onChange={handleChange}
        />
        {/* Employee SIN Input */}
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Employee Info
        </Typography>
        <TextField
          margin="dense"
          label="Employee SIN"
          type="text"
          fullWidth
          variant="outlined"
          value={employeeSin}
          onChange={handleEmployeeSinChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Create Rental</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RentalModal;
