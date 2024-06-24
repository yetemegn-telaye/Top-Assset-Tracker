import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { Column } from "react-table";
import UsersTable from "../../components/common/UsersTable/UsersTable";
import AddUser from "./AddUser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import {
  addUserThunk,
  fetchUsersThunk,
  selectAddUserError,
  selectAddUserLoading,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from "./UsersSlice";
import { format } from "date-fns";
import { fetchLocationsThunk, selectLocations } from "../transfers/TransferSlice";

const Settings = () => {
  interface UsersData {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    role: string;
    location_id: string;
    role_name: string;
  }

  const dispatch = useDispatch<AppDispatch>();
  const users = useAppSelector(selectUsers);
  const isUsersLoading = useAppSelector(selectUsersLoading);
  const usersError = useAppSelector(selectUsersError);
  const isAddUserLoading = useAppSelector(selectAddUserLoading);
  const addUserError = useAppSelector(selectAddUserError);
  const [tableData, setTableData] = useState<UsersData[]>([]);

  const columns: Column<UsersData>[] = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "User Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Created At",
      accessor: "created_at",
      Cell: ({ value }: { value: string }) => <p>{format(new Date(value), 'PPpp')}</p>,
    },
    {
      Header: "Updated At",
      accessor: "updated_at",
      Cell: ({ value }: { value: string }) => <p>{format(new Date(value), 'PPpp')}</p>,
    },
    {
      Header: "Location ID",
      accessor: "location_id",
    },
    {
      Header: "Role Name",
      accessor: "role_name",
    },
  ];

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  const handleAddUser = (newUser: UsersData) => {
    dispatch(addUserThunk(newUser));
  };
  

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => a.id - b.id);
    setTableData(sortedUsers);
    console.log(sortedUsers);
  }, [users]);

  return (
    <Layout>
      <div className="flex flex-col bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
        <div className="flex items-center gap-4 ml-4 mb-6 pb-6 mt-4">
          <FontAwesomeIcon icon={faScrewdriverWrench} className="text-primary" size="xl" />
          <h1 className="text-2xl text-primary">Settings</h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <AddUser onAddUser={handleAddUser} isLoading={isAddUserLoading} addUserError={addUserError} />
          <UsersTable columns={columns} data={tableData} isLoading={isUsersLoading} errorMessage={usersError} />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
