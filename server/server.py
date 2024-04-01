from flask import Flask, request, g
from flask_cors import CORS
import psycopg2

# Database info (replace with your database details)
DATABASE="ehotel"
USER=""
PASSWORD=""
HOST=""
PORT=""

def connect():
    return psycopg2.connect(database=DATABASE, user=USER, password=PASSWORD, host=HOST, port=PORT)

app = Flask(__name__)

# allow cross-origin requests
CORS(app)

@app.teardown_appcontext
def close_db(error):
    if 'db' in g:
        g.cursor.close()
        g.db.close()

# route with parameters should look like "/room?startDate=2023-05-08&endDate=2023-05-16"
@app.route("/room", methods=['GET', 'POST', 'PUT', 'DELETE'])
def room():

    connection = connect()
    cursor = connection.cursor()

    hotel_ID = request.args.get('hotelID', None)
    room_number = request.args.get('roomNumber', None)
    price = request.args.get('price', None)
    capacity = request.args.get('capacity', None)
    extendable = request.args.get('extendable', None)
    view = request.args.get('view', None)
    start_date = request.args.get('startDate', None)
    end_date = request.args.get('endDate', None)
    wanted_capacity = request.args.get('capacity', None)
    province = request.args.get('province', None)
    city = request.args.get('city', None)
    hotel_chain = request.args.get('hotelChain', None)
    num_rooms = request.args.get('numRooms', None)
    # category = request.args.get('category', None)
    max_price = request.args.get('price', None)
    amenity_ID = request.args.get('amenityID', None)
    damage_ID = request.args.get('damageID', None)
    amenity_name = request.args.get('amenityName', None)
    damage_name = request.args.get('damageName', None)

    

    if request.method == 'GET':
        if room_number:
            query = """
            SELECT h.hotel_chain_name, r.room_number, h.province, h.city, h.street_name, h.street_number,
           r.capacity, r.view, r.price, r.extendable, r.amenity_ID, r.damage_ID
            FROM room AS r
            JOIN hotel AS h ON r.hotel_id = h.hotel_ID

            """
            query += f"WHERE room_number = {room_number}"
        # query from user search
        elif start_date and end_date:
            query = """
            SELECT 
                h.hotel_chain_name, 
                r.room_number, 
                h.province, 
                h.city, 
                h.street_name, 
                h.street_number, 
                r.capacity, 
                r.view, 
                r.price, 
                r.extendable,
                r.amenity_ID, r.damage_ID,
                a.name, 
                d.description
                FROM room AS r 
                NATURAL JOIN hotel AS h 
                LEFT JOIN amenity AS a ON r.amenity_ID = a.amenity_ID
                LEFT JOIN damage AS d ON r.damage_ID = d.damage_ID
                WHERE NOT EXISTS (
                    SELECT * 
                    FROM room AS option
                    NATURAL LEFT JOIN booking

                
            """
            query += f"WHERE option.room_number = r.room_number AND NOT (booking.end_date < '{start_date}' OR booking.start_date > '{end_date}')) "
            if capacity:
                query += f" AND r.capacity = {wanted_capacity}"
            if province:
                query += f" AND h.province = '{province}' "
            if city: 
                query += f" AND h.city = '{city}' "
            if hotel_chain:
                query += f" AND h.hotel_chain_name = '{hotel_chain}' "
            if num_rooms: 
                query += f" AND h.num_rooms >= {num_rooms} "
            # if category:
            #     query += f"AND h.category = {category} "
            if max_price:
                query += f"AND r.price <= {max_price} "
            if view:
                query += f"AND r.view = '{view}' "
            if extendable:
                query += f"AND r.extendable = {extendable} "
            if hotel_ID:
                query += f"AND h.hotel_ID = {hotel_ID} "
            if amenity_ID:
                query += f"AND r.amenity_ID = {amenity_ID} "
            if damage_ID:
                query += f"AND r.damage_ID = {damage_ID} "
            if amenity_name:
                query += f"AND a.name = '{amenity_name}' "
            if damage_name:
                query += f"AND d.damage_name = '{damage_name}' "
        else:
            cursor.close()
            connection.close()
            return 'Missing roomNumber OR (startDate AND endDate)'
        cursor.execute(query)
        room = cursor.fetchall()
        cursor.close()
        connection.close()
        return room
    elif request.method == 'POST':
        if room_number and price and capacity and view and extendable and hotel_ID:
            query = f"INSERT INTO room VALUES ({room_number},{price}.0,null,{capacity},'{view}',{extendable},null,{hotel_ID})"
        else:
            cursor.close()
            connection.close()
            return 'Missing at least one of roomNumber, price, capacity, view, extendable, hotelID'
    elif request.method == 'PUT':
        if room_number:
            query = "UPDATE room SET "
            if price:
                query += f"price = {price}, "
            if capacity:
                query += f"capacity = {capacity}, "
            if view:
                query += f"view = '{view}', "
            if extendable:
                query += f"extendable = {extendable}, "
            query = query[:-2] + f" WHERE room_number = {room_number}"
        else:
            cursor.close()
            connection.close()
            return 'Missing roomNumber'
    elif request.method == 'DELETE':
        if room_number:
            query = f"UPDATE booking SET room_number = null WHERE room_number = {room_number}; "
            query += f"DELETE FROM room WHERE room_number = {room_number};"
        else:
            cursor.close()
            connection.close()
            return 'Missing roomNumber'

    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return 'OK'

