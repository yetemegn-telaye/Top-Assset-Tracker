import { faBars, faBell, faFile, faFileLines, faGear, faHome, faL, faPlusCircle, faRightFromBracket, faTruck, faUserCircle, faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import topLogo from "../assets/top-logo-final.png";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { logOutUser } from "../../features/auth/authSlice";
import { fetchNotificationsThunk, selectNotifications } from "../../features/notifications/notificationsSlice";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const token = useAppSelector((state: { auth: { token: string } }) => state.auth.token);
  const navigate = useNavigate();
  const notifications= useAppSelector(selectNotifications);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(fetchNotificationsThunk());
  }, [dispatch]);
   
  const handleLogout = () => {
    dispatch(logOutUser(token));
    window.localStorage.removeItem('token');
    navigate('/');
    // localStorage.removeItem('token');
    // window.location.href = '/';
  }

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
                  to="/in-transits"
                  className={({ isActive }) =>
                    isActive ? "text-info" : "text-accent hover:text-info"
                  }
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={faFileLines} className="mr-2" />
                  Returnables
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
            {notifications.notifications.length > 0 && (
            <span className="relative top-0 right-0 left-5 bottom-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-error rounded-full">
              {notifications.notifications.length}
            </span>
          )}
              
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
          <div className="flex flex-col items-center justify-center gap-4 mt-auto mb-8 md:mb-0 cursor-pointer">
            <div className="flex item-center justify-center  rounded-full h-16">
            <img src="https://i.imghippo.com/files/CCcN51718192469.webp" alt="Profile" className="w-1/2 rounded-full" />
            </div>
            <div className="flex flex-col items-center justify-center">
            <h6 className="text-secondary font-light">Abebe Kebede</h6>
            <span className="text-sm text-accent font-light">abebe@topssets.com</span>
            <button onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className="text-accent hover:text-info" /> </button>
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
