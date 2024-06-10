import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faBell, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import NotificationCard from "./NotificationCard";

const Notifications = () => {
    const notifications = [
        {
          message: 'Your item has been shipped'
        },
        {
            message: 'Your item is waiting for approval'
        },
        {
          message: 'Your item has been received'
        },
        {
          message: 'Your item has been delayed'
        },
     
      ];
      
    return (
       
            <Layout>
                <div className="flex flex-col cursor-pointer bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
                    <div className="flex items-center gap-4 ml-4 mb-6 pb-6 mt-4">
                    <FontAwesomeIcon icon={faBell} className="text-primary" size="xl" />
                    <h1 className="text-2xl text-primary">
                        Notifications
                    </h1>
                    </div>
                    <div className="flex flex-col gap-4">
                    {notifications.map((notification, index) => (
                        <NotificationCard key={index} notification={notification} />
                      ))
                    }
                    </div>
                     
                </div>
            </Layout>  
        
    );
    }
export default Notifications;