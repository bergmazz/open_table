from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo review
def seed_reviews():
    review1 = Review(
        user_id=1, restaurant_id=3, rating=4, comment="Food was amazing and service was outstanding. The wait time for our food was a little long but nevertheless, would definitely would recommend.",
        review_image='https://resizer.otstatic.com/v2/photos/large/25020526.jpg')
    review2 = Review(
        user_id=4, restaurant_id=2, rating=5, comment="The most unforgetabble dining experience i've had in so long. Everything from the service and food to the overall ambience and vibe of the restaurant was incredible. I can't wait to have my birthday dinner here!!",
        review_image='https://vipnightlife.com/wp-content/uploads/others/Tao-Los-Angeles-5.jpg')
    review3 = Review(
        user_id=2, restaurant_id=4, rating=3, comment="My overall experience was actually quite dull which is pretty disappointing considering the restaurants popularity and expensive dishes. The bar was pretty good however with an extensive selection of both unique and popular drinks.",
        review_image='https://images.bizbuysell.com/shared/listings/206/2067347/0522a02a-6247-4775-879e-217f30d9993f-W768.jpg')
    review4 = Review(
        user_id=3, restaurant_id=5, rating=5, comment="I have been craving and looking for an authentic Mexican styled dining experience for quite awhile now and let me tell you, Salsa has exceeded all my expectations. From the lively and lovely staff to the vibrant colors and culture embedded into the food and space. I can't recommend it enough!!!",
        review_image='https://volumeone.org/uploads/image/article/313/140/313140/header_1080x/138157_web_tierra_caliente_2023_andreap_5.jpg')
    review5 = Review(
        user_id=5, restaurant_id=1, rating=1, comment="I honestly have never been so disappointed in an establishment as much as I am with this restaurant. Not only was most of the staff overtly rude, the dishes were inconsistent and undercooked in some areas. I will not be stepping foot anywhere near this establishment anytime soon and for good reason. Potential patrons be warned!!!",
        review_image='https://i.redd.it/hmghoybox0q11.jpg')
    review6 = Review(
        user_id=1, restaurant_id=2, rating=4, comment="Tao is truly such a magical experience that will leave you both satiated and entertained. The almost club-like atmosphere adds an unforgetable and unique touch. The only drawback that makes my rating a 4 instead of a 5 is how overbooked it is, I had to make my reservation a month in advance. Yes it's that popular and worth every bit of the wait!!!",
        review_image= 'https://taogroup.com/wp-content/uploads/2021/03/TAO-Small-Plates.jpg')
    
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.commit()


def undo_reviews():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
    
    db.session.commit()