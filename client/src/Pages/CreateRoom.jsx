import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function CreateRoomPage() {
  const [roomDetails, setRoomDetails] = useState({
    roomNumber: "",
    price: "",
    amenityID: "",
    capacity: "",
    view: "",
    extendable: false,
    damageID: "",
    hotelID: "",
  });
  const [hotels, setHotels] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // Fetch the list of hotels
        const response = await fetch("http://localhost:7777/hotels");
        if (!response.ok) throw new Error("Failed to fetch hotels");
        const data = await response.json();
        console.log(data);
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "extendable" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:7777/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomDetails),
      });
      if (response.ok) {
        alert("Room created successfully!");
      } else {
        alert("Failed to create room.");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Room</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Room Number"
          name="roomNumber"
          value={roomDetails.roomNumber}
          onChange={handleChange}
          required
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={roomDetails.price}
          onChange={handleChange}
          required
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Amenity ID"
          name="amenityID"
          value={roomDetails.amenityID}
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Capacity"
          name="capacity"
          type="number"
          value={roomDetails.capacity}
          onChange={handleChange}
          required
          style={{ marginBottom: "20px" }}
        />
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel id="view-select-label">View</InputLabel>
          <Select
            labelId="view-select-label"
            name="view"
            value={roomDetails.view}
            onChange={handleChange}
            required
          >
            <MenuItem value="street view">Street View</MenuItem>
            <MenuItem value="mountain view">Mountain View</MenuItem>
            <MenuItem value="sea view">Sea View</MenuItem>
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={roomDetails.extendable}
                onChange={handleChange}
                name="extendable"
              />
            }
            label="Extendable"
          />
        </FormGroup>
        <TextField
          label="Damage ID"
          name="damageID"
          value={roomDetails.damageID}
          onChange={handleChange}
          style={{ marginBottom: "20px" }}
        />
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel id="hotel-select-label">Hotel</InputLabel>
          <Select
            labelId="hotel-select-label"
            name="hotelID"
            value={roomDetails.hotelID}
            onChange={handleChange}
            required
          >
            {hotels.map((hotel) => (
              <MenuItem key={hotel[0]} value={hotel[0]}>
                {hotel[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
        >
          Create Room
        </Button>
      </form>
    </div>
  );
}

export default CreateRoomPage;
