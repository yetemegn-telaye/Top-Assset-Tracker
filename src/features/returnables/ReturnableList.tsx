import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Column } from "react-table";
import SearchInput from "../../components/common/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchReturnablesListThunk, selectIsReturnablesLoading, selectReturnablesError, selectReturnablesList } from "./ReturnablesSlice";
import RetunablesTable from "../../components/common/ReturnablesTable/ReturnablesTable";

const ReturnableList = () => {
  interface ReturnablesData {
    id: string;
    item_name: string;
    qty: string;
    unit_measurement: string;
    origin: string;
    destination: string;
    receiver: string;
    days_without_return: string;
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState<ReturnablesData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const returnables = useAppSelector(selectReturnablesList);
  const error = useAppSelector(selectReturnablesError);
  const isReturnablesLoading = useAppSelector(selectIsReturnablesLoading);

  const columns: Column<ReturnablesData>[] = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Item Name",
      accessor: "item_name",
    },
    {
      Header: "Quantity",
      accessor: "qty",
    },
    {
      Header: "Receiver",
      accessor: "receiver",
    },
    {
      Header: "Origin",
      accessor: "origin",
    },
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Days Without Return",
      accessor: "days_without_return",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchReturnablesListThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm !== "") {
      const searchResult = returnables.filter((item) => {
        return (
          item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setTableData(searchResult);
    } else {
      setTableData(returnables);
    }
  }, [searchTerm, returnables]);

  const handleNavigate = () => {
    navigate("/new-transfer");
  };

  return (
    <Layout>
      <div className="bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
        <div className="flex item-center justify-between ml-4 mb-6 pb-6 mt-4">
          <div className="flex items-center gap-4 ">
            <FontAwesomeIcon icon={faFileLines} className="text-primary" size="xl" />
            <h1 className="text-2xl text-primary">Returnables</h1>
          </div>
          <button className="bg-secondary text-white px-4 py-2 rounded-md shadow-xl hover:bg-secondary-light" onClick={handleNavigate}>
            New Transfer
          </button>
        </div>
        <div className="flex justify-between mb-8 items-center">
          <SearchInput setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        </div>
        <RetunablesTable columns={columns} data={tableData} isLoading={isReturnablesLoading} error={error} />
      </div>
    </Layout>
  );
};
export default ReturnableList;
