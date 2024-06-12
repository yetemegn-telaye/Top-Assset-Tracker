import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faRightToBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import topLogo from "../../components/assets/top-logo-final.png";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUserThunk } from './AuthSlice';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { loginUser} from './AuthSlice';
import { unwrapResult } from '@reduxjs/toolkit';
// import { useLoginUserMutation } from './AuthApi';

interface formData  {
    email: string;
    password: string;
}

const Login = () => {
    const [loginFormData, setLoginFormData] = useState<formData>({email: '', password: ''});
    const dispatch = useDispatch<AppDispatch>();
    // const [loginUser] = useLoginUserMutation();


    const navigate = useNavigate();
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData({...loginFormData, [name]: value});
    }
    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {email,password} = loginFormData
        dispatch(loginUserThunk({email,password}));
      
    }
    return (
<div className="min-h-screen flex flex-col items-center justify-center">
    <div className="text-lg flex flex-col gap-2 items-center mt-20">
        <img src={topLogo} alt="Top Logo" className="w-48 h-20" />
        <span className="text-xl font-light text-primary">Asset Tracker</span>
    </div>
  <div className="bg-background-paper border border-gray-300 rounded-xl shadow-md w-50 m-auto flex flex-col max-h-screen items-center justify-center gap-12 p-12">
    <div className='flex flex-col items-center justify-center gap-4'>
      {/* <FontAwesomeIcon icon={faUserCircle} size="4x" className="text-secondary" /> */}
      <h1 className='text-primary text-3xl font-light'>Login</h1>
      <p className='text-xs text-secondary-light font-light'>Welcome to Top's Tracking System.</p>
    </div>
    <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
        <div className='relative'>
        <input
        type="text"
        placeholder="email"
        id='email'
        name='email'
        value={loginFormData.email}
        onChange={handleInputChange}
        className="p-2 pl-10 border-0 border-b border-primary-light"
        
      />
      <FontAwesomeIcon icon={faUserCircle} 
       className='text-accent absolute right-2 top-1/2 transform -translate-y-1/2' />
        </div>
        <div className='relative'>
        <input
        type="password"
        placeholder="Password"
        id='password'
        name='password'
        value={loginFormData.password}
        onChange={handleInputChange}
        className="p-2 pl-10 border-0 border-b border-primary-light"
      />
      <FontAwesomeIcon icon={faLock} size='1x'
       className='text-accent absolute right-2 top-1/2 transform -translate-y-1/2' />
        </div>
      <button
        type="submit"
        className="p-2 bg-primary text-white rounded-md hover:bg-primary-light"
      >
        Login
        <FontAwesomeIcon icon={faRightToBracket} size='1x' className='ml-2' />
      </button>    
    </form>
  </div>
</div>

    );
    }
export default Login;