import { Link, useLocation, useNavigate } from "react-router-dom";
import NexaView from "../assets/NexaView.png";
import dash from "../assets/dash.png";
import sett from "../assets/settings.png";
import log from "../assets/logout.png";
import newsImg from "../assets/news.png";

export default function Sidebar({ handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect active page
  const isDashboardPage = location.pathname === "/Dashboard"; // adjust if your route is just "/"
  const isNewsboardPage = location.pathname === "/Newsboard";
  const isSettingsPage = location.pathname === "/Settings";

  return (
    <div className="fixed top-0 left-0 h-full z-50 flex flex-col justify-between 
                    bg-black/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
                    backdrop-blur-[11.5px] border border-white/20 
                    pt-10 px-2
                    w-[60px] sm:w-[70px] md:w-[80px] lg:w-[80px]">

      {/* Top Section */}
      <div className="flex flex-col items-center space-y-4 -mt-6">
        
        {/* Logo */}
        <img
          className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]"
          src={NexaView}
          alt="Comicon"
        />

        {/* Dashboard Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isDashboardPage ? (
            <img
              src={dash}
              alt="Dashboard Active"
              className="h-10 w-10 md:h-12 md:w-12 opacity-100"
            />
          ) : (
            <img
              src={dash}
              alt="Go Back to Dashboard"
              className="h-10 w-10 md:h-12 md:w-12 cursor-pointer"
              onClick={() => navigate("/Dashboard")}
            />
          )}
        </div>

        {/* Newsboard Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isNewsboardPage ? (
            <img
              src={newsImg}
              alt="Dashboard Active"
              className="h-10 w-10 md:h-12 md:w-12 opacity-100"
            />
          ) : (
            <img
              src={newsImg}
              alt="Go Back to Dashboard"
              className="h-10 w-10 md:h-12 md:w-12 cursor-pointer"
              onClick={() => navigate("/NewsBoard")}
            />
          )}
        </div>

        {/* Settings Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isSettingsPage ? (
            <img
              src={sett}
              alt="Settings Active"
              className="h-10 w-10 md:h-12 md:w-12 opacity-100"
            />
          ) : (
            <Link to="/Settings">
              <img
                src={sett}
                alt="Settings"
                className="h-10 w-10 md:h-12 md:w-12"
              />
            </Link>
          )}
        </div>

        {/* Logout */}
        <div className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer">
          <img
            src={log}
            alt="Logout"
            className="h-10 w-10 md:h-12 md:w-12"
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center -mb-15 sm:mb-5 cursor-pointer">
        { isDashboardPage ? (
            <a onClick={() => navigate("/AboutUs")} title="About Us">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" className="h-[35px] w-[35px] lg:mb-0 mb-20 fill-white">
            <path d="M48 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM0 192c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 256 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-224-32 0c-17.7 0-32-14.3-32-32z"/>
          </svg>
            </a>
        ):(
            <a onClick={() => navigate("/AboutUs")} title="About Us">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" className="h-[35px] w-[35px] lg:mb-0 mb-20 fill-white">
            <path d="M48 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM0 192c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 256 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-224-32 0c-17.7 0-32-14.3-32-32z"/>
          </svg>
            </a>
        )}
        
      </div>
    </div>
  );
}
