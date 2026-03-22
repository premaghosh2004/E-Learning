import axios from "axios";

const BASE_URL = "https://crawler-backend-i4mu.onrender.com/api";

export const startCrawl = (tags) => {
  axios.post(`${BASE_URL}/crawl`, { tags });
};

export const getRecommendations = async (tags) => {
  return await axios.post(`${BASE_URL}/recommend`, { tags });
};