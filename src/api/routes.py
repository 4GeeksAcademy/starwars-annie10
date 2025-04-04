from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Products,Planets,PlanetFavorite,Characters,CharacterFavorite
from flask_jwt_extended import create_access_token
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt



api = Blueprint('api', __name__)
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


@api.route('/users', methods=['GET'])
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    print(rows)
    # opción 1: standard
    # results = []
    # for row in rows:
    #    results.append(row.serialize())
    # opcion 2: list comprehension
    # variable = [ target for individual in iterable ]
    results = [ row.serialize() for row in rows]
    response_body['message'] = f'Listado de Usuarios'
    response_body['results'] = results
    return response_body, 200


@api.route('/products', methods=['GET', 'POST'])
def products():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Products)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = f'Respuesta para el método {request.method}'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Products(name=data['name'],
                       description=data.get('description', 'n/a'),
                       price=data['price'])
        db.session.add(row)
        db.session.commit()
        response_body['message'] = f'Respuesta para el método {request.method}'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    response_body = {}
    current_user = get_jwt_identity()
    response_body['message'] = f'User logged: {current_user}'
@api.route('/edit-profile', methods=['PUT'])
@jwt_required()
def edit_profile():
    response_body = {"hola": 'ciau'}
    request_data = request.json
    token_data = get_jwt()
    response_body["token_data"] = token_data
    response_body["request_data"] = request_data
    row =  db.session.execute(db.select(Users).where(Users.id == token_data["user_id"])).scalar()
    print("soy el row 1ero request data",request_data["isActive"])

    print("soy el row ANTES", row.serialize())
    
    row.email = request_data["email"]
    row.is_active = request_data["isActive"]
    row.is_admin = request_data["isAdmin"]
    row.first_name = request_data["firstName"]
    row.last_name = request_data["lastName"]
    db.session.commit()
    print("soy el row DESPUES", row.serialize())
    response_body["result"] = row.serialize()
    
    
    return response_body, 200

@api.route('/users', methods=['GET'])
def get_users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = 'Listado de usuarios'
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    username = request.json.get("username", None)
    password = data.get("password", None)
    if username != "test" or password != "test":
        response_body['message'] = "Bad username or paswword"
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=username)
    response_body['message'] ='User logged!'
    response_body['acces_token'] = access_token
    return response_body,200
    


