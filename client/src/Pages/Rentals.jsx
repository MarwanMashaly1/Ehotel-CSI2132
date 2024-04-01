import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import RentalModal from "../components/RentalModal";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await fetch("http://localhost:7777/rentings");
      const data = await response.json();
      setRentals(data);
    } catch (error) {
      console.error("Failed to fetch rentals:", error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Rentals
      </Typography>
      <Button variant="contained" onClick={handleOpenModal}>
        Create Rental
      </Button>
      <Grid container spacing={3}>
        {rentals.map((rental, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Rental ID: {rental[0]}</Typography>
                <Typography color="text.secondary">
                  Booking ID: {rental[1]}
                </Typography>
                <Typography color="text.secondary">
                  Employee SIN: {rental[2]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {modalOpen && (
        <RentalModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            fetchRentals();
          }}
        />
      )}
    </div>
  );
};

export default Rentals;
