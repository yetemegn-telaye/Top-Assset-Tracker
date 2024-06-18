import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { Column } from "react-table";
import UsersTable from "../../components/common/UsersTable/UsersTable";
import AddUser from "./AddUser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { addUserThunk, fetchUsersThunk, selectAddUserError, selectAddUserLoading, selectUsers } from "./UsersSlice";

const Settings = () => {
  interface UsersData {
    id: string;
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

  const [users, setUsers] = useState<UsersData[]>([
    { id: '1', name: 'Ayele Tewodros', email: 'jd@gmail.com', phone: '1234567890', email_verified_at: '2021-09-01', created_at: '2021-09-01', updated_at: '2021-09-01', role: '1', location_id: '1', role_name: 'Admin' },
    // { id: '2', name: 'Abebe Daniel', email: 'jd@gmail.com', phone: '1234567890', email_verified_at: '2021-09-01', created_at: '2021-09-01', updated_at: '2021-09-01', role: '1', location_id: '1', role_name: 'Approver' },
    // { id: '3', name: 'Kebede Tilahun', email: 'jd@gmail.com', phone: '1234567890', email_verified_at: '2021-09-01', created_at: '2021-09-01', updated_at: '2021-09-01', role: '1', location_id: '1', role_name: 'Receiver' },
    // { id: '4', name: 'Kidus Samuel', email: 'jd@gmail.com', phone: '1234567890', email_verified_at: '2021-09-01', created_at: '2021-09-01', updated_at: '2021-09-01', role: '1', location_id: '1', role_name: 'Issuer' },
  ]);

  const columns: Column<UsersData>[] = [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'User Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
    },
    {
      Header: 'Updated At',
      accessor: 'updated_at',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
    {
      Header: 'Location ID',
      accessor: 'location_id',
    },
    {
      Header: 'Role Name',
      accessor: 'role_name',
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log("Initial users:", users);
    // dispatch(fetchUsersThunk());
  }, [users]);

//   const usersList = useAppSelector(selectUsers);
// const isAddUserLoading = useAppSelector(selectAddUserLoading);
// const isAddUserError = useAppSelector(selectAddUserError);

  const handleAddUser = (newUser: UsersData) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    // dispatch(addUserThunk(newUser));
  };

  return (
    <Layout>
      <div className="flex flex-col bg-background-paper rounded-xl shadow-md p-8 pb-2 w-full h-screen overflow-y-auto">
        <div className="flex items-center gap-4 ml-4 mb-6 pb-6 mt-4">
          <FontAwesomeIcon icon={faScrewdriverWrench} className="text-primary" size="xl" />
          <h1 className="text-2xl text-primary">
            Settings
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <AddUser onAddUser={handleAddUser} />
          <UsersTable columns={columns} data={users} />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
