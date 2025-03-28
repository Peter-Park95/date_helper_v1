import { useState } from "react";
import LocationSelector from "./components/LocationSelector";
export default function RecommendForm({ onSubmit }) {
  const [form, setForm] = useState({
    date: "주말",
    time: "저녁",
    age_group: "20",
    location: "",
    relation: "연인"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 로딩 시작
    await onSubmit(form); // 외부 요청 (Promise)
    setLoading(false); // 👈 로딩 끝
  };

  const formStyle = {
    padding: "2rem",
    borderRadius: "1rem",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "480px",
    margin: "2rem auto",
    fontFamily: "'Pretendard', sans-serif"
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
    marginTop: "1rem",
    opacity: loading ? 0.7 : 1,
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>💌 나만의 데이트 추천 받기</h2>

      <label style={labelStyle}>
        📅 언제 만날까요?  
        <select name="date" value={form.date} onChange={handleChange} style={inputStyle}>
          <option>평일</option>
          <option>주말</option>
        </select>
      </label>

      <label style={labelStyle}>
        🕒 시간대는요?  
        <select name="time" value={form.time} onChange={handleChange} style={inputStyle}>
          <option>낮</option>
          <option>저녁</option>
          <option>새벽</option>
        </select>
      </label>

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

      <label style={labelStyle}> 
        <LocationSelector onSelect={(location) => setForm({ ...form, location })} />
        {/* <input name="location" value={form.location} onChange={handleChange} placeholder="예: 서울 건대" style={inputStyle} /> */}
      </label>

      <label style={labelStyle}>
        💑 어떤 사이인가요?  
        <select name="relation" value={form.relation} onChange={handleChange} style={inputStyle}>
          <option>연인</option>
          <option>썸</option>
          <option>친구</option>
        </select>
      </label>

      <div style={{ textAlign: "center" }}>
      <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "⏳ 추천받는 중..." : "✨ 데이트 추천 받기"}
        </button>
      </div>
    </form>
  );
}
