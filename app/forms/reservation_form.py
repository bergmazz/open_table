from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Reservation
import datetime

def validate_date(form, field):
    if field.data:
        if field.data.date() < datetime.date.today():
        # print(field.data)
            raise ValidationError("Reservation time cannot be in the past")

# def validate_utcdate(form, field):
#     if field.data:
#         if field.data.date() < datetime.utcnow().date():
#         # print(field.data)
#             raise ValidationError("Reservation time not available")

def validate_time_slot(form, field):
    if field.data:
        slot_duration = 30  # Set the slot duration to 30 minutes
        # print(field.data)
        reservation_time = field.data.time()
        if reservation_time.minute % slot_duration != 0:
            raise ValidationError(f"Reservation time must be in {slot_duration}-minute increments")


class ReservationForm(FlaskForm):
    number_of_people = IntegerField('Number of People', validators=[DataRequired()])
    reservation_time = DateTimeField('Reservation Time', validators=[ validate_date, validate_time_slot])
    # status = SelectField("Status", choices=[("Confirmed", "confirmed"), ("Attended", "attended"), ("Cancelled", "cancelled")])
    # reservation_time = StringField('Reservation Time', validators=[ validate_date, validate_time_slot])
    status = StringField("Status")
    notes = StringField('Notes')

    # def populate_from_reservation(self, reservation):
    #     self.number_of_people.data = reservation.number_of_people
    #     self.reservation_time.data = reservation.reservation_time
    #     self.status.data = reservation.status
    #     self.notes.data = reservation.notes
