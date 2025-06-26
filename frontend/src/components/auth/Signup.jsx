import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" method="post" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label className='my-1'> Full Name</Label>
                        <Input
                            type='text'
                            placeholder='John Doe'
                            name='fullName'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='my-1'> Email</Label>
                        <Input
                            type='email'
                            placeholder='john@gmail.com'
                            name='email'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='my-1'> Phone Number</Label>
                        <Input
                            type='number'
                            placeholder='901520xxxx'
                            name='phoneNumber'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='my-1'> Password</Label>
                        <Input
                            type='password'
                            placeholder='password'
                            name='password'
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <input type="radio"
                                    name='role'
                                    value='applicant'
                                    id='applicant'
                                    className='cursor-pointer'
                                />
                                <Label htmlFor="applicant">Applicant</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="radio"
                                    name='role'
                                    value='recruiter'
                                    id='recruiter'
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
                            />
                        </div>
                    </div>

                    <Button type='submit' className='w-full my-4'>Sign up</Button>
                    <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup