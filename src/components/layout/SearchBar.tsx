import { faBell, faExclamation, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../common/SearchInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchNotificationsThunk, selectNotifications } from "../../features/notifications/notificationsSlice";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchNotificationsThunk());
  }, [dispatch]);
  const notifications = useAppSelector(selectNotifications);
  const alertNotifications = (notifications.notifications).filter((notification) => notification.notification.message.includes('to approve'));

  const getCurrentTime = () => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const currentDate = new Date();
    return new Intl.DateTimeFormat('en-US', options).format(currentDate);
  };

  const isDayTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  };

  const currentDate = getCurrentTime();
  const dayTime = isDayTime();

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleAlertClick = () => {
    navigate('/alerts');
  };
  const handleBellClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="bg-background-paper rounded-xl shadow-md border border-gray-200 flex items-center justify-between gap-8 w-full p-5">
      <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <div className="flex items-center justify-center gap-4">
        <FontAwesomeIcon icon={dayTime ? faSun : faMoon} className={dayTime ? "text-yellow-500" : "text-blue-500"} />
        <p className="text-sm text-accent">{currentDate}</p>
      </div>
      <div className="flex items-center justify-center gap-7 mr-6">
        <button className="relative cursor-pointer" onClick={handleAlertClick}>
          <FontAwesomeIcon icon={faExclamation} className="text-error-light text-2xl" />
          {alertNotifications.length > 0 && (
            <span className="absolute top-0 right-0 left-2 bottom-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-error rounded-full">
              {alertNotifications.length}
            </span>
          )}
        </button>
        <button className="relative cursor-pointer" onClick={handleBellClick}>
          <FontAwesomeIcon icon={faBell} className="text-info text-2xl hover:text-info-light" />
          {notifications.notifications.length > 0 && (
            <span className="absolute top-0 right-0 left-5 bottom-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-error rounded-full">
              {notifications.notifications.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
