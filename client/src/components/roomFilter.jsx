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
      <FormControl style={{ minWidth: "120px", marginRight: "10px" }}>
        <InputLabel id="room-type-label">Room Type</InputLabel>
        <Select
          labelId="room-type-label"
          name="roomType"
          value={filters.roomType || ""}
          onChange={handleChange}
        >
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="double">Double</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ minWidth: "120px", marginRight: "10px" }}>
        <InputLabel id="view-label">View</InputLabel>
        <Select
          labelId="view-label"
          name="view"
          value={filters.view || ""}
          onChange={handleChange}
        >
          <MenuItem value="sea">Sea</MenuItem>
          <MenuItem value="mountain">Mountain</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  );
}

export default RoomFilters;
