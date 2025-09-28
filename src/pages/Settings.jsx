import { useState, useEffect } from "react";
import { db, auth } from "../firebase.jsx";
import Sidebar from "./components/Sidebar";
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
      <Sidebar handleLogout={handleLogout} />


      {/* Settings Box */}
      <div
      className="settings-box ml-[45px] mr-[10px] md:ml-12 mt-1 
      overflow-auto pr-4 bg-black/30 
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
      backdrop-blur-[11.5px] border border-white/20 
      p-6 md:p-10 rounded-[30px] w-full 
      text-[0.95rem] md:text-base lg:text-lg"
  >
        
        <label className="text-white font-bold text-lg md:text-xl lg:text-2xl">SETTINGS:</label>
        <p className="text-white font-medium text-sm md:text-base lg:text-lg mt-2">
          Enter your Keys and Settings below: <br/>
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
