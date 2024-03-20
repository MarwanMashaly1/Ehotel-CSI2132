-- View 1
CREATE OR REPLACE VIEW rooms_per_area AS
SELECT province, city, SUM(num_rooms)
FROM hotel
GROUP BY province, city;

-- View 2
CREATE OR REPLACE VIEW capacity_in_hilton_lac_leamy AS
SELECT name, SUM(capacity)
FROM (SELECT name, hotel_ID FROM hotel WHERE name = 'Hilton Lac Leamy')
NATURAL JOIN room
GROUP BY name;