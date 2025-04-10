import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // 이미 로그인된 상태면 로그인 페이지 → 추천 페이지로 리디렉션
      navigate('/recommend');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      
      const { access_token } = res.data;
      localStorage.setItem('access_token', access_token);
      alert('로그인 성공!');
      window.location.href = '/recommend'; // 로그인 성공 시 이동
    } catch (error) {
      setErrorMsg(error.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>로그인</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>
        {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            backgroundColor: '#FF9F1C',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          로그인
        </button>
      </form>

      {/* 🔗 회원가입 링크 */}
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        아직 계정이 없으신가요?{' '}
        <a href="/register" style={{ color: '#2185d0' }}>
          회원가입
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
