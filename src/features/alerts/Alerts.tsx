import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faBell, faExclamation, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import AlertCard from "./AlertCard";
import { fetchNotificationsThunk, selectNotifications } from "../notifications/notificationsSlice";
import { fetchAlertsThunk, selectAlerts } from "./AlertsSlice";

const Alerts = () => {

      const dispatch = useDispatch<AppDispatch>();
      useEffect(() => {
        // dispatch(fetchNotificationsThunk());
        dispatch(fetchAlertsThunk());
      },[]);
      const notifications:any =useAppSelector(selectNotifications);
      const alerts:any = useAppSelector(selectAlerts);
      // const alertNotifications = (notifications.notifications).filter((notification:any) => notification.notification.message.includes('to approve'));
  
      return (
            <Layout>
                <div className="flex flex-col cursor-pointer bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
                    {/* <div className="flex items-center gap-4 ml-4 mb-6 pb-6 mt-4">
                    <FontAwesomeIcon icon={faExclamation} className="text-error" size="xl" />
                    <h2 className="text-2xl text-primary">
                        Alerts
                    </h2>
                    </div> */}
                    <div className="flex flex-col gap-4">
                    {alerts.map((alert:any, index:any) => (
                        <AlertCard key={index} alertObj={alert} />
                      ))
                    }
                    </div>
                     
                </div>
            </Layout>  
        
    );
    }
export default Alerts;