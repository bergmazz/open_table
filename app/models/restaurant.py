from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Restaurant(db.Model, UserMixin):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_name = db.Column(db.String(50), nullable=False, unique=True)
    cover_image = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    country= db.Column(db.String(30), nullable=False)
    cuisine_type= db.Column(db.String(30), nullable=False)
    price_range= db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    open_hours = db.Column(db.String(8))
    closing_hours = db.Column(db.String(8))
    created_at = db.Column(db.DateTime, default= datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='restaurant')
    reviews = db.relationship("Review", cascade="all, delete-orphan", lazy="joined", backref='restaurant')
    reservations = db.relationship('Reservation', cascade="all, delete-orphan", lazy="joined", backref='restaurant')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'restaurantName': self.restaurant_name,
            'coverImage': self.cover_image,
            'email': self.email,
            'phoneNumber': self.phone_number,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipCode': self.zip_code,
            'country': self.country,
            'cuisineType': self.cuisine_type,
            'priceRange': self.price_range,
            'openHours': self.open_hours,
            'closingHours': self.closing_hours,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
