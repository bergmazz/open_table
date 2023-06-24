from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        email='demo@aa.io',
        phone_number='1234567890',
        password='password',
        owner=True
    )
    gordon = User(
        first_name='Gordon',
        last_name='Ramsay',
        email='gordon@idiotsandwich.com',
        phone_number='1223456789',
        password='password',
        owner=True
    )
    action = User(
        first_name='Action',
        last_name='Bronson',
        email='misterbaklava@bambam.io',
        phone_number='5555555555',
        password='password',
        owner=True
    )
    martha = User(
        first_name='Martha',
        last_name='Stewart',
        email='mdiddy@bic-ez-reach.com',
        phone_number='5555555556',
        password='password',
        owner=True
    )
    sean = User(
        first_name='Sean',
        last_name='Evans',
        email='hotones@firstwefeast.com',
        phone_number='5555555557',
        password='password',
        owner=True
    )
    babbish = User(
        first_name='Andrew',
        last_name='Rea',
        email='bingingwith@babbish.com',
        phone_number='5555555558',
        password='password',
        owner=False
    )
    dope = User(
        first_name='Nicole',
        last_name='DiMascio',
        email='nic@dopekitchen.com',
        phone_number='5555555559',
        password='password',
        owner=False
    )
    cakeboss = User(
        first_name='Buddy',
        last_name='Valastro',
        email='bud@cakeboss.com',
        phone_number='5555555560',
        password='password',
        owner=False
    )
    guy = User(
        first_name='Guy',
        last_name='Fieri',
        email='guy@flavortown.com',
        phone_number='5555555561',
        password='password',
        owner=False
    )
    dom = User(
        first_name='Dominique',
        last_name='Crenn',
        email='chef@ateliercrenn.com',
        phone_number='5555555562',
        password='password',
        owner=False
    )

    db.session.add(demo)
    db.session.add(gordon)
    db.session.add(martha)
    db.session.add(action)
    db.session.add(sean)
    db.session.add(babbish)
    db.session.add(dope)
    db.session.add(cakeboss)
    db.session.add(guy)
    db.session.add(dom)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
