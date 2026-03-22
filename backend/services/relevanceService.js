function computeRelevance(url, anchorText, depth, keywords) {
  const anchorWords = anchorText.toLowerCase().split(" ");

  const T = keywords.filter(k => anchorWords.includes(k)).length / keywords.length;
  const U = keywords.some(k => url.includes(k)) ? 1 : 0;
  const S = 0.5;
  const D = depth / 5;

  return 0.4*T + 0.2*U + 0.2*S - 0.2*D;
}

module.exports = { computeRelevance };