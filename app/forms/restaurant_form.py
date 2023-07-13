from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, NumberRange, Length, AnyOf
# from flask_wtf.csrf import CSRFProtect
import re

# csrf = CSRFProtect()
def phone_number_format(form, field):
    #Checking if phone number is in correct format and contains 10 digits
    phone_number = field.data
    if not re.match(r'^\d{10}$', str(phone_number)):
        raise ValidationError('Phone number must be 10 digits long.')


class RestaurantForm(FlaskForm):
    restaurant_name = StringField("Restaurant Name", validators=[DataRequired(), Length(max=50)])
    cover_image = StringField("Cover Image URL", validators=[DataRequired(), Length(max=255)])
    email = StringField("Email", validators=[DataRequired(), Email(), Length(max=255)])
    address = StringField("Address", validators=[DataRequired(), Length(max=50)])
    city = StringField("City", validators=[DataRequired(), Length(max=30)])
    state = SelectField("State", choices=[("CA", "California"), ("NY", "New York"), ("TX", "Texas"), ("FL", "Florida")])
    zip_code = IntegerField("ZIP Code", validators=[DataRequired()])
    country = StringField("Country", default="USA", validators=[DataRequired(), Length(max=30)])
    cuisine_type = SelectField("Cuisine Type", choices=[
        ("Italian", "Italian"),
        ("Chinese", "Chinese"),
        ("Mexican", "Mexican"),
        ("Japanese", "Japanese"),
        ("American", "American"),
        ("Indian", "Indian"),
        ("Thai", "Thai"),
        ("Spanish", "Spanish"),
        ("Ethiopian", "Ethiopian"),
        ("Greek", "Greek")
    ], validators=[DataRequired(), AnyOf(["Italian", "Chinese", "Mexican", "Japanese", "American", "Indian", "Thai", "Spanish", "Ethiopian",  "Greek"])])
    price_range = SelectField("Price Range", choices=[(1, '$'), (2, '$$'), (3, '$$$'), (4, '$$$$')], coerce=int, validators=[DataRequired()])
    phone_number = IntegerField("Phone Number", validators=[DataRequired(), phone_number_format])
    open_hours = StringField("Open Hours", validators=[DataRequired(), Length(max=8)])
    closing_hours = StringField("Closing Hours", validators=[DataRequired(), Length(max=8)])
    submit = SubmitField("Submit")
