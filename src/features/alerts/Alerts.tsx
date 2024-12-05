import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faBell, faExclamation, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import AlertCard from "./AlertCard";
import { fetchNotificationsThunk, selectNotifications } from "../notifications/notificationsSlice";
import { fetchAlertsThunk, selectAlerts, selectAlertsError } from "./AlertsSlice";
import { useNavigate } from "react-router-dom";

const Alerts = () => {

      const dispatch = useDispatch<AppDispatch>();
      const errorAlerts = useAppSelector(selectAlertsError);
      const navigate = useNavigate();
      useEffect(() => {
        // dispatch(fetchNotificationsThunk());
        dispatch(fetchAlertsThunk());
        if(errorAlerts===401){
          localStorage.removeItem('token');
          alert('Session Expired. Please login again');
          navigate('/');

        }
      },[dispatch,errorAlerts]);
      const alerts:any = useAppSelector(selectAlerts);
  
      return (
            <Layout>
                <div className="flex flex-col cursor-pointer bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
           
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