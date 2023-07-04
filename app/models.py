from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, Table


db = SQLAlchemy()

Base = db.Model

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(50))
    password = Column(String(255))
    image = Column(String(5000))

    # The services relationship
    services = relationship('Service', secondary='appointments_services', backref='users')

class Service(db.Model):
    __tablename__ = 'services'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    description = Column(String(255))

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    service_ids = Column(String(255))

    # The user relationship
    user = relationship('User', backref='appointments')

    # The services relationship
    services = relationship('Service', secondary='appointments_services', backref='appointments')

# The appointments_services table
appointments_services = Table('appointments_services', Base.metadata,
    Column('appointment_id', Integer, ForeignKey('appointments.id')),
    Column('service_id', Integer, ForeignKey('services.id'))
)
