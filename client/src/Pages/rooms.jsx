// import React, { useState, useEffect } from "react";
// import { Typography } from "@mui/material";
// import RoomFilters from "../components/roomFilter";
// import RoomCard from "../components/roomCard";

// function Rooms() {
//   const [filters, setFilters] = useState({});
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchRooms = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:7777/room`, {
//         method: "GET",
//         headers: {
//           // Your required headers
//         },
//         // Construct query parameters from filters
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setRooms(data);
//       } else {
//         console.error("Failed to fetch rooms");
//       }
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, [filters]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   const handleClearFilters = () => {
//     setFilters({});
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <Typography variant="h4" style={{ marginBottom: "20px" }}>
//         Available Rooms
//       </Typography>
//       <RoomFilters
//         filters={filters}
//         onFilterChange={handleFilterChange}
//         onClearFilters={handleClearFilters}
//       />
//       {loading ? (
//         <Typography>Loading...</Typography>
//       ) : (
//         rooms.map((room, index) => (
//           <RoomCard key={index} room={room} hotel={room.hotel} />
//         ))
//       )}
//     </div>
//   );
// }

// export default Rooms;

import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import RoomFilters from "../components/roomFilter";
import RoomCard from "../components/roomCard";

function Rooms() {
  const [filters, setFilters] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

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
            // Add any other headers needed for authentication or other purposes
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
    fetchRooms(); // Fetch rooms when the component mounts and when filters change
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // This will trigger the useEffect and thus re-fetch the rooms
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
      ) : rooms.length > 0 ? (
        rooms.map((room, index) => <RoomCard key={index} room={room} />)
      ) : (
        <Typography>No rooms available with the selected filters.</Typography>
      )}
    </div>
  );
}

export default Rooms;
