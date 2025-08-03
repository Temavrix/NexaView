// components/NewsSection.jsx
import React, { useEffect, useState } from "react";
import { fetchApiConfig } from './GetApis';

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
        `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=${country}&max=100&apikey=${apiKey}`
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
    <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 rounded-[3em] text-white text-center h-screen max-sm:h-[115vh] p-[2em] w-full max-w-[100%] sm:p-[1.5em] md:p-[2em] lg:p-[3em] lg:h-[1168px] overflow-hidden">
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
        <button
          onClick={fetchNews}
          className="m-2 rounded-full border-none h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75 flex items-center justify-center"
        >
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
            <path d="M19.875,3H4.125C2.953,3,2,3.897,2,5v14c0,1.103,0.953,2,2.125,2h15.75C21.047,21,22,20.103,22,19V5 C22,3.897,21.047,
            3,19.875,3z M19.875,19H4.125c-0.057,0-0.096-0.016-0.113-0.016c-0.007,0-0.011,0.002-0.012,0.008L3.988,5.046 
            C3.995,5.036,4.04,5,4.125,5h15.75C19.954,5.001,19.997,5.028,20,5.008l0.012,13.946C20.005,18.964,19.96,19,19.875,19z">
            </path>
            <path d="M6 7H12V13H6zM13 15L6 15 6 17 13 17 14 17 18 17 18 15 14 15zM14 11H18V13H14zM14 7H18V9H14z"></path>
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto max-h-[80vh] mt-4">
        {loading && <p className="text-gray-300">Loading News...</p>}
        {!loading && articles.length === 0 && <p className="text-gray-400">Server Is Down.</p>}
        {articles.map((article, idx) => (
          <div key={idx} className="newscard border border-white/20 rounded-lg p-4 m-4 bg-white/10 backdrop-blur-md text-white">
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
