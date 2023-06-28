from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Reservation, Restaurant
from .auth_routes import validation_errors_to_error_messages
from app.forms import ReservationForm
from datetime import datetime

reservation_routes = Blueprint('restaurants/<int:restaurant_id>', __name__)

# Create a Review
@reservation_routes.route('/reservations', methods=['POST'])
@login_required
def create_reservation(restaurant_id):
    """
    Creates a new reservation
    """
    # Checks if restaurant id is valid
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    # need to do validations....

    form = ReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_reservation = Reservation(user_id=current_user.id,
                            restaurant_id=restaurant_id,
                            number_of_people=data["number_of_people"],
                            reservation_time=data["reservation_time"],
                            status=data["status"],
                            notes=data["notes"])
        db.session.add(new_reservation)
        db.session.commit()
        return new_reservation.to_dict()
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'error': errors}

# Edit a Reservation
@reservation_routes.route('reservations/<int:reservation_id>', methods=['PUT'])
@login_required
def edit_reservation(restaurant_id, reservation_id):
    """
    Edits a reservation
    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    reservation = Reservation.query.get(reservation_id)

    if reservation is None:
        return jsonify({'error': 'Reservation not found'}), 404

    if current_user.id is not reservation.user_id:
        return jsonify({ 'error': 'You are not authorized to edit this post' })

    form = ReservationForm(obj=reservation)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(reservation)
        db.session.commit()
        return reservation.to_dict()
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'error': errors}
