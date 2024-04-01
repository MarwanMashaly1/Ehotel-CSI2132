DROP TRIGGER IF EXISTS trg_check_end_date ON booking;

CREATE OR REPLACE FUNCTION check_end_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.end_date <= NEW.start_date THEN
        RAISE EXCEPTION 'End date must be after start date';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_end_date
BEFORE INSERT OR UPDATE ON booking
FOR EACH ROW EXECUTE FUNCTION check_end_date();

-- Check trigger for email format
DROP TRIGGER IF EXISTS trg_check_email_format ON contact_email;

CREATE OR REPLACE FUNCTION check_email_format_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.email NOT LIKE '%@%' THEN
        RAISE EXCEPTION 'Email must contain "@" character';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_email_format
BEFORE INSERT OR UPDATE ON contact_email
FOR EACH ROW EXECUTE FUNCTION check_email_format_trigger();

-- Check trigger for phone number format
DROP TRIGGER IF EXISTS trg_check_phone_number_format ON contact_phone;

CREATE OR REPLACE FUNCTION check_phone_number_format_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.phone_number !~ '^\(\d{3}\) \d{3}-\d{4}$' THEN
        RAISE EXCEPTION 'Phone number must be in the format (XXX) XXX-XXXX';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_phone_number_format
BEFORE INSERT OR UPDATE ON contact_phone
FOR EACH ROW EXECUTE FUNCTION check_phone_number_format_trigger();

-- Check trigger for SSN format
DROP TRIGGER IF EXISTS trg_check_ssn_format ON employee;

CREATE OR REPLACE FUNCTION check_ssn_format_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.sin !~ '^\d{3}-\d{3}-\d{3}$' THEN
        RAISE EXCEPTION 'SSN must be in the format XXX-XXX-XXX';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_ssn_format
BEFORE INSERT OR UPDATE ON employee
FOR EACH ROW EXECUTE FUNCTION check_ssn_format_trigger();

-- Check constraint for email format on customer table
ALTER TABLE customer
DROP CONSTRAINT IF EXISTS check_email_format_customer;

ALTER TABLE customer
ADD CONSTRAINT check_email_format_customer
CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

-- Check constraint for SSN format on employee table
ALTER TABLE employee
DROP CONSTRAINT IF EXISTS chk_ssn_format_employee;

ALTER TABLE employee
ADD CONSTRAINT chk_ssn_format_employee
CHECK (sin ~ '^\d{3}-\d{3}-\d{3}$');

-- Check constraint for booking dates
ALTER TABLE booking 
DROP CONSTRAINT IF EXISTS check_booking_dates;

ALTER TABLE booking
ADD CONSTRAINT check_booking_dates
CHECK (start_date < end_date);

-- Check constraint for phone number format on contact_phone table
ALTER TABLE contact_phone
DROP CONSTRAINT IF EXISTS check_phone_number_format;

ALTER TABLE contact_phone
ADD CONSTRAINT check_phone_number_format
CHECK (phone_number ~ '^\(\d{3}\) \d{3}-\d{4}$');

-- Check constraint for email format on contact_email table
ALTER TABLE contact_email
DROP CONSTRAINT IF EXISTS check_email_format;

-- Check constraint for email format on contact_email table
ALTER TABLE contact_email
ADD CONSTRAINT check_email_format
CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

-- Create or replace the trigger
DROP TRIGGER IF EXISTS update_num_rooms_trigger ON room;

CREATE OR REPLACE FUNCTION update_num_rooms()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment num_rooms when a room is inserted
        UPDATE hotel
        SET num_rooms = num_rooms + 1
        WHERE hotel_ID = NEW.hotel_ID;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement num_rooms when a room is deleted
        UPDATE hotel
        SET num_rooms = num_rooms - 1
        WHERE hotel_ID = OLD.hotel_ID;
    END IF;
    RETURN NULL;
END;
$$
LANGUAGE plpgsql;

-- Attach the trigger to the hotel_rooms table
CREATE OR REPLACE TRIGGER update_num_rooms_trigger
AFTER INSERT OR DELETE ON room
FOR EACH ROW
EXECUTE FUNCTION update_num_rooms();
