from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Review, Restaurant
from app.forms import ReviewForm

review_routes = Blueprint('restaurants/<int:restaurant_id>/reviews', __name__)

# Get all Reviews by Restaurant id
@review_routes.route('/', methods=['GET'])
def get_reviews(restaurant_id):
    print("--------------------------", current_user)
    """
    Gets a list of the restaurant's reviews

    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    reviews = [review.to_dict() for review in Review.query.filter_by(restaurant_id=restaurant_id).all()]

    return jsonify({ "reviews": reviews }), 200

# Create a Review
@review_routes.route('/', methods=['POST'])
def create_review(restaurant_id):
    """
    Creates a new review
    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404
    # if Review.query.filter_by(restaurant_id=restaurant_id, user_id=current_user)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_review = Review(user_id=current_user.id,
                            restaurant_id=restaurant_id,
                            rating=data["rating"],
                            comment=data["comment"],
                            review_image=data["review_image"])
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    else:
        return jsonify({'error': 'NOPE'}), 404
