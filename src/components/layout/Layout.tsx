import { FC } from "react";
import { useLocation } from "react-router-dom";
import { faHome, faPlusCircle, faTruck, faFileLines, faBell, faGear, faExclamation, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const getTitleAndIcon = (pathname: string): { title: string; icon: IconDefinition } => {
    switch (pathname) {
      case "/dashboard":
        return { title: "Dashboard", icon: faHome };
      case "/new-transfer":
        return { title: "New Order", icon: faPlusCircle };
      case "/transfers":
        return { title: "Transfers", icon: faTruck };
      case "/transfers/:id":
        return { title: "Transfer Detail", icon: faTruck };
      case "/returnables":
        return { title: "Returnables", icon: faRepeat };
      case "/notifications":
        return { title: "Notifications", icon: faBell };
      case "/settings":
        return { title: "Settings", icon: faGear };
      case "/alerts":
        return { title: "Alerts", icon: faExclamation };
      default:
        return { title: "Asset Tracker", icon: faHome };
    }
  };

  const { title, icon } = getTitleAndIcon(location.pathname);

  return (
    <div className="flex gap-1 h-screen pb-3">
      <Sidebar />
      <div className="flex flex-col gap-3 w-full m-3 mb-3">
        <SearchBar title={title} icon={icon} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
