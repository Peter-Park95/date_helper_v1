from flask import Flask
from flask_cors import CORS
from app.routes import api_routes

app = Flask(__name__)
CORS(app, supports_credentials=True, origins="*")
app.register_blueprint(api_routes)

def create_app():
    return app