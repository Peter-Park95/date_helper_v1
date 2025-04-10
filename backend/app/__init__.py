from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.routes import api_routes
from app.config import Config
from app.models import db
from app.auth_routes import bcrypt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, supports_credentials=True, origins="*")
    JWTManager(app)
    db.init_app(app)
    bcrypt.init_app(app) 

    with app.app_context():
        db.create_all()

    app.register_blueprint(api_routes)
    return app
