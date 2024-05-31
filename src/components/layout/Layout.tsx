import { FC } from "react";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";


type LayoutProps = {
    children: React.ReactNode;
    }

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex gap-4">
        <Sidebar />
       
        <div className="flex flex-col gap-4">
        <SearchBar />
        {children}
        </div>
        
       
        </div>
    );
    }
 export default Layout;