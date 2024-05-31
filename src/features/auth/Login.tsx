import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faRightToBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
    return (
<div className="min-h-screen flex items-center justify-center">
  <div className="bg-background-paper border border-gray-300 rounded-xl shadow-md w-50 m-auto flex flex-col max-h-screen items-center justify-center gap-12 p-12">
    <div className='flex flex-col items-center justify-center gap-8'>
      <FontAwesomeIcon icon={faUserCircle} size="5x" className="text-primary" />
      <p className='text-xs text-secondary-light font-light'>Welcome to Top's Tracking System.</p>
    </div>
    <form className="flex flex-col space-y-8">
        <div className='relative'>
        <input
        type="text"
        placeholder="Username"
        className="p-2 pl-10 border-0 border-b border-primary-light"
        
      />
      <FontAwesomeIcon icon={faUserCircle} size='1x'
       className='text-accent absolute right-2 top-1/2 transform -translate-y-1/2' />
        </div>
        <div className='relative'>
        <input
        type="password"
        placeholder="Password"
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