// utils/helpers.js

// Delay function (to avoid too many requests quickly)
const delay = (ms) => new Promise(res => setTimeout(res, ms));
module.exports = { delay };

// Clean text (optional use)
const cleanText = (text) => {
  return text.replace(/\s+/g, " ").trim();
};

// Validate URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  delay,
  cleanText,
  isValidUrl,
};

