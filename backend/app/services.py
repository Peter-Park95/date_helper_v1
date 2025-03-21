
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_recommendations(date_time, age_group, location, meal_status, preference):
    meal_text = "식사를 마친 상태" if meal_status else "아직 식사를 하지 않은 상태"
    
    prompt = f"""
    안녕, 데이트 코스를 짜줄 수 있겠니?
    데이트는 {date_time}부터 시작할 예정이야.
    우리는 {age_group}이고, 현재 위치는 {location}이야.
    {meal_text}이며, {preference}로 데이트하고 싶어.
    
    위 조건을 바탕으로 데이트 코스를 추천해줘.
    각 장소에 대한 짧은 설명도 함께 제공해줘.
    """


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "너는 데이트 플래너야."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.split("\n")