import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constants'
import { toast } from 'sonner'

const Signup = () => {

    const [input, setInput]= useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const navigate= useNavigate();

    const changeEventHandler= (e) =>{
        setInput({...input, [e.target.name]: e.target.value});
    }

    const changeFileHandler= (e) =>{
        setInput({...input, file: e.target.files?.[0]});
    }

    const submitHandler= async (e) => {
        e.preventDefault();
        const formData= new formData;
        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            const res= axios.post(`${USER_API_ENDPOINT}/auth/register`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate('/login');
                
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} method="post" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-4'>
                        <Label className='my-1'> Full Name</Label>
                        <Input
                            type='text'
                            placeholder='John Doe'
                            name='fullName'
                            value={input.fullName}
                            onChange={changeEventHandler}
                            required
                        />
                    </div>
                    <div className='my-4'>
                        <Label className='my-1'> Email</Label>
                        <Input
                            type='email'
                            placeholder='john@gmail.com'
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                            required

                        />
                    </div>
                    <div className='my-4'>
                        <Label className='my-1'> Phone Number</Label>
                        <Input
                            type='number'
                            placeholder='901520xxxx'
                            name='phoneNumber'
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
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
                            onChange={changeEventHandler}
                            required

                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5' required>
                            <div className="flex items-center space-x-2">
                                <input type="radio"
                                    name='role'
                                    id='applicant'
                                    className='cursor-pointer'
                                    value='applicant'
                                    onChange={changeEventHandler}
                                    checked={input.role=== 'applicant'}
                                    required

                                />
                                <Label htmlFor="applicant">Applicant</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio"
                                    name='role'
                                    id='recruiter'
                                    value='recruiter'
                                    onChange={changeEventHandler}
                                    checked={input.role=== 'recruiter'}
                                    required

                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Picture </Label>
                            <Input
                                accept='image/*'
                                type='file'
                                className='cursor-pointer'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    <Button type='submit' className='w-full my-4'>Sign up</Button>
                    <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-600 hover:underline'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup