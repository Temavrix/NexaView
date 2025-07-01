import React, { useState, useEffect } from "react";
import { db, auth } from '../firebase.jsx';
import { doc,setDoc,getDoc} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import "./Settings.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

    
const Settings = () => {
    const navigate = useNavigate(); // Hook to navigate programmaticall
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else { navigate("/login"); }// Redirect to login if not authenticated
        });
        return () => unsubscribe();
      }, []);
      
      useEffect(() => {
        if (user) { loadApiConfig(); }
      }, [user]);
      

    const goback = () => {
        navigate("/"); // Go back to Dashboard
    }

    const handleLogout = async () => {
      await signOut(auth);
      window.location.reload();
    };

    const [apiConfig, setApiConfig] = useState({
        openWeatherKey: '',
        newsApiKey: '',
        country: '',
        city: '',
      });
    
      const handleApiChange = (e) => {
        setApiConfig({ ...apiConfig, [e.target.name]: e.target.value });
      };
    
      const saveApiConfig = async () => {
        if (!user) return;
        const apiDocRef = doc(db, `users/${user.uid}/apiKeys/config`);
        await setDoc(apiDocRef, apiConfig);
        localStorage.setItem('apiConfig', JSON.stringify(apiConfig));
        alert('API config saved!');
        navigate("/");
      };
      
      
      const loadApiConfig = async () => {
        if (!user) return;
        const apiDocRef = doc(db, `users/${user.uid}/apiKeys/config`);
        const snap = await getDoc(apiDocRef);
        if (snap.exists()) {
          setApiConfig(snap.data());
          localStorage.setItem('apiConfig', JSON.stringify(snap.data()));
        }
      };
      
      

    return (
        <div className="settings-container">
            <div className="sidebar">
            <div className="relative left-[6px] -top-[40px]">
                    <img className="relative h-[50px] w-[50px] left-[3px]" src="https://github.com/user-attachments/assets/9380b62b-8486-4f1d-a3bf-821bf120147c" alt="Comicon" />

                    <div className="relative left-[-2px]">
                        <img src="https://github.com/user-attachments/assets/8d0aba4c-99ce-4b49-b072-c4da4683a141" alt="Dashboard Icon" onClick={goback} />
                    </div>

                    <div className="relative left-[-2px]">
                        <img src="https://github.com/user-attachments/assets/b5cfb272-5083-4d39-9265-67f6bf5335f4" alt="Settings Icon" />
                    </div>

                    <div className="relative left-[-12px]">
                      <img src="https://github.com/user-attachments/assets/ddc1481e-22e7-45ab-b1cf-aa85a8a94992" onClick={handleLogout}/>
                    </div>
                </div>
                <div className="absolute bottom-[2px] left-[8px]">
                    <a href="https://github.com/Temavrix/NexaView" title="About Us">
                        <img src="https://github.com/user-attachments/assets/e9530ede-b4bb-4842-a11a-bfcdeed6d236" alt="About Us Icon" />
                    </a>
                </div>
            </div>

            <div className="settings-box ml-12 h-auto md:h-[450px] overflow-auto">
                <label className="text-white text-[1.17em] font-bold">SETTINGS:</label>
                <p className="text-white text-[1em] font-bold">Enter your settings below: <br/> (All info is stored on your local storage and on Firebase)</p>

                <div className="input-group flex flex-col md:flex-row md:items-center md:gap-2">
                    <label className="text-white text-[1em] font-bold mb-2 sm:mb-0">OpenWeather API:</label>&nbsp;&nbsp;
                    <input className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/30 text-white text-[55%] w-full sm:w-[260px] text-center" name="openWeatherKey" type="text" placeholder="OpenWeather API Key" value={apiConfig.openWeatherKey} onChange={handleApiChange}/>
                    <button onClick={() => window.open("https://home.openweathermap.org/subscriptions/unauth_subscribe/onecall_30/base", "_blank")}>?</button>
                </div>

                <div className="input-group flex flex-col md:flex-row md:items-center md:gap-2">
                    <label className="text-white text-[1em] font-bold">GNews API:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/30 text-white text-[55%] w-[260px] text-center" name="newsApiKey" type="text" placeholder="NewsAPI Key" value={apiConfig.newsApiKey} onChange={handleApiChange} />
                    <button onClick={() => window.open("https://gnews.io/login", "_blank")}>?</button>
                </div>

                <div className="input-group flex flex-col md:flex-row md:items-center md:gap-2">
                    <label className="text-white text-[1em] font-bold">Your City:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/30 text-white text-[55%] w-[260px] text-center" name="city" placeholder="City (e.g. New York)" value={apiConfig.city} onChange={handleApiChange}/>
                    <button onClick={() => alert('Enter current city Ex. Singapore, New York, Sydney, Paris')}>?</button>
                </div>

                <div className="input-group flex flex-col md:flex-row md:items-center md:gap-2">
                    <label className="text-white text-[1em] font-bold">Unsplash API:</label>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/30 text-white text-[55%] w-[260px] text-center" name="country" placeholder="Country (e.g. US)" value={apiConfig.country} onChange={handleApiChange}/>
                    <button onClick={() => window.open("https://unsplash.com/join", "_blank")}>?</button>
                </div>

                <button className="m-2 rounded-full border-none h-[31px] w-[50px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75" onClick={saveApiConfig}>Save</button>
            </div>
        </div>
    );
};

export default Settings;
