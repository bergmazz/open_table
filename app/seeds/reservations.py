from app.models import db, Reservation, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reservations():
    reservation1 = Reservation(
        user_id=1, restaurant_id=2, number_of_people=2, reservation_time=datetime(2023, 6, 30, 18, 30),
        status='confirmed', notes='Anniversary'
    )
    reservation2 = Reservation(
        user_id=2, restaurant_id=1, number_of_people=4, reservation_time=datetime(2023, 6, 30, 18, 30),
        status='confirmed', notes='Special request: vegetarian menu',
    )
    reservation3 = Reservation(
        user_id=3, restaurant_id=4, number_of_people=3, reservation_time=datetime(2023, 6, 4, 16, 00),
        status='confirmed', notes='Special request: vegetarian menu',
    )
    reservation4 = Reservation(
        user_id=4, restaurant_id=3, number_of_people=3, reservation_time=datetime(2023, 9, 4, 16, 00),
        status='confirmed', notes="It's my 30th birthday",
    )
    reservation5 = Reservation(
        user_id=1, restaurant_id=3, number_of_people=3, reservation_time=datetime(2023, 5, 30, 10, 30),
        status='attended', notes='Birthday'
    )

    db.session.add(reservation1)
    db.session.add(reservation2)
    db.session.add(reservation3)
    db.session.add(reservation4)
    db.session.add(reservation5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reservations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reservations"))

    db.session.commit()
