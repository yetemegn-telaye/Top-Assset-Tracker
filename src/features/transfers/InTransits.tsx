import { useEffect, useState } from "react";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";
import { Column } from "react-table";
import SearchInput from "../../components/common/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import FilterOptions from "../../components/common/Table/FilterOptions";
import { useNavigate } from "react-router-dom";

const InTransits = () => {
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
      const [selectedStatus, setSelectedStatus] = useState('In transit');
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
      const navigate = useNavigate();
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.issued_date).getTime();
        const dateB = new Date(b.issued_date).getTime();
        return dateA - dateB;
      });
      const filteredData = sortedData.filter((item) => {
        return (
          item.status.toLowerCase().includes(selectedStatus.toLowerCase())
        );
      }
    );

      useEffect(() => {
        setTableData(filteredData);
      },[]);
      

      useEffect(() => {
        if(searchTerm != '') {
        const searchResult = filteredData.filter((item) => {
          return (
            item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setTableData(searchResult);
    } else {
        setTableData(filteredData);
      }
      },[searchTerm]);


    const handleNavigate = () => {
        navigate('/new-transfer');
    }
      
    return (
        <Layout>
        <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full overflow-y-auto">
            <div className="flex item-center justify-between ml-4 mb-6 pb-6 mt-4">
                <div className="flex items-center gap-4 ">
                <FontAwesomeIcon icon={faTruck} className="text-primary" size="xl" />
                <h1 className="text-2xl text-primary">
                    In Transits
                </h1>
                </div>
                <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-xl"
                    onClick={handleNavigate}
                    >New Transfer</button>
            </div>
            <div className="flex justify-between mb-8 items-center">
                <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            </div>
        <DataTable columns={columns} data={tableData} />
        
        </div>
        
    
    </Layout>
    );
    }
export default InTransits;