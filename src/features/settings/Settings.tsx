import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faFile, faKey, faScrewdriver, faScrewdriverWrench, faUser } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
    return (
            <Layout>
             <div className="flex flex-col bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
                    <div className="flex items-center gap-4 ml-4 mb-6 pb-6 mt-4">
                    <FontAwesomeIcon icon={faScrewdriverWrench} className="text-primary" size="xl" />
                    <h1 className="text-2xl text-primary">
                        Settings
                    </h1>
                    </div>
                    <div className="flex flex-col gap-4 p-4 ml-8">
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faUser} className="text-info" size="sm" />
                        <h4 className="text-sm text-gray-500 hover:text-info">
                            Add User
                        </h4>
                        </div> 
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faKey} className="text-info" size="sm" />
                        <h4 className="text-sm text-gray-500 hover:text-info">
                            Change Password
                        </h4>
                        </div>
                    <div className="flex items-center gap-4">
                        <FontAwesomeIcon icon={faFile} className="text-info" size="sm" />
                        <h4 className="text-sm text-gray-500 hover:text-info">
                            Change Email
                        </h4>
                        </div>  
                       
                    </div>  
                </div>
            </Layout>
    );
}
export default Settings;