@api.route('/products/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def product(id):
    response_body = {}
    row = db.session.execute(db.select(Products).where(Products.id == id)).scalar()
    print(row)
    if not row:
        response_body['message'] = f'El producto id {id} no existe'
        return response_body, 404
    # TODO:
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Respuesta para el método {request.method} del id: {id}' 
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        print('row', row.serialize())
        print('data', data)
        row.name = data.get('name')
        """
        foo = data.get('description', None)
        if foo:
            row.description = foo
        """
        row.description = data.get('description', row.description)
        row.price = data['price']
        db.session.commit()
        response_body['message'] = f'Respuesta para el método {request.method} del id {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        # La pregunta es: Borro o dashabilito ?
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Hemos borrado el procuto id {id}'
        response_body['results'] = {}
        return response_body, 200
    

    response_body = {}
    data = request.json
    email = request.json.get("email", None)
    password = data.get("password", None)
    row = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not row:
        response_body['message'] = "Bad username or password"
        return response_body, 401
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_admin': user['is_admin']}
    print(claims)
    access_token = create_access_token(identity=email, additional_claims=claims)
    response_body['message'] = 'User Logged!'
    response_body['access_token'] = access_token
    response_body['results'] = user
    return response_body, 200

@api.route("/register", methods=["POST"])
def register():
    response_body = {}
    data = request.json
    row = Users(email=data["email"],
                    password=data['password'],
                    is_active=data.get('is_active', True),
                    is_admin=data.get('is_admin', False),
                    first_name=data.get('first_name', ''),
                    last_name=data.get('last_name', ''),)
    
    db.session.add(row)
    db.session.commit()
    user = row.serialize()
    claims = {'user_id': user['id'],
              'is_admin': user['is_admin']}
    print(claims)
    access_token = create_access_token(identity=user['email'], additional_claims=claims)
    response_body['message'] = 'User Register!'
    response_body['results'] = user
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    current_user = get_jwt_identity()
    response_body['message'] = f'User logged {current_user}'
    return response_body, 200


@api.route('/characters', methods=['GET'])
def get_characters():
    response_body = {}
    url = 'https://swapi.tech/api/people'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de personajes desde SWAPI'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'Algo salió mal al obtener los personajes'
    return response_body, 400


@api.route('/characters/<int:character_id>', methods=['GET'])
def get_character(character_id):
    response_body = {}
    url = f'https://swapi.tech/api/people/{character_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = f'Información del personaje con id {character_id} desde SWAPI'
        response_body['results'] = data['result']
        return response_body, 200
    response_body['message'] = f'No se encontró el personaje con id {character_id}'
    return response_body, 404


@api.route('/planets', methods=['GET'])
def get_planets():
    response_body = {}
    url = 'https://swapi.tech/api/planets'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = 'Listado de planetas desde SWAPI'
        response_body['results'] = data['results']
        return response_body, 200
    response_body['message'] = 'Algo salió mal al obtener los planetas'
    return response_body, 400


@api.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    response_body = {}
    url = f'https://swapi.tech/api/planets/{planet_id}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = f'Información del planeta con id {planet_id} desde SWAPI'
        response_body['results'] = data['result']
        return response_body, 200
    response_body['message'] = f'No se encontró el planeta con id {planet_id}'
    return response_body, 404


@api.route('/users/<int:user_id>/favorites-planets', methods=['GET'])
def get_user_favorite_planets(user_id):
    response_body = {}
    rows = db.session.execute(db.select(PlanetFavorite).where(PlanetFavorite.user_id == user_id)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = f'Listado de planetas favoritos del usuario con id {user_id}'
    return response_body, 200


@api.route('/users/<int:user_id>/favorite-planet', methods=['POST'])
@jwt_required()
def add_favorite_planet(user_id):
    response_body = {}
    data = request.json
    planet_id = data.get('planet_id')
    if not planet_id:
        response_body['message'] = 'El campo planet_id es requerido'
        return response_body, 400
    favorite = PlanetFavorite(user_id=user_id, planet_id=planet_id)
    db.session.add(favorite)
    db.session.commit()
    response_body['results'] = favorite.serialize()
    response_body['message'] = f'Planeta favorito añadido al usuario con id {user_id}'
    return response_body, 201


@api.route('/users/<int:user_id>/favorite-planets/<int:planet_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_planet(user_id, planet_id):
    response_body = {}
    favorite = db.session.execute(db.select(PlanetFavorite).where(
        PlanetFavorite.user_id == user_id,
        PlanetFavorite.planet_id == planet_id
    )).scalar()
    if not favorite:
        response_body['message'] = f'No se encontró el planeta favorito con id {planet_id} para el usuario con id {user_id}'
        return response_body, 404
    db.session.delete(favorite)
    db.session.commit()
    response_body['message'] = f'Planeta favorito con id {planet_id} eliminado del usuario con id {user_id}'
    return response_body, 200


@api.route('/users/<int:user_id>/favorites-characters', methods=['GET'])
def get_user_favorite_characters(user_id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    if not user:
        response_body['message'] = f'El usuario con id {user_id} no existe'
        return response_body, 404

    favorites = db.session.execute(
        db.select(CharacterFavorite).where(CharacterFavorite.user_id == user_id)
    ).scalars()
    results = [favorite.serialize() for favorite in favorites]

    response_body['message'] = f'Listado de personajes favoritos del usuario con id {user_id}'
    response_body['results'] = results
    return response_body, 200


@api.route('/users/<int:user_id>/favorite-characters', methods=['POST'])
@jwt_required()
def add_favorite_character(user_id):
    response_body = {}
    data = request.json

    character_id = data.get('character_id')
    if not character_id:
        response_body['message'] = 'El campo character_id es requerido'
        return response_body, 400

    user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    if not user:
        response_body['message'] = f'El usuario con id {user_id} no existe'
        return response_body, 404

    character = db.session.execute(db.select(Characters).where(Characters.id == character_id)).scalar()
    if not character:
        response_body['message'] = f'El personaje con id {character_id} no existe'
        return response_body, 404

    favorite = CharacterFavorite(user_id=user_id, character_id=character_id)
    db.session.add(favorite)
    db.session.commit()

    response_body['message'] = f'Personaje favorito añadido al usuario con id {user_id}'
    response_body['results'] = favorite.serialize()
    return response_body, 201


@api.route('/users/<int:user_id>/favorite-characters/<int:character_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite_character(user_id, character_id):
    response_body = {}

    favorite = db.session.execute(db.select(CharacterFavorite).where(
        CharacterFavorite.user_id == user_id,
        CharacterFavorite.character_id == character_id
    )).scalar()

    if not favorite:
        response_body['message'] = f'No se encontró el personaje favorito con id {character_id} para el usuario con id {user_id}'
        return response_body, 404

    db.session.delete(favorite)
    db.session.commit()

    response_body['message'] = f'Personaje favorito con id {character_id} eliminado del usuario con id {user_id}'
    return response_body, 200
