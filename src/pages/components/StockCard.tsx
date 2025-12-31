import React, { useEffect, useState } from "react";
const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL as string;

type StockSymbols = "AAPL" | "TSLA" | "MSFT" | "GOOGL" | "NVDA";
type StockPrices = Record<StockSymbols, number | null>;

const SYMBOLS: StockSymbols[] = ["AAPL", "TSLA", "MSFT", "GOOGL", "NVDA"];

const StockCard: React.FC = () => {
  const [prices, setPrices] = useState<StockPrices>({
    AAPL: null,
    TSLA: null,
    MSFT: null,
    GOOGL: null,
    NVDA: null,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/stocks`);
        const data = await res.json();

        setPrices({
          AAPL: data.AAPL ?? null,
          TSLA: data.TSLA ?? null,
          MSFT: data.MSFT ?? null,
          GOOGL: data.GOOGL ?? null,
          NVDA: data.NVDA ?? null,
        });
      } catch (err) {
        console.error("Error fetching stock prices:", err);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden stockcard p-4 md:p-8 lg:p-14 rounded-lg text-white">
      <h1 className="text-xl font-bold mb-2">Stock Prices</h1>

      <div className="overflow-y-auto flex-1 no-scrollbar">
        {SYMBOLS.map((symbol) => (
          <div key={symbol} className="newscard border border-white/20 font-bold rounded-lg p-3 m-4 bg-white/10 backdrop-blur-md">
            {symbol}:{" "}
            {prices[symbol] !== null ? `$${prices[symbol]!.toFixed(2)}` : "Loading..."}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockCard;