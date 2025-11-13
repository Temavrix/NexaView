import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import Sidebar from "./components/Sidebar";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import "./Settings.css";

interface ApiConfig {
  newsApiKey: string;
  country: string; // Unsplash API key
  city: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    newsApiKey: "",
    country: "",
    city: "",
  });

  // 🔹 Handle auth state
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      // Redirect to Auth only if not logged in
      navigate("/");
    }
  });
  return () => unsubscribe();
}, [navigate]);

  // 🔹 Load stored API config on mount
  useEffect(() => {
    if (user) {
      loadApiConfig();
    }
  }, [user]);

  // 🔹 Handle input field updates
  const handleApiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiConfig((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Save configuration to Firestore + localStorage
  const saveApiConfig = async () => {
    if (!user) return;
    const apiDocRef = doc(db, `users/${user.uid}/apiKeys/config`);
    await setDoc(apiDocRef, apiConfig);
    localStorage.setItem("apiConfig", JSON.stringify(apiConfig));
    alert("API config saved!");
    navigate("/");
  };

  // 🔹 Load configuration from Firestore
  const loadApiConfig = async () => {
    if (!user) return;
    const apiDocRef = doc(db, `users/${user.uid}/apiKeys/config`);
    const snap = await getDoc(apiDocRef);
    if (snap.exists()) {
      const data = snap.data() as ApiConfig;
      setApiConfig(data);
      localStorage.setItem("apiConfig", JSON.stringify(data));
    }
  };

  // 🔹 Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  // 🔹 Go back to home
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="settings-container flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start ml-10 w-full">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Settings Box */}
      <div
        className="settings-box mr-[-10] md:mr-[10px]
        overflow-auto pr-4 bg-black/30 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
        backdrop-blur-[11.5px] border border-white/20 
        p-10 md:p-10 md:w-full max-w-[800px]
        text-[0.95rem] md:text-base lg:text-lg"
      >
        <label className="text-white font-bold text-lg md:text-xl lg:text-2xl">
          SETTINGS:
        </label>
        <p className="text-white font-medium text-sm md:text-base lg:text-lg mt-2">
          Enter your Keys and Settings below: <br />
        </p>

        {/* Input Groups */}
        {[
          {
            label: "News API:",
            name: "newsApiKey",
            placeholder: "Curated News Key",
            link: "https://newsapi.org/register",
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
            placeholder: "Unsplash API Key",
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
              value={apiConfig[name as keyof ApiConfig]}
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
                  alert("Enter your current city (e.g. Singapore, New York, Sydney)")
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
