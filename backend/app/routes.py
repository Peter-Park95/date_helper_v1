from flask import Blueprint, request, jsonify
from app.services import get_recommendations
from flask_cors import cross_origin

api_routes = Blueprint("api_routes", __name__)

@api_routes.route("/recommend", methods=["POST"])
@cross_origin()
def recommend():
    data = request.get_json()

    date = data["date"]              # 평일 / 주말
    time = data["time"]              # 낮 / 저녁 / 새벽
    age_group = data["age_group"]    # 10 / 20 / 30 ...
    location = data["location"]      # 예: 서울 건대
    relation = data["relation"]      # 친구 / 썸 / 연인

    # ChatGPT API로 추천 코스 요청
    recommendations = get_recommendations(date, time, age_group, location, relation)

    return jsonify({"recommendations": recommendations})