# route with parameters should look like "/customer?email=john@doe.com"
@app.route("/customer", methods=['GET', 'POST', 'PUT', 'DELETE'])
def customer():

    connection = connect()
    cursor = connection.cursor()

    email = request.args.get('email', None)
    password = request.args.get('password', None)
    identification = request.args.get('identification', None)
    first_name = request.args.get('firstName', None)
    last_name = request.args.get('lastName', None)
    street_number = request.args.get('streetNumber', None)
    street_name = request.args.get('streetName', None)
    apt_number = request.args.get('aptNumber', None)
    city = request.args.get('city', None)
    province = request.args.get('province', None)
    postal_code = request.args.get('postalCode', None)
    register_date = request.args.get('registerDate', None)

    if request.method == 'GET':
        if email:
            query = f"SELECT * FROM customer WHERE email = '{email}'"
            cursor.execute(query)
            customer = cursor.fetchall()
            cursor.close()
            connection.close()
            return customer
        else:
            cursor.close()
            connection.close()
            return 'Missing email'
    elif request.method == 'POST':
        data = request.get_json()
        email = data.get('email', None)
        password = data.get('password', None)
        identification = data.get('identification', None)
        first_name = data.get('firstName', None)
        last_name = data.get('lastName', None)
        street_number = data.get('streetNumber', None)
        street_name = data.get('streetName', None)
        apt_number = data.get('aptNumber', None)
        city = data.get('city', None)
        province = data.get('province', None)
        postal_code = data.get('postalCode', None) 
        register_date = data.get('registerDate', None)



        if email and password and identification and first_name and last_name and street_number and street_name and apt_number and city and province and postal_code and register_date:
            # check if email already exists
            query = f"SELECT * FROM customer WHERE email = '{email}'"
            cursor.execute(query)
            customer = cursor.fetchall()
            if customer:
                cursor.close()
                connection.close()
                # return a 409 status code and a message
                return 'Email already exists'
            query = f"INSERT INTO customer VALUES ('{email}','{password}','{identification}','{first_name}','{last_name}','{street_number}','{street_name}','{apt_number}','{city}','{province}','{postal_code}','{register_date}')"
        else:
            cursor.close()
            connection.close()
            return 'Missing at least one of email, password, firstName, lastName, streetNumber, streetName, aptNumber, city, province, postalCode, registerDate'
    elif request.method == 'PUT':
        data = request.get_json()
        email = data.get('email', None)
        password = data.get('password', None)
        identification = data.get('identification', None)
        first_name = data.get('firstName', None)
        last_name = data.get('lastName', None)
        street_number = data.get('streetNumber', None)
        street_name = data.get('streetName', None)
        apt_number = data.get('aptNumber', None)
        city = data.get('city', None)
        province = data.get('province', None)
        postal_code = data.get('postalCode', None)
        register_date = data.get('registerDate', None)
        if email:
            query = "UPDATE customer SET "
            if password:
                query += f"password = '{password}', "
            if identification:
                query += f"identification = '{identification}', "
            if first_name:
                query += f"first_name = '{first_name}', "
            if last_name:
                query += f"last_name = '{last_name}', "
            if street_number:
                query += f"street_number = '{street_number}', "
            if street_name:
                query += f"street_name = '{street_name}', "
            if apt_number:
                query += f"apt_number = '{apt_number}', "
            if city:
                query += f"city = '{city}', "
            if province:
                query += f"province = '{province}', "
            if postal_code:
                query += f"postal_code = '{postal_code}', "
            if register_date:
                query += f"register_date = '{register_date}', "
            query = query[:-2] + f" WHERE email = '{email}'"
        else:
            cursor.close()
            connection.close()
            return 'Missing email'
    elif request.method == 'DELETE':
        if email:
            query = f"UPDATE booking SET customer_email = null WHERE customer_email = '{email}'; "
            query += f"DELETE FROM customer WHERE email = '{email}'"
        else:
            cursor.close()
            connection.close()
            return 'Missing email'
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return 'OK'

