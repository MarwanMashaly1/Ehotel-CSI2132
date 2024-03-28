// create a employee portal page that allows employees to manage hotel chains, hotels, rooms, customers, employees, bookings, and rentings

import React from "react";
import { Button, Typography } from "@mui/material";

const EmployeePortal = () => {
  return (
    <div>
      <h1>Welcome to the Employee Portal</h1>
      <p>
        This portal is for employees to manage hotel chains, hotels, rooms,
        customers, employees, bookings, and rentings.
      </p>

      <div>
        <Typography variant="h6">Hotel Chains</Typography>
        <Typography variant="body1">
          View the different hotel chains available.
        </Typography>
        <Button variant="contained" color="primary" href="/hotel-chains">
          View Hotel Chains
        </Button>

        <Typography variant="h6">Hotels</Typography>
        <Typography variant="body1">
          View the different hotels available.
        </Typography>
        <Button variant="contained" color="primary" href="/hotels">
          View Hotels
        </Button>

        <Typography variant="h6">Rooms</Typography>
        <Typography variant="body1">
          View the different rooms available.
        </Typography>
        <Button variant="contained" color="primary" href="/rooms">
          View Rooms
        </Button>

        <Typography variant="h6">Customers</Typography>
        <Typography variant="body1">
          View the different customers available.
        </Typography>
        <Button variant="contained" color="primary" href="/customers">
          View Customers
        </Button>

        <Typography variant="h6">Employees</Typography>
        <Typography variant="body1">
          View the different employees available.
        </Typography>
        <Button variant="contained" color="primary" href="/employees">
          View Employees
        </Button>

        <Typography variant="h6">Bookings</Typography>
        <Typography variant="body1">
          View the different bookings available.
        </Typography>
        <Button variant="contained" color="primary" href="/bookings">
          View Bookings
        </Button>

        <Typography variant="h6">Rentings</Typography>
        <Typography variant="body1">
          View the different rentings available.
        </Typography>
        <Button variant="contained" color="primary" href="/rentings">
          View Rentings
        </Button>
      </div>
    </div>
  );
};

export default EmployeePortal;
