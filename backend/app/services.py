
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_recommendations(date, time, age_group, location, relation):
    
    prompt = f"""
    안녕! 우리 커플을 위한 데이트 코스를 추천해줄래?  
    - 날짜: {date}  
    - 시간대: {time}  
    - 장소: {location}  
    - 연령대: {age_group}대  
    - 관계: {relation}  

    위 정보를 바탕으로, **시간대별 일정이 포함된 데이트 코스를 단계별로 제안해줘.**
    각 추천마다 장소명, 간단한 설명, 예상 소요시간 정도도 함께 알려주면 좋아.
    """


    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "너는 데이트 플래너야."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content.split("\n")