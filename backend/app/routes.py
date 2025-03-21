from flask import Blueprint, request, jsonify
from app.services import get_recommendations

api_routes = Blueprint("api_routes", __name__)

@api_routes.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    
    date_time = data.get("date_time")  # 데이트 시작 시간
    age_group = data.get("age_group")  # 연령대 (예: "30대")
    location = data.get("location")  # 현재 위치 (예: "서울 성수")
    meal_status = data.get("meal_status")  # 식사 여부 (True/False)
    preference = data.get("preference")  # 데이트 스타일 (실내/실외)

    # ChatGPT API로 추천 코스 요청
    recommendations = get_recommendations(date_time, age_group, location, meal_status, preference)

    return jsonify({"recommendations": recommendations})