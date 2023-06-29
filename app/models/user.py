from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    owner = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default= datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)

    reviews = db.relationship('Review', backref='user')
    reservations = db.relationship('Reservation', cascade="all, delete-orphan", backref='user')
    favorites = db.relationship('Favorite', cascade='all, delete-orphan', backref='user')
    restaurants = db.relationship('Restaurant', cascade='all, delete-orphan', backref='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            "phoneNumber": self.phone_number,
            "owner": self.owner,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'favorites': [favorite.to_dict() for favorite in self.favorites],
            'restaurants': [restaurant.to_dict() for restaurant in self.restaurants]
        }
