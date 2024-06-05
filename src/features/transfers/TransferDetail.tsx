import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faTruck } from "@fortawesome/free-solid-svg-icons";
import StatusBarLine from "./StatusBarLine";



const TransferDetail = () => {
    const id = useParams<{id: string}>().id;
    return (
            <Layout>
            <div className="bg-background-paper rounded-xl shadow-lg h-full flex flex-col gap-3 items-center pt-12">
               
                <StatusBarLine status={['Origin', 'Approval', 'Move to Transit', 'Received']}
                currentStatus='Approval' 
                icons={[<FontAwesomeIcon icon={faTruck} />, <FontAwesomeIcon icon={faTruck} />, <FontAwesomeIcon icon={faTruck} />, <FontAwesomeIcon icon={faTruck}/>]} />
            
                <div className="flex gap-32 w-full mt-8 ml-64">
                    <img src="https://via.placeholder.com/150" alt="Item" className="w-64 h-40 rounded-lg" />
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl text-secondary">Plastics</h2>
                        <div className="flex flex-col gap-4 mt-2">
                        <p className=" text-accent-light">Quantity: <span className="text-gray-500 ml-6">10 pcs</span></p>
                        <p className="text-accent-light">Returnable: <FontAwesomeIcon icon={faCheck} className="text-secondary text-2xl ml-2"/> </p>
                        <p className="text-accent-light">Issued date: <span className="text-gray-500 "> Monday,28,2024</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-32 w-full mt-8 ml-64">
                    <div className="flex flex-col gap-4 items-start">
                        <div className="flex gap-4 items-center">
                        <p className=" text-accent-light">Issuer:</p>
                        <div className="flex flex-col">
                            <p className="text-gray-700">Samson Kebede</p>
                            <p className="text-accent-light hover:text-info">+251911904565</p>
                        </div>
                        </div>
                        <div className="flex gap-4 items-center">
                        <p className=" text-accent-light">Receiver:</p>
                        <div className="flex flex-col">
                            <p className="text-gray-700">Ayele Alemayewu</p>
                            <p className="text-accent-light hover:text-info">+251911904565</p>
                        </div>
                        </div>
                        <div className="flex gap-4 items-center">
                        <p className=" text-accent-light">Transfer agent:</p>
                        <div className="flex flex-col">
                            <p className="text-gray-700">Samson Kebede</p>
                            <p className="text-accent-light hover:text-info">+251911904565</p>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                    <div className="flex gap-6 items-center">
                        <div>
                            <p className="text-accent-light text-xs">Origin</p>
                            <p>Top 1</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} className="text-secondary text-2xl"/>
                        <div>
                            <p className="text-accent-light text-xs">Origin</p>
                            <p>Top 1</p>
                        </div>
                    </div>
                    <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light">Approve</button>
                    </div>
                </div>
            </div>
            
            </Layout>
    );
    }
export default TransferDetail