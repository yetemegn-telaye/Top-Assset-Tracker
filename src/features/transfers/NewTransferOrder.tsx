import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faCheck, faCheckDouble, faFile, faHome, faTruck } from "@fortawesome/free-solid-svg-icons";
import StatusBarLine from "./StatusBarLine";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { createTransferThunk, fetchApproversThunk, fetchLocationsThunk, selectApprovers, selectCreateTransferError, selectIsApproverLoading, selectIsCreateTransferLoading, selectIsLocationLoading, selectLocations } from "./TransferSlice";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorDisplay from "../../components/common/ErrorDisplay";

const NewTransferOrder = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [orderData, setOrderData] = useState({
    item: {
      name: "",
      qty: 0,
      unit_measurement: "",
      returnable: true
    },
    guest: {
      name: "",
      phone: ''
    },
    approver_id: 1,
    destination_id: 1,
    images: [] as File[]
  });

  const status = ['Origin', 'Approval', 'Move to Transit', 'Received'];
  useEffect(() => {
    dispatch(fetchApproversThunk());
    dispatch(fetchLocationsThunk());
    }, [dispatch]);
 const approvers = useAppSelector(selectApprovers);
 const locations = useAppSelector(selectLocations);
 const isApproversLoading = useAppSelector(selectIsApproverLoading);
 const isLocationsLoading = useAppSelector(selectIsLocationLoading);
 const isCreateTransferLoading = useAppSelector(selectIsCreateTransferLoading);
 const createTransferError = useAppSelector(selectCreateTransferError);

 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files, checked }:any = e.target;

    if (type === 'checkbox') {
      setOrderData((prev) => ({
        ...prev,
        item: {
          ...prev.item,
          returnable: checked
        }
      }));
    } else if (type === 'file') {
      const selectedFiles = files ? Array.from(files) : [];
      setOrderData((prev:any) => ({
        ...prev,
        images: selectedFiles
      }));
    } else {
      const [field, subfield] = name.split('.');
      if (subfield) {
        setOrderData((prev:any) => ({
          ...prev,
          [field]: {
            ...prev[field],
            [subfield]: value,
          }
        }));
      } else {
        setOrderData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('item[name]', orderData.item.name);
    formData.append('item[qty]', orderData.item.qty.toString());
    formData.append('item[unit_measurement]', orderData.item.unit_measurement);
    formData.append('item[returnable]', orderData.item.returnable.toString());
    formData.append('guest[name]', orderData.guest.name);
    formData.append('guest[phone]', orderData.guest.phone.toString());
    formData.append('approver_id', orderData.approver_id.toString());
    formData.append('destination_id', orderData.destination_id.toString());
    orderData.images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
  console.log('form data', formData);  
    dispatch(createTransferThunk(formData));
    console.log('order data in new order', orderData);
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
      <div className="bg-background-paper rounded-xl overflow-y-auto shadow-md p-2 pb-8 w-full h-screen">
        {/* <div className="flex items-center gap-4 mt-4 ml-12 mb-4  pb-4">
          <FontAwesomeIcon icon={faFile} className="text-primary" size="xl" />
          <h1 className="text-2xl text-primary">
            New Order
          </h1>
        </div> */}
        <div className="flex flex-col gap-8 items-center justify-center pb-3 mt-8">
          <StatusBarLine currentStatus={currentStatus} icons={icons} />
          {isCreateTransferLoading ? <div>
            <LoadingSpinner/>
          </div> : createTransferError ? <div>
            <ErrorDisplay message={createTransferError} />
          </div> : (
               <form className="flex flex-col items-center gap-4" onSubmit={handleCreateOrder} encType="multipart/form-data">
               <div className="flex flex-col gap-4 items-start w-full">
                 <div className="flex gap-4">
                   <div className="flex flex-col gap-4">
                     <label htmlFor="item.name" className="text-accent text-sm">Item Name</label>
                     <input type="text" id="item.name" name="item.name"
                       onChange={handleChange} value={orderData.item.name}
                       className="rounded-md border border-primary-light p-2" />
                   </div>
                   <div className="flex gap-2 items-center">
                     <div className="flex flex-col gap-4">
                       <label htmlFor="item.qty" className="text-accent text-sm">Quantity</label>
                       <input type="number" id="item.qty" name="item.qty"
                         onChange={handleChange} value={orderData.item.qty}
                         className="rounded-md border border-primary-light p-2 w-32" />
                     </div>
                     <div className="flex flex-col gap-4">
                       <label htmlFor="item.unit_measurement" className="text-accent text-sm">Unit</label>
                       <select name="item.unit_measurement" id="item.unit_measurement" onChange={handleChange} value={orderData.item.unit_measurement} className="rounded-md border border-primary-light p-2 text-accent">
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
                     <label htmlFor="approver_id" className="text-accent text-sm">Approver</label>
                     <select name="approver_id" id="approver_id" onChange={handleChange} value={isApproversLoading ?('Loading...'): (orderData.approver_id)} className="rounded-md border border-primary-light p-2 text-accent">
                       {approvers.map((approver) => (
                         <option key={approver.id} value={approver.id}>{approver.name}</option>
                       ))}
                       </select>
                   </div>
                   <div className="flex flex-col gap-4">
                     <label htmlFor="destination_id" className="text-accent text-sm">Destination</label>
                     <select name="destination_id" id="destination_id" onChange={handleChange} value={isLocationsLoading ?('Loading...'): orderData.destination_id} className="rounded-md border border-primary-light p-2 text-accent">
                       {locations.map((location) => (
                         <option key={location.id} value={location.id}>{location.name}</option>
                       ))}
                       </select>
                   </div>
                 </div>
   
                 <div className="flex w-full gap-4">
                   <div className="flex flex-col gap-4">
                     <label htmlFor="guest.name" className="text-accent text-sm">Guest</label>
                     <input type="text" id="guest.name" name="guest.name" onChange={handleChange} value={orderData.guest.name} className="rounded-md border border-primary-light p-2" />
                   </div>
                   <div className="flex flex-col gap-4">
                     <label htmlFor="guest.phone" className="text-accent text-sm">Phone Number</label>
                     <input type="text" id="guest.phone" name="guest.phone" onChange={handleChange} value={orderData.guest.phone} className="rounded-md border border-primary-light p-2" />
                   </div>
                 </div>
                 <div className="flex gap-4 justify-start">
                   <input type="checkbox" id="item.returnable" name="item.returnable" onChange={handleChange} checked={orderData.item.returnable} className="rounded-md border border-info p-2" />
                   <span className="text-accent text-sm">Returnable</span>
                 </div>
               </div>
   
               <div className="flex items-center justify-center w-full">
                 <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-48 border-2 border-secondary-light border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
                     <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                     </svg>
                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                     <p className="text-xs text-gray-500 dark:text-gray-400">PDF, SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                   </div>
                   <input id="images" type="file" name="images" onChange={handleChange} multiple className="hidden" />
                 </label>
               </div>
   
               <button type="submit" className="bg-secondary text-sm text-white w-40 px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light">Create Order</button>
             </form>
          ) 
        } 
        </div>
      </div>
    </Layout>
  );
}

export default NewTransferOrder;
