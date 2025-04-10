# app/routes.py
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app.kakao import generate_recommendations
from app.auth_routes import auth_bp
from flask_jwt_extended import jwt_required, get_jwt_identity


api_routes = Blueprint("api_routes", __name__)
api_routes.register_blueprint(auth_bp)

# ✅ [새 라우트 - 카카오 기반]
@api_routes.route("/recommend-course", methods=["GET"])
@jwt_required()
@cross_origin()
def recommend_course():
    location = request.args.get("location", "성수")
    age_group = request.args.get("age_group", "20")
    date = request.args.get("date", "평일")
    results = generate_recommendations(location, age_group, date)
    return jsonify(results)
