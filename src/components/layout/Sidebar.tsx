import { faBars, faBell, faGear, faHome, faPlusCircle, faTruck, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import topLogo from "../assets/top-logo-final.png";
import profilePic from "../assets/images/profilePic.jpeg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen sticky">
      <button className="md:hidden p-6" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-background-paper shadow-md rounded-md p-8 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:h-full overflow-y-auto z-20`}
      >
        <div className="flex flex-col gap-8 w-full items-center h-full">
          <div className="text-lg flex flex-col gap-2 items-center">
            <img src={topLogo} alt="Top Logo" className="w-24" />
            <span className="text-sm font-light text-primary">Asset Tracker</span>
          </div>
          <hr className="w-full" />
          <div className="mt-8 flex-1 w-full">
            <ul className="flex flex-col gap-6">
              <li className="text-sm font-light">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/transfers"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={faTruck} className="mr-2" />
                  Transfers
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/new-transfer"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                  New Order
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/in-transits"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={faTruck} className="mr-2" />
                  Active Transfers
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  Notifications
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={faGear} className="mr-2" />
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mt-auto mb-8 md:mb-0">
            <div className="flex item-center justify-center  rounded-full h-16">
            <img src={profilePic} alt="Profile" className="w-1/2 rounded-full" />
            </div>
            <div className="flex flex-col items-center justify-center">
            <h6 className="text-secondary font-light">Sammuel Doe</h6>
            <span className="text-sm text-accent font-light">sammuel@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-10 ${isOpen ? "block" : "hidden"} md:hidden`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Sidebar;
