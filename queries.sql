-- Query #1
SELECT name, rating FROM hotel WHERE hotel_chain_name = 'Holiday Inn' OR hotel_chain_name = 'Sheraton Hotels and Resorts';

-- Query #2
SELECT name, rating FROM hotel WHERE hotel_chain_name = 'Holiday Inn'
UNION
SELECT name, rating FROM hotel WHERE hotel_chain_name = 'Sheraton Hotels and Resorts';

-- Query #3: Aggregation
SELECT COUNT(hotel_id) FROM hotel WHERE num_rooms > 200;

-- Query #4: Nested
SELECT name FROM hotel WHERE contact_email_id IN
(
	SELECT contact_email_id FROM contact_email WHERE email = 'reservations-vancouver@sandman.ca'
);