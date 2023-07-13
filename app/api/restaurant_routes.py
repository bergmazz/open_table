from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Restaurant, Review
from app.forms import RestaurantForm
from sqlalchemy.orm import lazyload, joinedload

restaurant_routes = Blueprint('restaurants', __name__)

# Get all Restaurants
@restaurant_routes.route('/', methods=['GET'])
def get_retaurants():
    """
    Gets a list of all restaurants

    Results are filtered by location and type of cuisine
    """
    type = request.args.get('type')
    city = request.args.get('city')

    query = Restaurant.query

    if type and city:
        query = query.filter(Restaurant.cuisine_type == type, Restaurant.city == city)
    elif type:
        query = query.filter(Restaurant.cuisine_type == type)
    elif city:
        query = query.filter(Restaurant.city == city)

    restaurants = [rest.details_to_dict() for rest in query.all()]

    return jsonify({ "restaurants": restaurants }), 200

                                    # ##google maps api example
                                        ## we'd need to convert our addresses to lat and long (lot of resources
        # @places_routes.route('/<lat>/<lng>')
        # def get_places(lat=None, lng=None):
        #   response = urlopen(f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=50000&keyword=golf+course&key={os.environ.get("REACT_APP_API_KEY")}')
        #   data = loads(response.read().decode('utf-8'))
        #   return {'places': data}
                                    ##required additonal imports for the above code
        # from urllib.request import urlopen, Request
        # from json import loads

# Get all Restaurants owned by the Current User can be found in User Routes

# Get details of a Restaurant from an id
@restaurant_routes.route('/<int:restaurant_id>', methods=['GET'])
def get_restaurant_by_id(restaurant_id):
    """
    Retrieves a specific restaurant by its ID
    """
    restaurant = Restaurant.query.get(restaurant_id)

    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    return jsonify({'restaurant': restaurant.details_to_dict()}), 200

# Create a Restaurant
@restaurant_routes.route("/", methods=["POST"])
@login_required
def create_restaurant():
    form =RestaurantForm()
    data = request.json

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        restaurant = Restaurant(
            user_id = current_user.id,
            restaurant_name=data["restaurant_name"],
            cover_image=data["cover_image"],
            email=data["email"],
            address=data["address"],
            city=data["city"],
            state=data["state"],
            zip_code=data["zip_code"],
            country=data["country"],
            cuisine_type=data["cuisine_type"],
            price_range=data["price_range"],
            phone_number=data["phone_number"],
            open_hours=data["open_hours"],
            closing_hours=data["closing_hours"]
        )
        current_user.owner = True
        
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'error': errors}

    db.session.add(restaurant)
    db.session.commit()

    return jsonify({"restaurant": restaurant.to_dict()}), 201

# Delete a Restaurant
@restaurant_routes.route('/<int:restaurant_id>', methods=['DELETE'])
@login_required
def delete_restaurant(restaurant_id):
    """
    Deletes a restaurant
    Only the owner can do so
    """
    if Restaurant.query.get(restaurant_id) is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    restaurant = Restaurant.query.get(restaurant_id)

    #authorization required- must be owner of resturant
    if current_user.id is not restaurant.user_id:
        return jsonify({ 'error': 'You are not authorized to delete this establishment' })

    db.session.delete(restaurant)
    db.session.commit()
    return {'message': 'Restaurant successfully removed'}
