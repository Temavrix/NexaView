import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect active page
  const isSettingsPage = location.pathname === "/Settings";
  const isDashboardPage = location.pathname === "/Dashboard"; // adjust if your route is just "/"

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
          src="https://github.com/user-attachments/assets/9380b62b-8486-4f1d-a3bf-821bf120147c"
          alt="Comicon"
        />

        {/* Dashboard Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isDashboardPage ? (
            <img
              src="https://github.com/user-attachments/assets/8d0aba4c-99ce-4b49-b072-c4da4683a141"
              alt="Dashboard Active"
              className="h-10 w-10 md:h-12 md:w-12 opacity-100"
            />
          ) : (
            <img
              src="https://github.com/user-attachments/assets/8d0aba4c-99ce-4b49-b072-c4da4683a141"
              alt="Go Back to Dashboard"
              className="h-10 w-10 md:h-12 md:w-12 cursor-pointer"
              onClick={() => navigate("/Dashboard")}
            />
          )}
        </div>

        {/* Settings Icon */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          {isSettingsPage ? (
            <img
              src="https://github.com/user-attachments/assets/b5cfb272-5083-4d39-9265-67f6bf5335f4"
              alt="Settings Active"
              className="h-10 w-10 md:h-12 md:w-12 opacity-100"
            />
          ) : (
            <Link to="/Settings">
              <img
                src="https://github.com/user-attachments/assets/b5cfb272-5083-4d39-9265-67f6bf5335f4"
                alt="Settings"
                className="h-10 w-10 md:h-12 md:w-12"
              />
            </Link>
          )}
        </div>

        {/* Logout */}
        <div className="w-[48px] h-[48px] flex items-center justify-center cursor-pointer">
          <img
            src="https://github.com/user-attachments/assets/ddc1481e-22e7-45ab-b1cf-aa85a8a94992"
            alt="Logout"
            className="h-10 w-10 md:h-12 md:w-12"
            onClick={handleLogout}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center mb-3">
        { isDashboardPage ? (
            <a href="https://github.com/Temavrix/NexaView" title="About Us">
                <img
                  src="https://github.com/user-attachments/assets/e9530ede-b4bb-4842-a11a-bfcdeed6d236"
                  className="h-13 w-13"
                  alt="About Us"
                />
            </a>
        ):(
            <a href="https://github.com/Temavrix/NexaView" title="About Us">
                <img
                    src="https://github.com/user-attachments/assets/e9530ede-b4bb-4842-a11a-bfcdeed6d236"
                    className="h-13 w-13"
                    alt="About Us"
                />
            </a>
        )}
        
      </div>
    </div>
  );
}
