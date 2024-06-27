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
    phone: '',
    role: '',
    location_id: 0,
  });
  const [locations, setLocations] = useState<any[]>([
    {location_id: 1, name: 'Top 1'},
    {location_id: 2, name: 'Top 2'},
    {location_id: 3, name: 'Top 3'}
  ]);
  
  const handleChange = (e:any) => {
    if (e.target.name === 'role') {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
      return;
    } 
    if(e.target.name === 'location_id') {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
      return;
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    onAddUser(user);
    
    setUser({
      name: '',
      email: '',
      phone: '',
      role: '', 
      location_id: 0, 
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-background p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4 gap-3">
        <FontAwesomeIcon icon={faUserCircle} className="text-secondary-light" />
        <h2 className="text-xl text-center text-secondary">Add New User</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4 flex items-center">
          <label htmlFor="name" className="w-1/4 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
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
            required
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="role" className="w-1/4 text-sm font-medium text-gray-700">Role</label>
          <select name="role" required id="role" value={user.role} onChange={handleChange} className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="phone" className="w-1/4 text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            required
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleChange}
            className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4 flex items-center col-span-2 justify-self-center">
       
        <label htmlFor="location_id" className="w-1/4 text-sm font-medium text-gray-700 mr-3">Location</label>
         <select name="location_id" id="location_id" onChange={handleChange} required
          value={user.location_id} className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value=''>Select Location</option>
          {locations.map((location) => (
              <option key={location.location_id} value={location.location_id}>{location.name}</option>
            ))}
           </select>
                 
        </div>
      </div>
      <div className="mt-6 text-center">
        {
          isLoading ? <p className="text-sm text-secondary">Adding user...</p> : 
          addUserError ? <p className="text-sm text-error">{addUserError}</p> : 
          (
            <button
            type="submit"
            className="inline-flex w-1/2 justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-secondary-light"
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
