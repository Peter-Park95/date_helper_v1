import { useState } from "react";

const areaData = {
  서울: [
    "신사",
    "압구정",
    "강남",
    "잠실",
    "거여",
    "이태원",
    "성수",
    "건대",
    "왕십리",
    "홍대",
    "신촌",
    "합정",
    "문래",
    "공덕",
  ],
  경기: ["수원", "성남", "분당", "위례","광교", "부천", "안양"],
  부산: ["서면", "해운대", "남포동", "광안리"],
};

export default function LocationSelector({ onSelect }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedLocation("");
    onSelect(""); // 초기화
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    onSelect(location);
  };

  const labelStyle = {
    display: "block",
    marginTop: "1rem",
    marginBottom: "0.3rem",
    fontSize: "1rem"
  };

  const inputStyle = {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%"
  };

  return (
    <div>
      <label style={labelStyle}>
        📍 어디서 만날까요? (시/도 선택)
      </label>
      <select
        value={selectedCity}
        onChange={handleCityChange}
        style={inputStyle}
      >
        <option value="">시/도를 선택하세요</option>
        {Object.keys(areaData).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && (
        <>
          <label style={labelStyle}>
            📌 {selectedCity}의 상세 지역 선택
          </label>
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            style={inputStyle}
          >
            <option value="">지역을 선택하세요</option>
            {areaData[selectedCity].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
