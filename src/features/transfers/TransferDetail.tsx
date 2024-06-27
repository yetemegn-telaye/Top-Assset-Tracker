import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBox, faCheck, faClock, faRepeat, faStamp, faTruck, faXmark } from "@fortawesome/free-solid-svg-icons";
import StatusBarLine from "./StatusBarLine";
import Carousel from "../../components/common/Carousel";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchTransferDetailsThunk, selectTransferDetail, updateTransferStatusThunk } from "./TransferSlice";
import { useEffect } from "react";
import { TransferStatus } from "../../constants/data";

const TransferDetail = () => {
  const id: any = parseInt((useParams<{ id: string }>().id) ?? '');
  const dispatch = useDispatch<AppDispatch>();
  const detail = useAppSelector(selectTransferDetail);

  useEffect(() => {
    dispatch(fetchTransferDetailsThunk(id));
  }, [dispatch, id]);
 

  const handleUpdate = (status: string) => {
    if (window.confirm(`Are you sure you want to ${status} this transfer?`) && detail) {
      dispatch(updateTransferStatusThunk({ id, body: { status } }));
    }
  };

  const defaultImage = 'https://fakeimg.pl/600x400/cccccc/848687?text=No+image+added'; 
  const images = detail?.images && detail.images.length > 0 && detail.images[0] !== '' ? detail.images : [defaultImage];
  console.log(detail);
  return (
    <Layout>
      <div className="bg-background-paper rounded-xl shadow-lg flex flex-col gap-3 items-center w-full h-screen overflow-y-auto pt-12 pb-9">
        <StatusBarLine
          currentStatus={detail?.status ?? 'Origin'}
          icons={[<FontAwesomeIcon icon={faClock} />, <FontAwesomeIcon icon={faStamp} />, <FontAwesomeIcon icon={faTruck} />, <FontAwesomeIcon icon={faBox} />,<FontAwesomeIcon icon={faRepeat}/>]}
        />
        <div className="flex flex-col w-full items-center gap-8 justify-center">
          <div className="flex gap-20 items-center justify-center mt-8">
            <Carousel images={images} />
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl text-secondary">{detail.item_name}</h2>
              <div className="flex flex-col gap-4 mt-2">
                <p className=" text-accent-light">Quantity: <span className="text-gray-500 ml-6">{detail.qty ? (detail.qty + detail.unit_measurement) : '0'}</span></p>
                {detail.returnable ? <p className="text-accent-light">Returnable: <FontAwesomeIcon icon={faCheck} className="text-secondary text-2xl ml-2" /> </p> : 
                <p className="flex text-accent-light items-center">Returnable: <FontAwesomeIcon icon={faXmark} className="text-error text-2xl ml-2" /> </p>}
                <p className="text-accent-light">Issued date: <span className="text-gray-500 ml-2"> {detail.issued_date? detail.issued_date: '---'}</span></p>
              </div>
            </div>
          </div>
          <div className="flex gap-20 w-full mt-8 justify-center items-end">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-center justify-between text-sm w-48">
                <p className=" text-accent-light">Issuer:</p>
                <div className="flex flex-col items-center">
                  <p className="text-gray-700">{detail.issuer_name? detail.issuer_name : 'no issuer'}</p>
                  <p className="text-accent-light hover:text-info">+251911904565</p>
                </div>
              </div>
              {detail.receiver_name && detail.receiver_phone && (
                <div className="flex gap-3 items-center text-sm w-48">
                  <p className=" text-accent-light">Receiver:</p>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-700">{detail.receiver_name}</p>
                    <p className="text-accent-light hover:text-info">+251911904565</p>
                  </div>
                </div>
              )}
              <div className="flex gap-1 items-center justify-between text-sm w-48">
                <p className="text-accent-light">Transfer Agent:</p>
                <div className="flex flex-col items-center ">
                  <p className="text-gray-700">{detail.guest_name ? detail.guest_name : 'no agent'}</p>
                  <p className="text-accent-light hover:text-info">+251911904565</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-16">
              <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center">
                  <p className="text-accent-light text-xs">Origin</p>
                  <p>{detail.origin? detail.origin : '---'}</p>
                </div>
                <FontAwesomeIcon icon={faArrowRight} className="text-secondary text-2xl" />
                <div className="flex flex-col items-center">
                  <p className="text-accent-light text-xs">Destination</p>
                  <p>{detail.destination? detail.destination : '---'}</p>
                </div>
              </div>
              {
                detail.status === TransferStatus.WAITING_FOR_APPROVAL ? (
                  <button className="bg-secondary w-48 text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light" onClick={() => handleUpdate('approved')}>Approve</button>
                ) :
                  detail.status === TransferStatus.APPROVED ? (
                    <button className="bg-secondary w-48 text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light" onClick={() => handleUpdate('in_transit')}>Send</button>
                  ) :
                    detail.status === TransferStatus.IN_TRANSIT ? (
                      <button className="bg-secondary w-48 text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light" onClick={() => handleUpdate('at_destination')}>Receive</button>
                    ) :
                      (detail.status === TransferStatus.AT_DESTINATION && detail.returnable==='1') ? (
                        <button className="bg-secondary w-48 text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light" onClick={() => handleUpdate('returned_item')}>Return</button>
                      ) : ''
                      
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TransferDetail;
