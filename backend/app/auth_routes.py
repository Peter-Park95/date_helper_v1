from flask import Blueprint, request, jsonify
from app.models import db, User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
bcrypt = Bcrypt()

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email or not password:
        return jsonify({'message': '이메일과 비밀번호를 모두 입력해주세요.'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': '이미 존재하는 이메일입니다.'}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_pw, username=username)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': '회원가입 성공!'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    # 삭제된 유저 필터링
    if not user or user.is_deleted():
        return jsonify({'message': '존재하지 않는 계정이거나 탈퇴한 회원입니다.'}), 404

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': '비밀번호가 올바르지 않습니다.'}), 401

    token = create_access_token(identity=email)
    return jsonify({'access_token': token})
