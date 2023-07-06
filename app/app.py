from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate
from models import db, User, Appointment, Service

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def home():
    return '<h1>Beauty application</h1>'

# User registration and login
@app.route('/users', methods=['POST', 'GET'])
def handle_users():
    if request.method == 'POST':
        # Create a new user
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')

        # Perform any necessary validation or checks on the input data

        # Create a new user
        user = User(name=name, email=email, password=password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'})
    elif request.method == 'GET':
        # User login
        email = request.args.get('email')
        password = request.args.get('password')

        # Find the user by email and check the password
        user = User.query.filter_by(email=email).first()
        if user is None or user.password != password:
            return jsonify({'error': 'Login failed'}), 401

        return jsonify({'message': 'Login successful'})
# Get a specific user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    user_data = {
        'id': user.id,
        'name': user.name,
        'email': user.email
    }

    return jsonify(user_data)

# Update a user by ID
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # Update user data based on request JSON payload
    user.name = request.json.get('name', user.name)
    user.email = request.json.get('email', user.email)
    user.password = request.json.get('password', user.password)

    db.session.commit()

    return jsonify({'message': 'User updated successfully'})

# Delete a user by ID
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'})

# Create a new appointment
from datetime import datetime

@app.route('/appointments', methods=['POST'])
def create_appointment():
    name = request.json.get('name')
    service_id = request.json.get('service')
    date_str = request.json.get('date')

    # Perform any necessary validation or checks on the input data

    # Find the selected service
    service = Service.query.get(service_id)
    
    if service is None:
        return jsonify({'error': 'Invalid service ID'}), 400

    # Convert the date string to a Python date object
    date = datetime.strptime(date_str, '%Y-%m-%d').date()

    # Create a new appointment
    appointment = Appointment(
        name=name,
        services=[service],
        date=date
    )
    db.session.add(appointment)
    db.session.commit()

    return jsonify({'message': 'Appointment created successfully'})


# Get all appointments
@app.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    appointment_list = []
    for appointment in appointments:
        appointment_data = {
            'id': appointment.id,
            'customer_name': appointment.customer_name,
            'service': appointment.service,
            'date': appointment.date
        }
        appointment_list.append(appointment_data)

    return jsonify(appointment_list)

@app.route('/services_name', methods=['GET'])
def get_services_name():
    services = Service.query.all()
    service_names = [service.name for service in services]
    return jsonify(service_names)

# Create a new service
@app.route('/services', methods=['POST'])
def create_service():
    name = request.json.get('name')
    price = request.json.get('price')
    description = request.json.get('description')
    image_url = request.json.get('image_url')
    # Perform any necessary validation or checks on the input data
    # Create a new service
    service = Service(name=name, price=price, description=description, image_url=image_url)
    db.session.add(service)
    db.session.commit()
    return jsonify({'message': 'Service created successfully'})

# Get all services
@app.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    service_list = []
    for service in services:
        service_data = {
            'id': service.id,
            'name': service.name,
            'price': service.price,
            'description': service.description,
            'image_url': service.image_url
        }
        service_list.append(service_data)
    return jsonify(service_list)
# Get a specific service by ID
@app.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    service = Service.query.get(service_id)
    if service is None:
        return jsonify({'error': 'Service not found'}), 404
    service_data = {
        'id': service.id,
        'name': service.name,
        'price': service.price,
        'description': service.description,
        'image_url': service.image_url
    }
    return jsonify(service_data)
# Update a service by ID
@app.route('/services/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    service = Service.query.get(service_id)
    if service is None:
        return jsonify({'error': 'Service not found'}), 404
    # Update service data based on request JSON payload
    service.name = request.json.get('name', service.name)
    service.price = request.json.get('price', service.price)
    service.description = request.json.get('description', service.description)
    service.image_url = request.json.get('image_url', service.image_url)
    db.session.commit()
    return jsonify({'message': 'Service updated successfully'})
# Delete a service by ID
@app.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Service.query.get(service_id)
    if service is None:
        return jsonify({'error': 'Service not found'}), 404
    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Service deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
