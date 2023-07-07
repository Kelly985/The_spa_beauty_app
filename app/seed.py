import random
from flask import Flask
from faker import Faker
from models import db, User, Appointment, Service,appointments_services
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
fake = Faker()


def seed_data():
    with app.app_context():
        # Create users
        for i in range(10):
            user = User(name=fake.name(), email=fake.email(), password='password')
            db.session.add(user)
        db.session.commit()

        # Create services
        # for i in range(10):
        #     price = random.randint(10, 100)  # Generate a random price between 10 and 100
        #     image_url = fake.image_url()  # Generate a fake image URL
        #     service = Service(name=fake.job(), description=fake.sentence(), price=price, image_url=image_url)
        #     db.session.add(service)
        # db.session.commit()

        # Create appointments and relationships
        for i in range(10):
            appointment = Appointment()
            user = User.query.get(random.randint(1, 10))
            appointment.user = user
            appointment.services = [
                Service.query.get(random.randint(1, 10)),
                Service.query.get(random.randint(1, 10)),
            ]
            db.session.add(appointment)

            # Create relationship entries in the appointments_services table
            for service in appointment.services:
                appointments_services.insert().values(
                    appointment_id=appointment.id,
                    service_id=service.id,
                    user_id=user.id
                )

        db.session.commit()


if __name__ == '__main__':
    seed_data()
    app.run()