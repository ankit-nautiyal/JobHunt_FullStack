import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constants'
import { toast } from 'sonner'


const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const navigate= useNavigate();

    const handleFormChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = axios.post(`${USER_API_ENDPOINT}/auth/login`, input, {
                headers: {
                    "Content-Type": "application/json"   //Lets backend know we're sending json data
                },
                withCredentials: true  //to include cookies (like token) from backend in the request
            });

            if (res.data.success) {
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-4'>
                        <Label className='my-1'> Email</Label>
                        <Input
                            type='email'
                            placeholder='john@gmail.com'
                            name='email'
                            value={input.email}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className='my-4'>
                        <Label className='my-1'> Password</Label>
                        <Input
                            type='password'
                            placeholder='password'
                            name='password'
                            value={input.password}
                            onChange={handleFormChange}
                            required
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <input type="radio"
                                    name='role'
                                    id='applicant'
                                    className='cursor-pointer'
                                    value='applicant'
                                    onChange={handleFormChange}
                                    checked={input.role === 'applicant'}
                                    required
                                />
                                <Label htmlFor="applicant">Applicant</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio"
                                    name='role'
                                    id='recruiter'
                                    value='recruiter'
                                    onChange={handleFormChange}
                                    checked={input.role === 'recruiter'}
                                    required

                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>

                    </div>


                    <Button type='submit' className='w-full my-4'>Login</Button>
                    <span className='text-sm'>Don't have an account? <Link to='/signup' className='text-blue-600 hover:underline'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login