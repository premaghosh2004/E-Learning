const Page = require("../models/Page");

const getRecommendations = async (req, res) => {
  try {
    const userTags = req.body.tags;

    // 🔹 Validate input
    if (!userTags || userTags.length === 0) {
      return res.status(400).json({
        error: "Tags are required"
      });
    }

    console.log("🎯 Recommendation for:", userTags);

    // 🔹 Fetch all pages from DB
    const pages = await Page.find();

    if (!pages || pages.length === 0) {
      return res.json([]);
    }

    // 🔹 Compute scores
    const results = pages.map((p) => {
      // Tag similarity
      const matchedTags = p.tags.filter(tag =>
        userTags.includes(tag)
      );

      const tagSim = matchedTags.length / userTags.length;

      // Recency (newer = higher score)
      const recency = 1 / (Date.now() - p.timestamp + 1);

      // Depth penalty (optional improvement)
      const relevanceBoost = matchedTags.length;

      // 🔥 Final score (balanced)
      const score =
        0.5 * tagSim +
        0.3 * recency +
        0.2 * relevanceBoost;

      return {
        url: p.url,
        score,
        tags: p.tags,           // ✅ include tags
        matchedTags             // ✅ show matched tags (extra feature)
      };
    });

    // 🔹 Sort by score
    results.sort((a, b) => b.score - a.score);

    // 🔹 Return top 5
    const topResults = results.slice(0, 5);

    console.log("✅ Recommendations ready");

    res.json(topResults);

  } catch (error) {
    console.error("❌ Error in recommendation:", error.message);

    res.status(500).json({
      error: "Recommendation failed",
      details: error.message
    });
  }
};

module.exports = { getRecommendations };