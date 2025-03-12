import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Products, Bills, BillItems, Followers, Post, Medias, Comments, Characters, CharacterFavorite, Planets,  PlanetFavorite


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    # You can duplicate that line to add mew models
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Products, db.session))
    admin.add_view(ModelView(Bills, db.session))
    admin.add_view(ModelView(BillItems, db.session))
    admin.add_view(ModelView(Followers, db.session))
    admin.add_view(ModelView(Post, db.session))
    admin.add_view(ModelView(Medias, db.session))
    admin.add_view(ModelView(Comments, db.session))
    admin.add_view(ModelView(Characters, db.session))
    admin.add_view(ModelView(CharacterFavorite, db.session))
    admin.add_view(ModelView(Planets, db.session))
    admin.add_view(ModelView(PlanetFavorite, db.session))
