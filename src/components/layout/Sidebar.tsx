import { faBars, faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <button
        className="md:hidden p-6"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-background-paper shadow-md rounded-md p-8 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:h-full overflow-y-auto`}
      >
        <div className="flex flex-col gap-8 w-full items-center h-full">
          <div className="text-lg font-bold">Logo</div>
          <hr className="w-full" />
          <div className="mt-8 flex-1 w-full">
            <ul className="flex flex-col gap-6">
              <li className="text-sm font-light">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
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
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Transfers
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/new-transfer"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  New Order
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/in-transits"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Active Transfers
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Notifications
                </NavLink>
              </li>
              <li className="text-sm font-light">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                >
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 mt-auto mb-8 md:mb-0">
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="text-accent" />
            <h4>John Doe</h4>
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 bg-black opacity-50 z-10 ${isOpen ? 'block' : 'hidden'} md:hidden`} onClick={toggleSidebar}></div>
    </div>
  );
};

export default Sidebar;