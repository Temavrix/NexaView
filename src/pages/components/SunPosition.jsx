import React, { useEffect, useMemo, useState } from "react";

export default function SunTracker({
  time: timeProp = null,
  live = true,
  sunriseHour = 6.1, // ~6:07 AM
  sunsetHour = 17.3, // ~5:19 PM
  width = 320,
  height = 160,
}) {
  const [now, setNow] = useState(() => timeProp || new Date());

  useEffect(() => {
    if (timeProp) {
      setNow(timeProp);
      return;
    }
    if (!live) return;
    const id = setInterval(() => setNow(new Date()), 60 * 1000); // update every minute
    return () => clearInterval(id);
  }, [timeProp, live]);

  const cx = width / 2;
  const cy = height; // baseline horizon at bottom
  const r = width / 2 - 20; // padding for sun movement

  // Fraction of time between sunrise and sunset
  const fractionOfDay = useMemo(() => {
    const d = new Date(now);
    const hour = d.getHours() + d.getMinutes() / 60;
    let t = (hour - sunriseHour) / (sunsetHour - sunriseHour);
    return Math.min(Math.max(t, 0), 1);
  }, [now, sunriseHour, sunsetHour]);

  // Map fraction to semi-circle (180° → 0°)
  const { sunX, sunY } = useMemo(() => {
    const angleDeg = 180 - 180 * fractionOfDay;
    const angle = (angleDeg * Math.PI) / 180;
    const x = cx + r * Math.cos(angle);
    const y = cy - r * Math.sin(angle);
    return { sunX: x, sunY: y };
  }, [fractionOfDay, cx, cy, r]);

  const arcPath = useMemo(() => {
    const sx = cx - r;
    const sy = cy;
    const ex = cx + r;
    const ey = cy;
    return `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`;
  }, [cx, cy, r]);

  return (
    <div className="text-white" style={{ width }}>
      <div className="flex items-center gap-2 mb-2">
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Arc path */}
        <path d={arcPath} stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />

        {/* Sun */}
        <circle cx={sunX} cy={sunY} r={10} fill="#FFD93D" stroke="#FFC83D" strokeWidth="2" />
      </svg>
      <div className="flex justify-between text-xs mt-[-0.2em] px-1">
        <div className="flex flex-col items-start">
          <span>Dawn</span>
        </div>
        <div className="flex flex-col items-end">
          <span>Dusk</span>
        </div>
      </div>
    </div>
  );
}
