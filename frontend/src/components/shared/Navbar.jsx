import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar.jsx'
import { Button } from '../ui/button.jsx'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.jsx'
import { User2, LogOut } from 'lucide-react';
import {Link} from 'react-router-dom';


const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl '>
                <div className='cursor-pointer'>
                    <Link to='/'> <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span> </h1></Link>
                    
                </div>
                <div className='flex items-center gap-15'>
                    <ul className='flex font-medium items-center gap-5 '>
                        <li className='cursor-pointer'>Home</li>
                        <li className='cursor-pointer'>Jobs</li>
                        <li className='cursor-pointer'>Browse</li>
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"> <Button variant='outline'>Login</Button></Link>
                                <Link to="/signup"> <Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button></Link>
                                
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>Ankit Nautiyal</h4>
                                            <p className='text-sm text-muted-foreground'>Full-stack web developer</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-2 text-gray-600'>
                                        <div className='flex w-fit items-center gap-1.5  '>
                                            <User2 />
                                            <Button className='cursor-pointer' variant='link'> View Profile</Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-1.5'>
                                            <LogOut />
                                            <Button className='cursor-pointer' variant='link'> Logout</Button>
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




