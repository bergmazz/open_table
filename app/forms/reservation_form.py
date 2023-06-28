from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField, SelectField
from wtforms.validators import DataRequired
from app.models import Reservation

class ReservationForm(FlaskForm):
    number_of_people = IntegerField('Number of People', validators=[DataRequired()])
    reservation_time = DateTimeField('Reservation Time', validators=[DataRequired()])
    status = SelectField("Status", choices=[("Confirmed", "confirmed"), ("Attended", "attended"), ("Cancelled", "cancelled")])
    notes = StringField('Notes')
