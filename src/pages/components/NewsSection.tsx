import React, { useEffect, useState } from "react";

const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL as string;

interface User {
  uid?: string;
}

interface Article {
  title: string;
  url: string;
  [key: string]: any;
}

interface NewsSectionProps {
  user?: User;
}

const NewsSection: React.FC<NewsSectionProps> = ({ user }) => {
  const [country, setCountry] = useState<string>("us");
  const [category, setCategory] = useState<string>("general");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNews = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/news/${country}/${category}`);
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
    <div
      className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 
        text-white text-center w-full max-w-full p-[1em] sm:p-[1.5em] md:p-[2em] lg:p-[3em] 
        rounded-lg h-[1174px] flex flex-col"
    >
      <h3 className="text-white text-[1.17em] font-bold">News Headlines</h3>
      <br />
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
        {!loading && articles.length === 0 && (
          <p className="text-gray-400">Server Is Down.</p>
        )}
        {articles.map((article, idx) => (
          <div
            key={idx}
            className="newscard border border-white/20 rounded-lg p-3 m-4 bg-white/10 backdrop-blur-md text-white"
          >
            <div className="card-header">
              <h2 className="mb-2 font-bold text-white text-lg">
                {article.title}
              </h2>
            </div>
            <div className="card-body">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline font-semibold hover:text-blue-400 transition duration-200 block mt-2"
              >
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
