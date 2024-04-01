CREATE TABLE amenity (
    amenity_ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE damage (
    damage_ID SERIAL PRIMARY KEY,
    damage_name VARCHAR(100) NOT NULL,
    description VARCHAR(100)
);

CREATE TABLE contact_email (
    contact_email_ID SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL CHECK (email LIKE '%@%')
);

CREATE TABLE contact_phone (
    contact_phone_ID SERIAL PRIMARY KEY,
    phone_number VARCHAR(14) NOT NULL CHECK (phone_number ~ '^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$')
);

CREATE TABLE central_office_address (
    central_office_address_ID SERIAL PRIMARY KEY,
    street_number VARCHAR(100) NOT NULL,
    street_name VARCHAR(100) NOT NULL,
    apt_number VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL ,
    postal_code VARCHAR(100) NOT NULL
);

CREATE TABLE hotel_chain (
    chain_name VARCHAR(100) PRIMARY KEY,
    num_hotels INT CHECK (num_hotels > 0),
    contact_email_ID INT NOT NULL,
    contact_phone_ID INT NOT NULL,
    central_office_ID INT NOT NULL,
    FOREIGN KEY (contact_email_ID) REFERENCES contact_email(contact_email_ID),
    FOREIGN KEY (contact_phone_ID) REFERENCES contact_phone(contact_phone_ID),
    FOREIGN KEY (central_office_ID) REFERENCES central_office_address(central_office_address_ID)
);

CREATE TABLE hotel (
    hotel_ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    street_number VARCHAR(100) NOT NULL,
    street_name VARCHAR(100) NOT NULL,
    apt_number VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(100) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating BETWEEN 0 AND 5),
    num_rooms INT CHECK (num_rooms > 0),
    contact_email_ID INT NOT NULL,
    contact_phone_ID INT NOT NULL,
    hotel_chain_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (contact_email_ID) REFERENCES contact_email(contact_email_ID),
    FOREIGN KEY (contact_phone_ID) REFERENCES contact_phone(contact_phone_ID),
    FOREIGN KEY (hotel_chain_name) REFERENCES hotel_chain(chain_name)
);

CREATE TABLE room (
    room_number SERIAL PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    amenity_ID INT ,
    FOREIGN KEY (amenity_ID) REFERENCES amenity(amenity_ID),
    capacity INT NOT NULL CHECK (capacity > 0),
    view VARCHAR(100) NOT NULL,
    extendable BOOLEAN NOT NULL,
    damage_ID INT ,
    FOREIGN KEY (damage_ID) REFERENCES damage(damage_ID),
    hotel_ID INT,
    FOREIGN KEY (hotel_ID) REFERENCES hotel(hotel_ID)
);

CREATE TABLE customer (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    identification VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    street_number VARCHAR(100) NOT NULL,
    street_name VARCHAR(100) NOT NULL,
    apt_number VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(100) NOT NULL,
    register_date DATE 
);

CREATE TABLE employee (
    sin VARCHAR(100) PRIMARY KEY CHECK (sin ~ '^\d{3}-\d{3}-\d{3}$'),
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    street_number VARCHAR(100) NOT NULL,
    street_name VARCHAR(100) NOT NULL,
    apt_number VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(100) NOT NULL,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating BETWEEN 0 AND 5),
    emp_role VARCHAR(100) NOT NULL,
    hotel_ID INT NOT NULL,
    FOREIGN KEY (hotel_ID) REFERENCES hotel(hotel_ID)
);

CREATE TABLE manages (
    employee_sin VARCHAR(100) PRIMARY KEY,
    hotel_ID INT NOT NULL,
    FOREIGN KEY (employee_sin) REFERENCES employee(sin),
    FOREIGN KEY (hotel_ID) REFERENCES hotel(hotel_ID)
);

CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    room_number INT NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (room_number) REFERENCES room(room_number),
    FOREIGN KEY (customer_email) REFERENCES customer(email)
);

CREATE TABLE renting (
    renting_id SERIAL PRIMARY KEY,
    booking_ID INT NOT NULL,
    employee_sin VARCHAR(100) NOT NULL,
    FOREIGN KEY (booking_ID) REFERENCES booking,
    FOREIGN KEY (employee_sin) REFERENCES employee(sin)
);