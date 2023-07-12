from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, Restaurant
from app.forms import ReviewForm

review_routes = Blueprint('restaurants/<int:restaurant_id>/reviews', __name__)

# Get all Reviews by Restaurant id
@review_routes.route('/', methods=['GET'])
def get_reviews(restaurant_id):
    """
    Gets a list of the restaurant's reviews

    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    reviews = [review.to_dict() for review in Review.query.filter_by(restaurant_id=restaurant_id).all()]

    return jsonify({ "reviews": reviews }), 200

# Create a Review
@review_routes.route('/', methods=['POST'])
@login_required
def create_review(restaurant_id):
    """
    Creates a new review
    """
    # Checks if restaurant id is valid
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    # Checks if user already left a review for this restaurant
    if Review.query.filter_by(restaurant_id=restaurant_id, user_id=current_user.id).all():
        return jsonify({'error': 'User already has a review for this restaurant'}), 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print('Review route data', data)
        new_review = Review(user_id=current_user.id,
                            restaurant_id=restaurant_id,
                            rating=data["rating"],
                            comment=data["comment"],
                            review_image=data["review_image"])
        print('new review', new_review)
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    if form.errors:
        print('form errors', form.errors)
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'error': errors}

# Edit a Review
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(restaurant_id, review_id):
    """
    Edits a review
    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    review = Review.query.get(review_id)

    if current_user.id is not review.user_id:
        return jsonify({ 'error': 'You are not authorized to edit this post' })

    form = ReviewForm(obj=review)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(review)
        db.session.commit()
        return review.to_dict()
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'error': errors}


# Delete a Review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(restaurant_id, review_id):
    """
    Deletes a Review
    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    review = Review.query.get(review_id)

    if current_user.id is not review.user_id:
        return jsonify({ 'error': 'You are not authorized to delete this post' })

    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review successfully removed'}
