import React, { JSX, useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import axios from "axios";

// Type for each earthquake ring
type EarthquakeRing = {
  lat: number;
  lng: number;
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
  type: string;
  place: string;
  url: string;
};

export default function EarthquakeGlobe(): JSX.Element {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [rings, setRings] = useState<EarthquakeRing[]>([]);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        // Fetch recent 30 earthquakes
        const recentResponse = await axios.get(
          "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=30"
        );
        const recentRings: EarthquakeRing[] = recentResponse.data.features.map(
          (quake: any) => ({
            lat: quake.geometry.coordinates[1],
            lng: quake.geometry.coordinates[0],
            maxR: 2 + Math.random() * 3,
            propagationSpeed: 2 + Math.random() * 2,
            repeatPeriod: 400 + Math.random() * 600,
            type: quake.properties.type,
            place: quake.properties.place,
            url: quake.properties.url,
          })
        );

        // Fetch significant earthquakes (Magnitude ≥ 4.5 in the last 24 hours)
        const significantResponse = await axios.get(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"
        );
        const significantRings: EarthquakeRing[] =
          significantResponse.data.features.map((quake: any) => ({
            lat: quake.geometry.coordinates[1],
            lng: quake.geometry.coordinates[0],
            maxR: 2 + Math.random() * 3,
            propagationSpeed: 2 + Math.random() * 2,
            repeatPeriod: 400 + Math.random() * 600,
            type: quake.properties.type,
            place: quake.properties.place,
            url: quake.properties.url,
          }));

        // Combine both datasets
        setRings([...recentRings, ...significantRings]);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };

    fetchEarthquakes();
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      if (controls) {
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
      }

      globeEl.current.pointOfView({ lat: 20, lng: 100, altitude: 2.2 }, 1000);
    }
  }, []);

  const colorInterpolator = (t: number): string =>
    `rgba(255, 80, 50, ${Math.sqrt(1 - t)})`;

  return (
    <div>
      <br />
      <h3 className="text-white text-[1.17em] font-bold">
        Latest Natural Disasters
      </h3>
      <div className="w-full h-full flex items-center justify-center">
        <Globe
          ref={globeEl}
          globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          ringsData={rings}
          ringColor={() => colorInterpolator}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          width={window.innerWidth < 640 ? window.innerWidth * 0.9 : 500}
          height={window.innerWidth < 640 ? window.innerWidth * 0.9 : 500}
        />
      </div>
    </div>
  );
}
