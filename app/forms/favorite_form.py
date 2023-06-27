from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Favorite


class FavoriteForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    restaurantId = IntegerField('restaurantId', validators=[DataRequired()])
