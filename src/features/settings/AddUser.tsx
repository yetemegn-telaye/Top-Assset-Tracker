import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface AddUserProps {
    onAddUser: (user: any) => void;
    isLoading: boolean;
    addUserError: string | null;
    }

const AddUser:React.FC<AddUserProps> = ({ onAddUser, isLoading, addUserError }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '1',
    phone: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddUser(user);
    console.log(user);
    setUser({
      
      name: '',
      email: '',
      role: '1',
      phone: '',
     
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-background p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4 gap-3">
        <FontAwesomeIcon icon={faUserCircle} className="text-secondary-light" />
        <h2 className="text-xl text-center text-secondary">Add New User</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="mb-4 flex items-center">
          <label htmlFor="name" className="w-1/4 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="email" className="w-1/4 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="role" className="w-1/4 text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            name="role_name"
            id="role_name"
            value={user.role}
            onChange={handleChange}
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="phone" className="w-1/4 text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-6 text-right">
        {
          isLoading ? <p className="text-sm text-secondary">Adding user...</p> : 
          addUserError ? <p className="text-sm text-error">{addUserError}</p> : 
          (
            <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-secondary-light"
          >
            Add User
          </button>
          )
        }
        
       
      </div>
    </form>
  );
};

export default AddUser;
