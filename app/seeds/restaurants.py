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
        state='CA', zip_code=90021, country='USA', cuisine_type='Thai', price_range=3,
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
    restaurant6 = Restaurant(
        user_id=1, restaurant_name='Golden Gate Grill', cover_image='https://images.unsplash.com/photo-1535906777434-1aa4b6e6c5da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='goldengate@gggrill.com', phone_number=1234567896, address='123 Union St', city='San Francisco',
        state='CA', zip_code=94109, country='USA', cuisine_type='American', price_range=2,
        open_hours='8:00 am', closing_hours='9:00 pm')
    restaurant7 = Restaurant(
        user_id=2, restaurant_name='LaSushi Bar', cover_image='https://images.unsplash.com/photo-1589167552713-007780b5e539?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='sushibar@la.com', phone_number=1234567897, address='456 Hollywood Blvd', city='Los Angeles',
        state='CA', zip_code=90028, country='USA', cuisine_type='Japanese', price_range=3,
        open_hours='11:30 am', closing_hours='10:30 pm')
    restaurant8 = Restaurant(
        user_id=3, restaurant_name='Big Apple Deli', cover_image='https://images.unsplash.com/photo-1526137964289-5e7d962fdc7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='deli@bigapple.com', phone_number=1234567898, address='789 Broadway', city='New York',
        state='NY', zip_code=10003, country='USA', cuisine_type='Chinese', price_range=2,
        open_hours='7:00 am', closing_hours='8:00 pm')
    restaurant9 = Restaurant(
        user_id=4, restaurant_name='Curry Paradise', cover_image='https://images.unsplash.com/photo-1619633682537-58a99f106bf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='seafood@paradise.com', phone_number=1234567899, address='987 Ocean Ave', city='Orlando',
        state='FL', zip_code=32801, country='USA', cuisine_type='Indian', price_range=3,
        open_hours='11:00 am', closing_hours='10:00 pm')
    restaurant10 = Restaurant(
        user_id=5, restaurant_name='Tex-Mex Grill', cover_image='https://images.unsplash.com/photo-1560807707-18f012e7d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='texmex@grill.com', phone_number=1234567900, address='567 Main St', city='Houston',
        state='TX', zip_code=77002, country='USA', cuisine_type='American', price_range=2,
        open_hours='10:30 am', closing_hours='9:30 pm')
    restaurant11 = Restaurant(
    user_id=1, restaurant_name='Mamma Mia', cover_image='https://images.unsplash.com/photo-1605273153461-39404c7c8be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    email='mammamia@mammamia.com', phone_number=1234567901, address='456 Italian St', city='San Francisco',
    state='CA', zip_code=94111, country='USA', cuisine_type='Italian', price_range=2,
    open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant12 = Restaurant(
        user_id=2, restaurant_name='China Palace', cover_image='https://images.unsplash.com/photo-1511960038522-5a87f48f210d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='chinapalace@chinapalace.com', phone_number=1234567902, address='789 Panda Ave', city='Los Angeles',
        state='CA', zip_code=90001, country='USA', cuisine_type='Chinese', price_range=2,
        open_hours='11:00 am', closing_hours='9:30 pm')
    restaurant13 = Restaurant(
        user_id=3, restaurant_name='Taco Loco', cover_image='https://images.unsplash.com/photo-1551367098-3eabaaad6db7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='tacoloco@tacoloco.com', phone_number=1234567903, address='123 Guacamole St', city='New York',
        state='NY', zip_code=10001, country='USA', cuisine_type='Mexican', price_range=2,
        open_hours='10:30 am', closing_hours='10:00 pm')
    restaurant14 = Restaurant(
        user_id=4, restaurant_name='Sakura Sushi', cover_image='https://images.unsplash.com/photo-1518979683881-214c65b1e4b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='sakura@sushi.com', phone_number=1234567904, address='456 Sushi Way', city='Orlando',
        state='FL', zip_code=32819, country='USA', cuisine_type='Japanese', price_range=3,
        open_hours='12:00 pm', closing_hours='10:00 pm')
    restaurant15 = Restaurant(
        user_id=5, restaurant_name='Classic Diner', cover_image='https://images.unsplash.com/photo-1544025162-17ea05a48428?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='classicdiner@classicdiner.com', phone_number=1234567905, address='789 Main St', city='Houston',
        state='TX', zip_code=77002, country='USA', cuisine_type='American', price_range=2,
        open_hours='7:00 am', closing_hours='9:00 pm')
    restaurant16 = Restaurant(
        user_id=6, restaurant_name='Spice of India', cover_image='https://images.unsplash.com/photo-1570936858191-ef6c2a480bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='spiceofindia@spiceofindia.com', phone_number=1234567906, address='123 Curry Lane', city='San Francisco',
        state='CA', zip_code=94102, country='USA', cuisine_type='Indian', price_range=3,
        open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant17 = Restaurant(
        user_id=7, restaurant_name='Thai Paradise', cover_image='https://images.unsplash.com/photo-1565299621532-93f42ef7b8a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='thai@paradise.com', phone_number=1234567907, address='456 Pad Thai Blvd', city='Los Angeles',
        state='CA', zip_code=90012, country='USA', cuisine_type='Thai', price_range=3,
        open_hours='12:00 pm', closing_hours='10:30 pm')
    restaurant18 = Restaurant(
        user_id=8, restaurant_name='Sabor Español', cover_image='https://images.unsplash.com/photo-1566733023672-5421b7734a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='sabor@saborespanol.com', phone_number=1234567908, address='789 Tapas St', city='New York',
        state='NY', zip_code=10016, country='USA', cuisine_type='Spanish', price_range=3,
        open_hours='6:00 pm', closing_hours='11:00 pm')
    restaurant19 = Restaurant(
        user_id=9, restaurant_name='Addis Ababa', cover_image='https://images.unsplash.com/photo-1590086786139-614663826e7f119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='addisababa@ethiopian.com', phone_number=1234567909, address='123 Injera Ave', city='Houston',
        state='TX', zip_code=77030, country='USA', cuisine_type='Ethiopian', price_range=2,
        open_hours='11:00 am', closing_hours='9:00 pm')
    restaurant20 = Restaurant(
        user_id=10, restaurant_name='Opa! Greek Taverna', cover_image='https://images.unsplash.com/photo-1570052689924-cf8a67750e29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='opa@greektaverna.com', phone_number=1234567910, address='456 Gyro Blvd', city='Orlando',
        state='FL', zip_code=32801, country='USA', cuisine_type='Greek', price_range=2,
        open_hours='12:00 pm', closing_hours='10:00 pm')
    restaurant21 = Restaurant(
        user_id=11, restaurant_name='Pasta Bella', cover_image='https://images.unsplash.com/photo-1551228598-2bcfb5e9119a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='pasta@bella.com', phone_number=1234567911, address='789 Linguine St', city='San Francisco',
        state='CA', zip_code=94102, country='USA', cuisine_type='Italian', price_range=2,
        open_hours='11:00 am', closing_hours='9:30 pm')
    restaurant22 = Restaurant(
        user_id=2, restaurant_name='Great Wall', cover_image='https://images.unsplash.com/photo-1612355887178-2ccf5a0706e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='greatwall@chinacuisine.com', phone_number=1234567912, address='123 Beijing St', city='Los Angeles',
        state='CA', zip_code=90001, country='USA', cuisine_type='Chinese', price_range=2,
        open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant23 = Restaurant(
        user_id=3, restaurant_name='El Mariachi', cover_image='https://images.unsplash.com/photo-1553268256-083bc5b4b3f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='elmariachi@authenticmexican.com', phone_number=1234567913, address='456 Mariachi Blvd', city='New York',
        state='NY', zip_code=10001, country='USA', cuisine_type='Mexican', price_range=2,
        open_hours='10:00 am', closing_hours='9:00 pm')
    restaurant24 = Restaurant(
        user_id=4, restaurant_name='Sushi Samurai', cover_image='https://images.unsplash.com/photo-1551308274-ee4681bd154b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='samurai@sushisamurai.com', phone_number=1234567914, address='789 Nigiri Ave', city='Orlando',
        state='FL', zip_code=32819, country='USA', cuisine_type='Japanese', price_range=3,
        open_hours='12:00 pm', closing_hours='10:00 pm')
    restaurant25 = Restaurant(
        user_id=5, restaurant_name='AllAmerican Diner', cover_image='https://images.unsplash.com/photo-1591375115887-82750951cd5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='allamerican@diner.com', phone_number=1234567915, address='123 Burger St', city='Houston',
        state='TX', zip_code=77002, country='USA', cuisine_type='American', price_range=2,
        open_hours='7:00 am', closing_hours='9:00 pm')
    restaurant26 = Restaurant(
        user_id=6, restaurant_name='Taj Mahal', cover_image='https://images.unsplash.com/photo-1556012016-750fd6ac91f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='tajmahal@indiancuisine.com', phone_number=1234567916, address='456 Curry Lane', city='San Francisco',
        state='CA', zip_code=94102, country='USA', cuisine_type='Indian', price_range=3,
        open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant27 = Restaurant(
        user_id=7, restaurant_name='Thai Spice', cover_image='https://images.unsplash.com/photo-1600883994999-c5b37c6837c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='thaispice@thaispice.com', phone_number=1234567917, address='789 Pad Thai Blvd', city='Los Angeles',
        state='CA', zip_code=90012, country='USA', cuisine_type='Thai', price_range=3,
        open_hours='12:00 pm', closing_hours='10:30 pm')
    restaurant28 = Restaurant(
        user_id=8, restaurant_name='Tapas Bar', cover_image='https://images.unsplash.com/photo-1535963487911-2f0148a99c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='tapas@spanishcuisine.com', phone_number=1234567918, address='123 Tapas St', city='New York',
        state='NY', zip_code=10016, country='USA', cuisine_type='Spanish', price_range=3,
        open_hours='6:00 pm', closing_hours='11:00 pm')
    restaurant29 = Restaurant(
        user_id=9, restaurant_name='Ethiopian Delight', cover_image='https://images.unsplash.com/photo-1596369966681-9e0eaa12a67f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='ethiopiandelight@ethiopiancuisine.com', phone_number=1234567919, address='456 Injera Ave', city='Houston',
        state='TX', zip_code=77030, country='USA', cuisine_type='Ethiopian', price_range=2,
        open_hours='11:00 am', closing_hours='9:00 pm')
    restaurant30 = Restaurant(
        user_id=10, restaurant_name='Olive Tree', cover_image='https://images.unsplash.com/photo-1572448862584-6f264f41fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='olivetree@greekcuisine.com', phone_number=1234567920, address='789 Gyro Blvd', city='Orlando',
        state='FL', zip_code=32801, country='USA', cuisine_type='Greek', price_range=2,
        open_hours='12:00 pm', closing_hours='10:00 pm')


    db.session.add(restaurant1)
    db.session.add(restaurant2)
    db.session.add(restaurant3)
    db.session.add(restaurant4)
    db.session.add(restaurant5)
    db.session.add(restaurant6)
    db.session.add(restaurant7)
    db.session.add(restaurant8)
    db.session.add(restaurant9)
    db.session.add(restaurant10)
    db.session.add(restaurant11)
    db.session.add(restaurant12)
    db.session.add(restaurant13)
    db.session.add(restaurant14)
    db.session.add(restaurant15)
    db.session.add(restaurant16)
    db.session.add(restaurant17)
    db.session.add(restaurant18)
    db.session.add(restaurant19)
    db.session.add(restaurant20)
    db.session.add(restaurant21)
    db.session.add(restaurant22)
    db.session.add(restaurant23)
    db.session.add(restaurant24)
    db.session.add(restaurant25)
    db.session.add(restaurant26)
    db.session.add(restaurant27)
    db.session.add(restaurant28)
    db.session.add(restaurant29)
    db.session.add(restaurant30)
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
