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

DROP TRIGGER IF EXISTS trigger_ensure_one_manager ON manages;
CREATE TRIGGER trigger_ensure_one_manager
BEFORE INSERT OR UPDATE ON manages
FOR EACH ROW EXECUTE FUNCTION ensure_one_manager_per_hotel();

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
