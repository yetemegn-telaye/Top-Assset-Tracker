import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faRightToBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import topLogo from "../../components/assets/top-logo-final.png";
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../redux/store';
import { loginUserThunk, selectIsAuthenticated, selectIsLoginLoading, selectLoginError } from './authSlice';
import LoadingDots from '../../components/common/LoadingDots';
import './Login.css';

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const [loginFormData, setLoginFormData] = useState<FormData>({ email: '', password: '' });
    const dispatch = useDispatch<AppDispatch>();
    const authenticated: boolean = useAppSelector(selectIsAuthenticated);
    const isLoginLoading = useAppSelector(selectIsLoginLoading);
    const loginError = useAppSelector(selectLoginError);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = loginFormData;
        dispatch(loginUserThunk({ email, password }))
            .unwrap()
            .then(() => {
                navigate('/dashboard');
            })
            .catch(() => {
                // Error handling will be done using loginError
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-secondary-lighter">
            <div className="text-lg flex flex-col gap-2 items-center mt-20 animate-fadeIn">
                <img src={topLogo} alt="Top Logo" className="w-48 h-20" />
                <span className="text-2xl font-semibold text-primary">Asset Tracker</span>
            </div>
            <div className="bg-white border border-gray-300 rounded-xl shadow-lg w-80 m-auto flex flex-col max-h-screen items-center justify-center gap-6 p-8 animate-slideIn">
                <div className='flex flex-col items-center justify-center gap-4'>
                    <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-primary" />
                    <p className='text-sm text-secondary font-light'>Welcome to Top's Tracking System.</p>
                </div>
                <form className="flex flex-col space-y-6 w-full" onSubmit={handleSubmit}>
                    <div className='relative'>
                        <input
                            required
                            type="text"
                            placeholder="Email"
                            id='email'
                            name='email'
                            value={loginFormData.email}
                            onChange={handleInputChange}
                            className="p-2 pl-10 border-0 border-b border-primary-light w-full focus:outline-none focus:border-primary transition duration-200"
                        />
                        <FontAwesomeIcon icon={faUserCircle}
                            className='text-primary absolute left-2 top-1/2 transform -translate-y-1/2' />
                    </div>
                    <div className='relative'>
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            id='password'
                            name='password'
                            value={loginFormData.password}
                            onChange={handleInputChange}
                            className="p-2 pl-10 border-0 border-b border-primary-light w-full focus:outline-none focus:border-primary transition duration-200"
                        />
                        <FontAwesomeIcon icon={faLock} size='1x'
                            className='text-primary absolute left-2 top-1/2 transform -translate-y-1/2' />
                    </div>
                    <button
                        type="submit"
                        className="p-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center justify-center gap-2 transition duration-200"
                    >
                        Login
                        <FontAwesomeIcon icon={faRightToBracket} size='1x' />
                    </button>
                </form>
                {isLoginLoading && (
                    <div className="flex justify-center items-center">
                        <LoadingDots />
                    </div>
                )}
                {loginError && (
                    <div className="text-red-500 text-sm mt-4">
                        Invalid email or password
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
