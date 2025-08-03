import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase.jsx";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./Settings.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadApiConfig();
    }
  }, [user]);

  const goback = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const [apiConfig, setApiConfig] = useState({
    openWeatherKey: "",
    newsApiKey: "",
    country: "",
    city: "",
  });

  const handleApiChange = (e) => {
    setApiConfig({ ...apiConfig, [e.target.name]: e.target.value });
  };

  const saveApiConfig = async () => {
    if (!user) return;
    const apiDocRef = doc(db, `users/${user.uid}/apiKeys/config`);
    await setDoc(apiDocRef, apiConfig);
    localStorage.setItem("apiConfig", JSON.stringify(apiConfig));
    alert("API config saved!");
    navigate("/");
  };

  const loadApiConfig = async () => {
    if (!user) return;
    const apiDocRef = doc(db, `users/${user.uid}/apiKeys/config`);
    const snap = await getDoc(apiDocRef);
    if (snap.exists()) {
      setApiConfig(snap.data());
      localStorage.setItem("apiConfig", JSON.stringify(snap.data()));
    }
  };

  return (
    <div className="settings-container flex">
      {/* Sidebar */}
      <div className="sidebarlogin w-[50px] md:w-[70px] fixed top-0 left-0 h-full bg-[#222] z-10 pt-10">
        <div className="relative left-[6px] -top-[40px]">
          <img
            className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] left-[3px] lg:h-[55px] lg:w-[55px]"
            src="https://github.com/user-attachments/assets/9380b62b-8486-4f1d-a3bf-821bf120147c"
            alt="Comicon"
          />

          <div className="relative left-[-2px] h-[55px] w-[55px] mt-3">
            <img
              src="https://github.com/user-attachments/assets/8d0aba4c-99ce-4b49-b072-c4da4683a141"
              alt="Dashboard Icon"
              onClick={goback}
            />
          </div>

          <div className="relative left-[-2px] h-[55px] w-[55px] mt-3">
            <img
              src="https://github.com/user-attachments/assets/b5cfb272-5083-4d39-9265-67f6bf5335f4"
              alt="Settings Icon"
            />
          </div>

          <div className="relative left-[-8px] h-[60px] w-[60px] mt-3">
            <img
              src="https://github.com/user-attachments/assets/ddc1481e-22e7-45ab-b1cf-aa85a8a94992"
              onClick={handleLogout}
              alt="Logout"
            />
          </div>
        </div>

        <div className="absolute bottom-[2px] left-[8px]">
          <a
            href="https://github.com/Temavrix/NexaView"
            title="About Us"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://github.com/user-attachments/assets/e9530ede-b4bb-4842-a11a-bfcdeed6d236"
              alt="About Us Icon"
            />
          </a>
        </div>
      </div>

      {/* Settings Box */}
      <div className="settings-box ml-[80px] mr-[10px] md:ml-12 mt-1 h-auto md:h-[650px] overflow-auto pr-4 
        bg-black/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[11.5px] border border-white/20 
        p-6 md:p-10 rounded-[50px] w-full text-[0.95rem] md:text-base lg:text-lg lg:h-[500px] lg:p-[4em]">
        
        <label className="text-white font-bold text-lg md:text-xl lg:text-2xl">SETTINGS:</label>
        <p className="text-white font-medium text-sm md:text-base lg:text-lg mt-2">
          Enter your settings below: <br/>
          (All info is stored on your local storage and on Firebase)
        </p>

        {/* Input Groups */}
        {[
          {
            label: "OpenWeather API:",
            name: "openWeatherKey",
            placeholder: "OpenWeather API Key",
            link: "https://home.openweathermap.org/subscriptions/unauth_subscribe/onecall_30/base",
          },
          {
            label: "GNews API:",
            name: "newsApiKey",
            placeholder: "NewsAPI Key",
            link: "https://gnews.io/login",
          },
          {
            label: "Your City:",
            name: "city",
            placeholder: "City (e.g. New York)",
            link: "",
          },
          {
            label: "Unsplash API:",
            name: "country",
            placeholder: "Country (e.g. US)",
            link: "https://unsplash.com/join",
          },
        ].map(({ label, name, placeholder, link }) => (
          <div
            key={name}
            className="input-group flex flex-col md:flex-row md:items-center md:gap-2 mt-2"
          >
            <label className="text-white text-[1em] font-bold">{label}</label>
            <input
              className="border-none outline-none px-[1em] py-[0.6em] rounded-[24px] bg-white/30 text-white text-[55%] w-full sm:w-[260px] text-center mt-1 md:mt-0"
              name={name}
              type="text"
              placeholder={placeholder}
              value={apiConfig[name]}
              onChange={handleApiChange}
            />
            {link && (
              <button
                onClick={() => window.open(link, "_blank")}
                className="text-white ml-1"
              >
                ?
              </button>
            )}
            {name === "city" && (
              <button
                onClick={() =>
                  alert("Enter current city Ex. Singapore, New York, Sydney")
                }
                className="text-white ml-1"
              >
                ?
              </button>
            )}
          </div>
        ))}

        <button
          className="mt-4 rounded-full border-none h-[31px] w-[50px] bg-[#545454] text-white cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/75"
          onClick={saveApiConfig}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Settings;
