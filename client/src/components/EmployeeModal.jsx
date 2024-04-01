import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const EmployeeModal = ({ open, onClose, employee, onSave }) => {
  const initialEmployeeState = {
    sin: "",
    password: "",
    firstName: "",
    lastName: "",
    streetNumber: "",
    streetName: "",
    aptNumber: "",
    city: "",
    province: "",
    postalCode: "",
    rating: "",
    empRole: "",
    hotelID: "",
  };

  const [employeeDetails, setEmployeeDetails] = useState(initialEmployeeState);

  useEffect(() => {
    setEmployeeDetails(employee ? employee : initialEmployeeState);
  }, [employee, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "aptNumber" && value.trim() === "") {
      setEmployeeDetails({ ...employeeDetails, [name]: "-" });
    } else {
      setEmployeeDetails({ ...employeeDetails, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const method = employee ? "PUT" : "POST";
    console.log("Employee Details: ");
    console.log(employeeDetails);

    console.log("Method: ");
    console.log(method);

    const url = `http://localhost:7777/employee`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...employeeDetails,
          rating: parseInt(employeeDetails.rating),
          hotelID: parseInt(employeeDetails.hotelID, 10),
        }),
      });
      if (response.ok) {
        onSave();
        onClose();
      } else {
        console.error("Failed to save employee: ", await response.text());
      }
    } catch (error) {
      console.error("Failed to save employee:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employee ? "Edit Employee" : "Add Employee"}</DialogTitle>
      <DialogContent>
        {/* Repeat TextField for each field */}
        <TextField
          margin="dense"
          name="sin"
          label="SIN"
          type="text"
          fullWidth
          variant="outlined"
          value={employeeDetails.sin}
          onChange={handleChange}
          disabled={!!employee}
        />
        {/* password */}
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={employeeDetails.password}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          fullWidth
          variant="outlined"
          value={employeeDetails.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          fullWidth
          variant="outlined"
          value={employeeDetails.lastName}
          onChange={handleChange}
        />
        {/* address: apt num, street num, address, city, province postal code */}
        <TextField
          margin="dense"
          name="aptNumber"
          label="Apt Number"
          fullWidth
          variant="outlined"
          value={employeeDetails.aptNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="streetNumber"
          label="Street Number"
          fullWidth
          variant="outlined"
          value={employeeDetails.streetNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="streetName"
          label="Street Name"
          fullWidth
          variant="outlined"
          value={employeeDetails.streetName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="City"
          fullWidth
          variant="outlined"
          value={employeeDetails.city}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="province"
          label="Province"
          fullWidth
          variant="outlined"
          value={employeeDetails.province}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="postalCode"
          label="Postal Code"
          fullWidth
          variant="outlined"
          value={employeeDetails.postalCode}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="rating"
          label="Rating"
          fullWidth
          variant="outlined"
          value={employeeDetails.rating}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="empRole"
          label="Role"
          fullWidth
          variant="outlined"
          value={employeeDetails.empRole}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="hotelID"
          label="Hotel ID"
          fullWidth
          variant="outlined"
          value={employeeDetails.hotelID}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeModal;
