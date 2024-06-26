import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faBell, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import NotificationCard from "./NotificationCard";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { clearNotificationThunk, fetchNotificationsThunk, selectIsNotificationsLoading, selectNotificationError, selectNotifications } from "./notificationsSlice";
import { useEffect } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorDisplay from "../../components/common/ErrorDisplay";
import { useNavigate } from "react-router-dom";

const Notifications = () => {

      const dispatch = useDispatch<AppDispatch>();
      const notfications = useAppSelector(selectNotifications);
      const isNotificationsLoading = useAppSelector(selectIsNotificationsLoading);
      const notificationsError = useAppSelector(selectNotificationError);
      const isClearLoading = useAppSelector(selectIsNotificationsLoading);
      const navigate = useNavigate();
      useEffect(() => {
        dispatch(fetchNotificationsThunk());
        if(notificationsError===401){
          localStorage.removeItem('token');
          navigate('/');
          alert('Session Expired. Please login again');
        }
      },[dispatch,notificationsError]);
     

      const handleClear = (id:any) => {
        console.log(id);
        dispatch(clearNotificationThunk(id));
        isClearLoading ? <p>...</p>: alert("Notification Cleared")

      }
    return (
       
            <Layout>
                <div className="flex flex-col cursor-pointer bg-background-paper rounded-xl shadow-md p-10 pb-2 w-full h-screen overflow-y-auto">
                    {/* <div className="flex items-center gap-4 ml-4 mb-6 pb-6 mt-4">
                    <FontAwesomeIcon icon={faBell} className="text-primary" size="xl" />
                    <h1 className="text-2xl text-primary">
                        Notifications
                    </h1>
                    </div> */}
                    <div className="flex flex-col gap-4">
                      {isNotificationsLoading ? <div className="flex items-center justify-center p-10">
                        <LoadingSpinner/>
                        </div> : notificationsError ? <div>
                          <ErrorDisplay message={notificationsError}/>
                        </div> :
                    (notfications.notifications.map((notification:any, index:any) => (
                        <NotificationCard key={index} notificationObj={notification} handleClear={handleClear}/>
                      ))
                    )}
                    </div>
                     
                </div>
            </Layout>  
        
    );
    }
export default Notifications;