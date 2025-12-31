import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Aboutus: React.FC = () => {
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

    const navigate = useNavigate();

    const randomBg =
        backgrounds[Math.floor(Math.random() * backgrounds.length)];
      document.body.style.backgroundImage = `url("${randomBg}")`;

      const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        navigate("/");
      };

    return(
        <div>
            <Sidebar handleLogout={handleLogout} />
            <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 h-[650px] text-center p-4 sm:p-15 ml-15">
                <div className="flex justify-center items-center mt-3">
                    <img width ="150" src="https://github.com/user-attachments/assets/1d53da56-1861-40fa-ac73-582345541a2c"/>
                    <br/> &nbsp;
                    <img width ="50" height="50" src="https://user-images.githubusercontent.com/69076784/236990283-83859a95-c9fa-4d2a-8729-4afb3900789d.png"/>
                </div><br />
                
                <div>
                    Nexaview Developed By Temavrix
                    <br /><br />

                    Make sure to 'Star' our Github and you can also <br/> support us
                    in helping us to maintain our infrastructure and services.
                    <div className="flex justify-center items-center mt-3">
                        <a href="https://github.com/Temavrix/NexaView" target="_blank">
                           <img src="https://img.icons8.com/fluency/48/000000/github.png" width="40" height="40" alt="GitHub" className="hover:scale-110 transition-transform duration-200"/>
                        </a>&nbsp;
                        <a href="https://buymeacoffee.com/mahadhevha" target="_blank">
                          <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" height="60"/>
                        </a>
                    </div>
                    <br/>

                    Built With:
                    <div className="flex justify-center items-center mt-3">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="30" height="30"/> &nbsp; 
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" width="30" height="30"/> &nbsp;  
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="30" height="30"/> &nbsp; 
                        <img width="70" height="30" src="https://github.com/user-attachments/assets/b2ff8604-70e9-489c-9eb3-3d5d850169a3"/>
                    </div>

                </div>

                <div className="mt-10">
                  Version 4.0<br/>
                  NexaView Copyright (C) Temavrix 2026  
                </div>
            </div>
        </div>
    );
};

export default Aboutus;