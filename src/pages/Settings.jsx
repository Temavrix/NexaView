import { useState, useEffect } from "react";
import { db, auth } from "../firebase.jsx";
import Sidebar from "./components/Sidebar";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import "./Settings.css";
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
      text-[0.95rem] md:text-base lg:text-lg">
      
      <label className="text-white font-bold text-lg md:text-xl lg:text-2xl">SETTINGS:</label>
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
