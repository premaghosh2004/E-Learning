import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const startCrawl = (tags) => {
  axios.post(`${BASE_URL}/crawl`, { tags });
};

export const getRecommendations = async (tags) => {
  return await axios.post(`${BASE_URL}/recommend`, { tags });
};