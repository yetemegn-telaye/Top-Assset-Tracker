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
import { fetchDashboardStatsThunk, selectDashboardStats, selectError, selectIsLoading } from "./dashboardSlice"
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Dashboard = () => {
    // interface Data {
    //     id:number;
    //     item_name: string;
    //     qty: number;
    //     issuer: string;
    //     origin: string;
    //     destination: string;
    //     issued_date: string;
    //     status: string;
    //   }
    interface DashboardData {
      recent_transfers: RecentTransfer[];
      summary: Summary[];
    }
    interface Summary {
      status: string;
      count: string;
    }
    interface RecentTransfer {
      id: string;
      item_name: string;
      qty: string;
      unit_measurement: string;
      origin: string;
      destination: string;
      issuer: string;
      status: string;
      issued_date: string;
    }
      const dispatch = useDispatch<AppDispatch>();
      
      const [searchTerm, setSearchTerm] = useState("");
      const isDashboardLoading = useAppSelector(selectIsLoading);
      const error = useAppSelector(selectError);
      const [tableData, setTableData] = useState<RecentTransfer[]>([]);
      
      const columns: Column<RecentTransfer>[] = [
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
  
  

      
      useEffect(() => {
        dispatch(fetchDashboardStatsThunk());
      }, [dispatch]);
      
      

      useEffect(() => {
        if(searchTerm != '') {
        const filteredData = dashboard.recent_transfers.filter((item) => {
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
        setTableData(dashboard.recent_transfers.slice(0,3));
      }
      },[searchTerm, dashboard.recent_transfers,dashboard.summary]);


      const inTransitCount = dashboard.recent_transfers.filter((item) => item.status === 'in_transit').length;
      const pendingCount = dashboard.recent_transfers.filter((item) => item.status === 'waiting_for_approval').length;
      
    return (
        <Layout>
            <div className="flex flex-col gap-3 items-start h-screen w-full">
            <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 h-full w-full">
                <div className="flex item-center justify-between mb-6 pb-6">
                    <div>
                    <h1 className="text-2xl text-primary">Recent Transfers</h1>
                    <span className="text-sm text-accent">{dashboard.recent_transfers.length} in total</span>
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="flex flex-col justify-center items-center gap-2">
                        <p className="text-2xl">{pendingCount}</p>
                        <span className="text-xs text-accent-light">Approval Required</span>
                        </div>
                        <div className="h-full border border-l-accent"></div>
                        <div className="flex flex-col justify-center items-center gap-2">
                        <p className="text-2xl">{inTransitCount}</p>
                        <span className="text-xs text-accent-light">In transit</span>
                        </div>
                    </div>
                </div>
                <div className="flex mb-8 items-center">
                    <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />

                </div>
            <DataTable columns={columns} data={tableData.slice(0,3)} isLoading={isDashboardLoading} error={error} />
            
            </div>
            {isDashboardLoading ? <LoadingSpinner/> :(
                <div className="flex items-center justify-between gap-4 w-full">
                {dashboard.summary.map((item, index) => (
                    <StatusCard key={index} status={item.status} count={item.count} />
                ))
                }
    
                </div>
            ) }
          
            </div>
        </Layout>
    );
    }
export default Dashboard;