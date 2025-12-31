import { fetchApiConfig } from "../GetApis";
const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL as string;

export async function fetchWeather(uid: string): Promise<any> {
  try {
    const config = (await fetchApiConfig(uid)) as {
      openWeatherKey?: string;
      city?: string;
    } | null;

    const apiKey = config?.openWeatherKey;
    var city = config?.city;
    if (!city) city="Singapore";
    
    const response = await fetch(`${BASE_URL}/api/weather/${city}?apiKey=${apiKey}`);

    if (!response.ok) {
      throw new Error("No weather found.");
    }

    const data = (await response.json()) as any;
    return data;
  } catch (error) {
    console.error("fetchWeather error:", error);
    return null;
  }
}
