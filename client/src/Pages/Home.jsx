import React from "react";
import { Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Hotel Booking Application</h1>
      <p>
        This application is a simple hotel booking application. It allows you to
        manage hotel chains, hotels, rooms, customers, employees, bookings, and
        rentings.
      </p>

      <p>Use the navigation bar to get started.</p>

      <div>
        {/* create 2 sections one that takes you to the customer portal and the other to the employee portal and you can use material ui */}
        <Typography variant="h6">Customer Portal</Typography>
        <Typography variant="body1">
          This portal is for customers to book hotels and rooms.
        </Typography>
        <Button variant="contained" color="primary" href="/customers">
          Go to Customer Portal
        </Button>

        <Typography variant="h6">Employee Portal</Typography>
        <Typography variant="body1">
          This portal is for employees to manage hotel chains, hotels, rooms,
          customers, employees, bookings, and rentings.
        </Typography>
        <Button variant="contained" color="primary" href="/employees">
          Go to Employee Portal
        </Button>
      </div>
    </div>
  );
};

export default Home;