#  route for all customers
@app.route("/customers", methods=['GET'])
def customers():
    connection = connect()
    cursor = connection.cursor()
    query = "SELECT * FROM customer"
    cursor.execute(query)
    customers = cursor.fetchall()
    cursor.close()
    connection.close()
    return customers


# route with parameters should look like "/employee?sin=101-010-101"
@app.route("/employee", methods=['GET', 'POST', 'PUT', 'DELETE'])
def employee():

    connection = connect()
    cursor = connection.cursor()

    if request.method == 'GET':
        sin = request.args.get('sin', None)
        password = request.args.get('password', None)
        first_name = request.args.get('firstName', None)
        last_name = request.args.get('lastName', None)
        street_number = request.args.get('streetNumber', None)
        street_name = request.args.get('streetName', None)
        apt_number = request.args.get('aptNumber', None)
        city = request.args.get('city', None)
        province = request.args.get('province', None)
        postal_code = request.args.get('postalCode', None)
        rating  = request.args.get('rating', None)
        emp_role = request.args.get('empRole', None)
        hotel_ID = request.args.get('hotelID', None)
        if sin:
            query = f"SELECT * FROM employee WHERE sin = '{sin}'"
            cursor.execute(query)
            employee = cursor.fetchall()
            cursor.close()
            connection.close()
            return employee
        else:
            cursor.close()
            connection.close()
            return 'Missing sin'
    elif request.method == 'POST':
        data = request.get_json()
        sin = data.get('sin', None)
        password = data.get('password', None)
        first_name = data.get('firstName', None)
        last_name = data.get('lastName', None)
        street_number = data.get('streetNumber', None)
        street_name = data.get('streetName', None)
        apt_number = data.get('aptNumber', None)
        city = data.get('city', None)
        province = data.get('province', None)
        postal_code = data.get('postalCode', None)
        rating = data.get('rating', None)
        emp_role = data.get('empRole', None)
        hotel_ID = data.get('hotelID', None)
        print(sin, password, first_name, last_name, street_number, street_name, apt_number, city, province, postal_code, rating, emp_role, hotel_ID)
        if sin and password and first_name and last_name and street_number and street_name and apt_number and city and province and postal_code and rating and emp_role and hotel_ID:
            query = f"INSERT INTO employee VALUES ('{sin}','{password}','{first_name}','{last_name}','{street_number}','{street_name}','{apt_number}','{city}','{province}','{postal_code}',{rating},'{emp_role}','{hotel_ID}')"
            if emp_role == "manager":
                query += f";DELETE FROM manages WHERE (employee_sin = '{sin}' OR hotel_ID = {hotel_ID})"
                query += f";INSERT INTO manages VALUES ('{sin}',{hotel_ID})"
        else:
            cursor.close()
            connection.close()
            return 'Missing at least one of sin, password, firstName, lastName, streetNumber, streetName, aptNumber, city, province, postalCode, rating, empRole, hotelID'
    elif request.method == 'PUT':
        if sin:
            query = "UPDATE employee SET "
            if password:
                query += f"password = '{password}', "
            if first_name:
                query += f"first_name = '{first_name}', "
            if last_name:
                query += f"last_name = '{last_name}', "
            if street_number:
                query += f"street_number = '{street_number}', "
            if street_name:
                query += f"street_name = '{street_name}', "
            if apt_number:
                query += f"apt_number = '{apt_number}', "
            if city:
                query += f"city = '{city}', "
            if province:
                query += f"province = '{province}', "
            if postal_code:
                query += f"postal_code = '{postal_code}', "
            if rating:
                query += f"rating = {rating}, "
            if emp_role:
                query += f"emp_role = '{emp_role}', "
            if hotel_ID:
                query += f"hotel_ID = {hotel_ID}, "
                if not emp_role:
                    return 'Missing empRole'
            query = query[:-2] + f" WHERE sin = '{sin}'"
            if emp_role == "manager":
                if hotel_ID:
                    query += f";DELETE FROM manages WHERE employee_sin = '{sin}'"
                    query += f";INSERT INTO manages VALUES ('{sin}',{hotel_ID})"
                else:
                    cursor.close()
                    connection.close()
                    return 'Missing hotelID'
        else:
            cursor.close()
            connection.close()
            return 'Missing sin'
    elif request.method == 'DELETE':
        if sin:
            query = f"DELETE FROM manages WHERE employee_sin = '{sin}'; "
            query += f"UPDATE renting SET employee_sin = null WHERE employee_sin = '{sin}'; "
            query += f"DELETE FROM employee WHERE sin = '{sin}'"
        else:
            cursor.close()
            connection.close()
            return 'Missing sin'
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return 'OK'

