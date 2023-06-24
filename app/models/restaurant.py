from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime, time, timedelta
import re

class Restaurant(db.Model, UserMixin):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurant_name = db.Column(db.String(50), nullable=False, unique=True)
    cover_image = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    country= db.Column(db.String(30), nullable=False)
    cuisine_type= db.Column(db.String(30), nullable=False)
    price_range= db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False, unique=True)
    open_hours = db.Column(db.String(8))
    closing_hours = db.Column(db.String(8))
    created_at = db.Column(db.DateTime, default= datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)

    reviews = db.relationship("Review", cascade="all, delete-orphan", lazy="joined", backref='restaurant')
    reservations = db.relationship('Reservation', cascade="all, delete-orphan", lazy="joined", backref='restaurant')
    favorites = db.relationship('Favorite', cascade='all, delete-orphan', lazy="joined", backref='restaurant')

    def next_three_available_slots(self, num_slots=3, slot_duration=30):
        current_time = datetime.now().time()
        next_available_slots = []

        # Set the reservation start time to the current time rounded up to the next 30-minute interval
        if current_time.minute % slot_duration != 0:
            current_time = datetime.combine(datetime.today(), current_time)  # Convert to datetime object
            current_time += timedelta(minutes=(slot_duration - current_time.minute % slot_duration))
            current_time = current_time.time()  # Convert back to time object
        current_time = current_time.replace(second=0, microsecond=0)

        # Convert opening and closing hours to time objects
        opening_time = self._convert_to_time(self.open_hours)
        closing_time = self._convert_to_time(self.closing_hours)

        # Find the next available time slots
        while len(next_available_slots) < num_slots:
            # Check if the current time is within the restaurant's opening and closing hours
            if opening_time <= current_time <= closing_time:
                # Check if there are no reservations at the current time
                if not any(reservation.reservation_time == current_time for reservation in self.reservations):
                    next_available_slots.append(current_time)

            # Increment the current time by the slot duration
            current_time = (datetime.combine(datetime.today(), current_time) + timedelta(minutes=slot_duration)).time()

        return [str(slot) for slot in next_available_slots]

    def _convert_to_time(self, time_str):
        # Extract hours and minutes using regular expression
        match = re.match(r"(\d+):(\d+)", time_str)
        if match:
            hours = int(match.group(1))
            minutes = int(match.group(2))
            if "pm" in time_str.lower() and hours != 12:
                hours += 12
            return time(hours, minutes)
        else:
            raise ValueError(f"Invalid time format: {time_str}")

    def to_dict(self):
        next_three_available_slots = self.next_three_available_slots()

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
            'updatedAt': self.updated_at,
            'nextThreeAvailableSlots': next_three_available_slots
        }

    def details_to_dict(self):
        review_ratings = [review.rating for review in self.reviews]
        average_rating = sum(review_ratings) / len(review_ratings) if review_ratings else None
        next_three_available_slots = self.next_three_available_slots()

        review_images = []
        for review in self.reviews:
            review_images.extend([review.review_image])

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
            'updatedAt': self.updated_at,
            'favoritedBy': [favorite.to_dict() for favorite in self.favorites],
            'reviews': [review.to_dict() for review  in self.reviews],
            'reservations': [reservation.to_dict() for reservation in self.reservations],
            'averageRating': average_rating ,
            'reviewImages': review_images,
            'nextThreeAvailableSlots': next_three_available_slots
        }
