import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import RoomFilters from "../components/roomFilter";
import RoomCard from "../components/roomCard";

function Rooms() {
  const today = new Date().toISOString().slice(0, 10);
  const [amenities, setAmenities] = useState([]);
  const [damages, setDamages] = useState([]);

  const [filters, setFilters] = useState({
    city: "",
    province: "",
    view: "",
    capacity: "",
    price: "",
    startDate: today,
    endDate: today,
    numRooms: "",
    hotelChain: "",
    extendable: "",
    rating: "",
    amenityName: "",
    damageName: "",
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAmenities = async () => {
    try {
      const response = await fetch(`http://localhost:7777/amenities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAmenities(data.amenities);
      } else {
        console.error("Failed to fetch amenities");
      }
    } catch (error) {
      console.error("Error fetching amenities:", error);
    }
  };

  const fetchDamages = async () => {
    try {
      const response = await fetch(`http://localhost:7777/damages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDamages(data.damages);
      } else {
        console.error("Failed to fetch amenities");
      }
    } catch (error) {
      console.error("Error fetching amenities:", error);
    }
  };

  const fetchRooms = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await fetch(
        `http://localhost:7777/room?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // assuming your API returns JSON
          },
        }
      );
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
    fetchAmenities();
    fetchDamages();
    fetchRooms();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
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
        amenities={amenities}
        damages={damages}
      />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : rooms.length > 0 ? (
        rooms.map((room, index) => <RoomCard key={index} room={room} />)
      ) : (
        <Typography>No rooms available with the selected filters.</Typography>
      )}
    </div>
  );
}

export default Rooms;
