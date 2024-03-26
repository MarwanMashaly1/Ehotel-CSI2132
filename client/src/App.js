import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import Customers from "./Pages/customerPortal";
import Employees from "./Pages/employeePortal";
import Rooms from "./Pages/rooms";
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
          <Route path="/hotels" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
