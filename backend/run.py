# backend/run.py

from app import create_app  # create_app 함수 import

app = create_app()  # 여기가 핵심! 모든 초기화 포함된 app

if __name__ == "__main__":
    app.run(debug=True)
