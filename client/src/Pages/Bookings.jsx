import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import ConfirmBookingModal from "../components/ConfirmBookingModal";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:7777/bookings");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
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
                <Typography variant="h6">Booking #{booking.id}</Typography>
                <Typography color="text.secondary">
                  Customer: {booking.customerEmail}
                </Typography>
                {/* Add more booking details here */}
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
          onConfirm={() => {
            // Refresh bookings list or handle post-confirmation logic
          }}
        />
      )}
    </div>
  );
};

export default Bookings;
