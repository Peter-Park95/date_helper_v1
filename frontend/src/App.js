import React, { useState } from "react";
import RecommendForm from "./RecommendForm";

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div>
      <RecommendForm onSubmit={setRecommendations} />
      <hr style={{ margin: "2rem 0" }} />
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {recommendations.map((place, idx) => (
          <div key={idx} style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "12px" }}>
            <h3>✨ {place.course_step}단계 추천</h3>
            <p>📍 {place.place_name}</p>
            <p>🗺️ {place.address_name}</p>
            <p>📝 {place.description}</p>
            <img src={place.thumbnail} alt="썸네일" style={{ width: "100%", maxWidth: "300px", borderRadius: "12px" }} />
            <br />
            <a href={place.place_url} target="_blank" rel="noreferrer">🔗 지도 보기</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
