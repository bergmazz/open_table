from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

def rating_validation(form, field):
    rating = field.data
    if 1 < rating > 5:
        raise ValidationError("Rating must be an integer from 1 to 5")


class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired(), rating_validation])
    comment = TextAreaField('comment', validators=[DataRequired()])
    review_image = StringField('review_image')
