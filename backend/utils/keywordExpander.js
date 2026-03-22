const keywordMap = {
  blockchain: ["crypto", "bitcoin", "ethereum", "web3", "ledger"],
  python: ["programming", "coding", "scripting"],
  data: ["dataset", "analytics", "information"],
  algorithm: ["logic", "problem solving"],
  machine: ["learning", "ai", "model"],
  react: ["frontend", "javascript", "ui"]
};

function expandKeywords(userTags) {
  let expanded = new Set(userTags);

  userTags.forEach(tag => {
    if (keywordMap[tag]) {
      keywordMap[tag].forEach(word => expanded.add(word));
    }
  });

  return Array.from(expanded);
}

module.exports = { expandKeywords };