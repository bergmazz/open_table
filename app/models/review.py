from .db import db, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    restaurantId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    reviewImage = db.Column(db.String) 
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow, onupdate=datetime.utcnow)


    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'restaurantId': self.restaurantId,
            'rating': self.rating,
            'comment': self.comment,
            'reviewImage': self.reviewImage
        }
        
