const WindWidget = ({ wind }) => {
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
        {/* Progress Arc (white fill up to degree) */}
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

      {/* Text inside circle (not rotated) */}
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

      {/* Wind Speed */}
      <div style={{ marginTop: "-20px", fontSize: "20px", fontWeight: "bold" }}>
        {speedKmh} km/h
      </div>
    </div>
  );
};


export default function WindWid({ speed, deg, gust }) {
  const windData = {
    speed,
    deg,
    gust,
  };

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
}
