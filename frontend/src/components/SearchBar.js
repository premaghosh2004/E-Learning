import React, { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    onSearch(input);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search any topic (e.g. Blockchain, Python, React)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;