import { useEffect, useState } from "react";
import DataTable from "../../components/common/Table/DataTable";
import Layout from "../../components/layout/Layout";
import { Column } from "react-table";
import SearchInput from "../../components/common/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import FilterOptions from "../../components/common/Table/FilterOptions";
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchTransfersListThunk, selectIsTransfersLoading, selectTransferList, selectTransfersError } from "./TransferSlice";

const TransferList = () => {
  interface TransferData {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const [tableData, setTableData] = useState<TransferData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const columns: Column<TransferData>[] = [
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

  const transferStatus = ['All', 'Approval Required', 'Approved', 'Delayed', 'In transit', 'Returnables'];

  const transferList = useAppSelector(selectTransferList);
  const isTransfersLoading = useAppSelector(selectIsTransfersLoading);
  const transfersError = useAppSelector(selectTransfersError);

  useEffect(() => {
    dispatch(fetchTransfersListThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm !== '' || selectedStatus !== '') {
      let filteredData = transferList;

      if (searchTerm !== '') {
        filteredData = filteredData.filter((item: any) => {
          return (
            item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.status.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      }

      if (selectedStatus !== '' && selectedStatus !== 'All') {
        filteredData = filteredData.filter((item: any) => {
          return (
            item.status.toLowerCase().includes(selectedStatus.toLowerCase())
          );
        });
      }

      setTableData(filteredData);
    } else {
      setTableData(transferList);
    }
  }, [searchTerm, selectedStatus, transferList]);

  const handleNavigate = () => {
    navigate('/new-transfer');
  }

  return (
    <Layout>
      <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
        <div className="flex items-center justify-between ml-4 mb-6 pb-6 mt-4">
          <div className="flex items-center gap-4">
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
        <DataTable columns={columns} data={tableData} isLoading={isTransfersLoading} error={transfersError} />
      </div>
    </Layout>
  );
}

export default TransferList;
