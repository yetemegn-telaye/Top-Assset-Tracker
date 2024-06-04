import { Column } from "react-table";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";
import SearchInput from "../../components/common/SearchInput";
import { useEffect, useState } from "react";
import FilterOptions from "../../components/common/Table/FilterOptions";
import StatusCard from "./StatusCard";

const Dashboard = () => {
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
    //   const [selectedStatus, setSelectedStatus] = useState('');
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

      ];
    //   const transferStatus = ['All', 'Pending','Returnables', 'In transit', 'Received', 'Delayed'];
      const statusProgress = [
        {status: 'Delayed Orders', progress: 8},
        {status: 'Received Orders', progress: 20},
        {status: 'In transit', progress: 32},
        {status: 'Pending', progress: 12},
        {status: 'Returnables', progress: 28},
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
      
    return (
        <Layout>
            <div className="flex flex-col gap-3 items-start w-full">
            <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full">
                <div className="flex item-center justify-between mb-6 pb-6">
                    <div>
                    <h1 className="text-2xl text-primary">Recent Transfers</h1>
                    <span className="text-sm text-accent">42 in total</span>
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="flex flex-col justify-center items-center gap-2">
                        <p className="text-2xl">12</p>
                        <span className="text-xs text-accent-light">Pending</span>
                        </div>
                        <div className="h-full border border-l-accent"></div>
                        <div className="flex flex-col justify-center items-center gap-2">
                        <p className="text-2xl">32</p>
                        <span className="text-xs text-accent-light">In transit</span>
                        </div>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                    {/* <FilterOptions setSelectedStatus={setSelectedStatus} transferStatus={transferStatus} /> */}

                </div>
            <DataTable columns={columns} data={tableData} />
            
            </div>
            <div className="flex items-center justify-between w-full">
            {statusProgress.map((item, index) => (
                <StatusCard key={index} status={item.status} progress={item.progress} />
            ))
            }
            </div>
            </div>
        </Layout>
    );
    }
export default Dashboard;