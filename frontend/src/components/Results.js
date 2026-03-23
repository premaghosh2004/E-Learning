import React from "react";

function Results({ results }) {
  if (results.length === 0) return <p>No results yet</p>;

  return (
    <div className="results">
      {results.map((item, index) => (
        <div key={index} className="card">

          {/* 🔗 URL */}
          <a href={item.url} target="_blank" rel="noreferrer">
            🔗 {item.url}
          </a>

          {/* 🏷️ TAGS */}
          <div className="tags">
            {item.tags?.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {/* 🎯 MATCHED TAGS */}
          {item.matchedTags && item.matchedTags.length > 0 && (
            <p className="match">
              Matched: {item.matchedTags.join(", ")}
            </p>
          )}

        </div>
      ))}
    </div>
  );
}

export default Results;