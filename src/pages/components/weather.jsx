import { fetchApiConfig } from '../GetApis';

export async function fetchWeather(uid) {
  try {
    const config = await fetchApiConfig(uid);
    const apiKey = config?.openWeatherKey;
    const city = config?.city;

    if (!apiKey || !city) {
      throw new Error("City or OpenWeather API key is missing.");
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

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
