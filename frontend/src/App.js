import React, { useState } from "react";
import RecommendForm from "./components/RecommendForm/RecommendForm";
import RecommendationSection from "./components/Recommendations/RecommendationSelection";

function App() {
  const [recommendations, setRecommendations] = useState([]);

  // 코스별 정렬: 1~3단계 순서대로 하나씩
  const sortedRecommendations = [1, 2, 3]
    .map((step) => recommendations.find((place) => place.course_step === step))
    .filter(Boolean);

  return (
    <div style={{ backgroundColor: "#FFF5EB", minHeight: "100vh", paddingBottom: "4rem" }}>
      <RecommendForm onSubmit={setRecommendations} />
      <hr style={{ margin: "2rem 0" }} />

      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {sortedRecommendations.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            아직 추천을 받지 않았어요! 💡<br />
            위의 폼을 통해 데이트 코스를 추천받아보세요.
          </p>
        ) : (
          sortedRecommendations.map((place, idx) => (
            <RecommendationSection
              key={idx}
              step={place.course_step}
              place={place}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
