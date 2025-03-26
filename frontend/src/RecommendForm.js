import { useState } from "react";

export default function RecommendForm({ onSubmit }) {
  const [form, setForm] = useState({
    date_time: "",
    age_group: "20대",
    location: "",
    meal_status: false,
    preference: "실내 위주",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
      <label>📅 날짜/시간: <input type="datetime-local" name="date_time" onChange={handleChange} /></label><br />
      <label>👥 연령대: 
        <select name="age_group" value={form.age_group} onChange={handleChange}>
          <option>20대</option>
          <option>30대</option>
          <option>40대</option>
        </select>
      </label><br />
      <label>📍 위치: <input name="location" value={form.location} onChange={handleChange} /></label><br />
      <label>🍽️ 식사 포함: <input type="checkbox" name="meal_status" checked={form.meal_status} onChange={handleChange} /></label><br />
      <label>🌤️ 선호: 
        <select name="preference" value={form.preference} onChange={handleChange}>
          <option>실내 위주</option>
          <option>실외 위주</option>
          <option>반반</option>
        </select>
      </label><br /><br />
      <button type="submit">추천받기</button>
    </form>
  );
}
