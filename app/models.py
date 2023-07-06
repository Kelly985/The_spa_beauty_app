from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
db = SQLAlchemy()
appointments_services = Table('appointments_services', db.Model.metadata,
    Column('appointment_id', Integer, ForeignKey('appointments.id')),
    Column('service_id', Integer, ForeignKey('services.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)
class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    email = Column(String(50))
    password = Column(String(255))
    # The services relationship
    services = relationship('Service',
                            secondary=appointments_services,
                            backref='users',
                            primaryjoin='User.id == appointments_services.c.user_id',
                            secondaryjoin='Service.id == appointments_services.c.service_id')
class Service(db.Model):
    __tablename__ = 'services'
    id = Column(Integer, primary_key=True)
    image_url = Column(String(255))
    name = Column(String(50))
    price = Column(Integer)
    description = Column(String(255))
    # The appointments relationship
    appointments = relationship('Appointment', secondary=appointments_services)
class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))  # Added foreign key constraint
    # The user relationship
    user = relationship('User', backref='appointments')
    # The services relationship
    services = relationship('Service', secondary=appointments_services, backref='service_appointments')