# route for all employees
@app.route("/employees", methods=['GET'])
def employees():
    connection = connect()
    cursor = connection.cursor()
    query = "SELECT * FROM employee"
    cursor.execute(query)
    employees = cursor.fetchall()
    cursor.close()
    connection.close()
    return employees

# route with parameters should look like "/hotel?hotelID=1"
@app.route("/hotel", methods=['GET', 'POST', 'PUT', 'DELETE'])
def hotel():

    connection = connect()
    cursor = connection.cursor()

    hotel_ID = request.args.get('hotelID', None)
    name = request.args.get('name', None)
    street_number = request.args.get('streetNumber', None)
    street_name = request.args.get('streetName', None)
    apt_number = request.args.get('aptNumber', None)
    city = request.args.get('city', None)
    province = request.args.get('province', None)
    postal_code = request.args.get('postalCode', None)
    rating = request.args.get('rating', None)
    num_rooms = request.args.get('numRooms', None)
    hotel_chain_name = request.args.get('hotelChainName', None)

    if request.method == 'GET':
        if hotel_ID:
            query = f"SELECT * FROM hotel WHERE hotel_ID = {hotel_ID}"
            cursor.execute(query)
            hotel = cursor.fetchall()
            cursor.close()
            connection.close()
            return hotel
        else:
            cursor.close()
            connection.close()
            return 'Missing hotelID'
    elif request.method == 'POST':
        data = request.get_json()
        hotel_ID = data.get('hotelID', None)
        name = data.get('name', None)
        street_number = data.get('streetNumber', None)
        street_name = data.get('streetName', None)
        apt_number = data.get('aptNumber', None)
        city = data.get('city', None)
        province = data.get('province', None)
        postal_code = data.get('postalCode', None)
        rating = data.get('rating', None)
        num_rooms = data.get('numRooms', None)
        hotel_chain_name = data.get('hotelChainName', None)

        if hotel_ID and name and street_number and street_name and apt_number and city and province and postal_code and rating and num_rooms and hotel_chain_name:
            query = f"INSERT INTO hotel VALUES ({hotel_ID},'{name}','{street_number}','{street_name}','{apt_number}','{city}','{province}','{postal_code}',{rating},{num_rooms},null,null,'{hotel_chain_name}')"
        else:
            cursor.close()
            connection.close()
            return 'Missing at least one of hotelID, name, streetNumber, streetName, aptNumber, city, province, postalCode, rating, numRooms, hotelChainName'
    elif request.method == 'PUT':
        if hotel_ID:
            query = "UPDATE hotel SET "
            if name:
                query += f"name = '{name}', "
            if street_number:
                query += f"street_number = '{street_number}', "
            if street_name:
                query += f"street_name = '{street_name}', "
            if apt_number:
                query += f"apt_number = '{apt_number}', "
            if city:
                query += f"city = '{city}', "
            if province:
                query += f"province = '{province}', "
            if postal_code:
                query += f"postal_code = '{postal_code}', "
            if rating:
                query += f"rating = {rating}, "
            if num_rooms:
                query += f"num_rooms = {num_rooms}, "
            if hotel_chain_name:
                query += f"hotel_chain_name = '{hotel_chain_name}', "
            query = query[:-2] + f" WHERE hotel_ID = {hotel_ID}"
        else:
            cursor.close()
            connection.close()
            return 'Missing hotelID'
    elif request.method == 'DELETE':
        if hotel_ID:
            query = f"UPDATE employee SET hotel_ID = null WHERE hotel_ID = ANY (SELECT hotel_ID FROM employee WHERE hotel_ID = {hotel_ID}); "
            query += f"UPDATE booking SET room_number = null emp_role = 'pending' WHERE room_number = ANY (SELECT room_number FROM room WHERE hotel_ID = {hotel_ID}); "
            query += f"DELETE FROM manages WHERE hotel_ID = {hotel_ID}; "
            query += f"DELETE FROM room WHERE hotel_ID = {hotel_ID}; "
            query += f"DELETE FROM hotel WHERE hotel_ID = {hotel_ID}; "
        else:
            cursor.close()
            connection.close()
            return 'Missing hotelID'

    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return 'OK'

