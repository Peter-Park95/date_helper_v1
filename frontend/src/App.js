import { useState } from "react";
import RecommendForm from "./RecommendForm";
import RecommendationList from "./RecommendationList";
import axios from "axios";

function App() {
  const [recommendations, setRecommendations] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/recommend", formData);
      setRecommendations(res.data.recommendations);
    } catch (err) {
      alert("추천을 불러오는데 실패했어요.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 style={{ padding: "1rem" }}>💘 데이트 추천 도우미</h1>
      <RecommendForm onSubmit={handleFormSubmit} />
      {recommendations && <RecommendationList data={recommendations} />}
    </div>
  );
}

export default App;
