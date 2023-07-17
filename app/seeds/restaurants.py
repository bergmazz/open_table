from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(
        user_id=1, restaurant_name='Demo Restaurant', cover_image='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='demo@demo.com', phone_number="1234567891", address='552 Green St', city='San Francisco',
        state='CA', zip_code=94133, country='USA', cuisine_type='Italian', price_range=2,
        open_hours='9:00 am', closing_hours='10:00 pm')
    restaurant2 = Restaurant(
        user_id=2, restaurant_name='Tao', cover_image='https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='tao@tao.com', phone_number="1234567892", address='2121 E 7th Pl', city='Los Angeles',
        state='CA', zip_code=90021, country='USA', cuisine_type='Thai', price_range=3,
        open_hours='10:00 am', closing_hours='11:30 pm')
    restaurant3 = Restaurant(
        user_id=3, restaurant_name='Haute Dog Diner', cover_image='https://images.unsplash.com/photo-1618670708336-2df80fdd0ecb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        email='hautedog@hautedog.com', phone_number="1234567893", address='10 Columbus Cir', city='New York',
        state='NY', zip_code=10019, country='USA', cuisine_type='American', price_range=1,
        open_hours='12:00 pm', closing_hours='11:00 pm')
    restaurant4 = Restaurant(
        user_id=4, restaurant_name='Bella Italia', cover_image='https://images.unsplash.com/photo-1421622548261-c45bfe178854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        email='bella@bella.com', phone_number="1234567894", address='1 Grand Cypress Blvd', city='Orlando',
        state='FL', zip_code=32836, country='USA', cuisine_type='Italian', price_range=4,
        open_hours='12:00 pm', closing_hours='11:00 pm')
    restaurant5 = Restaurant(
        user_id=5, restaurant_name='Salsa', cover_image='https://images.unsplash.com/photo-1653084019129-1f2303bb5bc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
        email='salsa@salsa.com', phone_number="1234567895", address='832 Shepherd Dr', city='Houston',
        state='TX', zip_code=77006, country='USA', cuisine_type='Mexican', price_range=4,
        open_hours='10:00 am', closing_hours='9:00 pm')
    restaurant6 = Restaurant(
        user_id=1, restaurant_name='Golden Gate Grill', cover_image='https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwZ2F0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        email='goldengate@gggrill.com', phone_number="1234567896", address='123 Union St', city='San Francisco',
        state='CA', zip_code=94109, country='USA', cuisine_type='American', price_range=2,
        open_hours='8:00 am', closing_hours='9:00 pm')
    restaurant7 = Restaurant(
        user_id=2, restaurant_name='LaSushi Bar', cover_image='https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN1c2hpfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='sushibar@la.com', phone_number="1234567897", address='456 Hollywood Blvd', city='Los Angeles',
        state='CA', zip_code=90028, country='USA', cuisine_type='Japanese', price_range=3,
        open_hours='11:30 am', closing_hours='10:30 pm')
    restaurant8 = Restaurant(
        user_id=3, restaurant_name='Big Apple Deli', cover_image='https://images.unsplash.com/photo-1614898983622-f20044c60b30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9kZWdhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='deli@bigapple.com', phone_number="1234567898", address='789 Broadway', city='New York',
        state='NY', zip_code=10003, country='USA', cuisine_type='Chinese', price_range=2,
        open_hours='7:00 am', closing_hours='8:00 pm')
    restaurant9 = Restaurant(
        user_id=4, restaurant_name='Curry Paradise', cover_image='https://images.unsplash.com/photo-1631452180539-96aca7d48617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3Vycnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='seafood@paradise.com', phone_number="1234567899", address='987 Ocean Ave', city='Orlando',
        state='FL', zip_code=32801, country='USA', cuisine_type='Indian', price_range=3,
        open_hours='11:00 am', closing_hours='10:00 pm')
    restaurant10 = Restaurant(
        user_id=5, restaurant_name='Tex-Mex Grill', cover_image='https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGV4JTIwbWV4fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='texmex@grill.com', phone_number="1234567900", address='567 Main St', city='Houston',
        state='TX', zip_code=77002, country='USA', cuisine_type='American', price_range=2,
        open_hours='10:30 am', closing_hours='9:30 pm')
    restaurant11 = Restaurant(
    user_id=1, restaurant_name='Mamma Mia', cover_image='https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aXRhbGlhbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    email='mammamia@mammamia.com', phone_number="1234567901", address='456 Italian St', city='San Francisco',
    state='CA', zip_code=94111, country='USA', cuisine_type='Italian', price_range=2,
    open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant12 = Restaurant(
        user_id=2, restaurant_name='China Palace', cover_image='https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpbmVzZSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='chinapalace@chinapalace.com', phone_number="1234567902", address='789 Panda Ave', city='Los Angeles',
        state='CA', zip_code=90001, country='USA', cuisine_type='Chinese', price_range=2,
        open_hours='11:00 am', closing_hours='9:30 pm')
    restaurant13 = Restaurant(
        user_id=3, restaurant_name='Taco Loco', cover_image='https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='tacoloco@tacoloco.com', phone_number="1234567903", address='123 Guacamole St', city='New York',
        state='NY', zip_code=10001, country='USA', cuisine_type='Mexican', price_range=2,
        open_hours='10:30 am', closing_hours='10:00 pm')
    restaurant14 = Restaurant(
        user_id=4, restaurant_name='Sakura Sushi', cover_image='https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FrdXJhJTIwc3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='sakura@sushi.com', phone_number="1234567904", address='456 Sushi Way', city='Orlando',
        state='FL', zip_code=32819, country='USA', cuisine_type='Japanese', price_range=3,
        open_hours='12:00 pm', closing_hours='10:00 pm')
    restaurant15 = Restaurant(
        user_id=5, restaurant_name='Classic Diner', cover_image='https://images.unsplash.com/photo-1579236546973-39f510ef2a37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='classicdiner@classicdiner.com', phone_number="1234567905", address='789 Main St', city='Houston',
        state='TX', zip_code=77002, country='USA', cuisine_type='American', price_range=2,
        open_hours='7:00 am', closing_hours='9:00 pm')
    restaurant16 = Restaurant(
        user_id=6, restaurant_name='Spice of India', cover_image='https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='spiceofindia@spiceofindia.com', phone_number="1234567906", address='123 Curry Lane', city='San Francisco',
        state='CA', zip_code=94102, country='USA', cuisine_type='Indian', price_range=3,
        open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant17 = Restaurant(
        user_id=7, restaurant_name='Thai Paradise', cover_image='https://images.unsplash.com/photo-1624223875266-81ebbb795584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRoYWklMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='thai@paradise.com', phone_number="1234567907", address='456 Pad Thai Blvd', city='Los Angeles',
        state='CA', zip_code=90012, country='USA', cuisine_type='Thai', price_range=3,
        open_hours='12:00 pm', closing_hours='10:30 pm')
    restaurant18 = Restaurant(
        user_id=8, restaurant_name='Sabor Español', cover_image='https://images.unsplash.com/photo-1625937712159-e305336cbf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNwYW5pc2glMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='sabor@saborespanol.com', phone_number="1234567908", address='789 Tapas St', city='New York',
        state='NY', zip_code=10016, country='USA', cuisine_type='Spanish', price_range=3,
        open_hours='6:00 pm', closing_hours='11:00 pm')
    restaurant19 = Restaurant(
        user_id=9, restaurant_name='Addis Ababa', cover_image='https://images.unsplash.com/photo-1640116345144-8fca02e277b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXRoaW9waWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        email='addisababa@ethiopian.com', phone_number="1234567909", address='123 Injera Ave', city='Houston',
        state='TX', zip_code=77030, country='USA', cuisine_type='Ethiopian', price_range=2,
        open_hours='11:00 am', closing_hours='9:00 pm')
    restaurant20 = Restaurant(
        user_id=10, restaurant_name='Opa! Greek Taverna', cover_image='https://images.unsplash.com/photo-1606735584785-1848fdcaea57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZWslMjBmb29kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='opa@greektaverna.com', phone_number="1234567910", address='456 Gyro Blvd', city='Orlando',
        state='FL', zip_code=32801, country='USA', cuisine_type='Greek', price_range=2,
        open_hours='12:00 pm', closing_hours='10:00 pm')
    restaurant21 = Restaurant(
        user_id=1, restaurant_name='Pasta Bella', cover_image='https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXRhbGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='pasta@bella.com', phone_number="1234567911", address='789 Linguine St', city='San Francisco',
        state='CA', zip_code=94102, country='USA', cuisine_type='Italian', price_range=2,
        open_hours='11:00 am', closing_hours='9:30 pm')
    restaurant22 = Restaurant(
        user_id=2, restaurant_name='Great Wall', cover_image='https://images.unsplash.com/photo-1652862730768-106cd3cd9ee1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaWVzZSUyMHRha2VvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='greatwall@chinacuisine.com', phone_number="1234567912", address='123 Beijing St', city='Los Angeles',
        state='CA', zip_code=90001, country='USA', cuisine_type='Chinese', price_range=2,
        open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant23 = Restaurant(
        user_id=3, restaurant_name='El Mariachi', cover_image='https://images.unsplash.com/photo-1586561945641-98a839abd3f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFqaXRhc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        email='elmariachi@authenticmexican.com', phone_number="1234567913", address='456 Mariachi Blvd', city='New York',
        state='NY', zip_code=10001, country='USA', cuisine_type='Mexican', price_range=2,
        open_hours='10:00 am', closing_hours='9:00 pm')
    restaurant24 = Restaurant(
        user_id=4, restaurant_name='Sushi Samurai', cover_image='https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='samurai@sushisamurai.com', phone_number="1234567914", address='789 Nigiri Ave', city='Orlando',
        state='FL', zip_code=32819, country='USA', cuisine_type='Japanese', price_range=3,
        open_hours='12:00 pm', closing_hours='10:00 pm')
    restaurant25 = Restaurant(
        user_id=5, restaurant_name='AllAmerican Diner', cover_image='https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        email='allamerican@diner.com', phone_number="1234567915", address='123 Burger St', city='Houston',
        state='TX', zip_code=77002, country='USA', cuisine_type='American', price_range=2,
        open_hours='7:00 am', closing_hours='9:00 pm')
    restaurant26 = Restaurant(
        user_id=6, restaurant_name='Taj Mahal', cover_image='https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='tajmahal@indiancuisine.com', phone_number="1234567916", address='456 Curry Lane', city='San Francisco',
        state='CA', zip_code=94102, country='USA', cuisine_type='Indian', price_range=3,
        open_hours='11:30 am', closing_hours='10:00 pm')
    restaurant27 = Restaurant(
        user_id=7, restaurant_name='Thai Spice', cover_image='https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='thaispice@thaispice.com', phone_number="1234567917", address='789 Pad Thai Blvd', city='Los Angeles',
        state='CA', zip_code=90012, country='USA', cuisine_type='Thai', price_range=3,
        open_hours='12:00 pm', closing_hours='10:30 pm')
    restaurant28 = Restaurant(
        user_id=8, restaurant_name='Tapas Bar', cover_image='https://images.unsplash.com/photo-1625938145744-e380515399bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRhcGFzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='tapas@spanishcuisine.com', phone_number="1234567918", address='123 Tapas St', city='New York',
        state='NY', zip_code=10016, country='USA', cuisine_type='Spanish', price_range=3,
        open_hours='6:00 pm', closing_hours='11:00 pm')
    restaurant29 = Restaurant(
        user_id=9, restaurant_name='Ethiopian Delight', cover_image='https://images.unsplash.com/photo-1604329756574-bda1f2cada6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWZyaWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        email='ethiopiandelight@ethiopiancuisine.com', phone_number="1234567919", address='456 Injera Ave', city='Houston',
        state='TX', zip_code=77030, country='USA', cuisine_type='Ethiopian', price_range=2,
        open_hours='11:00 am', closing_hours='9:00 pm')
    restaurant30 = Restaurant(
        user_id=10, restaurant_name='Olive Tree', cover_image='https://images.unsplash.com/photo-1542528180-a1208c5169a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b2xpdmUlMjBkaXNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        email='olivetree@greekcuisine.com', phone_number="1234567920", address='789 Gyro Blvd', city='Orlando',
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
