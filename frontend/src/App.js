import React, { useState } from "react";
import RecommendForm from "./components/RecommendForm/RecommendForm";
import RecommendationSection from "./components/Recommendations/RecommendationSelection";

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sortedRecommendations = [1, 2, 3]
    .map((step) => recommendations.find((place) => place.course_step === step))
    .filter(Boolean);

  // ✅ 다시 추천받기 핸들러
  const handleRetry = () => {
    setShowResults(false);      // 폼 다시 보이기
    setRecommendations([]);     // 기존 결과 초기화
  };


  return (
    <div
      style={{
        backgroundColor: "#FFF5EB",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      {/* ✅ 로딩 중일 때 스피너만 보여주기 */}
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#ff7f50" }}>
            🔄 데이트 코스를 불러오고 있어요...
          </p>
        </div>
      ) : !showResults ? (
        <RecommendForm
          onSubmit={async (dataFetcher) => {
            // ✅ 추천 시작 시 로딩 true
            setIsLoading(true);

            // ✅ RecommendForm에서 fetch 함수 받아 실행
            const data = await dataFetcher();

            setRecommendations(data);
            setShowResults(true);
            setIsLoading(false); // ✅ 추천 끝나면 로딩 false
          }}
        />
      ) : (
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          {sortedRecommendations.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              추천 결과가 없습니다 🥲
            </p>
          ) : (
            <>
              {sortedRecommendations.map((place, idx) => (
                <RecommendationSection
                  key={idx}
                  step={place.course_step}
                  place={place}
                />
              ))}

              {/* ✅ 다시 추천받기 버튼 */}
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button
                  onClick={handleRetry}
                  style={{
                    padding: "0.7rem 1.5rem",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FF9F1C",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  🔄 다시 추천받기
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
