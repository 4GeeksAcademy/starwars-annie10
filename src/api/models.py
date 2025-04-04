from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    first_name = db.Column(db.String())
    last_name = db.Column(db.String())


    def __repr__(self):
        return f'<User id: {self.id} - {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    description = db.Column(db.String())
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Product: {self.id} - {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'description': self.description,
                'price': self.price}


class Bills(db.Model):
    __tablename__ = 'bills'
    id = db.Column(db.Integer, primary_key=True)
    create_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # default, el día de creación
    total = db.Column(db.Float, nullable=False)
    bill_address = db.Column(db.String())
    status = db.Column(db.Enum('pending', 'paid', 'cancel', name='status'), nullable=False)
    payment = db.Column(db.Enum('visa', 'amex', 'paypal', name='payment'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('bills_to', lazy='select'))

    def __repr__(self):
        return f'<Bills: {self.id} - user: {self.user_id}>' 


class BillItems(db.Model):
    __tablename__ = 'bill_items'
    id = db.Column(db.Integer, primary_key=True)
    price_per_unit = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'))
    bill_to = db.relationship('Bills', foreign_keys=[bill_id], backref=db.backref('bill_items', lazy='select'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    product_to = db.relationship('Products', foreign_keys=[product_id], backref=db.backref('bill_items', lazy='select'))
 
    def __repr__(self):
        return f'<Bill {self.bill_id} items: {self.id} product: {self.product_id}>' 


class Followers(db.Model):
    _tablename_ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to'), lazy='select')
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to'), lazy='select')


class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    body = db.Column(db.String())
    date = db.Column(db.DateTime)
    image_url = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('user_to'), lazy='select')


class Medias(db.Model):
    __tablename__ = 'medias'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum('Instagram', 'Facebook', 'x', name='type'))
    url = db.Column(db.String())
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post_to = db.relationship('Post', foreign_keys=[post_id], backref=db.backref('medias'), lazy='select')


class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comments'), lazy='select')
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    post_to = db.relationship('Post', foreign_keys=[post_id], backref=db.backref('comments'), lazy='select')

class Characters(db.Model):
    __tablename__ = 'characters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    height = db.Column(db.String())
    mass = db.Column(db.String())
    hair_color = db.Column(db.String())
    skin_color = db.Column(db.String())
    eye_color = db.Column(db.String())
    birth_year = db.Column(db.String())
    gender = db.Column(db.String())


class CharacterFavorite(db.Model):
    __tablename__ = 'character_favorite'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('character_favorite'), lazy='select')
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('character_favorite', lazy='select'))

class Planets(db.Model):
    __tablename__ = 'planets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    diameter = db.Column(db.String())
    rotation_period = db.Column(db.String())
    orbital_period = db.Column(db.String())
    gravity = db.Column(db.String())
    population = db.Column(db.String())
    climate = db.Column(db.String())
    terrain = db.Column(db.String())


class PlanetFavorite(db.Model):
    __tablename__ = 'planet_favorite'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('planet_favorite'), lazy='select')
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planet_favorite', lazy='select'))
    
    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'planet_id': self.planet_id}