@app.route("/booking", methods=['GET','POST'])
def booking():

    connection = connect()
    cursor = connection.cursor()

    booking_ID = request.args.get('bookingID', None)
    room_number = request.args.get('roomNumber', None)
    customer_email = request.args.get('customerEmail', None)
    start_date = request.args.get('startDate', None)
    end_date = request.args.get('endDate', None)
    
    if request.method == 'GET':
        if booking_ID:
            query = f"SELECT * FROM booking WHERE booking_ID = {booking_ID}"
            cursor.execute(query)
            booking = cursor.fetchall()
            cursor.close()
            connection.close()
            return booking
        elif customer_email:
            query = f"SELECT * FROM booking WHERE customer_email = '{customer_email}'"
            cursor.execute(query)
            booking = cursor.fetchall()
            cursor.close()
            connection.close()
            return booking
        else:
            cursor.close()
            connection.close()
            return 'Missing customerEmail'
    elif request.method == 'POST':
        data = request.get_json()
        room_number = data.get('roomNumber', None)
        customer_email = data.get('customerEmail', None)
        start_date = data.get('startDate', None)
        end_date = data.get('endDate', None)

        if room_number and customer_email and start_date and end_date:
            query = f"SELECT * FROM room NATURAL LEFT JOIN booking WHERE (room_number = {room_number} AND (booking.end_date < '{start_date}' OR booking.start_date > '{end_date}')) "
            cursor.execute(query)
            room = cursor.fetchall()
            if room != []:
                cursor.close()
                connection.close()
                return 'Room already booked'
            query = f"INSERT INTO booking VALUES (DEFAULT,{room_number},'{customer_email}','{start_date}','{end_date}')"
            cursor.execute(query)
            connection.commit()
            query = f"SELECT booking_ID FROM booking WHERE room_number = {room_number} AND customer_email = '{customer_email}' AND start_date = '{start_date}' AND end_date = '{end_date}'"
            cursor.execute(query)
            booking_ID = cursor.fetchall()
            cursor.close()
            connection.close()
            return booking_ID
        else:
            cursor.close()
            connection.close()
            return 'Missing at least one of roomNumber, customerEmail, startDate, startTime, endDate, endTime'

