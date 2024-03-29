import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:7777/hotels");
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Hotels
      </Typography>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Hotels;
