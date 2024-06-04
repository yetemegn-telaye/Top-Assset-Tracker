import { useEffect, useState } from "react";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";
import { Column } from "react-table";
import SearchInput from "../../components/common/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import FilterOptions from "../../components/common/Table/FilterOptions";

const TransferList = () => {
    interface Data {
        item_name: string;
        quantity: number;
        issuer: string;
        origin: string;
        destination: string;
        issued_date: string;
        status: string;
      }

      const [searchTerm, setSearchTerm] = useState("");
      const [selectedStatus, setSelectedStatus] = useState('');
      const [tableData, setTableData] = useState<Data[]>([]);
      
      const columns: Column<Data>[] = [
        {
          Header: 'Item Name',
          accessor: 'item_name',
        },
        {
          Header: 'Quantity',
          accessor: 'quantity',
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
      
      const data: Data[] = [
        { item_name: 'Item 1', quantity: 28, issuer: 'Abebe', origin: 'Top 1', destination: 'Top 2', issued_date: 'May,07,2024', status: 'In transit' },
        { item_name: 'Item 4', quantity: 211, issuer: 'Kebede', origin: 'Top 2', destination: 'Top 3', issued_date: 'May,05,2024', status: 'Received' },
        { item_name: 'Item 3', quantity: 283, issuer: 'Meron', origin: 'Top 4', destination: 'Top 1', issued_date: 'May,10,2024', status: 'Delayed' },
        { item_name: 'Item 3', quantity: 55, issuer: 'Tati', origin: 'Top 3', destination: 'Top 2', issued_date: 'May,06,2024', status: 'In transit' },
        { item_name: 'Item 1', quantity: 28, issuer: 'Abebe', origin: 'Top 1', destination: 'Top 2', issued_date: 'May,07,2024', status: 'In transit' },
        { item_name: 'Item 4', quantity: 211, issuer: 'Kebede', origin: 'Top 2', destination: 'Top 3', issued_date: 'May,05,2024', status: 'Received' },
        { item_name: 'Item 3', quantity: 283, issuer: 'Meron', origin: 'Top 4', destination: 'Top 1', issued_date: 'May,10,2024', status: 'Delayed' },
        { item_name: 'Item 3', quantity: 55, issuer: 'Tati', origin: 'Top 3', destination: 'Top 2', issued_date: 'May,06,2024', status: 'In transit' },

      ];
      const transferStatus = ['All', 'Pending','Returnables', 'In transit', 'Received', 'Delayed'];
      const statusProgress = [
        {status: 'Delayed', progress: 8,icon:'faClock'},
        {status: 'Received', progress: 20, icon:'faCheck'},
        {status: 'In transit', progress: 32, icon:'faTruck'},
        {status: 'Pending', progress: 12, icon:'faClock'},
        {status: 'Returnables', progress: 28, icon:'faBox'},
      ];
      useEffect(() => {
        const sortedData = data.sort((a, b) => {
            const dateA = new Date(a.issued_date).getTime();
            const dateB = new Date(b.issued_date).getTime();
            return dateA - dateB;
          });
        setTableData(sortedData);
      },[]);
      

      useEffect(() => {
        if(searchTerm != '') {
        const filteredData = data.filter((item) => {
          return (
            item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setTableData(filteredData);
    } else {
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.issued_date).getTime();
          const dateB = new Date(b.issued_date).getTime();
          return dateA - dateB;
        });
        setTableData(sortedData);
      }
      },[searchTerm]);

      useEffect(() => {
        if(selectedStatus === '' || selectedStatus === 'All')
            {
                setTableData(data);
            }
            else
            {
        const filteredData = data.filter((item) => {
          return (
            item.status.toLowerCase().includes(selectedStatus.toLowerCase())
          );
        });
        setTableData(filteredData);
        }
    },[selectedStatus])
      
    return (
        <Layout>
        <div className="flex flex-col gap-3 items-start w-full">
        <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full">
            <div className="flex item-center justify-between ml-4 mb-6 pb-6 mt-4">
                <div className="flex items-center gap-4 ">
                <FontAwesomeIcon icon={faTruck} className="text-primary" size="xl" />
                <h1 className="text-2xl text-primary">
                    Transfers
                </h1>
                </div>
                    <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-xl">New Transfer</button>
            </div>
            <div className="flex justify-between mb-8 items-center">
                <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                <FilterOptions setSelectedStatus={setSelectedStatus} transferStatus={transferStatus} />

            </div>
        <DataTable columns={columns} data={tableData} />
        
        </div>
        
        </div>
    </Layout>
    );
    }
export default TransferList;