import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { signOut, onAuthStateChanged, User, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import NewsSection from "./components/NewsSection";
import CurNewsSection from "./components/CurNews";
import StockCard from "./components/StockCard";
import EarthquakeGlobe from "./components/SimpleReactGlobe";
import "../index.css";
 
const NewsBoard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

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
      if(!document.body.style.backgroundImage){
        const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
          document.body.style.backgroundImage = `url("${randomBg}")`;
      } else {
        console.log("Image loaded");
      }
    }, [user]);
  

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="lg:mt-45 md:mt-30 mt-5 lg:ml-20 ml-10 w-[95%] h-screen overflow-auto overflow-x-hidden no-scrollbar">
      <div className="font-sans font-normal text-white text-opacity-90 bg-no-repeat bg-cover antialiased min-h-screen overflow-auto overflow-x-hidden no-scrollbar">
        {/* Sidebar */}
        <Sidebar handleLogout={handleLogout} />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 auto-rows-fr w-full">
          
          {/* First Column */}
          <div>
            <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 h-[530px] text-center p-3">
              <StockCard />
            </div>
            <br />
            <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 h-[525px] text-center p-3">
              <EarthquakeGlobe />
            </div>
          </div>

          {/* Second Column */}
          <div>{user && <NewsSection user={user} />}</div>

          {/* Third Column */}
          <div>{user && <CurNewsSection user={user} />}</div>

        </div>
      </div>
      <br />
    </div>
  );
};

export default NewsBoard;
