import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import { fetchWeather } from "./weather.jsx";
import { db, auth } from '../firebase.jsx';
import { fetchApiConfig } from './GetApis';
import '../index.css';
import { collection,addDoc,getDocs,deleteDoc,doc} from 'firebase/firestore';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
const user = auth.currentUser;

const DashBoard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    async function getWeather() {
      const user = getAuth().currentUser;
      if (user?.uid) {
        const data = await fetchWeather(user.uid);
        if (data) {
          setWeatherData(data);
        }
      } else {
        console.error("User not authenticated");
      }
    }

    getWeather();
    
    const user = getAuth().currentUser;
    if (user?.uid) {
      getImage(user.uid);
    }
    else {
      console.error("User not authenticated");
    }

  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!user?.uid) {
          throw new Error('User not authenticated');
        }
        const config = await fetchApiConfig(user.uid);
        const city = config?.city;
        const apiKey = config?.openWeatherKey;

        if (!city || !apiKey) {
          throw new Error('City or OpenWeather API key is missing');
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("API request failed");
        }

        const data = await response.json();
        setForecastData(data.list);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchWeatherData();
  }, [user]);

  async function getNews(uid) {
    let newsAccordion = document.getElementById('newsAccordion');
    let term = document.getElementById('country-search-bar').value;
    let source1 = document.getElementById('news-search-bar').value;
    const config = await fetchApiConfig(uid);
    const apiKey = config?.newsApiKey;
    if (!apiKey) {
    console.warn('News API key not found.');
    return;
  }
    const xhr = new XMLHttpRequest();
    { 
    xhr.open('GET', `https://gnews.io/api/v4/top-headlines?category=${source1}&lang=en&country=${term}&max=100&apikey=${apiKey}`, true)
    xhr.onload = function () {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
          let news = `<div class="newscard border border-white/20 rounded-lg p-4 m-4 bg-white/10 backdrop-blur-md text-white">
                <div class="card-header" id="heading${index}">
                    <h2 class="mb-2 font-bold text-white text-lg">${element["title"]}</h2>
                </div>
                <div class="card-body">
                    <a href="${element['url']}" target="_blank" class="text-white underline font-semibold hover:text-blue-400 transition duration-200 block mt-2">
                        Read more here
                    </a>
                </div>
            </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    xhr.send() 
    } 
  }

  function getgoogle() {
    var term;
    term = document.getElementById('google-search-bar').value;
    if (term == "") {
        alert("Please Enter Something Before Asking Google!");
    } else {
        myWindow = window.open(`http://www.google.com/search?q=${term}`, "_blank")
    }
  }
  
  async function getImage(uid) {
    try {
      if (!uid) {
        throw new Error('User UID is required to fetch image config');
      }
  
      const config = await fetchApiConfig(uid);
      const city = config?.city;
      const countryKey = config?.country;
  
      if (!city || !countryKey) {
        throw new Error('City or Country (API key) is missing');
      }
  
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${countryKey}&query=${city}&count=1&orientation=landscape`
      );
  
      if (!response.ok) {
        throw new Error('Error fetching image');
      }
  
      const data = await response.json();
      const { regular } = data[0].urls;
  
      document.body.style.backgroundImage = `url("${regular}")`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    } catch (error) {
      console.error('getImage error:', error);
      document.body.style.backgroundImage =
        'url("https://images.unsplash.com/photo-1630387775844-b15d0f769972?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    }
  }


    // ----- TODOS -----
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) { setUser(currentUser); }
      });
      return () => unsubscribe();
    }, []);
  
    useEffect(() => {
      if (user) { fetchTodos();}
    }, [user]);
  
    const fetchTodos = async () => {
      const todoRef = collection(db, `users/${user.uid}/todos`);
      const snapshot = await getDocs(todoRef);
      const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(tasks);
    };
  
    const addTodo = async () => {
      if (!task.trim()) return;
      const todoRef = collection(db, `users/${user.uid}/todos`);
      await addDoc(todoRef, { task });
      setTask('');
      fetchTodos();
    };
  
    const deleteTodo = async (id) => {
      await deleteDoc(doc(db, `users/${user.uid}/todos/${id}`));
      fetchTodos();
    };
  
    const handleLogout = async () => {
      const auth = getAuth();
      await auth.signOut();
      window.location.reload();
    };
  
    if (!user) return <div>Loading...</div>;
  

  

  return (
    <div className="mt-25 lg:mt-45 md:mt-30 sm:mt-30 ml-13 h-screen overflow-auto scrollbar-hide">
        <div className="font-sans font-normal text-white text-opacity-90 bg-no-repeat bg-cover antialiased min-h-screen overflow-auto">
          <div class="sidebar">
                <div className="relative left-[6px] -top-[40px]">
                    <img className="relative h-[50px] w-[50px] left-[3px]" src="https://github.com/user-attachments/assets/9380b62b-8486-4f1d-a3bf-821bf120147c" id="Comicon"/>
                    <div className="relative left-[-2px]">
                        <img src="https://github.com/user-attachments/assets/8d0aba4c-99ce-4b49-b072-c4da4683a141"/>
                    </div>
                    <Link to="/Settings">
                        <div className="relative left-[-2px]">
                            <img src="https://github.com/user-attachments/assets/b5cfb272-5083-4d39-9265-67f6bf5335f4"/>
                        </div>
                    </Link>
                    <div className="relative left-[-12px]">
                      <img src="https://github.com/user-attachments/assets/ddc1481e-22e7-45ab-b1cf-aa85a8a94992" id="Comicon" onClick={handleLogout}/>
                    </div>
                </div>
                <div className="absolute bottom-[2px] left-[5px]">
                    <div id="Setbutton">
                        <a href="https://github.com/Temavrix/NexaView" title="About Us"><img src="https://github.com/user-attachments/assets/e9530ede-b4bb-4842-a11a-bfcdeed6d236"/></a>
                    </div>
                </div>
          </div>
      
      
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 auto-rows-fr w-full">
            <div>
                {/* Weather Section */}
                <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 rounded-[3em] text-white p-4 sm:p-6 md:p-[3em] w-full max-w-full h-[700px]">
                  <div className="todayweather">
                    <h3 className="text-white text-[1.17em] font-bold">{weatherData ? `Weather in ${weatherData.name} :` : "Loading Weather..."}</h3><br />
                      {weatherData && (
                          <>
                          <h4 className="text-white text-[1.17em] font-bold">Temperature: {weatherData.main.temp}°C</h4>
                          <h4 className="text-white text-[1.17em] font-bold"><img className="h-[85px]" id="weathericon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}/>
                          Description: {weatherData.weather[0].description}<br />
                          Currently Feels like: {weatherData.main.feels_like}°C<br />
                          Min Temp: {weatherData.main.temp_min}°C || Max Temp: {weatherData.main.temp_max}°C<br />
                          Humidity: {weatherData.main.humidity}%<br />
                          Wind Speed: {weatherData.wind.speed} m/s</h4>
                          </>
                    )}
                  </div><br />
                  <h3 className="text-white text-[1.17em] font-bold">{weatherData ? `Weather Forecast for ${weatherData.name} :` : "Loading Weather Forecast..."}</h3>
                  <div className="w-full flex overflow-x-auto whitespace-nowrap snap-x snap-mandatory space-x-4 px-2 pb-2">
                      {forecastData.map((item, index) => (
                        <div className="rounded-[10px] p-4 min-w-[60%] sm:w-[250px] md:w-[270px] h-auto bg-white/10 backdrop-blur-md border border-white/20 text-white snap-start shrink-0" key={index}>
                          <p><strong>Date & Time:</strong> {item.dt_txt}</p>
                          <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon" />
                          <h5><strong>Temperature:</strong> {item.main.temp}°C</h5>
                          <h5><strong>Feels like:</strong> {item.main.feels_like}°C</h5>
                          <h5><strong>Humidity:</strong> {item.main.humidity}%</h5>
                          <h5><strong>Wind Speed:</strong> {item.wind.speed} km/h</h5>
                        </div>
                      ))}
                    </div>
                </div> 
                <br />
                    
                {/* Calander Section */}
                <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 rounded-[3em] h-[450px] text-black text-center p-[2em]">
                  <div className='calendar-container bg-white/20'>
                    <Calendar onChange={setDate} value={date} />
                  </div>
                </div>
            </div>
                    
            <div>
              {/* Google search Section */}
              <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 rounded-[3em] text-black h-[200px] text-center p-[2em]">
                <h3 className="text-white text-[1.17em] font-bold">Google Search</h3><br />
                <div className="flex justify-center items-center">
                  <input className="border-none outline-none px-4 py-[0.4em] rounded-[24px] bg-black/40 text-white text-base w-[273px] text-center" type="text" id="google-search-bar" placeholder="Search Google" />
                  <button onClick={getgoogle} className="m-2 border-none rounded-full h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75 flex justify-center items-center">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48"
                         enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <br />
                    
              {/* Todo Section */}
              <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 rounded-tl-[3em] rounded-tr-[3em] rounded-bl-[3em] text-[#d9d9d9] text-center p-4 sm:p-6 md:p-[2em] w-full max-w-full h-auto min-h-[945px]">
                <header className="App-header">
                  <h3 className="text-white text-[1.17em] font-bold">Your To-Do Tasks</h3><br />
                  <div className="flex justify-center items-center">
                    <input
                      type="text" className="border-none outline-none px-4 py-[0.4em] rounded-[24px] bg-black/40 text-white text-base w-[273px] text-center"
                      placeholder="Add a new task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
                    <button onClick={addTodo} className="m-2 border-none rounded-full h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75 flex justify-center items-center">
                    <svg stroke="currentColor"
                              fill="currentColor" stroke-width="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" pId="10297"
                              height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                              <defs></defs>
                              <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" pId="10298"></path>
                              <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" pId="10299"></path>
                          </svg>
                    </button>
                  </div><br />
                  <div className="flex justify-center items-center">
                    <ul className="text-white text-[1.17em] font-bold">
                    {todos.map((todo) => (
                      <li key={todo.id}>
                        {todo.task}&nbsp;&nbsp;
                        <button className="m-2 border-none rounded-full h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75" onClick={() => deleteTodo(todo.id)}>✔</button>
                      </li>
                    ))}
                  </ul>
                  </div>
                </header>
              </div>
                  
            </div>

            <div>
              {/* News Section */}
              <div className="bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 rounded-tl-[3em] rounded-tr-[3em] rounded-bl-[3em] text-white text-center h-[1168px] p-[2em] w-full max-w-[100%] sm:p-[1.5em] md:p-[2em] lg:p-[3em] overflow-hidden">
                <h3 className="text-white text-[1.17em] font-bold">News Headlines</h3><br />
                <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-4">
                  <select className="border-none outline-none w-[150px] px-4 py-2 rounded-[24px] bg-black/40 text-white text-[100%]" id="country-search-bar">
                                <option value="us" selected>USA</option>
                                <option value="sg">Singapore</option>
                                <option value="in">India</option>
                            </select>
                            <select className="border-none outline-none px-4 py-2 rounded-[24px] bg-black/40 text-white text-[100%]" id="news-search-bar">
                                <option value="general" selected>General</option>
                                <option value="nation">National</option>
                                <option value="business">Business</option>
                                <option value="technology">Technology</option>
                                <option value="entertainment">Entertainment</option>
                            </select>
                    <button onClick={() => getNews(user.uid)} id="news-search" className="m-2 rounded-full border-none h-[31px] w-[33px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75 flex items-center justify-center">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M19.875,3H4.125C2.953,3,2,3.897,2,5v14c0,1.103,0.953,2,2.125,2h15.75C21.047,21,22,20.103,22,19V5 C22,3.897,21.047,
                                          3,19.875,3z M19.875,19H4.125c-0.057,0-0.096-0.016-0.113-0.016c-0.007,0-0.011,0.002-0.012,0.008L3.988,5.046 
                                          C3.995,5.036,4.04,5,4.125,5h15.75C19.954,5.001,19.997,5.028,20,5.008l0.012,13.946C20.005,18.964,19.96,19,19.875,19z">
                                      </path>
                                      <path d="M6 7H12V13H6zM13 15L6 15 6 17 13 17 14 17 18 17 18 15 14 15zM14 11H18V13H14zM14 7H18V9H14z"></path>
                                  </svg>
                    </button>
                </div>
                <div id="newsAccordion" className="overflow-y-auto max-h-[80vh]"></div>
              </div>
            </div>

          </div>

        </div>
    </div>
      
  );
};

export default DashBoard;
