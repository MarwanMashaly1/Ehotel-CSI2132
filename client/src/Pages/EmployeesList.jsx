import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmployeeModal from "../components/EmployeeModal";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:7777/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [refresh]);

  const handleOpenModal = (employee = null) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleDelete = async (sin) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await fetch(`http://localhost:7777/employee?sin=${sin}`, {
          method: "DELETE",
        });
        setRefresh(!refresh); // Refresh the list
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      <Button
        variant="contained"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 20 }}
      >
        Add Employee
      </Button>
      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} md={6} key={employee[0]}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {employee[2]} {employee[3]}
                </Typography>
                {/* address */}
                <Typography color="text.secondary">
                  Address:
                  {employee[4]}, {employee[5]}, {employee[6]}, {employee[7]},
                  {employee[8]} {employee[9]}
                </Typography>
                <Typography color="text.secondary">
                  SIN: {employee[0]}
                </Typography>
                <Typography color="text.secondary">
                  rating: {employee[10]}
                </Typography>
                <Typography color="text.secondary">
                  role: {employee[11]}
                </Typography>
                <Typography color="text.secondary">
                  hotel ID: {employee[12]}
                </Typography>
                <IconButton onClick={() => handleOpenModal(employee)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(employee[0])}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {modalOpen && (
        <EmployeeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          employee={selectedEmployee}
          onSave={() => setRefresh(!refresh)}
        />
      )}
    </div>
  );
};

export default EmployeesList;
