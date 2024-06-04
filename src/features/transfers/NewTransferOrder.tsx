import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faFile, faTruck } from "@fortawesome/free-solid-svg-icons";

const NewTransferOrder= () => {
    return (
        <div>
            <Layout>
            <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full">
            
                <div className="flex items-center gap-4 ml-4 mb-6 pb-4 mt-4">
                <FontAwesomeIcon icon={faFile} className="text-primary" size="xl" />
                <h1 className="text-2xl text-primary">
                    New Order
                </h1>
                </div>
                <div className="flex items-center justify-center pb-3">
                <form className="flex flex-col items-center w-1/2 gap-4">
                    <div className="flex gap-4 items-center justify-between">
                    <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="item_name" className="text-primary">Item Name</label>
                    <input type="text" id="item_name" className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="flex flex-col gap-4">
                    <label htmlFor="quantity" className="text-primary">Quantity</label>
                    <input type="number" id="quantity" className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="flex flex-col gap-4">
                    <label htmlFor="destination" className="text-primary">Destination</label>
                    <input type="text" id="destination" className="rounded-md border border-gray-300 p-2" />
                    </div>
                    </div>

                    <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="origin" className="text-primary">Origin</label>
                    <input type="text" id="origin" className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="flex flex-col gap-4">
                    <label htmlFor="issuer" className="text-primary">Issuer</label>
                    <input type="text" id="issuer" className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="flex flex-col gap-4">
                    <label htmlFor="issued_date" className="text-primary">Issued Date</label>
                    <input type="date" id="issued_date" className="rounded-md border border-gray-300 p-2" />
                    </div>
                    </div>
                    </div>
                    <div className="border-dashed border-2 border-secondary-light p-8">
                    <input type="file" id="file" className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <button className="bg-secondary text-sm text-white w-40 px-4 py-2 rounded-md shadow-xl">Create Order</button>
                </form>
                </div>
         
            </div>
            </Layout>
        
        </div>
    );
    }
export default NewTransferOrder;