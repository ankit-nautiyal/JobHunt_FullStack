import { Avatar, AvatarImage } from '../ui/avatar.jsx'
import { Button } from '../ui/button.jsx'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx'
import { User2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constants.js';
import { setUser } from '@/redux/authSlice.js';
import { toast } from 'sonner';
import { PURGE } from 'redux-persist';


const Navbar = () => {
    const { user } = useSelector(store => store.auth); // w/o Redux we need to have use prop-drilling to have user object
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            //axios.post(url, data, config);
            const res = await axios.post(`${USER_API_ENDPOINT}/auth/logout`,
                {}, // empty data since logout doesn't need body
                { withCredentials: true } //config object: ensures cookies (like auth token) are sent with the request
            );
            if (res.data.success) {
                dispatch(setUser(null));
                dispatch({ type: PURGE, key: 'root', result: () => null });
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl mb-3'>
                <div className='cursor-pointer'>
                    <Link to='/'> <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Hunt</span> </h1></Link>

                </div>
                <div className='flex items-center gap-15'>
                    <ul className='flex font-medium items-center gap-5 '>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='cursor-pointer'>
                                        <NavLink to='/admin/companies' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>
                                            Companies
                                        </NavLink>
                                    </li>
                                    <li className='cursor-pointer'>
                                        <NavLink to='/admin/jobs' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>
                                            Jobs
                                        </NavLink>
                                    </li>
                                </>

                            ) : (
                                <>

                                    <li className='cursor-pointer'>
                                        <NavLink to='/' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className='cursor-pointer'>
                                        <NavLink to='/jobs' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>
                                            Jobs
                                        </NavLink>
                                    </li>
                                    <li className='cursor-pointer'>
                                        <NavLink to='/browse' className={({ isActive }) => isActive ? 'text-[#F83002]' : ''}>
                                            Browse
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"> <Button variant='outline' className='cursor-pointer'>Login</Button></Link>
                                <Link to="/signup"> <Button className='bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto?.trim() || "dummyProfilePic.jpg"} alt="profilePhoto" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto?.trim() || "dummyProfilePic.jpg"} alt="profilePhoto" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullName}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-2 text-gray-600'>
                                        {
                                            user && user.role === 'applicant' && (
                                                <div className='flex w-fit items-center gap-1.5  '>
                                                    <User2 />
                                                    <Button className='cursor-pointer' variant='link'> <Link to='/profile'>View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className='flex w-fit items-center gap-1.5'>
                                            <LogOut />
                                            <Button onClick={handleLogout} className='cursor-pointer' variant='link'>  Logout </Button>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;




