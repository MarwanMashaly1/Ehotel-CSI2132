-- Check trigger for end date
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
BEFORE INSERT OR UPDATE ON renting
FOR EACH ROW EXECUTE FUNCTION check_end_date();

-- Check trigger for email format
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
CREATE OR REPLACE FUNCTION check_phone_number_format_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF LENGTH(NEW.phone_number) != 10 OR NEW.phone_number !~ '^\d{10}$' THEN
        RAISE EXCEPTION 'Phone number must be 10 digits and contain only numbers';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_phone_number_format
BEFORE INSERT OR UPDATE ON contact_phone
FOR EACH ROW EXECUTE FUNCTION check_phone_number_format_trigger();

-- Check constraint for email format on customer table
ALTER TABLE customer
ADD CONSTRAINT check_email_format_customer
CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

-- Check constraint for SSN format on employee table
ALTER TABLE employee
ADD CONSTRAINT chk_ssn_format_employee
CHECK (sin ~ '^\d{9}$');

-- Check constraint for booking dates
ALTER TABLE booking
ADD CONSTRAINT check_booking_dates
CHECK (start_date < end_date);

-- Check constraint for renting dates
ALTER TABLE renting
ADD CONSTRAINT check_renting_dates
CHECK (start_date < end_date);

-- Check constraint for phone number format on contact_phone table
ALTER TABLE contact_phone
ADD CONSTRAINT check_phone_number_format
CHECK (phone_number ~ '^\d{10}$');

-- Check constraint for email format on contact_email table
ALTER TABLE contact_email
ADD CONSTRAINT check_email_format
CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');