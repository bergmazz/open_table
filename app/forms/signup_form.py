from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def phone_number_format(form, field):
    #Checking if phone number is in correct format and contains 10 digits
    phone_number = field.data
    if not re.match(r'^\d{10}$', str(phone_number)):
        raise ValidationError('Phone number must be 10 digits long.')


class SignUpForm(FlaskForm):
    # username = StringField('username', validators=[DataRequired(), username_exists])
    first_name = StringField('first name', validators=[DataRequired()])
    last_name = StringField('last name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    phone_number = StringField('phone number', validators=[DataRequired(message="Phone number must be digits only"), phone_number_format])
    password = StringField('password', validators=[DataRequired()])
    owner = BooleanField('owner')
