import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import CustomerModal from "../components/customerModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:7777/customers");
      const data = await response.json();
      console.log(data);
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleDeleteCustomer = async (email) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(
          `http://localhost:7777/customer?email=${email}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete customer");
        setModalOpen(false); // Close any open modal
        fetchCustomers(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setModalOpen(true);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Grid container spacing={3}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer[0]}>
            <Card variant="outlined" onClick={() => handleOpenModal(customer)}>
              <CardContent>
                <Typography variant="h5">
                  {customer[3]} {customer[4]}
                </Typography>
                <Typography color="text.secondary">{customer[0]}</Typography>
                {/* customer address */}
                <Typography color="text.secondary">
                  {customer[4]}, {customer[5]}, {customer[6]}, {customer[7]}
                </Typography>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(customer);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCustomer(customer[0]);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {modalOpen && (
        <CustomerModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          customer={selectedCustomer}
          onSave={() => {
            fetchCustomers();
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CustomersList;
