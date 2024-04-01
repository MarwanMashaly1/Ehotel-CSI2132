-- View 1
CREATE OR REPLACE VIEW rooms_per_area AS
SELECT province, city, SUM(num_rooms)
FROM hotel
GROUP BY province, city;

-- View 2
CREATE VIEW Aggregated_Capacity_Per_Hotel AS
SELECT hotel_ID, SUM(capacity) AS total_capacity
FROM room
GROUP BY hotel_ID;