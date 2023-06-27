from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField
from wtforms.validators import DataRequired

class ReservationForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    # restaurantId = IntegerField('restaurantId', validators=[DataRequired()])
    number_of_people = IntegerField('Number of People', validators=[DataRequired()])
    reservation_time = DateTimeField('Reservation Time', validators=[DataRequired()])
    status = StringField('Status')
    notes = StringField('Notes', validators=[DataRequired()])

