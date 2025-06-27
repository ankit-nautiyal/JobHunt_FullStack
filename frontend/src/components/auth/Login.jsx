import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Login = () => {

        const [input, setInput]= useState({
            email: "",
            password: "",
            role: "",
        })
    
        const changeEventHandler= (e) =>{
            setInput({...input, [e.target.name]: e.target.value});
        }
    
        const submitHandler= async (e) => {
            e.preventDefault();
        console.log(input);
        // console.log(er);
        

        }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} method="post" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                
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
                        <RadioGroup className='flex items-center gap-4 my-5'>
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
                    
                    </div>
                    

                    <Button type='submit' className='w-full my-4'>Login</Button>
                    <span className='text-sm'>Don't have an account? <Link to='/signup' className='text-blue-600 hover:underline'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login