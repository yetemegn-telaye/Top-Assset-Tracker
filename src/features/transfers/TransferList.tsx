import { useEffect, useState } from "react";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";
import { Column } from "react-table";
import SearchInput from "../../components/common/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import FilterOptions from "../../components/common/Table/FilterOptions";
import { useNavigate } from 'react-router';
import { transferData } from "../../constants/data";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchTransfersListThunk, selectTransferList } from "./TransferSlice";

const TransferList = () => {
    interface Data {
        id: number;
        item_name: string;
        qty: number;
        issuer: string;
        origin: string;
        destination: string;
        issued_date: string;
        status: string;
      }

      const [searchTerm, setSearchTerm] = useState("");
      const [selectedStatus, setSelectedStatus] = useState('');
      const [tableData, setTableData] = useState<Data[]>([]);
      const dispatch = useDispatch<AppDispatch>();
      const columns: Column<Data>[] = [
        {
            Header: 'ID',
            accessor: 'id'
          },
        {
          Header: 'Item Name',
          accessor: 'item_name',
        },
        {
          Header: 'Quantity',
          accessor: 'qty',
        },
        {
          Header: 'Issuer',
          accessor: 'issuer',
        },
        {
            Header: 'Origin',
            accessor: 'origin',
          },
          {
            Header: 'Destination',
            accessor: 'destination',
          },
          {
            Header: 'Issued Date',
            accessor: 'issued_date',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
      ];
      
     
     
      const transferStatus = ['All', 'Pending...', 'Approved', 'Delayed', 'Received', 'Returnables'];
      const navigate = useNavigate();
      
     
      
      const transferList = useAppSelector(selectTransferList)
      const data: any = transferData;
       const sortedData = data.sort((a:any, b:any) => {
        const dateA = new Date(a.issued_date).getTime();
        const dateB = new Date(b.issued_date).getTime();
        return dateA - dateB;
      });
      useEffect(() => {
        dispatch(fetchTransfersListThunk());
        setTableData(data);
      },[]);
      console.log(transferList);
  

      useEffect(() => {
        if(searchTerm != '') {
        const filteredData = data.filter((item:any) => {
          return (
            item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setTableData(data);
    } else {
        
        setTableData(data);
      }
      },[searchTerm]);

      useEffect(() => {
        if(selectedStatus === '' || selectedStatus === 'All')
            {
                setTableData(data);
            }
            else
            {
        const filteredData = data.filter((item:any) => {
          return (
            item.status.toLowerCase().includes(selectedStatus.toLowerCase())
          );
        });
        setTableData(data);
        }
    },[selectedStatus])

    const handleNavigate = () => {
        navigate('/new-transfer');
      
    }
      
    return (
        <Layout>
        <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
            <div className="flex item-center justify-between ml-4 mb-6 pb-6 mt-4">
                <div className="flex items-center gap-4 ">
                <FontAwesomeIcon icon={faTruck} className="text-primary" size="xl" />
                <h1 className="text-2xl text-primary">
                    Transfers
                </h1>
                </div>
                    <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light"
                    onClick={handleNavigate}
                    >New Transfer</button>
            </div>
            <div className="flex justify-between mb-8 items-center">
                <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                <FilterOptions setSelectedStatus={setSelectedStatus} transferStatus={transferStatus} />

            </div>
        <DataTable columns={columns} data={transferList} />
        
        </div>
        
    
    </Layout>
    );
    }
export default TransferList;