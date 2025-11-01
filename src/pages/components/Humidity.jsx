const HumidityWidget = ({ humidity }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (humidity / 100) * circumference;

  return (
    <div style={{ textAlign: "center", color: "#fff", fontFamily: "Arial" }}>
      <h4>Humidity</h4>

      <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
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
        {humidity}%
      </div>
    </div>
  );
};

// Example usage
export default function HumidityWid({ humidity }) {
  // Sample OpenWeatherAPI humidity data
  const weatherData = {
    main: {
      humidity, // %
    },
  };

  return (
    <div
      style={{
        minHeight: "18vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <HumidityWidget humidity={weatherData.main.humidity} />
    </div>
  );
}
