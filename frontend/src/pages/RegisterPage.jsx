// frontend/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await axios.post('http://localhost:5000/auth/register', {
        email,
        username,
        password,
      });

      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      window.location.href = '/login';
    } catch (error) {
      setErrorMsg(error.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>회원가입</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="사용자 이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>
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
            backgroundColor: '#2185d0',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
