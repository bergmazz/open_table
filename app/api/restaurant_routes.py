from flask import Blueprint, jsonify, request

from app import models
from ..models import Restaurant

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

    restaurants = [rest.to_dict() for rest in query.all()]
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

# Delete a Restaurant
