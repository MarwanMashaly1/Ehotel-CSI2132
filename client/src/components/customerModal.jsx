import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const CustomerModal = ({ open, onClose, customer, onSave }) => {
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    first_name: "",
    last_name: "",
    // Add other fields as necessary
  });

  useEffect(() => {
    if (customer) setCustomerDetails(customer);
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSave = async () => {
    const method = "PUT"; // Since you're editing, method is always PUT
    const url = `http://localhost:7777/customer?email=${encodeURIComponent(
      customerDetails.email
    )}`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerDetails),
      });
      onSave(); // Refresh the customers list
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="first_name"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.first_name}
          onChange={handleChange}
        />
        {/* Repeat for other fields */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerModal;
