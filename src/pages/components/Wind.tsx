import React from "react";

interface WindData {
  speed: number; // meters per second
  deg: number;   // wind direction in degrees
  gust?: number; // optional gust speed
}

interface WindWidgetProps {
  wind: WindData;
}

const WindWidget: React.FC<WindWidgetProps> = ({ wind }) => {
  const speedKmh = (wind.speed * 3.6).toFixed(1); // convert m/s → km/h
  const deg = wind.deg;

  // Convert degrees to compass direction
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const compass = directions[Math.round(deg / 45) % 8];

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (deg / 360) * circumference;

  return (
    <div style={{ textAlign: "center", color: "#fff", fontFamily: "Arial" }}>
      <h4>Wind</h4>

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
        {/* Progress Arc */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="white"
          strokeWidth="12"
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>

      {/* Wind direction text */}
      <div
        style={{
          position: "relative",
          top: "-95px",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        {deg}° <br /> {compass}
      </div>

      {/* Wind speed */}
      <div
        style={{
          marginTop: "-20px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {speedKmh} km/h
      </div>
    </div>
  );
};

interface WindWidProps {
  speed: number;
  deg: number;
  gust?: number;
}

const WindWid: React.FC<WindWidProps> = ({ speed, deg, gust }) => {
  const windData: WindData = { speed, deg, gust };

  return (
    <div
      style={{
        minHeight: "10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WindWidget wind={windData} />
    </div>
  );
};

export default WindWid;
