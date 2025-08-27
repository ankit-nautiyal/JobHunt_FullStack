import { Avatar, AvatarImage } from '../ui/avatar.jsx'
import { Button } from '../ui/button.jsx'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx'
import { User2, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constants.js';
import { setUser } from '@/redux/authSlice.js';
import { toast } from 'sonner';
import { persistor } from '@/main.jsx';
import { useState } from 'react';


const Navbar = () => {
    const { user } = useSelector(store => store.auth); // w/o Redux we need to have use prop-drilling to have user object
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        try {
            //axios.post(url, data, config);
            const res = await axios.post(`${USER_API_ENDPOINT}/auth/logout`,
                {},   // empty data since logout doesn't need body
                { withCredentials: true }   //config object: ensures cookies (like auth token) are sent with the request
            );
            if (res.data.success) {
                dispatch(setUser(null)); // clear Redux memory
                await persistor.purge(); //clear localStorage
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Logout failed. Please try again.');
        }
    }
    
    //Common for the applicants and the logged out users 
    const commonLinks = (
        <>
            <li className='cursor-pointer'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>Home</NavLink>
            </li>
            <li className='cursor-pointer'>
                <NavLink to='/jobs' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>Jobs</NavLink>
            </li>
            <li className='cursor-pointer'>
                <NavLink to='/browse' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>Browse</NavLink>
            </li>
        </>
    );

    //for recruiters only
    const recruiterLinks = (
        <>
            <li className='cursor-pointer'>
                <NavLink to='/admin/companies' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>Companies</NavLink>
            </li>
            <li className='cursor-pointer'>
                <NavLink to='/admin/jobs' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>Jobs</NavLink>
            </li>
        </>
    );

    return (
        <header className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link to='/' className="text-2xl font-bold">Job<span className='text-[#F83002]'>Hunt</span></Link>
                    </div>

                    {/* Desktop/nav */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <ul className='flex items-center gap-5 font-medium'>
                            {user && user.role === 'recruiter' ? recruiterLinks : commonLinks}
                        </ul>
                    </nav>

                    {/* Right side user actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {!user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant='outline' className="cursor-pointer">Login</Button></Link>
                                <Link to="/signup"><Button className='bg-[#6A38C2] text-white cursor-pointer'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto?.trim() || "user_placeholder_pic.jpg"} alt="profilePhoto" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex items-center gap-3'>
                                            <Avatar><AvatarImage src={user?.profile?.profilePhoto || "user_placeholder_pic.jpg"} /></Avatar>
                                            <div>
                                                <div className='font-medium'>{user?.fullName}</div>
                                                <div className='text-sm text-gray-500'>{user?.email}</div>
                                            </div>
                                        </div>
                                        <div className='flex justify-end gap-2 mt-2'>
                                            {
                                                user && user.role === 'applicant' && <Button variant='outline' onClick={() => navigate('/profile')} className="cursor-pointer"> <User2/> Profile</Button>
                                            }
                                            <Button onClick={handleLogout} className='bg-[#F83002] text-white cursor-pointer'> <LogOut/>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">  {/*hides this div on medium 'md' screens and larger, so it's only visible on small/mobile screens*/}
                        <button onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu" className="p-2 rounded-md cursor-pointer">
                            {mobileOpen ? <X /> : <Menu />}   {/*If mobileOpen is true, clicking will set it to false, and vice versa.*/}
                        </button>
                    </div>
                </div>

                {/* Mobile menu (appears ony when mobileOpen == true) */}
                <div className={`${mobileOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
                    <ul className='flex flex-col gap-3 font-medium'>
                        {user && user.role === 'recruiter' ? recruiterLinks : commonLinks}
                        <li>
                            {!user ? (
                                <div className='flex flex-col gap-2'>
                                    <Link to="/login"><Button variant='outline' onClick={() => setMobileOpen(false)}>Login</Button></Link>
                                    <Link to="/signup"><Button className='bg-[#6A38C2] text-white cursor-pointer' onClick={() => setMobileOpen(false)}>Signup</Button></Link>
                                </div>
                            ) : (
                                <div className='flex items-center gap-3'>
                                    <Avatar  className={user?.role === 'applicant' ? 'cursor-pointer' : ''}  onClick={() => {if (user?.role === 'applicant') {navigate('/profile')} }} >
                                        <AvatarImage src={user?.profile?.profilePhoto || "user_placeholder_pic.jpg"} />
                                    </Avatar>
                                    <div className='flex-1'>
                                        <div className='font-medium'>{user?.fullName}</div>
                                        <div className='text-sm text-gray-500'>{user?.email}</div>
                                    </div>
                                    <button onClick={handleLogout} className='text-sm text-[#F83002] cursor-pointer'>Logout</button>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navbar;




