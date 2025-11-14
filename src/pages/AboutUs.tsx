import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Aboutus: React.FC = () => {
    const backgrounds = [
    "https://images.unsplash.com/photo-1630387775844-b15d0f769972?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1628933978021-818a464f9f5d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
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
            <div className="text-white text-[1.17em] font-bold bg-black/35 backdrop-blur-[10px] shadow-lg border border-white/20 h-[650px] text-center p-5 sm:p-15 ml-15">
                <div className="flex justify-center items-center mt-3">
                    <img width ="50" height="50" src="https://user-images.githubusercontent.com/69076784/236990283-83859a95-c9fa-4d2a-8729-4afb3900789d.png"/>
                </div><br />
                
                <div>
                    Nexaview Developed By Temavrix
                    <br /><br />

                    Check Out and 'Star' our Github
                    <div className="flex justify-center items-center mt-3">
                        <a href="https://github.com/Temavrix/NexaView" target="_blank">
                           <img src="https://img.icons8.com/fluency/48/000000/github.png" width="40" height="40" alt="GitHub" className="hover:scale-110 transition-transform duration-200"/>
                        </a>
                    </div>
                    <br/>
                

                    Built With:
                    <div className="flex justify-center items-center mt-3">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="30" height="30"/> | 
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" width="30" height="30"/> |  
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="30" height="30"/> | 
                        <img width="70" height="30" src="https://github.com/user-attachments/assets/b2ff8604-70e9-489c-9eb3-3d5d850169a3"/>
                    </div>
                    <br />

                    Developers:
                    <br />
                    Mahadhevha Mohankumar
                    <div className="flex justify-center items-center mt-2">
                      <a href="https://github.com/MahaMohan" target="_blank">
                        <img src="https://img.icons8.com/fluency/48/000000/github.png" width="40" height="40" alt="GitHub" className="hover:scale-110 transition-transform duration-200"/>
                      </a>
                    </div>

                </div>

                <div className="mt-10">
                  Version 3.8.2
                </div>
            </div>
        </div>
    );
};

export default Aboutus;