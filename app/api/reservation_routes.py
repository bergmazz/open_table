from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Reservation
from .auth_routes import validation_errors_to_error_messages
from app.forms.reservation_form import ReservationForm

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
