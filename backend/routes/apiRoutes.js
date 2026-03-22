const express = require("express");
const router = express.Router();

const { startCrawl } = require("../controllers/crawlController");
const { getRecommendations } = require("../controllers/recommendController");

router.post("/crawl", startCrawl);
router.post("/recommend", getRecommendations);

module.exports = router;