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
        { item_name: 'John Doe', quantity: 28, issuer: 'USA', origin: 'USA', destination: 'UK', issued_date: '2021-09-01', status: 'Active' },
        { item_name: 'John Doe', quantity: 28, issuer: 'USA', origin: 'USA', destination: 'UK', issued_date: '2021-09-01', status: 'Active' },
        { item_name: 'John Doe', quantity: 28, issuer: 'USA', origin: 'USA', destination: 'UK', issued_date: '2021-09-01', status: 'Active' },
        { item_name: 'John Doe', quantity: 28, issuer: 'USA', origin: 'USA', destination: 'UK', issued_date: '2021-09-01', status: 'Active' },

      ];
    return (
        <Layout>
            <div className="bg-background-paper rounded-xl shadow-md p-16">
                <div className="flex item-center justify-between mb-6 pb-6">
                    <div>
                    <h1>Recent Transfers</h1>
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