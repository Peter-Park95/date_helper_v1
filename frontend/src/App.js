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
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>
      🩷 Date Planner 
      </h1>
      <RecommendForm onSubmit={handleFormSubmit} />
      {recommendations && <RecommendationList data={recommendations} />}
    </div>
  );
}

export default App;
