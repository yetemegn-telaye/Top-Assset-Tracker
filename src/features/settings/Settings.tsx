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
import { useNavigate } from "react-router-dom";

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
    location: any;
    role_name: string;
  }

  const dispatch = useDispatch<AppDispatch>();
  const users = useAppSelector(selectUsers);
  const isUsersLoading = useAppSelector(selectUsersLoading);
  const usersError = useAppSelector(selectUsersError);
  const isAddUserLoading = useAppSelector(selectAddUserLoading);
  const addUserError = useAppSelector(selectAddUserError);
  const [tableData, setTableData] = useState<UsersData[]>([]);
  const navigate = useNavigate();

  const columns: Column<UsersData>[] = [
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
      Header: "Location",
      accessor: "location",
      Cell: ({ value }: { value: any }) => (value ? <p>{value.name}</p> : <p>Not Assigned</p>),
      
    },
    {
      Header: "Role Name",
      accessor: "role_name",
    },
  ];

  useEffect(() => {
    dispatch(fetchUsersThunk());
    if(usersError===401){
      localStorage.removeItem('token');
      alert('Session Expired. Please login again');
      navigate('/');
      
    }
  }, [dispatch,usersError]);

  

  const handleAddUser = (newUser: UsersData) => {
    dispatch(addUserThunk(newUser));
  };

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => a.id - b.id);
    setTableData(sortedUsers);
  }, [users]);

  return (
    <Layout>
      <div className="flex flex-col bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
        
        <div className="grid grid-cols-1 gap-6">
          <AddUser onAddUser={handleAddUser} isLoading={isAddUserLoading} addUserError={addUserError} />
          <UsersTable columns={columns} data={tableData} isLoading={isUsersLoading} errorMessage={usersError} />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
