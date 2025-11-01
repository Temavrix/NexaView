import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.jsx";
import NewsSection from "./components/NewsSection";
import CurNewsSection from "./components/CurNews";
import StockCard from "./components/StockCard.jsx"
import EarthquakeGlobe from "./components/SimpleReactGlobe.jsx"
import '../index.css';

const NewsBoard = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // redirect if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user?.uid) {
      getImage(user.uid);
    }
    else {
      console.error("User not authenticated");
    }
  }, [])
  
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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="lg:mt-45 mt-5 lg:ml-20 md:mt-30 ml-10 w-[95%] h-screen overflow-auto overflow-x-hidden scrollbar-hide">
      <div className="font-sans font-normal text-white text-opacity-90 bg-no-repeat bg-cover antialiased min-h-screen overflow-auto overflow-x-hidden">
        {/* Sidebar */}
        <Sidebar handleLogout={handleLogout} />
      
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 auto-rows-fr w-full">
          {/* First Column */}
          <div>
            <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 h-[520px] text-center p-3">
              <StockCard/>
            </div>
            <br />
            <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 h-[450px] text-center p-3">
              <EarthquakeGlobe/>
            </div>
          </div>
      
          {/* Second Column */}
          <div>
            {user && <NewsSection user={user} />}
          </div>
      
          {/* Third Column */}
          <div>
            {user && <CurNewsSection user={user}/>}
          </div>
        </div>
      </div>
</div>

  );
};

export default NewsBoard;
