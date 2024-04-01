import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const CustomerModal = ({ open, onClose, customer, onSave }) => {
  const initialCustomerState = {
    email: "",
    first_name: "",
    last_name: "",
    street_number: "",
    street_name: "",
    apt_number: "",
    city: "",
    province: "",
    postal_code: "",
    // Additional fields can be added here
  };

  const [customerDetails, setCustomerDetails] = useState(initialCustomerState);

  useEffect(() => {
    // Populate the modal with customer data if editing
    if (customer) setCustomerDetails(customer);
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Since you're editing, method is always PUT
    try {
      const response = await fetch(
        `http://localhost:7777/customer?email=${encodeURIComponent(
          customerDetails.email
        )}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customerDetails),
        }
      );
      if (!response.ok) throw new Error("Failed to update customer");
      onSave(); // Invoke to refresh the customers list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to save customer:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{customer ? "Edit Customer" : "View Customer"}</DialogTitle>
      <DialogContent>
        {Object.entries(customerDetails).map(([key, value]) => (
          <TextField
            key={key}
            margin="dense"
            name={key}
            label={key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())} // Format key as label
            type="text"
            fullWidth
            variant="outlined"
            value={value}
            onChange={handleChange}
            // Disable editing email field
            disabled={key === "email"}
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

export default CustomerModal;
