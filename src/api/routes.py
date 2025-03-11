"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Products
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


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
    