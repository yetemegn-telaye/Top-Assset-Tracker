import { Column } from "react-table";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";

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
        { item_name: 'Item 1', quantity: 28, issuer: 'Abebe', origin: 'Top 1', destination: 'Top 2', issued_date: 'May,03,2024', status: 'In transit' },
        { item_name: 'Item 4', quantity: 211, issuer: 'Abebe', origin: 'Top 2', destination: 'Top 3', issued_date: 'May,05,2024', status: 'Received' },
        { item_name: 'Item 3', quantity: 283, issuer: 'Abebe', origin: 'Top 4', destination: 'Top 1', issued_date: 'May,10,2024', status: 'Delayed' },
        { item_name: 'Item 3', quantity: 55, issuer: 'Abebe', origin: 'Top 3', destination: 'Top 2', issued_date: 'May,06,2024', status: 'In transit' },

      ];
    return (
        <Layout>
            <div className="bg-background-paper rounded-xl shadow-md p-16">
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

            <DataTable columns={columns} data={data} />
            </div>
        </Layout>
    );
    }
export default Dashboard;