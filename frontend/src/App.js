import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { startCrawl, getRecommendations } from "./api";
import "./styles/App.css";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (input) => {
  setLoading(true);
  setResults([]);   // clear old results

  const tags = input.toLowerCase().split(" ");

  try {
    // 🔥 WAIT for crawling to finish
    await startCrawl(tags);

    // small delay ensures DB write completed
    await new Promise(res => setTimeout(res, 1000));

    const res = await getRecommendations(tags);
    setResults(res.data);

  } catch (err) {
    console.error(err);
    alert("Error fetching results");
  }

  setLoading(false);
};

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading ? <Loader /> : <Results results={results} />}
    </div>
  );
}

export default App;