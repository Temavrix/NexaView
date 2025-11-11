import { fetchApiConfig } from '../GetApis';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchWeather(uid) {
  try {
    const config = await fetchApiConfig(uid);
    const apiKey = config?.openWeatherKey;
    const city = config?.city;

    if (!city) {
      throw new Error("Please Enter Your City!");
    }

    const response = await fetch(`${BASE_URL}/api/weather/${city}`);

    if (!response.ok) {
      throw new Error("No weather found.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
