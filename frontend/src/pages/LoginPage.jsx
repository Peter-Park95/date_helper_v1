import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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
    </div>
  );
}

export default LoginPage;
