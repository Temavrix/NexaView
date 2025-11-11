import React, { useEffect, useState } from "react";

const StockCard = () => {
  const [prices, setPrices] = useState({
    AAPL: null,
    TSLA: null,
    MSFT: null,
    GOOGL: null,
    NVDA: null,
  });

  const API_KEY = "YOUR_API_KEY"; // replace with your Alpha Vantage API key

  useEffect(() => {
    const symbols = ["AAPL", "TSLA", "MSFT", "GOOGL", "NVDA"];

    symbols.forEach(async (symbol) => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );
        const data = await response.json();
        const price = data["Global Quote"]["05. price"];

        setPrices((prev) => ({
          ...prev,
          [symbol]: price,
        }));
      } catch (err) {
        console.error(`Error fetching ${symbol} price:`, err);
      }
    });
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden stockcard p-4 md:p-8 lg:p-14 rounded-lg text-white">
      <h1 className="text-xl font-bold mb-2 flex-shrink-0">Stock Prices</h1>
      <div className="overflow-y-auto flex-1">
        {["AAPL", "TSLA", "MSFT", "GOOGL", "NVDA"].map((symbol) => (
          <div key={symbol} className="newscard border border-white/20 font-bold rounded-lg p-3 m-4 bg-white/10 backdrop-blur-md text-white">
            <p>
              {symbol}: {prices[symbol] ?? "Loading..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockCard;
