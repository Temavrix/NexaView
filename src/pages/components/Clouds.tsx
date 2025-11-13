import React from "react";

interface CloudWidgetProps {
  cloud: number;
}

const CloudWidget: React.FC<CloudWidgetProps> = ({ cloud }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (cloud / 100) * circumference;

  return (
    <div style={{ textAlign: "center", color: "#fff", fontFamily: "Arial" }}>
      <h4>Clouds</h4>

      <svg
        width="140"
        height="140"
        style={{ transform: "rotate(-90deg)", transformOrigin: "center center" }}
      >
        {/* Background Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="white"
          strokeWidth="12"
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          style={{
            transition: "stroke-dasharray 0.8s ease",
          }}
        />
      </svg>

      {/* Text inside circle */}
      <div
        style={{
          position: "relative",
          top: "-90px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {cloud}%
      </div>
    </div>
  );
};

interface CloudsProps {
  cloud: number;
}

const Clouds: React.FC<CloudsProps> = ({ cloud }) => {
  const weatherData = {
    clouds: {
      all: cloud, // OpenWeather puts cloud % inside clouds.all
    },
  };

  return (
    <div
      style={{
        minHeight: "18vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CloudWidget cloud={weatherData.clouds.all} />
    </div>
  );
};

export default Clouds;
