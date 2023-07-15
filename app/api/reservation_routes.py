from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Reservation, Restaurant
from .auth_routes import validation_errors_to_error_messages
from app.forms import ReservationForm
from datetime import datetime

reservation_routes = Blueprint('restaurants/<int:restaurant_id>', __name__)

# def update_res_status(reservation):
#         reservation.status = reservation.status.lower()
#         if datetime.utcnow() > reservation.reservation_time:
#                 reservation.status = "attended"

# Get reservations based on restaurantId
@reservation_routes.route('reservations', methods=['GET'])
def get_reservations(restaurant_id):
    """
    Gets a list of all the restaurants reservations

    """
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant is None:
        return jsonify({'error': 'Restaurant could not be found.'}), 404

    non_owner_reservations = [reservation.non_owner_to_dict() for reservation in Reservation.query.filter_by(restaurant_id=restaurant_id).all()]
    owner_reservations = [reservation.owner_to_dict() for reservation in Reservation.query.filter_by(restaurant_id=restaurant_id).all()]

    # for reservation in non_owner_reservations:
    #         reservation.status = reservation.status.lower()
    #         print("---------datetime:", datetime.utcnow())
    #         print("-------reservation.reservation_time:", reservation.reservation_time)
    #         if datetime.utcnow() > reservation.reservation_time:
    #             if reservation.status == "confirmed":
    #                 reservation.status = "attended"
    #                 db.session.commit()
    # print("in get routereswervation statusss", reservation.status)

    if current_user.id == restaurant.user_id:
        return jsonify ({'Reservations': owner_reservations}), 200
    else:
        return jsonify ({'Reservations': non_owner_reservations}), 200


# Create a Reservation
@reservation_routes.route('/reservations', methods=['POST'])
@login_required
def create_reservation(restaurant_id):
    """
    Creates a new reservation
    """
    # print("--------------------in backend")
    restaurant = Restaurant.query.get(restaurant_id)

    # Checks if restaurant id is valid
    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    form = ReservationForm()
    form.status.default = 'confirmed'
    # print("-----------------form?:", form.errors)
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("-----------------CSRF token:", request.cookies['csrf_token'])
    # print("-------------------------form", form.data)
    if form.validate_on_submit():
        # print("-----------------validated")
        data = form.data
        # Check if there is an existing reservation at the specified time
        for reservation in restaurant.reservations:
            # print("reservation.reservation_time", reservation.reservation_time, "datareservationtime", data["reservation_time"])

            if reservation.reservation_time == data["reservation_time"]:
                if reservation.status != "cancelled":
                    return jsonify({'error': 'The selected time slot is already booked'}), 400

        #Does not allow booking outside of open and close
            #will do at a later date or on front end somehow, I give up

        #Does not allow owner to book at their own restaurant
        if current_user.id == restaurant.user_id:
            return jsonify({'error': 'You do not need a reservation to eat at your own restaurant'}), 400


        new_reservation = Reservation(user_id=current_user.id,
                            restaurant_id=restaurant_id,
                            number_of_people=data["number_of_people"],
                            reservation_time=data["reservation_time"],
                            status=data["status"].lower(),
                            notes=data["notes"])

        db.session.add(new_reservation)
        db.session.commit()

        return new_reservation.to_dict()

    if form.errors:
        # print("------------errors", form.errors)
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return  jsonify({'error': errors}), 400

# Edit a Reservation
@reservation_routes.route('reservations/<int:reservation_id>', methods=['PUT'])
@login_required
def edit_reservation(restaurant_id, reservation_id):
    """
    Edits a reservation
    """
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    reservation = Reservation.query.get(reservation_id)

    if reservation is None:
        return jsonify({'error': 'Reservation not found'}), 404

    if current_user.id is not reservation.user_id:
        if current_user.id is not restaurant.user_id:
            return jsonify({ 'error': 'You are not authorized to edit this post' }), 400

    form = ReservationForm(obj=reservation)
    # form.status = 'confirmed'
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    # print("-----------------CSRF token:", request.cookies['csrf_token'])
    # print("----------formdata:", data)

    # Check if there is an existing reservation at the specified time
    for xreservation in restaurant.reservations:
        if xreservation.reservation_time == data["reservation_time"]:
            if xreservation.status != "cancelled":
                if xreservation.id != reservation.id:
                    return jsonify({'error': 'The selected time slot is already booked'}), 400

    if form.validate_on_submit():
        form.populate_obj(reservation)
        reservation.updated_at = datetime.utcnow()
        db.session.commit()
        return reservation.to_dict()

    if form.errors:
        print("------------errors", form.errors)
        errors = []
        for field_name, field_errors in form.errors.items():
            errors.extend(field_errors)
        return {'errors': errors}

# Delete a Reservation (technically just updates status to cancel)
@reservation_routes.route('/reservations/<int:reservation_id>', methods=['DELETE'])
@login_required
def delete_reservation(reservation_id, restaurant_id):
    print("here**************************!!!!!")
    """
    Cancels a reservation
    Does not delete from database so restaurant owners can keep track of canceled slots
    Only the restuarant owner OR user who booked the reservation can delete
    """
    reservation = Reservation.query.get(reservation_id)
    restaurant = Restaurant.query.get(restaurant_id)

    if restaurant is None:
        print("1**************************")
        return jsonify({'error': 'Restaurant not found'}), 404
    if reservation is None:
        print("2**************************")
        return jsonify({'error': 'Reservation not found'}), 404
    if reservation.restaurant_id != restaurant_id:
        print("3**************************")
        return jsonify({'error': 'Reservation is not for this restaurant'}), 404

    # print('Current user ID:', current_user.id)
    # print('Reservation user ID:', reservation.user_id)
    # print('Reservation status:', reservation.status)
    # print('Restaurant user ID:', restaurant.user_id)

    if (current_user.id != reservation.user_id) and (current_user.id != restaurant.user_id):
        return jsonify({'error': 'You are not authorized to cancel this reservation'})

    reservation.status = reservation.status.lower()
    if datetime.utcnow() > reservation.reservation_time:
        if reservation.status == "confirmed":
            reservation.status = "attended"
            db.session.commit()

    print("reswervation statusss", reservation.status)
    if reservation.status != "confirmed":
        print("4**************************")
        return jsonify({'error': 'Reservation has already been cancelled or attended'}), 404

    reservation.status = "cancelled"
    # db.session.delete(reservation)
    db.session.commit()
    return {'message': 'Reservation successfully cancelled'}