@app.route("/bookings", methods=['GET','POST'])
def bookings():
    connection = connect()
    cursor = connection.cursor()

    query = "SELECT * FROM booking"
    cursor.execute(query)
    bookings = cursor.fetchall()
    cursor.close()
    connection.close()
    return bookings

@app.route("/renting", methods=['GET','POST'])
def renting():

    connection = connect()
    cursor = connection.cursor()

    renting_ID = request.args.get('rentingID', None)
    booking_ID = request.args.get('bookingID', None)
    employee_sin = request.args.get('employeeSin', None)

    if request.method == 'GET':
        if renting_ID:
            query = f"SELECT * FROM renting WHERE renting_ID = {renting_ID}"
        elif employee_sin:
            query = f"SELECT * FROM renting WHERE employee_sin = '{employee_sin}'"
        else:
            return 'Missing rentingID OR employeeSin'
        cursor.execute(query)
        rentings = cursor.fetchall()
        cursor.close()
        connection.close()
        return rentings
    if request.method == 'POST':
        data = request.get_json()
        booking_ID = data.get('bookingID', None)
        employee_sin = data.get('employeeSin', None)


        if booking_ID and employee_sin:
            query = f"INSERT INTO renting VALUES (DEFAULT,{booking_ID},'{employee_sin}')"
            cursor.execute(query)
            connection.commit()
            query = f"SELECT renting_ID FROM renting WHERE booking_ID = {booking_ID}"
            cursor.execute(query)
            renting_ID = cursor.fetchall()
            cursor.close()
            connection.close()
            return renting_ID
        else:
            cursor.close()
            connection.close()
            return 'Missing bookingID OR employeeSIN'
        
# get all rentals
        
@app.route("/rentings", methods=['GET'])
def rentings():
    connection = connect()
    cursor = connection.cursor()
    query = "SELECT * FROM renting"
    cursor.execute(query)
    rentings = cursor.fetchall()
    cursor.close()
    connection.close()
    return rentings

# hotels route
@app.route("/hotels", methods=['GET'])
def hotels():
    connection = connect()
    cursor = connection.cursor()

    # Join query to fetch all details including contact email and phone
    query = """
    SELECT h.*, ce.email AS contact_email, cp.phone_number AS contact_phone
    FROM hotel h
    LEFT JOIN contact_email ce ON h.contact_email_ID = ce.contact_email_ID
    LEFT JOIN contact_phone cp ON h.contact_phone_ID = cp.contact_phone_ID
    """
    cursor.execute(query)
    hotels = cursor.fetchall()
    cursor.close()
    connection.close()
    return hotels

@app.route("/view1", methods=['GET'])
def available_rooms_per_area():
    connection = connect()
    cursor = connection.cursor()
    query = "SELECT * FROM rooms_per_area"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    # Convert query results to a list of dictionaries to serialize them as JSON
    results_list = [{"city": result[0], "province": result[1], "available_rooms": result[2]} for result in results]
    return {"data": results_list}

@app.route("/view2", methods=['GET'])
def aggregated_capacity_per_hotel():
    connection = connect()
    cursor = connection.cursor()
    query = "SELECT * FROM Aggregated_Capacity_Per_Hotel"
    cursor.execute(query)
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    # Convert query results to a list of dictionaries to serialize them as JSON
    results_list = [{"hotel_ID": result[0], "total_capacity": result[1]} for result in results]
    return {"data": results_list}


@app.route("/amenities", methods=['GET'])
def amenities():
    connection = connect()
    cursor = connection.cursor()
    query = "SELECT * FROM amenity"
    cursor.execute(query)
    amenities = cursor.fetchall()
    cursor.close()
    connection.close()
    return {'amenities': amenities}

@app.route("/damages", methods=['GET'])
def damages():
    connection = connect()
    cursor = connection.cursor()
    query = "SELECT * FROM damage"
    cursor.execute(query)
    damages = cursor.fetchall()
    cursor.close()
    connection.close()
    return {'damages': damages}
if __name__ == "__main__":
    app.run(port=7777, debug=True)
