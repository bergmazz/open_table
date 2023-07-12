from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Reservation
import datetime

def validate_date(form, field):
    if field.data.date() < datetime.date.today():
        raise ValidationError("Reservation time cannot be in the past")

def validate_time_slot(form, field):
    slot_duration = 30  # Set the slot duration to 30 minutes
    reservation_time = field.data.time()

    if reservation_time.minute % slot_duration != 0:
        raise ValidationError(f"Reservation time must be in {slot_duration}-minute increments")

class ReservationForm(FlaskForm):
    number_of_people = IntegerField('Number of People', validators=[DataRequired()])
    reservation_time = DateTimeField('Reservation Time', validators=[DataRequired(), validate_date, validate_time_slot])
    status = SelectField("Status", choices=[("Confirmed", "confirmed"), ("Attended", "attended"), ("Cancelled", "cancelled")])
    notes = StringField('Notes')
