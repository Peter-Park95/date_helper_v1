# 📌 Date Helper
사용자의 위치와 선호도를 기반으로 데이트 코스를 추천하는 웹 & 앱

## 🛠 기술 스택
- **백엔드**: Flask, FastAPI, MySQL
- **프론트엔드**: React, etc..
- **배포**: AWS, etc..

## 📖 프로젝트 문서
- **[📄 프로젝트 기획서](./docs/project_plan.md)**
- **[🔗 API 설계](./docs/api_design.md)**
- **[📊 DB 스키마](./docs/db_schema.md)**
- **[🚀 배포 가이드](./docs/deployment.md)**

## 🚀 실행 방법
```bash
# 백엔드 실행

# 1. backend 디렉토리로 이동
cd backend
# 2. 가상환경 생성 및 실행 (처음 한 번만)
python -m venv venv
venv\Scripts\activate   # Windows 기준
# 3. 필요한 패키지 설치
pip install -r requirements.txt
# 4. 서버 실행
python run.p



# 프론트엔드 실행
cd frontend
npm start
