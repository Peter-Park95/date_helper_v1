// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // 우리가 아까 만든 로그인 페이지
import RecommendPage from './pages/RecommendPage'; // 기존 App 컴포넌트 내용 여기로 옮김

function App() {
  const isLoggedIn = !!localStorage.getItem('access_token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/recommend"
          element={isLoggedIn ? <RecommendPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
