import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

function HotelData() {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [capacityPerHotel, setCapacityPerHotel] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7777/view1")
      .then((response) => response.json())
      .then((data) => setAvailableRooms(data.data)); // Assuming your endpoint wraps the array in a { data: [] } structure

    fetch("http://localhost:7777/view2")
      .then((response) => response.json())
      .then((data) => setCapacityPerHotel(data.data));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Hotel Data Dashboard
        </Typography>

        <Typography variant="h6" gutterBottom component="div">
          Available Rooms Per Area
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="available rooms table">
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Province</TableCell>
                <TableCell align="right">Available Rooms</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableRooms.map((area, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {area.city}
                  </TableCell>
                  <TableCell>{area.province}</TableCell>
                  <TableCell align="right">{area.available_rooms}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box my={4}>
        <Typography variant="h6" gutterBottom component="div">
          Aggregated Capacity Per Hotel
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="capacity per hotel table">
            <TableHead>
              <TableRow>
                <TableCell>Hotel ID</TableCell>
                <TableCell align="right">Total Capacity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {capacityPerHotel.map((hotel, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {hotel.hotel_ID}
                  </TableCell>
                  <TableCell align="right">{hotel.total_capacity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default HotelData;
