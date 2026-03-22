const { crawl, resetCrawler } = require("../services/crawlerService");
const Page = require("../models/Page");

// 🔥 Generate dynamic seed URLs based on user query
const getSeedUrls = (keywords) => {
  const main = keywords[0];              // primary keyword
  const second = keywords[1] || "";      // optional second word

  const pair = second ? `${main}-${second}` : main;

  const query = keywords.join(" ");      // for search engine

  return [
    // 🔹 Reliable educational sources
    `https://www.geeksforgeeks.org/${main}/`,
    `https://www.geeksforgeeks.org/${pair}/`,
    `https://www.tutorialspoint.com/${main}/`,
    `https://www.javatpoint.com/${main}`,

    // 🔥 Smart search (DuckDuckGo - BEST)
    `https://duckduckgo.com/html/?q=${query}`
  ];
};

const { expandKeywords } = require("../utils/keywordExpander");
const startCrawl = async (req, res) => {
  console.log("🔥 Crawl API HIT");

  try {
    // 🔹 Get user input
    const inputTags = req.body.tags;
    const userTags = expandKeywords(inputTags);
    console.log("🎯 Expanded Tags:", userTags);

    if (!userTags || userTags.length === 0) {
      return res.status(400).json({
        error: "Tags are required for crawling"
      });
    }

    console.log("🎯 User Tags:", userTags);

    // 🔥 Generate dynamic seeds
    const seedUrls = getSeedUrls(userTags);
    console.log("🌐 Generated Seeds:", seedUrls);

    // 🔹 Reset crawler
    resetCrawler();

    // 🔹 Clear old DB data
    await Page.deleteMany({});
    console.log("🧹 Old data cleared");

    // 🔹 Start crawling
    for (let url of seedUrls) {
      console.log("🌱 Starting seed:", url);

      try {
        await crawl(url, userTags); // pass dynamic keywords
        console.log("✅ Finished crawling seed:", url);
      } catch (err) {
        console.log("⚠️ Seed failed:", url);
      }
    }

    console.log("🎉 Crawling completed successfully");

    res.json({
      message: "Crawling completed",
      keywords: userTags,
      seeds: seedUrls
    });

  } catch (error) {
    console.error("❌ Error in startCrawl:", error.message);

    res.status(500).json({
      error: "Crawling failed",
      details: error.message
    });
  }
};

module.exports = { startCrawl };