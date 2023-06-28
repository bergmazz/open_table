from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Reservation, Restaurant
from .auth_routes import validation_errors_to_error_messages
from app.forms.reservation_form import ReservationForm
from datetime import datetime

reservation_routes = Blueprint('restaurants/<int:restaurant_id>', __name__)

# Create a Reservation
@reservation_routes.route('/reservations/<int:reservation_id>', methods=['POST'])
def create_reservation():
    form = ReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newReservation = Reservation(user_id=form['userId'].data,
                                    number_of_people=form['number_of_people'].data,
                                    reservation_time=form['reservation_time'].data,
                                    status=form['status'].data,
                                    notes=form['notes'].data)
        db.session.add(newReservation)
        db.session.commit()
        return newReservation.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Edit a Reservation
@reservation_routes.route('/reservations/<int:reservation_id>', methods=['PUT'])
@login_required
def edit_reservation(restaurant_id, reservation_id):
    """
    Edits a reservation
    """
    if Reservation.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    reservation = Reservation.query.get(reservation_id)

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


# Delete a Reservation (technically just updates status to cancel)
@reservation_routes.route('/<int:reservation_id>', methods=['PUT'])
@login_required
def delete_reservation(reservation_id, restaurant_id):
    """
    Cancels a reservation
    Does not delete from database so restaurant owners can keep track of canceled slots
    Only the restuarant owner OR user who booked the reservation can delete
    """
    reservation = Reservation.query.get(reservation_id)
    restaurant = Restaurant.query.get(restaurant_id)

    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404
    if reservation is None:
        return jsonify({'error': 'Reservation not found'}), 404

    if current_user.id not in [reservation.user_id, restaurant.user_id]:
            return jsonify({ 'error': 'You are not authorized to cancel this reservation' })

    if datetime.utcnow > reservation.reservation_time:
        if reservation.status is not "cancelled":
            reservation.status = "attended"

    if reservation.status is not "confirmed":
        return jsonify({'error': 'Reservation has already been cancelled or attended'}), 404

    reservation.status = "cancelled"
    # db.session.delete(reservation)
    db.session.commit()
    return {'message': 'Reservation successfully cancelled'}
