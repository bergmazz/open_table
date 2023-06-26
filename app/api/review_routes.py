from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, Restaurant

review_routes = Blueprint('restaurants/<int:restaurant_id>/reviews', __name__)

# Get all Reviews by Restaurant id
@review_routes.route('/', methods=['GET'])
def get_restaurant_reviews(restaurant_id):
    """
    Gets a list of the restaurant's reviews

    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    reviews = [review.to_dict() for review in Review.query.filter_by(restaurant_id=restaurant_id).all()]

    return jsonify({ "reviews": reviews }), 200
