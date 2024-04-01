import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import ConfirmBookingModal from "../components/ConfirmBookingModal";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:7777/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    fetchBookings();
    setModalOpen(false);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>
      <Grid container spacing={3}>
        {bookings.map((booking, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Booking #{booking[0]}</Typography>
                <Typography color="text.secondary">
                  Customer: {booking[2]}
                </Typography>
                <Typography color="text.secondary">
                  Room: {booking[1]}
                </Typography>
                <Typography color="text.secondary">
                  Check-in: {booking[3]}
                </Typography>
                <Typography color="text.secondary">
                  Check-out: {booking[4]}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleOpenModal(booking)}
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {modalOpen && (
        <ConfirmBookingModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          booking={selectedBooking}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Bookings;
