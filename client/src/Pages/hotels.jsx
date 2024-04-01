import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import HotelModal from "../components/hotelModal"; // Import the modal component
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:7777/hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Function to handle opening the modal for adding
  const handleAddHotel = () => {
    setSelectedHotel(null);
    setModalOpen(true);
  };

  // Function to handle opening the modal for editing
  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel);
    setModalOpen(true);
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) {
      return;
    }

    try {
      await fetch(`http://localhost:7777/hotel?hotelID=${hotelId}`, {
        method: "DELETE",
      });
      // After deletion, fetch the hotels list again to reflect changes
      fetchHotels();
    } catch (error) {
      console.error("Failed to delete hotel:", error);
    }
  };

  // Function to save hotel details (add or edit)
  const handleSaveHotel = async (hotelDetails) => {
    const method = selectedHotel ? "PUT" : "POST";
    const url = `http://localhost:7777/hotel${
      selectedHotel ? `?hotelID=${selectedHotel[0]}` : ""
    }`;

    try {
      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelDetails),
      });
      // After saving, fetch the hotels list again to reflect changes
      fetchHotels();
    } catch (error) {
      console.error("Failed to save hotel:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Hotels
      </Typography>
      <Button
        variant="contained"
        onClick={handleAddHotel}
        style={{ marginBottom: 20 }}
      >
        Add Hotel
      </Button>
      <Grid container spacing={4}>
        {hotels.map((hotel) => (
          <Grid item xs={12} md={6} lg={4} key={hotel[0]}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5" component="div">
                  {hotel[1]}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {`${hotel[2]} ${hotel[3]}, ${hotel[7]}, ${hotel[5]}, ${hotel[6]}`}
                </Typography>
                <Typography variant="body2">
                  Rating: {hotel[8]}
                  <br />
                  Rooms: {hotel[9]}
                  <br />
                  Chain: {hotel[12]}
                  <br />
                  Contact Email: {hotel[13]}
                  <br />
                  Contact Phone: {hotel[14]}
                </Typography>
                <IconButton onClick={() => handleEditHotel(hotel)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteHotel(hotel[0])}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <HotelModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        hotel={selectedHotel}
        onSave={handleSaveHotel}
      />
    </div>
  );
};

export default Hotels;
