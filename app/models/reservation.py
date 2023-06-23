from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# from sqlalchemy import Enum

# class ReservationStatus(Enum):
#     CONFIRMED = "confirmed"
#     CANCELLED = "cancelled"
#     ATTENDED = "attended"


class Reservation(db.Model):
    __tablename__ = 'reservations'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)
    number_of_people = db.Column(db.Integer, nullable=False)
    reservation_time = db.Column(db.DateTime, nullable=False)
    # status = db.Column(db.Enum(ReservationStatus), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default= datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)

    # user = db.relationship('User', backref='reservations')
    # restaurant = db.relationship('Restaurant', backref='reservations')

def to_dict(self):
    return {
        'id': self.id,
        'userId': self.user_id,
        'restaurantId': self.restaurant_id,
        'numberOfPeople': self.number_of_people,
        'reservationTime': self.reservation_time,
        'status': self.status,
        'notes': self.notes,
        'createdAt': self.created_at,
        'updatedAt': self.updated_at,
    }
