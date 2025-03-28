import os
import random
import requests
from dotenv import load_dotenv

load_dotenv()

KAKAO_API_KEY = os.getenv("KAKAO_REST_API_KEY")

def get_category_thumbnail(category: str):
    if "카페" in category:
        return "/images/thumbs/cafe.jpg"
    if "맛집" in category or "음식" in category or "레스토랑" in category:
        return "/images/thumbs/restaurant.jpg"
    if "공원" in category:
        return "/images/thumbs/park.jpg"
    if "술" in category or "주점" in category or "바" in category:
        return "/images/thumbs/bar.jpg"
    if "영화" in category:
        return "/images/thumbs/cinema.jpg"
    if "공연" in category or "전시" in category:
        return "/images/thumbs/theater.jpg"
    return "/images/thumbs/default.jpg"

def search_places(location: str, keyword: str, step: int):
    url = "https://dapi.kakao.com/v2/local/search/keyword.json"
    headers = {"Authorization": f"KakaoAK {KAKAO_API_KEY}"}
    params = {"query": f"{location} {keyword}", "size": 3}
    
    print(f"🔍 Searching: {params['query']}")  # 콘솔 로그 찍기

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print("카카오 API 에러:", e)
        return []

    items = response.json().get("documents", [])
    return [
        {
            "course_step": step,
            "place_name": item["place_name"],
            "address_name": item.get("road_address_name") or item["address_name"],
            "phone": item.get("phone"),
            "place_url": item.get("place_url"),
            "category": item.get("category_name", ""),
            "description": f"{item['place_name']} - {keyword} 관련 추천",
            "thumbnail": get_category_thumbnail(item.get("category_name", ""))
        }
        for item in items
    ]
def generate_recommendations(location: str, age_group: str = "20", date: str = "평일"):
    all_results = []

    # 기본 키워드 세팅
    filtered_keywords = {
        1: ["영화관", "연극", "공연장", "전시회"],
        2: ["맛집", "카페", "레스토랑"],
        3: ["술집", "와인바", "카페", "보드게임"]
    }

    # 10대는 술집, 와인바 제외
    if age_group == "10":
        filtered_keywords[3] = ["카페", "보드게임"]

    # 🔥 "홍대" 또는 "이태원" + "주말"이면 코스 3은 클럽 고정!
    if date == "주말" and location in ["홍대", "이태원"]:
        filtered_keywords[3] = ["클럽"]

    for step in range(1, 4):
        tries = 0
        while tries < 5:
            keyword = random.choice(filtered_keywords[step])
            places = search_places(location, keyword, step)
            if places:
                all_results.extend(places)
                break
            tries += 1

    return all_results