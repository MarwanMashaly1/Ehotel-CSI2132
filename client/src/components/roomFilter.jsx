import React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function RoomFilters({ filters, onFilterChange, onClearFilters }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Include all necessary filters */}
      <TextField
        name="city"
        label="City"
        value={filters.city || ""}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <TextField
        name="province"
        label="Province"
        value={filters.province || ""}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      {/* Add other filters similarly */}
      <Button variant="contained" color="primary" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}

export default RoomFilters;
