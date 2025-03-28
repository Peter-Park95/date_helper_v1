require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 5000;

const CLIENT_ID = process.env.NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
app.use(cors());
app.use(express.json());

app.get("/api/search-place", async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get("https://openapi.naver.com/v1/search/local.json", {
      params: {
        query: query,
        display: 5,
        start: 1,
        sort: "comment"
      },
      headers: {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("네이버 API 에러:", error.message);
    res.status(500).json({ error: "네이버 장소 검색 실패" });
  }
});

app.listen(port, () => {
  console.log(`🟢 네이버 장소 프록시 서버 실행 중! http://localhost:${port}`);
});
