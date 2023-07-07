from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate
from models import db, User, Appointment, Service
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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
##############################################################################

# Create a new appointment
from datetime import datetime

@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    user_id = data.get('user_id')
    service_id = data.get('service_id')
    date = data.get('date')

    # Create the appointment using the received data
    appointment = Appointment(user_id=user_id, service_id=service_id, date=date)
    db.session.add(appointment)
    db.session.commit()

    return jsonify({'id': appointment.id})

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


###################################################################################################

# # Route to create a new service
@app.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    service = Service(image_url=data['image_url'], name=data['name'], price=data['price'], description=data['description'])
    db.session.add(service)
    db.session.commit()
    return jsonify({'message': 'Service created successfully.'}), 201

# Route to retrieve all services
@app.route('/services', methods=['GET'])
def get_all_services():
    services = Service.query.all()
    result = []
    for service in services:
        result.append({
            'id': service.id,
            'image_url': service.image_url,
            'name': service.name,
            'price': service.price,
            'description': service.description
        })
    return jsonify(result), 200

# Route to retrieve a specific service
@app.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    service = Service.query.get(service_id)
    if service:
        return jsonify({
            'id': service.id,
            'image_url': service.image_url,
            'name': service.name,
            'price': service.price,
            'description': service.description
        }), 200
    else:
        return jsonify({'message': 'Service not found.'}), 404

# Route to update a specific service
@app.route('/services/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    service = Service.query.get(service_id)
    if service:
        data = request.get_json()
        service.image_url = data['image_url']
        service.name = data['name']
        service.price = data['price']
        service.description = data['description']
        db.session.commit()
        return jsonify({'message': 'Service updated successfully.'}), 200
    else:
        return jsonify({'message': 'Service not found.'}), 404

# Route to delete a specific service
@app.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    service = Service.query.get(service_id)
    if service:
        db.session.delete(service)
        db.session.commit()
        return jsonify({'message': 'Service deleted successfully.'}), 200
    else:
        return jsonify({'message': 'Service not found.'}), 404

@app.route('/appointments/total', methods=['POST'])
def update_total_amount():
    data = request.json
    appointment_id = data.get('appointment_id')
    total_amount = data.get('total_amount')

    appointment = Appointment.query.get(appointment_id)
    if appointment:
        appointment.total_amount = total_amount
        db.session.commit()
        return jsonify({'message': 'Total amount updated successfully'})

    return jsonify({'message': 'Appointment not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
