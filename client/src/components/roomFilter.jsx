import React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function RoomFilters({
  filters,
  onFilterChange,
  onClearFilters,
  amenities,
  damages,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ ...filters, [name]: value });
  };
  const today = new Date().toISOString().slice(0, 10);
  const initialFilters = {
    startDate: filters.startDate || today,
    endDate: filters.endDate || today,
    // Include other initial filter states if needed
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <TextField
        name="city"
        label="city"
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
          <MenuItem value="street view">Street</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ minWidth: "120px", marginRight: "10px" }}>
        <InputLabel id="capacity-label">Capacity</InputLabel>
        <Select
          labelId="capacity-label"
          name="capacity"
          value={filters.capacity || ""}
          onChange={handleChange}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="price"
        label="Max Price"
        type="number"
        value={filters.price || ""}
        onChange={handleChange}
        style={{ marginRight: "10px", marginBottom: "10px", marginTop: "10px" }}
      />
      {/* start date filter */}
      <TextField
        name="startDate"
        label="Start Date"
        type="date"
        required
        value={initialFilters.startDate}
        onChange={handleChange}
        style={{ marginRight: "10px", marginBottom: "10px", marginTop: "10px" }}
        InputLabelProps={{ shrink: true }}
      />
      {/* end date filter */}
      <TextField
        name="endDate"
        label="End Date"
        type="date"
        required
        value={initialFilters.endDate}
        onChange={handleChange}
        style={{ marginRight: "10px", marginBottom: "10px", marginTop: "10px" }}
        InputLabelProps={{ shrink: true }}
      />
      {/* number of rooms */}
      <TextField
        name="numRooms"
        label="Number of Rooms"
        type="number"
        value={filters.numRooms || ""}
        onChange={handleChange}
        style={{ marginRight: "10px", marginBottom: "10px", marginTop: "10px" }}
      />
      {/* hotel chain */}
      <TextField
        name="hotelChain"
        label="Hotel Chain"
        value={filters.hotelChain || ""}
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      {/* extendable0 */}
      <FormControl style={{ minWidth: "120px", marginRight: "10px" }}>
        <InputLabel id="extendable-label">Extendable</InputLabel>
        <Select
          labelId="extendable-label"
          name="extendable"
          value={filters.extendable || ""}
          onChange={handleChange}
        >
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>
      {/* rating */}
      <FormControl style={{ minWidth: "120px", marginRight: "10px" }}>
        <InputLabel id="rating-label">Rating</InputLabel>
        <Select
          labelId="rating-label"
          name="rating"
          value={filters.rating || ""}
          onChange={handleChange}
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        style={{ minWidth: "200px", marginRight: "10px", marginTop: "10px" }}
      >
        <InputLabel id="amenity-label">Amenity</InputLabel>
        <Select
          labelId="amenity-label"
          name="amenityName"
          value={filters.amenityName || ""}
          onChange={handleChange}
        >
          {amenities.map((amenity, index) => (
            <MenuItem key={index} value={amenity[1]}>
              {amenity[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        style={{ minWidth: "200px", marginRight: "10px", marginTop: "10px" }}
      >
        <InputLabel id="amenity-label">Damage</InputLabel>
        <Select
          labelId="amenity-label"
          name="damageName"
          value={filters.damageName || ""}
          onChange={handleChange}
        >
          {damages.map((damages, index) => (
            <MenuItem key={index} value={damages[1]}>
              {damages[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() => onFilterChange(filters)}
      >
        Apply Filters
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClearFilters}
        style={{ marginLeft: "10px" }}
      >
        Clear Filters
      </Button>
    </div>
  );
}

export default RoomFilters;
