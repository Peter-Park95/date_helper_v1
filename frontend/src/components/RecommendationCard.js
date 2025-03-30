import React from "react";

export default function RecommendationCard({ place }) {
  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "1rem",
      backgroundColor: "#fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      {/* 썸네일 이미지 */}
      <img 
        src={place.thumbnail} 
        alt={`${place.place_name} 썸네일`} 
        style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "8px" }} 
      />
      
      {/* 텍스트 정보 */}
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>📍 {place.place_name}</h4>
        <p style={{ margin: 0, color: "#555" }}>{place.address_name}</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>📝 {place.description}</p>
        <a 
          href={place.place_url} 
          target="_blank" 
          rel="noreferrer" 
          style={{ display: "inline-block", marginTop: "0.5rem", color: "#ff7f50", fontWeight: "bold" }}
        >
          🔗 지도 보기
        </a>
      </div>
    </div>
  );
}
