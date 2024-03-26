import React, { useState, useEffect } from "react";
import { rooms, hotels } from "../components/mockdata";
import RoomFilters from "../components/roomFilter";
import RoomCard from "../components/roomCard";
import { Typography } from "@mui/material";
import RoomList from "../components/roomsList";

function Rooms() {
  const [filters, setFilters] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:7777/room`, {
        method: "GET",
        headers: {
          // Your required headers
        },
        // Construct query parameters from filters
      });
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        console.error("Failed to fetch rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Available Rooms
      </Typography>
      <RoomFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        rooms.map((room) => <RoomCard key={room.room_number} room={room} />)
      )}
    </div>
  );
}

export default Rooms;
