from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
# from sqlalchemy import Enum

# class ReservationStatus(Enum):
#     CONFIRMED = "confirmed"
#     CANCELLED = "cancelled"
#     ATTENDED = "attended"

class Reservation(db.Model):
    __tablename__ = 'reservations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

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
            'restaurant': [self.restaurant.name_to_dict()]
        }

    def less_detail_to_dict(self):
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
    
    def non_owner_to_dict(self):
        return {
            'restaurantId': self.restaurant_id,
            'reservationId': self.id,
            'reservationTime': self.reservation_time
        }
    
    def owner_to_dict(self):
        return {
            'id': self.id,
            'restaurantId': self.restaurant_id,
            'userId': self.user_id,
            'User': self.user.simple_dict(),
            'numberOfPeople': self.number_of_people,
            'reservationTime': self.reservation_time,
            'status': self.status,
            'notes': self.notes,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
