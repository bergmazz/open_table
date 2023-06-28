from .db import db, environment, SCHEMA, add_prefix_for_prod


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')))

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'restaurantId': self.restaurant_id,
            ## example aggregates????
            # 'followers': [follower.to_dict() for follower in self.followers],
            #  'numFollowers': len(self.followers)
        }
