import { Link, useLocation, useNavigate } from "react-router-dom";
import NexaView from "../assets/NexaView.png";
import dash from "../assets/dash.png";
import sett from "../assets/settings.png";
import log from "../assets/logout.png";
import newsImg from "../assets/news.png";
import cal from "../assets/cal.png";
import about from "../assets/aboutus.png"

export default function Sidebar({ handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect active page
  const isDashboardPage = location.pathname === "/Dashboard";
  const isNewsboardPage = location.pathname === "/Newsboard";
  const isSettingsPage = location.pathname === "/Settings";
  const isCalanderPage = location.pathname === "/Calaboard";

  return (
    <div className="fixed top-0 left-0 h-full z-50 flex flex-col justify-between bg-black/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[11.5px] border border-white/20 pt-10 px-2 w-[60px] sm:w-[70px] md:w-[80px] lg:w-[80px]">

      {/* Top Section */}
      <div className="flex flex-col items-center space-y-4 -mt-6">
        
        {/* Logo */}
        <img className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]" src={NexaView} alt="Comicon"/>

        {/* Dashboard Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isDashboardPage ? (
            <img src={dash} alt="Dashboard Active" className="h-10 w-10 md:h-12 md:w-12 opacity-100" />
          ) : (
            <img src={dash} alt="Go Back to Dashboard" className="h-10 w-10 md:h-12 md:w-12 cursor-pointer" onClick={() => navigate("/Dashboard")} />
          )}
        </div>

        {/* Newsboard Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isCalanderPage ? (
            <img src={cal} alt="Dashboard Active" className="h-10 w-10 md:h-12 md:w-12 opacity-100" />
          ) : (
            <img src={cal} alt="Go Back to Dashboard" className="h-10 w-10 md:h-12 md:w-12 cursor-pointer" onClick={() => navigate("/Calaboard")} />
          )}
        </div>

        {/* Newsboard Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isNewsboardPage ? (
            <img src={newsImg} alt="Newsboard Active" className="h-10 w-10 md:h-12 md:w-12 opacity-100" />
          ) : (
            <img src={newsImg} alt="Go Back to Newsboard" className="h-10 w-10 md:h-12 md:w-12 cursor-pointer" onClick={() => navigate("/NewsBoard")} />
          )}
        </div>

        {/* Settings Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isSettingsPage ? (
            <img src={sett} alt="Settings Active" className="h-10 w-10 md:h-12 md:w-12 opacity-100" />
          ) : (
            <Link to="/Settings">
              <img src={sett} alt="Go Back to Settings" className="h-10 w-10 md:h-12 md:w-12" />
            </Link>
          )}
        </div>

        {/* Logout */}
        <div className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer">
          <img src={log} alt="Logout Now" className="h-10 w-10 md:h-12 md:w-12" onClick={handleLogout} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center -mb-15 sm:mb-5 cursor-pointer">
        <a onClick={() => navigate("/AboutUs")} title="About Us">
          <img src={about} alt="About Us" className="h-[45px] w-[45px] lg:mb-0 mb-20"/>
        </a>
        
      </div>
    </div>
  );
}
