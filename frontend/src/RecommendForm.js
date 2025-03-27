import { useState } from "react";

export default function RecommendForm({ onSubmit }) {
  const [form, setForm] = useState({
    date: "주말",
    time: "저녁",
    age_group: "20",
    location: "",
    relation: "연인"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
      <label>📅 날짜: 
        <select name="date" value={form.date} onChange={handleChange}>
          <option>평일</option>
          <option>주말</option>
        </select>
      </label><br />

      <label>🕒 시간대: 
        <select name="time" value={form.time} onChange={handleChange}>
          <option>낮</option>
          <option>저녁</option>
          <option>새벽</option>
        </select>
      </label><br />

      <label>👥 연령대: 
        <select name="age_group" value={form.age_group} onChange={handleChange}>
          <option value="10">10대</option>
          <option value="20">20대</option>
          <option value="30">30대</option>
          <option value="40">40대</option>
          <option value="50">50대</option>
        </select>
      </label><br />

      <label>📍 위치: 
        <input name="location" value={form.location} onChange={handleChange} placeholder="예: 서울 건대" />
      </label><br />

      <label>💑 관계: 
        <select name="relation" value={form.relation} onChange={handleChange}>
          <option>연인</option>
          <option>썸</option>
          <option>친구</option>
        </select>
      </label><br /><br />

      <button type="submit">추천받기</button>
    </form>
  );
}
