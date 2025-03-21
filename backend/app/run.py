from flask import Flask
from app.routes import api_routes

app = Flask(__name__)

# API 라우트 등록
app.register_blueprint(api_routes)

if __name__ == "__main__":
    app.run(debug=True)