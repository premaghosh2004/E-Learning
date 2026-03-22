const axios = require("axios");
const cheerio = require("cheerio");
const Page = require("../models/Page");
const { computeRelevance } = require("./relevanceService");

let visited = new Set();

async function crawl(url, keywords, depth = 1) {
  console.log("👉 Crawling START:", url, "| Depth:", depth);

  // 🔹 Stop conditions
  if (visited.has(url) || depth > 2) {
    console.log("⛔ Skipped:", url);
    return;
  }

  try {
    // 🔹 Fetch page safely
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 5000,
      validateStatus: () => true
    });

    // 🚫 Skip invalid / empty pages
    if (!data || data.length < 100) {
      console.log("⚠️ Invalid page skipped:", url);
      return;
    }

    const $ = cheerio.load(data);

    visited.add(url);

    // 🔹 Extract text
    const text = $("body").text().toLowerCase();
    const words = text.split(/\W+/);

    // 🔥 Smart keyword matching
    const tags = keywords.filter(k =>
      words.some(w => w.startsWith(k))
    );

    console.log("🏷️ Tags found:", tags);

    // 🚫 Skip irrelevant pages
    if (tags.length === 0) {
      console.log("🚫 Irrelevant page skipped:", url);
      return;
    }

    // 🔹 Save page
    await Page.create({
      url,
      tags,
      timestamp: Date.now(),
      depth
    });

    console.log("💾 Saved to DB:", url);

    let links = [];

    // 🔹 Extract and filter links
    $("a").each((i, el) => {
      const link = $(el).attr("href");
      if (!link) return;

      let nextUrl;
      try {
        nextUrl = new URL(link, url).href;
      } catch {
        return;
      }

      // 🔥 DOMAIN FILTER (VERY IMPORTANT)
      if (
        !nextUrl.includes("geeksforgeeks") &&
        !nextUrl.includes("tutorialspoint") &&
        !nextUrl.includes("javatpoint") &&
        !nextUrl.includes("w3schools")
      ) {
        return; // 🚫 skip non-educational links
      }

      // 🔹 Compute relevance
      const score = computeRelevance(
        nextUrl,
        $(el).text(),
        depth,
        keywords
      );

      if (score > 0) {
        links.push({
          url: nextUrl,
          score,
          depth: depth + 1
        });
      }
    });

    // 🔹 Sort by relevance
    links.sort((a, b) => b.score - a.score);

    console.log("🔗 Relevant links:", links.length);

    // 🔥 Parallel crawling (FAST)
    const nextLinks = links.slice(0, 5);

    await Promise.all(
      nextLinks.map(link =>
        crawl(link.url, keywords, link.depth)
      )
    );

  } catch (err) {
    console.log("❌ Error crawling:", url);
    console.log("⚠️", err.message);
  }
}

// 🔹 Reset crawler
function resetCrawler() {
  visited.clear();
}

module.exports = { crawl, resetCrawler };