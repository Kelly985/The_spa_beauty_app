from flask import Flask, request, jsonify
from flask_migrate import Migrate
from models import db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def home():
    return '<h1>Beauty application</h1>'

# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    # Perform any necessary validation or checks on the input data

    # Create a new user
    user = User(name=name, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'})

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
        user_list.append(user_data)

    return jsonify(user_list)

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
# Login route
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()

    if user is None or user.password != password:
        return jsonify({'error': 'Invalid email or password'}), 401

    return jsonify({'message': 'Login successful'})

@app.route('/signup', methods=['POST'])
def signup():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')

    # Perform any necessary validation or checks on the input data

    # Check if the user with the given email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 409

    # Create a new user
    user = User(name=name, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Signup successful'})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
