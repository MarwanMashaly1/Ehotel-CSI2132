import "./App.css";
import Home from "./Pages/Home";
import Customers from "./Pages/customerPortal";
import CustomersList from "./Pages/customersList";
import EmployeesList from "./Pages/EmployeesList";
import Employees from "./Pages/employeePortal";
import Hotels from "./Pages/hotels";
import Rooms from "./Pages/rooms";
import Bookings from "./Pages/Bookings";
import Rentals from "./Pages/Rentals";
import CreateRoom from "./Pages/CreateRoom";
import HotelData from "./Pages/HotelData";
// import Employees from "./Pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import react router

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/customersList" element={<CustomersList />} />
          <Route path="/employeesList" element={<EmployeesList />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/rentings" element={<Rentals />} />
          <Route path="/createRoom" element={<CreateRoom />} />
          <Route path="/hotelData" element={<HotelData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
