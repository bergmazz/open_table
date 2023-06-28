from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Reservation
import datetime

def validate_date(form, field):
    if field.data.date() < datetime.date.today():
        raise ValidationError("reservation time cannot be in the past")

class ReservationForm(FlaskForm):
    number_of_people = IntegerField('Number of People', validators=[DataRequired()])
    reservation_time = DateTimeField('Reservation Time', validators=[DataRequired(), validate_date])
    status = SelectField("Status", choices=[("Confirmed", "confirmed"), ("Attended", "attended"), ("Cancelled", "cancelled")])
    notes = StringField('Notes')
