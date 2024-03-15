CREATE TRIGGER trg_check_end_date
BEFORE INSERT OR UPDATE ON renting
FOR EACH ROW
BEGIN
    IF NEW.end_date <= NEW.start_date THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'End date must be after start date';
    END IF;
END;

CREATE TRIGGER trg_check_email_format
BEFORE INSERT OR UPDATE ON contact_email
FOR EACH ROW
BEGIN
    IF NEW.email NOT LIKE '%@%' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email must contain "@" character';
    END IF;
END;

CREATE TRIGGER trg_check_phone_number_format
BEFORE INSERT OR UPDATE ON contact_phone
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.phone_number) != 10 OR NEW.phone_number REGEXP '[^0-9]' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Phone number must be 10 digits and contain only numbers';
    END IF;
END;

-- Add a check constraint
ALTER TABLE customer
ADD CONSTRAINT check_email_format_customer
CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

ALTER TABLE employee
ADD CONSTRAINT chk_ssn_format_employee
CHECK (ssn ~ '^[0-9]{9}$');

ALTER TABLE booking
ADD CONSTRAINT check_booking_dates
CHECK (start_date < end_date);

ALTER TABLE renting
ADD CONSTRAINT check_renting_dates
CHECK (start_date < end_date);

ALTER TABLE contact_phone
ADD CONSTRAINT check_phone_number_format
CHECK (phone_number ~ '^[0-9]{10}$');

ALTER TABLE contact_email
ADD CONSTRAINT check_email_format
CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');


