-- find customers and employees by name, helpful when email/sin are unknown
CREATE INDEX customer_last_name_asc ON customer(last_name);
CREATE INDEX employee_last_name_asc ON employee(last_name);

-- room relation will be rarely updated, 
-- but queried very often by price, capacity, and by hotel
CREATE INDEX room_price_asc ON room(price);
CREATE INDEX room_capacity_asc ON room(capacity);
CREATE INDEX room_hotel_id_asc ON room(capacity);