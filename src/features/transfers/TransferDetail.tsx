import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faTruck } from "@fortawesome/free-solid-svg-icons";
import StatusBarLine from "./StatusBarLine";
import Carousel from "../../components/common/Carousel";
import itemPic from "../../components/assets/images/plastics.jpeg";
import { transferData } from "../../constants/data";



const TransferDetail = () => {
    const id:number = parseInt((useParams<{id: string}>().id) ?? '');

    const data = transferData.find((item) => item.id === id);
    console.log(data);


    
    return (
            <Layout>
            <div className="bg-background-paper rounded-xl shadow-lg flex flex-col gap-3 items-center w-full h-screen overflow-y-auto pt-12 pb-9">
               
                <StatusBarLine 
                currentStatus={data?.status ?? 'Origin'} 
                icons={[<FontAwesomeIcon icon={faTruck} />, <FontAwesomeIcon icon={faTruck} />, <FontAwesomeIcon icon={faTruck} />, <FontAwesomeIcon icon={faTruck}/>]} />
                <div className="flex flex-col w-full items-center gap-8 justify-center">
                <div className="flex gap-20 items-center justify-center mt-8">
                    <Carousel images={[`${itemPic}`,'https://i.imghippo.com/files/s9tvT1717669071.jpg','https://i.imghippo.com/files/s9tvT1717669071.jpg']} />
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl text-secondary">Item Name</h2>
                        <div className="flex flex-col gap-4 mt-2">
                        <p className=" text-accent-light">Quantity: <span className="text-gray-500 ml-6">10 pcs</span></p>
                        <p className="text-accent-light">Returnable: <FontAwesomeIcon icon={faCheck} className="text-secondary text-2xl ml-2"/> </p>
                        <p className="text-accent-light">Issued date: <span className="text-gray-500 "> Monday,28,2024</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-32 mt-8 justify-center items-end">
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-3 items-center text-sm w-48">
                        <p className=" text-accent-light">Issuer:</p>
                        <div className="flex flex-col">
                            <p className="text-gray-700">Samson Kebede</p>
                            <p className="text-accent-light hover:text-info">+251911904565</p>
                        </div>
                        </div>
                        <div className="flex gap-3 items-center text-sm w-48">
                        <p className=" text-accent-light">Receiver:</p>
                        <div className="flex flex-col">
                            <p className="text-gray-700">Ayele Alemayewu</p>
                            <p className="text-accent-light hover:text-info">+251911904565</p>
                        </div>
                        </div>
                        <div className="flex gap-1 items-center text-sm w-48">
                        <p className="text-accent-light">Transfer Agent:</p>
                        <div className="flex flex-col">
                            <p className="text-gray-700">Samson Kebede</p>
                            <p className="text-accent-light hover:text-info">+251911904565</p>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-16">
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
                    <button className="bg-secondary w-48 text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light">Approve</button>
                    </div>
                </div>
                </div>
            </div>
            
            </Layout>
    );
    }
export default TransferDetail