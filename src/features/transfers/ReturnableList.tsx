import { useEffect, useState } from "react";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";
import { Column } from "react-table";
import SearchInput from "../../components/common/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { transferData } from "../../constants/data";

const ReturnableList = () => {
    interface Data {
        id: number;
        item_name: string;
        quantity: number;
        issuer: string;
        origin: string;
        destination: string;
        issued_date: string;
        status: string;
      }

      const [searchTerm, setSearchTerm] = useState("");
      const [selectedStatus, setSelectedStatus] = useState('Returnables');
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
      
    const data: Data[] = transferData;
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
        <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
            <div className="flex item-center justify-between ml-4 mb-6 pb-6 mt-4">
                <div className="flex items-center gap-4 ">
                <FontAwesomeIcon icon={faFileLines} className="text-primary" size="xl" />
                <h1 className="text-2xl text-primary">
                    Returnables
                </h1>
                </div>
                <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light"
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
export default ReturnableList;