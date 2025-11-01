import React, { useEffect, useState } from "react";
import { fetchApiConfig } from '../GetApis';

const CurNewsSection = ({ user }) => {
  const [term, setTerm] = useState("");
  const [articles, setArticles] = useState([]);

  const getNews = async () => {
    if (!term.trim()) {
      alert("Please Enter Keyword (Ex. Biden, Tesla, F1) To Get Relevant News Articles Regarding It.");
      return;
    }

    try {
      const config = await fetchApiConfig(user.uid);
      const apiKey = config?.curNewsKey;
      if (!apiKey) throw new Error("Missing News API key");
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(term)}&apiKey=${apiKey}`
      );
      const data = await response.json();

      if (data.articles) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };
  

  return (
    <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-white text-center h-screen max-sm:h-[115vh] p-[1em] w-full max-w-[100%] sm:p-[1.5em] md:p-[2em] lg:p-[3em] lg:h-[1174px] overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Curated News Articles</h2>

      {/* Search bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter News Keyword here (Ex. Trump, Gaza, Taylor Swift)"
          className="flex-1 px-3 py-2 rounded bg-white/20 border border-white/30 focus:outline-none text-white placeholder-gray-300"
        />
        <button onClick={getNews} className="px-3 py-2 bg-[#545454] text-white rounded cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/55">
          Get News
        </button>
      </div>

      {/* News results */}
      <div className="space-y-3 max-h-[80vh] font-bold text-white text-lg mt-4 overflow-y-auto">
        {articles.length === 0 ? (
          <p className="text-gray-300">No news to display. Try searching!</p>
        ) : (
          articles.map((article, index) => (
            <div key={index}  className="newscard border border-white/20 font-bold rounded-lg p-3 m-4 bg-white/10 backdrop-blur-md text-white">
              <h2 className=" font-bold text-lg">{article.title}</h2>
              <a href={article.url} target="_blank"  rel="noopener noreferrer" className="text-white font-semibold hover:text-blue-400 transition duration-200 underline">
                Click To Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CurNewsSection;
