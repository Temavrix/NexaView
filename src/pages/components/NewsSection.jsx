// components/NewsSection.jsx
import React, { useEffect, useState } from "react";
import { fetchApiConfig } from '../GetApis';

const NewsSection = ({ user }) => {
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const config = await fetchApiConfig(user.uid);
      const apiKey = config?.newsApiKey;
      if (!apiKey) throw new Error("Missing News API key");
        
      const res = await fetch(
        `https://taskaid-backend-8v50.onrender.com/api/news?apikey=${apiKey}&category=${category}&country=${country}`
      );
      const json = await res.json();
      setArticles(json.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchNews();
    }
  }, [user, country, category]);

  return (
    <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-white text-center h-screen max-sm:h-[115vh] p-[1em] w-full max-w-[100%] sm:p-[1.5em] md:p-[2em] lg:p-[3em] lg:h-[1174px] overflow-hidden">
      <h3 className="text-white text-[1.17em] font-bold">News Headlines</h3><br />
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-4">
        <select
          className="border-none outline-none w-[150px] px-4 py-2 rounded-[24px] bg-black/40 text-white text-[100%]"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="us">USA</option>
          <option value="sg">Singapore</option>
          <option value="in">India</option>
        </select>
        <select
          className="border-none outline-none px-4 py-2 rounded-[24px] bg-black/40 text-white text-[100%]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="general">General</option>
          <option value="nation">National</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
        </select>
      </div>

      <div className="overflow-y-auto max-h-[80vh] mt-4">
        {loading && <p className="text-gray-300">Loading News...</p>}
        {!loading && articles.length === 0 && <p className="text-gray-400">Server Is Down.</p>}
        {articles.map((article, idx) => (
          <div key={idx} className="newscard border border-white/20 rounded-lg p-3 m-4 bg-white/10 backdrop-blur-md text-white">
            <div className="card-header">
              <h2 className="mb-2 font-bold text-white text-lg">{article.title}</h2>
            </div>
            <div className="card-body">
              <a href={article.url} target="_blank" rel="noopener noreferrer"
                className="text-white underline font-semibold hover:text-blue-400 transition duration-200 block mt-2">
                Click Here To Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
