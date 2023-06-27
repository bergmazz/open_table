from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Favorite, Reservation, Restaurant
from app.forms.favorite_form import FavoriteForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get restaurant by current user
@user_routes.route('/restaurants')
def get_user_restaurant():
    curr_user_id = current_user.id
    restaurants = db.session.query(Restaurant).filter(
        Restaurant.user_id == curr_user_id).all()
    return {'Restaurants': [restaurant.to_dict() for restaurant in restaurants]}

# Get current user reservations
@user_routes.route('/reservations')
def get_user_reservation():
    curr_user_id = current_user.id
    reservations = db.session.query(Reservation).filter(
        Reservation.user_id == curr_user_id).all()
    return {'Reservations': [reservation.to_dict() for reservation in reservations]}

# Get current user favorites
@user_routes.route('/<int:id>/favorites')
def get_favorites(id):
    favorites = Favorite.query.filter(Favorite.user_id == id)
    return { 'favorites': [fav.to_dict() for fav in favorites]}

# # Add favorite
# @user_routes.route('/<int:id>/favorites', methods=['POST'])
# def add_favorite(id):
#     form = FavoriteForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         newFav = Favorite(user_id=form['userId'].data,
#                           restaurant_id=form['restaurantId'].data)
#         db.session.add(newFav)
#         db.session.commit()
#         return newFav.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

<<<<<<< HEAD
# Delete favorite
@user_routes.route('/<int:id>/favorites/<int:fav_id>', methods=['DELETE'])
def delete_favorite(id, fav_id):
    favorite = Favorite.query.get(fav_id)
    if (favorite):
        db.session.delete(favorite)
        db.session.commit()
        return {'message': 'Favorite successfully removed'}
    else:
        return {'message': 'Favorite does not exist'}
=======
# # Delete favorite
# @user_routes.route('/<int:id>/favorites/<int:fav_id', methods=['DELETE'])
# def delete_favorite(id, fav_id):
#     favorite = Favorite.query.get(fav_id)
#     if (favorite):
#         db.session.delete(favorite)
#         db.session.commit()
#         return {'message': 'Favorite successfully removed'}
#     else: 
#         return {'message': 'Favorite does not exist'}
>>>>>>> reservationRoutes
