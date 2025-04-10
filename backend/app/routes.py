# app/routes.py
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from app.kakao import generate_recommendations
from app.auth_routes import auth_bp

api_routes = Blueprint("api_routes", __name__)
api_routes.register_blueprint(auth_bp)

# 🔻 [기존 라우트 - GPT 기반] (필요 시 주석 처리 가능)
"""
from app.services import get_recommendations

@api_routes.route("/recommend", methods=["POST"])
@cross_origin()
def recommend():
    data = request.get_json()

    date = data["date"]
    time = data["time"]
    age_group = data["age_group"]
    location = data["location"]
    relation = data["relation"]

    # ChatGPT API로 추천 코스 요청
    recommendations = get_recommendations(date, time, age_group, location, relation)

    return jsonify({"recommendations": recommendations})
"""

# ✅ [새 라우트 - 카카오 기반]
@api_routes.route("/recommend-course", methods=["GET"])
@cross_origin()
def recommend_course():
    location = request.args.get("location", "성수")
    age_group = request.args.get("age_group", "20")
    date = request.args.get("date", "평일")
    results = generate_recommendations(location, age_group, date)
    return jsonify(results)
