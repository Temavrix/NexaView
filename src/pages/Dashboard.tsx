import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Calendar from "react-calendar";
import { fetchWeather } from "./components/weather";
import { db } from "../firebase";
import { fetchApiConfig } from "./GetApis";
import "../index.css";
import {collection, addDoc, getDocs, doc, updateDoc, DocumentData} from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import WindWid from "./components/Wind";
import HumidityWid from "./components/Humidity";
import Clouds from "./components/Clouds";
import SunTracker from "./components/SunPosition";

const BASE_URL = (import.meta as any).env.VITE_API_BASE_URL as string;

interface WeatherData {
  name: string | undefined;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: { icon: string; description: string }[];
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  sys: { sunrise: number; sunset: number };
}

interface ForecastItem {
  dt_txt: string;
  weather: { icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}

interface Todo {
  id: string;
  task: string;
}

const DashBoard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [coords, setCoords] = useState({
    lat: 12.9716, // default Bangalore
    lon: 77.5946,
  });

  const backgrounds = [
    "https://images.unsplash.com/photo-1630387775844-b15d0f769972?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1628933978021-818a464f9f5d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
    "https://images.unsplash.com/photo-1766933366411-7a921aebe181?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1536625514102-9b187fc8b183?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1645411325990-a40d3a5697a3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1501466044931-62695aada8e9?q=80&w=1687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/flagged/photo-1565896141391-f1e7433604be?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1589481169991-40ee02888551?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1582706883126-8cd659cf1594?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1567165094819-ab473e9f277b?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  ];

  useEffect(() => {
    async function getWeather() {
      const user = getAuth().currentUser;
      if (user?.uid) {
        const data = await fetchWeather(user.uid);
        if (data) setWeatherData(data);
      } else {
        console.error("User not authenticated");
      }
    }
    getWeather();
  }, [user]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!user?.uid) throw new Error("User not authenticated");
        const config = await fetchApiConfig(user.uid);
        var city = config?.city;
        if (!city) city="Singapore";
        const response = await fetch(`${BASE_URL}/api/forecast/${city}`);
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        setForecastData(data.list);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeatherData();
  }, [user]);

  useEffect(() => {
    async function getImage(uid: string) {
      try {
        const user = getAuth().currentUser;
        if (user?.uid) {
      } else {
        console.error("User not authenticated");
      }
        if (!uid) throw new Error("User UID is required to fetch image config");
    
        const config = await fetchApiConfig(uid);
        var city = config?.city;
        if (!city) city="Singapore";
        const countryKey = config?.unsplashApi;
        if (!countryKey) throw alert("Unsplash API key is missing in Settings");
    
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${countryKey}&query=${city}&count=1&orientation=landscape`);
        if (!response.ok) throw new Error("Error fetching image");
        const data = await response.json();
        const { regular } = data[0].urls;
    
        document.body.style.backgroundImage = `url("${regular}")`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.margin = "0";
      } catch (error) {
        console.error("getImage error:", error);
        const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        document.body.style.backgroundImage = `url("${randomBg}")`;
      }
    }

    const user = getAuth().currentUser;
    if (user?.uid) {
      getImage(user.uid);
    } else {
      console.error("User not authenticated");
    }

  }, []);

  useEffect(() => {
    const searchCity = async (uid: string) => {
    const config = await fetchApiConfig(uid);
    var city = config?.city;
    if (!city) city="Singapore";

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
      const data = await res.json()

      if (data.length > 0) {
        setCoords({lat: data[0].lat, lon: data[0].lon,})
      } else {
        alert("City not found")
      }
    } catch (err) {
      console.error(err)
      alert("Error fetching city location")
    }
  }

    const user = getAuth().currentUser;
    if (user?.uid) {
      searchCity(user.uid);
    } else {
      console.error("User not authenticated");
    }
  }, [user]);
  

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  const fetchTodos = async () => {
    if (!user) return;
    const todoRef = collection(db, `users/${user.uid}/todos`);
    const snapshot = await getDocs(todoRef);
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as DocumentData),
    })) as Todo[];
    setTodos(tasks);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await auth.signOut();
    window.location.reload();
  };

  if (!user) return <div>Loading...</div>;


  
  return (
    <div className="lg:mt-45 md:mt-30 mt-5 lg:ml-20 md:ml-14 ml-10 w-[95%] h-screen no-scrollbar scrollbar-hide overflow-x-hidden">
      <div className="font-sans font-normal text-white text-opacity-90 bg-no-repeat bg-cover antialiased min-h-screen">
        <Sidebar handleLogout={handleLogout} />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 auto-rows-fr w-full">
          
          
          {/* 1st column */}
          <div className="space-y-4">
            {/* Weather Section */}
            <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-white p-3 sm:p-10 md:p-4 w-full max-w-full mx-auto lg:h-[50%] sm:h-[59%] ">
              <div className="todayweather">
                <h3 className="text-white text-[1.17em] font-bold">
                  {weatherData ? `Weather in ${weatherData.name} :` : "Loading Weather..."}
                </h3>
                {weatherData && (
                  <>
                    <h4 className="text-white text-[1.17em] font-bold">Temperature: {weatherData.main.temp}°C</h4>
                    <h4 className="text-white text-[1.17em] font-bold">
                      <img className="h-[140px]" id="weathericon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
                      {weatherData.weather[0].description}
                      <br/>Currently Feels like: {weatherData.main.feels_like}°C
                      <br/>Min Temp: {weatherData.main.temp_min}°C
                      <br/>Max Temp: {weatherData.main.temp_max}°C
                    </h4>
                  </>
                )}
              </div>
              <h3 className="text-white text-[1.17em] font-bold">
                {weatherData ? `Weather Forecast for ${weatherData.name} :` : "Loading Weather Forecast..."}
              </h3>
              <div className="w-full flex overflow-x-auto whitespace-nowrap snap-x snap-mandatory space-x-4 px-2 pb-2 no-scrollbar">
                {forecastData.map((item, index) => (
                  <div key={index} className="rounded-[10px] p-4 min-w-[60%] sm:w-[250px] md:w-[270px] h-auto bg-white/10 backdrop-blur-md border border-white/20 text-white snap-start shrink-0">
                    <p> <strong>Date & Time:</strong> {item.dt_txt}</p>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                    <h5> <strong>Temperature:</strong> {item.main.temp}°C</h5>
                    <h5> <strong>Feels like:</strong> {item.main.feels_like}°C</h5>
                    <h5> <strong>Humidity:</strong> {item.main.humidity}%</h5>
                    <h5> <strong>Wind Speed:</strong> {item.wind.speed} km/h</h5>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="flex justify-center items-center text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 sm:h-[34%] text-center p-5">
              <div className="calendar-container bg-white/20">
                <Calendar className="custom-calendar"
                  onChange={(value) => {
                    if (value instanceof Date) {
                      setDate(value);
                    }
                  }}
                  value={date}/>
              </div>
            </div>
          </div>


          {/* 2nd column */}
          <div className="space-y-4">
            <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-black h-[26%] sm:h-[23%] text-center p-[1em]">
              <div className="flex justify-center items-center">
                <SunTracker />
              </div>
              <br/>
              <div className="flex justify-center items-center">
                {weatherData && (
                  <h4 className="text-white font-semibold text-[1.20em]">
                    Sunrise:{" "}
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit",  minute: "2-digit", })}
                    <br/>
                    Sunset:{" "}
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </h4>
                )}
              </div>
            </div>

            <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-black h-[25%] sm:h-[22%] text-center p-[1em]">
              <div className="flex justify-center items-center">
                {weatherData && <Clouds cloud={weatherData.clouds.all} />}
              </div>
              <div className="flex justify-center items-center">
                {weatherData && (<h4 className="text-white font-semibold text-[1.20em]">Pressure: {weatherData.main.pressure} hPa/mb</h4>)}
              </div>
            </div>

            <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-black h-[23%] sm:h-[20%] text-center p-[1em]">
              <div className="flex justify-center items-center">
                {weatherData && (<WindWid speed={weatherData.wind.speed} deg={weatherData.wind.deg} gust={weatherData.wind.gust}/>)}
              </div>
            </div>

            <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-black h-[18%] sm:h-[16%] text-center p-[1em]">
              <div className="flex justify-center items-center">
                {weatherData && <HumidityWid humidity={weatherData.main.humidity} />}
              </div>
            </div>
          </div>


          {/* 3rd column */}
          <div className="space-y-4">
            <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-[#d9d9d9] text-center p-4 sm:p-6 md:p-[2em] w-full max-w-full h-[40%] sm:h-[47%] overflow-y-auto no-scrollbar">
                <h3 className="text-white text-[1.17em] font-bold"> All To-Do Tasks [2-months]</h3>
                <div className="flex justify-center items-center">
                  <div className="w-full max-w-[500px] h-[700px] overflow-y-auto scrollbar-hide">
                    <ul className="text-white text-[1.17em] font-bold">
                      {todos.map((todo) => (
                        <div key={todo.id} className="newscard border border-white/20 rounded-lg p-2 m-4 bg-white/10 backdrop-blur-md text-white" >
                          <li>
                            {todo.task}
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
            </div>

            <div className="flex justify-center items-center bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 text-[#d9d9d9] text-center p-4 sm:p-6 md:p-[2em] w-full max-w-full h-[30%] sm:h-[37%] no-scrollbar">
              <div className="h-[35vh] w-[35vh] md:w-[60vh] sm:w-[50vh]">
                {/* Windy Map */}
                  <iframe
                    title="Windy Map"
                    width="100%"
                    height="100%"
                    src={`https://embed.windy.com/embed2.html?lat=${coords.lat}&lon=${coords.lon}&detailLat=${coords.lat}&detailLon=${coords.lon}&zoom=20&level=surface&overlay=wind&menu=&message=true&type=map&location=coordinates`}
                    frameBorder="0"
                  />
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default DashBoard;
