import { Column } from "react-table";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";
import SearchInput from "../../components/common/SearchInput";
import { useEffect, useState } from "react";
import FilterOptions from "../../components/common/Table/FilterOptions";
import StatusCard from "./StatusCard";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { transferData } from "../../constants/data";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchDashboardStatsThunk, selectDashboardStats } from "./DashboardSlice"

const Dashboard = () => {
    interface Data {
        id:number;
        item_name: string;
        qty: number;
        issuer: string;
        origin: string;
        destination: string;
        issued_date: string;
        status: string;
      }
      const dispatch = useDispatch<AppDispatch>();
      
      const [searchTerm, setSearchTerm] = useState("");
      const [tableData, setTableData] = useState<Data[]>([]);
      
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


      const dashboard = useAppSelector(selectDashboardStats);
  
    const data:any[]= transferData;
      const statusProgress = [
        {status: 'Delayed', count: 8},
        {status: 'Approval Required', count: 20},
        {status: 'Waiting to Transit', count: 32},
        {status: 'In Transit', count: 12},
        {status: 'Returnables', count: 28},
      ];

      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.issued_date).getTime();
        const dateB = new Date(b.issued_date).getTime();
        return dateA - dateB;
      });
      useEffect(() => {
        dispatch(fetchDashboardStatsThunk());
      }, []);
      
      

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
        setTableData(sortedData.slice(0,3));
      }
      },[searchTerm]);
      
    return (
        <Layout>
            <div className="flex flex-col gap-3 items-start h-screen w-full">
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

                </div>
            <DataTable columns={columns} data={dashboard.recent_transfers} />
            
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
            {dashboard.summary.map((item, index) => (
                <StatusCard key={index} status={item.status} count={item.count} />
            ))
            }

            </div>
            </div>
        </Layout>
    );
    }
export default Dashboard;