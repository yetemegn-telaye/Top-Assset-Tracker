import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faCheck, faCheckDouble, faFile, faHome, faTruck } from "@fortawesome/free-solid-svg-icons";
import StatusBarLine from "./StatusBarLine";
import { useState } from "react";

const NewTransferOrder= () => {
    const [formData, setFormData] = useState({
        item_name: '',
        quantity: 0,
        unit: 'pcs',
        origin: '',
        destination: '',
        issuer: '',
        issued_date: '',
        returnable: false,
        file: '',
      });
      const status = ['Origin', 'Approval', 'Move to Transit', 'Received'];
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(value)
        setFormData((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      };

    const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            item_name: '',
            quantity: 0,
            unit: 'pcs',
            origin: '',
            destination: '',
            issuer: '',
            issued_date: '',
            returnable: false,
            file: ''
            });
      }
    
  const currentStatus = 'Origin';
  const icons = [
    <FontAwesomeIcon icon={faHome} />,
    <FontAwesomeIcon icon={faCheck} />,
    <FontAwesomeIcon icon={faTruck} />,
    <FontAwesomeIcon icon={faCheckDouble} />
  ];

    return (
      
            <Layout>
            <div className="bg-background-paper rounded-xl overflow-y-auto shadow-md p-2 pb-8 w-full">
            
                <div className="flex items-center gap-4 mt-4 ml-12 mb-4  pb-4">
                <FontAwesomeIcon icon={faFile} className="text-primary" size="xl" />
                <h1 className="text-2xl text-primary">
                    New Order
                </h1>
                </div>
                <div className="flex flex-col gap-8 items-center justify-center pb-3 mt-8">
                    <StatusBarLine status={status} currentStatus={currentStatus} icons={icons} />
                <form className="flex flex-col items-center gap-4" onSubmit={handleCreateOrder}>
                    <div className="flex flex-col gap-4 items-start w-full">

                    <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="item_name" className="text-primary">Item Name</label>
                    <input type="text" id="item_name" name="item_name" onChange={handleChange} value={formData.item_name} className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="flex gap-2 items-center">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="quantity" className="text-primary">Quantity</label>
                    <input type="number" id="quantity" name="quantity" onChange={handleChange} value={formData.quantity} className="rounded-md border border-gray-300 p-2 w-32" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="unit" className="text-primary">Unit</label>
                    <select name="unit" id="unit"  onChange={handleChange} value={formData.unit} className="rounded-md border border-gray-300 p-2 text-accent">
                        <option value="pcs">pcs</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="m">m</option>
                    </select>
                    </div>
                    </div>
                  
                    </div>

                    <div className="flex gap-4">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="origin" className="text-primary">Origin</label>
                    <input type="text" id="origin" name="origin" onChange={handleChange} value={formData.origin} className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="flex flex-col gap-4">
                    <label htmlFor="destination" className="text-primary">Destination</label>
                    <input type="text" id="destination" name="destination" onChange={handleChange} value={formData.destination} className="rounded-md border border-gray-300 p-2" />
                    </div>
                    </div>
   
                    <div className="flex w-full gap-4">
                    <div className="flex flex-col gap-4">
                    <label htmlFor="issuer" className="text-primary">Issuer</label>
                    <input type="text" id="issuer" name="issuer" onChange={handleChange} value={formData.issuer} className="rounded-md border border-gray-300 p-2" />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="issued_date" className="text-primary">Issued Date</label>
                    <input type="date" id="issued_date" name="issued_date" onChange={handleChange} value={formData.issued_date} className="rounded-md border border-gray-300 p-2 text-accent" />
                    </div>
                    </div>
                    <div className="flex gap-4 justify-start">
                        <input type="checkbox" id="returnable" name="returnable" onChange={handleChange} className="rounded-md border border-info p-2" /> 
                        <span className="text-accent">Returnable</span>
                    </div>
                    </div>
                 
<div className="flex items-center justify-center w-full">
    <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-secondary-light border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF, SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="file" type="file" name="file" onChange={handleChange} value={formData.file}  className="hidden" />
    </label>
</div> 

                    <button type="submit" className="bg-secondary text-sm text-white w-40 px-4 py-2 rounded-md shadow-xl">Create Order</button>
                </form>
                </div>
         
            </div>
            </Layout>
        
    );
    }
export default NewTransferOrder;