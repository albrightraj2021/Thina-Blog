import React from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate ,Outlet} from 'react-router-dom'
import SideBar from '../../components/admin/SideBar';

const Layout = () => {
    const navigate = useNavigate();
const logout = () => {
  localStorage.removeItem('token');
 navigate('/');
}
    return (
    <>
    <div className='flex justify-between items-center  py-2 px-4 sm:px-8 border-b border-gray-200'>
    <Navbar hideLoginButton={true} />
    <button onClick={logout} className='text-white bg-primary px-4 py-2 rounded-full hover:bg-secondary transition duration-300 cursor-pointer'>
            Logout

      </button>
    </div>
        <div className='flex h-[calc(100vh-70px)]'>
        <SideBar/>
        <Outlet/>
        </div>
    </>
        
  )
}

export default Layout
