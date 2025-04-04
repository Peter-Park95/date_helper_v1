export default function RecommendationCard({ place }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        border: "1px solid #eee",
        borderRadius: "16px",
        padding: "1.2rem",
        backgroundColor: "#fafafa",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        alignItems: "center",
        transition: "transform 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.015)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      {/* 썸네일 */}
      <img
        src={place.thumbnail}
        alt={`${place.place_name} 썸네일`}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      {/* 텍스트 정보 */}
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 0.3rem", fontSize: "1.15rem", fontWeight: "600", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}>📍</span> {place.place_name}
        </h4>
        <p style={{ margin: "0 0 0.3rem", color: "#666", fontSize: "0.95rem" }}>{place.address_name}</p>
        <p style={{ margin: 0, fontSize: "0.9rem", color: "#444" }}>📝 {place.description}</p>
      </div>

      {/* 지도 썸네일 (클릭 시 place_url 이동) */}
      {place.static_map_url && place.place_url && (
        <a
          href={place.place_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", flexShrink: 0 }}
        >
          <img
            src={place.static_map_url}
            alt="지도 미리보기"
            style={{
              borderRadius: "10px",
              width: "180px",
              height: "120px",
              objectFit: "cover",
              cursor: "pointer",
              border: "1px solid #ddd",
            }}
          />
        </a>
      )}
    </div>
  );
}
