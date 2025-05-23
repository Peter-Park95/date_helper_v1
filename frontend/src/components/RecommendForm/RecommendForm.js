import { useState } from "react";
import axios from "axios";
import LocationSelector from "./LocationSelector"; // ✅ 위치 선택 컴포넌트

export default function RecommendForm({ onSubmit }) {
  const [form, setForm] = useState({
    date: "주말",
    time: "저녁",
    age_group: "20",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLocationSelect = (selectedLocation) => {
    setForm({ ...form, location: selectedLocation });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchRecommendations = async () => {
      const { date, age_group, location } = form;
      const token = localStorage.getItem("access_token");

      try {
        const res = await axios.get("http://localhost:5000/recommend-course", {
          params: {
            location,
            age_group,
            date,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return res.data;

      } catch (err) {
        if (err.response?.status === 401) {
          alert("로그인이 필요합니다.");
          window.location.href = "/login";
        } else {
          alert("추천 정보를 불러오는 데 실패했습니다.");
          console.error(err);
        }
        return [];
      }
    };

    onSubmit(fetchRecommendations);
  };

  const formStyle = {
    padding: "2rem",
    borderRadius: "1rem",
    backgroundColor: "#FFF8F1",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    maxWidth: "480px",
    margin: "2rem auto",
    fontFamily: "'Pretendard', sans-serif",
    border: "1px solid #FFE0B2"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "1rem",
    fontSize: "1rem"
  };

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "0.3rem",
    width: "100%"
  };

  const buttonStyle = {
    padding: "0.7rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff7f50",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1rem"
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>💌 나만의 데이트 추천 받기</h2>

      {/* 날짜 */}
      <label style={labelStyle}>
        📅 언제 만날까요?  
        <select name="date" value={form.date} onChange={handleChange} style={inputStyle}>
          <option>평일</option>
          <option>주말</option>
        </select>
      </label>

      {/* 시간 */}
      <label style={labelStyle}>
        🕒 시간대는요?  
        <select name="time" value={form.time} onChange={handleChange} style={inputStyle}>
          <option>낮</option>
          <option>저녁</option>
          <option>새벽</option>
        </select>
      </label>

      {/* 연령대 */}
      <label style={labelStyle}>
        👥 연령대는요?  
        <select name="age_group" value={form.age_group} onChange={handleChange} style={inputStyle}>
          <option value="10">10대</option>
          <option value="20">20대</option>
          <option value="30">30대</option>
          <option value="40">40대</option>
          <option value="50">50대</option>
        </select>
      </label>

      {/* 위치 선택기 */}
      <label style={labelStyle}>
        <LocationSelector onSelect={handleLocationSelect} />
      </label>

      <div style={{ textAlign: "center" }}>
        <button type="submit" style={buttonStyle}>✨ 데이트 추천 받기</button>
      </div>
    </form>
  );
}
