import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
    return (
<div className="min-h-screen flex items-center justify-center">
  <div className="bg-background-paper border border-gray-300 rounded-xl shadow-md w-50 m-auto flex flex-col max-h-screen items-center justify-center gap-8 p-8">
    <div className='flex flex-col items-center justify-center gap-8'>
      <FontAwesomeIcon icon={faUserCircle} size="5x" className="text-primary" />
      <p className='text-xs text-accent'>Welcome to Top's Tracking System.</p>
    </div>
    <form className="flex flex-col space-y-4">
        <div>
        <input
        type="text"
        placeholder="Username"
        className="p-2 border border-bottom border-gray-300"
      />
        </div>
        <div>
      <input
        type="password"
        placeholder="Password"
        className="p-2 border border-gray-300"
      />
      </div>
      <button
        type="submit"
        className="p-2 bg-primary text-white"
      >
        Login
      </button>
      <button className='text-xs text-secondary-light font-light hover:text-secondary'>Create new account?</button>
        
    </form>
  </div>
</div>

    );
    }
export default Login;