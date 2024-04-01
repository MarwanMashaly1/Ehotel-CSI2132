-- Query #1
SELECT name, rating FROM hotel WHERE hotel_chain_name = 'Holiday Inn' OR hotel_chain_name = 'Sheraton Hotels and Resorts';

-- Query #2: Aggregation
SELECT COUNT(hotel_id) FROM hotel WHERE num_rooms > 200;

-- Query #3: Nested
SELECT name FROM hotel WHERE contact_email_id IN
(
	SELECT contact_email_id FROM contact_email WHERE email = 'reservations-vancouver@sandman.ca'
);

-- Query #4: Something more complex
SELECT h.hotel_chain_name, r.room_number, h.province, h.city, h.street_name, h.street_number, r.capacity, r.view, r.price, r.extendable, r.amenity_ID, r.damage_ID, a.name, d.description
FROM room AS r 
NATURAL JOIN hotel AS h 
LEFT JOIN amenity AS a ON r.amenity_ID = a.amenity_ID
LEFT JOIN damage AS d ON r.damage_ID = d.damage_ID
WHERE NOT EXISTS (
	SELECT * 
    FROM room AS option
    NATURAL LEFT JOIN booking
	WHERE option.room_number = r.room_number AND NOT (booking.end_date < '2023-05-17' OR booking.start_date > '2023-06-22'))