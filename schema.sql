CREATE TABLE customer (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    street_number VARCHAR(100),
    street_name VARCHAR(100),
    apt_number VARCHAR(100),
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(100),
    register_date DATE
);

CREATE TABLE employee (
    sin VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    street_number VARCHAR(100),
    street_name VARCHAR(100),
    apt_number VARCHAR(100),
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(100),
    rating DECIMAL(10, 2),
    emp_role VARCHAR(100),
    hotel_ID INT,
    FOREIGN KEY (hotel_ID) REFERENCES hotel(hotel_ID)
);

CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    start_date DATE,
    start_time TIME,
    end_date DATE,
    end_time TIME
);

CREATE TABLE renting (
    renting_id SERIAL PRIMARY KEY,
    start_date DATE,
    start_time TIME,
    end_date DATE,
    end_time TIME
);

CREATE TABLE amenity (
    amenity_ID SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE damage (
    damage_ID SERIAL PRIMARY KEY,
    damage_name VARCHAR(100),
    description VARCHAR(100)
);

CREATE TABLE book (
    booking_id INT,
    customer_email VARCHAR(100),
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id),
    FOREIGN KEY (customer_email) REFERENCES customer(email)
);


CREATE TABLE rent(
    renting_id INT,
    customer_email VARCHAR(100),
    FOREIGN KEY (renting_id) REFERENCES renting(renting_id),
    FOREIGN KEY (customer_email) REFERENCES customer(email)
);

CREATE TABLE creates(
    employee_sin VARCHAR(100),
    renting_id INT,
    FOREIGN KEY (employee_sin) REFERENCES employee(sin),
    FOREIGN KEY (renting_id) REFERENCES renting(renting_id)
);

CREATE TABLE contact_email (
    contact_email_ID SERIAL PRIMARY KEY,
    email VARCHAR(100)
);

CREATE TABLE contact_phone (
    contact_phone_ID SERIAL PRIMARY KEY,
    phone_number VARCHAR(100)
);


CREATE TABLE central_office_address (
    central_office_address_ID SERIAL PRIMARY KEY,
    street_number VARCHAR(100),
    street_name VARCHAR(100),
    apt_number VARCHAR(100),
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(100)
);

CREATE TABLE hotel_chain (
    chain_name VARCHAR(100) PRIMARY KEY,
    num_hotels INT,
    contact_email_ID INT,
    contact_phone_ID INT,
    central_office_ID INT,
    FOREIGN KEY (contact_email_ID) REFERENCES contact_email(contact_email_ID),
    FOREIGN KEY (contact_phone_ID) REFERENCES contact_phone(contact_phone_ID),
    FOREIGN KEY (central_office_ID) REFERENCES central_office_address(central_office_address_ID)
);

CREATE TABLE hotel (
    hotel_ID SERIAL PRIMARY KEY,
    name VARCHAR(100),
    street_number VARCHAR(100),
    street_name VARCHAR(100),
    apt_number VARCHAR(100),
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(100),
    rating DECIMAL(10, 2),
    num_rooms INT,
    contact_email_ID INT,
    contact_phone_ID INT,
    hotel_chain_name VARCHAR(100),
    FOREIGN KEY (contact_email_ID) REFERENCES contact_email(contact_email_ID),
    FOREIGN KEY (contact_phone_ID) REFERENCES contact_phone(contact_phone_ID),
    FOREIGN KEY (hotel_chain_name) REFERENCES hotel_chain(chain_name)
);

CREATE TABLE room (
    room_number SERIAL PRIMARY KEY,
    price DECIMAL(10, 2),
    amenity_ID INT,
    FOREIGN KEY (amenity_ID) REFERENCES amenity(amenity_ID),
    capacity INT,
    view VARCHAR(100),
    extendable BOOLEAN,
    damage_ID INT,
    FOREIGN KEY (damage_ID) REFERENCES damage(damage_ID),
    hotel_ID INT,
    FOREIGN KEY (hotel_ID) REFERENCES hotel(hotel_ID)
);

CREATE TABLE booked_room (
    booking_id INT,
    room_number INT,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id),
    FOREIGN KEY (room_number) REFERENCES room(room_number)
);

CREATE TABLE rented_room (
    renting_id INT,
    room_number INT,
    FOREIGN KEY (renting_id) REFERENCES renting(renting_id),
    FOREIGN KEY (room_number) REFERENCES room(room_number)
);

CREATE TABLE manages (
    employee_sin VARCHAR(100),
    hotel_ID INT,
    FOREIGN KEY (employee_sin) REFERENCES employee(sin),
    FOREIGN KEY (hotel_ID) REFERENCES hotel(hotel_ID)
);
