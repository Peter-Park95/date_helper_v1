require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5001;

const KAKAO_API_KEY = process.env.KAKAO_REST_API_KEY;

app.use(cors());
app.use(express.json());

app.get("/api/search-place", async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get("https://dapi.kakao.com/v2/local/search/keyword.json", {
      params: { query: query, size: 5 },
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
    });

    res.json(response.data.documents);
  } catch (error) {
    console.error("카카오 장소 검색 실패:", error.message);
    res.status(500).json({ error: "카카오 장소 검색 실패" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Kakao 장소 검색 프록시 서버 실행 중! http://localhost:${port}`);
});
