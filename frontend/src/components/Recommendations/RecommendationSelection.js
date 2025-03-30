import React from "react";
import RecommendationCard from "./RecommendationCard";

const STEP_INFO = {
  1: { title: "데이트 첫 코스 - 영화 or 연극", color: "#FFB86F", icon: "🎬" },
  2: { title: "데이트 두 번째 코스 - 식사", color: "#A0C4FF", icon: "🍽️" },
  3: { title: "데이트 마지막 코스 - 술 한 잔", color: "#BDB2FF", icon: "🍷" },
};

export default function RecommendationSection({ step, place }) {
  const { title, color, icon } = STEP_INFO[step] || {
    title: `코스 ${step}`,
    color: "#ccc",
    icon: "⭐",
  };

  return (
    <div style={{
      marginBottom: "2rem",
      padding: "1.5rem",
      borderRadius: "16px",
      backgroundColor: "#fff",
      border: `3px solid ${color}`, // 전체 테두리로 변경
      boxShadow: `0 4px 12px rgba(0, 0, 0, 0.05)`,
    }}>
      <h3 style={{
        fontSize: "1.2rem",
        fontWeight: "bold",
        color,
        marginBottom: "1.2rem"
      }}>
        {icon} {title}
      </h3>
      <RecommendationCard place={place} />
    </div>
  );
}
