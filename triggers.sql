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
CREATE OR REPLACE FUNCTION delete_room_cleanup()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete bookings related to the room
    DELETE FROM booking WHERE room_number = OLD.room_number;

    -- Delete rentings related to the room
    DELETE FROM renting WHERE booking_ID IN (
        SELECT booking_id FROM booking WHERE room_number = OLD.room_number
    );

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_delete_room_cleanup
BEFORE DELETE ON room
FOR EACH ROW EXECUTE FUNCTION delete_room_cleanup();

CREATE OR REPLACE FUNCTION ensure_one_manager_per_hotel()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the hotel already has a manager
    IF EXISTS (
        SELECT 1 FROM manages
        WHERE hotel_ID = NEW.hotel_ID
    ) THEN
        RAISE EXCEPTION 'This hotel already has a manager.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ensure_one_manager
BEFORE INSERT OR UPDATE ON manages
FOR EACH ROW EXECUTE FUNCTION ensure_one_manager_per_hotel();