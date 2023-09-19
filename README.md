# Bone Apple Teeth

## Introduction
Bone Apple Teeth is a website clone, inspired by [OpenTable](https://www.opentable.com/). Bone Apple Teeth can be used to search for restaurants, make reservations, manage reservations, and leave restaurant reviews. If you own a restaurant, you can sign up as a restaurant owner and add your restaurant to our site.

**Live Site:** [Bone Apple Teeth](https://tables-that-are-open.onrender.com/)

**Check out the links below to view our project's documentation:** 

 - [Feature List](https://github.com/bergmazz/open_table/wiki/MVP-List)
 - [Database Schema](https://github.com/bergmazz/open_table/wiki/DB-Schema)
 - [API Routes](https://github.com/bergmazz/open_table/wiki/API-Routes)
 - [User Stories](https://github.com/bergmazz/open_table/wiki/User-Stories)

## Technologies Used:
Backend:

 - Python
 - Flask
 - PostgreSQL

Frontend:

 - JavaScript
 - React
 - Redux

## Authors:

 - [Steven Sauseda](https://github.com/SSauseda)
 - [Erin Taylor](https://github.com/bergmazz)
 - [Lola Marrero](https://github.com/lola831)
 - [Zakaria Abdullahi](https://github.com/ZakAbdu)

## Splash Page
![Screen Shot 2023-08-26 at 6 51 33 PM (2)](https://github.com/bergmazz/open_table/assets/110120745/929a476e-25b2-4652-b74a-7705113e881d)

## Log In 
<img width="1438" alt="Screen Shot 2023-09-19 at 11 06 25 AM" src="https://github.com/bergmazz/open_table/assets/110120745/3a20fcf6-0ae6-4771-bab6-b1c7c2a26c47">

## Sign Up
<img width="1437" alt="Screen Shot 2023-09-19 at 11 07 27 AM" src="https://github.com/bergmazz/open_table/assets/110120745/d6f672e5-458c-4f1c-b862-b961ae7bcd7e">

## Restaurant Detail's Page
<img width="1439" alt="Screen Shot 2023-09-19 at 10 55 35 AM" src="https://github.com/bergmazz/open_table/assets/110120745/d98c2869-d87e-44f7-84fd-e9a03d5f2bdf">

## User's Profile
<img width="1315" alt="Screen Shot 2023-09-19 at 11 04 23 AM" src="https://github.com/bergmazz/open_table/assets/110120745/ff1008fb-6ba1-4e7c-acf9-88a157638202">

## How to run project locally:
1. Clone the project repo into desired location on your machine (https://github.com/bergmazz/open_table.git)
2. Install dependencies
	
	```
	pipenv install -r requirements.txt
	  ```

3. Create a **.env** file based on the [example](https://github.com/bergmazz/open_table/blob/main/.env.example) with proper settings for your development environment.
4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

5. cd inside the `react-app` directory. Run `npm install` to install all your dependencies before starting up the application.
6. From the `root directory` run `flask run`.
7. From the `react-app` directory run `npm start`.



