// create a customer portal page that allows customers to book hotels and rooms and see the different hotels and rooms available

import React from "react";
import { Button, Typography } from "@mui/material";

const CustomerPortal = () => {
  return (
    <div>
      <h1>Welcome to the Customer Portal</h1>
      <p>This portal is for customers to book hotels and rooms.</p>

      <div>
        <Typography variant="h6">Hotels</Typography>
        <Typography variant="body1">
          View the different hotels available.
        </Typography>
        <Button variant="contained" color="primary" href="/hotelsCustomer">
          View Hotels
        </Button>

        <Typography variant="h6">Rooms</Typography>
        <Typography variant="body1">
          View the different rooms available.
        </Typography>
        <Button variant="contained" color="primary" href="/rooms">
          Book a Room
        </Button>
      </div>
    </div>
  );
};

export default CustomerPortal;
