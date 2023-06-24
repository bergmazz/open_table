from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(
        user_id=1, restaurant_name='Demo Restaurant', cover_image='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='demo@demo.com', phone_number=1234567891, address='552 Green St', city='San Francisco',
        state='CA', zip_code=94133, country='USA', cuisine_type='Italian', price_range=2,
        open_hours='9:00 am', closing_hours='10:00 pm')
    restaurant2 = Restaurant(
        user_id=2, restaurant_name='Tao', cover_image='https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='tao@tao.com', phone_number=1234567892, address='2121 E 7th Pl', city='Los Angeles',
        state='CA', zip_code=90021, country='USA', cuisine_type='Asian', price_range=3,
        open_hours='10:00 am', closing_hours='11:30 pm')
    restaurant3 = Restaurant(
        user_id=3, restaurant_name='Haute Dog Diner', cover_image='https://images.unsplash.com/photo-1618670708336-2df80fdd0ecb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='hautedog@hautedog.com', phone_number=1234567893, address='10 Columbus Cir', city='New York',
        state='NY', zip_code=10019, country='USA', cuisine_type='American', price_range=1,
        open_hours='12:00 pm', closing_hours='11:00 pm')
    restaurant4 = Restaurant(
        user_id=4, restaurant_name='Bella Italia', cover_image='https://images.unsplash.com/photo-1421622548261-c45bfe178854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        email='bella@bella.com', phone_number=1234567894, address='1 Grand Cypress Blvd', city='Orlando',
        state='FL', zip_code=32836, country='USA', cuisine_type='Italian', price_range=4,
        open_hours='12:00 pm', closing_hours='11:00 pm')
    restaurant5 = Restaurant(
        user_id=5, restaurant_name='Salsa', cover_image='https://images.unsplash.com/photo-1653084019129-1f2303bb5bc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
        email='salsa@salsa.com', phone_number=1234567895, address='832 Shepherd Dr', city='Houston',
        state='TX', zip_code=77006, country='USA', cuisine_type='Mexican', price_range=4,
        open_hours='10:00 am', closing_hours='9:00 pm')

    db.session.add(restaurant1)
    db.session.add(restaurant2)
    db.session.add(restaurant3)
    db.session.add(restaurant4)
    db.session.add(restaurant5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
