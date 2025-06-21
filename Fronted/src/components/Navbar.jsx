import { assets } from '../srcAssest'
import { useAppContext } from './AppContext'

const Navbar = ({hideLoginButton}) => {
    const{navigate,token}=useAppContext();

return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40'>
        <img src={assets.logo} alt="Logo" className='w-16 h-auto sm:w-24 cursor-pointer' onClick={()=> navigate('/')} />
       {!hideLoginButton && <button className='flex bg-primary p-1 rounded-lg text-white px-3 cursor-pointer' onClick={() => navigate('/admin')}>
        {token ? 'Dashboard' : 'Login'}
            <img src={assets.arrow} alt="Login" className='w-3 ml-1'/>
        </button>}
    </div>
)
}

export default Navbar
