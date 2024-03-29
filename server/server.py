from flask import Flask, request, g
from flask_cors import CORS
import psycopg2

# Database info (replace with your database details)
DATABASE="ehotel"
USER=""
PASSWORD=""
HOST="localhost"
PORT="5432"

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

    if request.method == 'GET':
        if room_number:
            query = """
            SELECT h.hotel_chain_name, r.room_number, h.province, h.city, h.street_name, h.street_number, r.capacity, r.view, r.price
            FROM room AS r NATURAL JOIN hotel as h
            """
            query += f"WHERE room_number = {room_number}"
        # query from user search
        else:
            query = """
            SELECT h.hotel_chain_name, r.room_number, h.province, h.city, h.street_name, h.street_number, r.capacity, r.view, r.price, r.extendable 
            FROM room AS r NATURAL JOIN hotel AS h 
            WHERE NOT EXISTS (
                SELECT * 
                FROM room 
                NATURAL JOIN hotel 
                NATURAL LEFT JOIN booked_room 
                NATURAL JOIN booking """
            query += f"WHERE (booking.end_date < '{start_date}' OR booking.start_date > '{end_date}')) "

            if capacity:
                query += f" AND r.capacity = {wanted_capacity}"
            if province:
                query += f" AND h.province = {province} "
                if city: 
                    query += f" AND h.city = {city} "
            if hotel_chain:
                query += f" AND h.hotel_chain_name = {hotel_chain} "
            if num_rooms: 
                query += f" AND h.num_rooms >= {num_rooms} "
            # if category:
            #     query += f"AND h.category = {category} "
            if max_price:
                query += f"AND r.price <= {max_price} "
        cursor.execute(query)
        room = cursor.fetchall()
        cursor.close()
        connection.close()
        return room
    elif request.method == 'POST':
        query = f"INSERT INTO room VALUES ({room_number},{price}.0,null,{capacity},'{view}',{extendable},null,{hotel_ID})"
    elif request.method == 'PUT':
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
    elif request.method == 'DELETE':
        query = f"DELETE FROM room WHERE room_number = {room_number}"
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
        query = f"SELECT * FROM customer WHERE email = '{email}'"
        cursor.execute(query)
        customer = cursor.fetchall()
        cursor.close()
        connection.close()
        return customer
    elif request.method == 'POST':
        query = f"INSERT INTO customer VALUES ('{email}','{password}','{first_name}','{last_name}','{street_number}','{street_name}','{apt_number}','{city}','{province}','{postal_code}','{register_date}')"
    elif request.method == 'PUT':
        query = "UPDATE customer SET "
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
        if register_date:
            query += f"register_date = '{register_date}', "
        query = query[:-2] + f" WHERE email = '{email}'"
    elif request.method == 'DELETE':
        query = f"DELETE FROM customer WHERE email = '{email}'"
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return 'OK'

# route with parameters should look like "/employee?sin=101-010-101"
@app.route("/employee", methods=['GET', 'POST', 'PUT', 'DELETE'])
def employee():

    connection = connect()
    cursor = connection.cursor()
    
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

    if request.method == 'GET':
        query = f"SELECT * FROM employee WHERE sin = '{sin}'"
        cursor.execute(query)
        employee = cursor.fetchall()
        cursor.close()
        connection.close()
        return employee
    elif request.method == 'POST':
        query = f"INSERT INTO employee VALUES ('{sin}','{password}','{first_name}','{last_name}','{street_number}','{street_name}','{apt_number}','{city}','{province}','{postal_code}',{rating},'{emp_role}','{hotel_ID}')"
        if emp_role == "manager":
            query += f";DELETE FROM manages WHERE (employee_sin = '{sin}' OR hotel_ID = {hotel_ID})"
            query += f";INSERT INTO manages VALUES ('{sin}',{hotel_ID})"
    elif request.method == 'PUT':
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
        query = query[:-2] + f" WHERE sin = '{sin}'"
        if emp_role == "manager":
            query += f";DELETE FROM manages WHERE (employee_sin = '{sin}' OR hotel_ID = {hotel_ID})"
            query += f";INSERT INTO manages VALUES ('{sin}',{hotel_ID})"
    elif request.method == 'DELETE':
        query = f"DELETE FROM manages WHERE employee_sin = '{sin}'"
        query += f";DELETE FROM employee WHERE sin = '{sin}'"
        query += f";UPDATE creates SET employee_sin = null WHERE employee_sin = '{sin}'"
    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return 'OK'

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
        query = f"SELECT * FROM hotel WHERE hotel_ID = {hotel_ID}"
        cursor.execute(query)
        hotel = cursor.fetchall()
        cursor.close()
        connection.close()
        return hotel
    elif request.method == 'POST':
        query = f"INSERT INTO hotel VALUES ({hotel_ID},'{name}','{street_number}','{street_name}','{apt_number}','{city}','{province}','{postal_code}',{rating},{num_rooms},'{hotel_chain_name}')"
    elif request.method == 'PUT':
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
    elif request.method == 'DELETE':
        query = f"DELETE FROM hotel WHERE hotel_ID = {hotel_ID}"

    cursor.execute(query)
    connection.commit()
    cursor.close()
    connection.close()
    return 'OK'

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
     

if __name__ == "__main__":
    # this port must match the port in 'proxy' in package.json
    app.run(port=7777, debug=True)
