import { setLoading } from '@/redux/authSlice'
import { signupSchema } from '@/schema/authSchema'
import { USER_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { RadioGroup } from '../../components/ui/radio-group'

const Signup = () => {

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        file: null
    })
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    //for handling form input data
    const handleFormChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    
    //for handling profile pic 
    const handleFormFileChange = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //for form-validation using zod
        const result = signupSchema.safeParse(input);
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors(fieldErrors);
            return;
        }

        setErrors({});  // to clear old validation messages

        const formData = new FormData();  //built-in special object provided by the browser, automatically builds your form submission with: key-value pairs and file blobs
        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            //axios.post(url, data, config);
            const res = await axios.post(`${USER_API_ENDPOINT}/auth/register`, formData, 
                {    //config object:
                    headers: {
                        "Content-Type": "multipart/form-data"   //Lets the backend know we're sending some file data (like png, jpeg, etc)
                    },
                    withCredentials: true  //to include cookies (like token) from backend in the request
                }
            );

            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Signup failed. Please try again.");
        } finally{
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-4'>
                        <Label className='my-1'> Full Name</Label>
                        <Input
                            type='text'
                            placeholder='John Doe'
                            name='fullName'
                            value={input.fullName}
                            onChange={handleFormChange}
                        />

                        {errors?.fullName?.map((err, i) => (
                            <span key={i} className="text-sm text-red-500 block">{err}</span>
                        ))}
                    </div>
                    <div className='my-4'>
                        <Label className='my-1'>Email</Label>
                        <Input
                            type='email'
                            placeholder='john@gmail.com'
                            name='email'
                            value={input.email}
                            onChange={handleFormChange}
                        />
                        {errors && errors.email && <span className='text-sm text-red-500'> {errors.email}</span>}
                    </div>
                    <div className='my-4'>
                        <Label className='my-1'> Phone No.</Label>
                        <Input
                            type='tel'
                            placeholder='8800880088'
                            name='phoneNumber'
                            value={input.phoneNumber}
                            onChange={handleFormChange}

                        />
                        {errors && errors.phoneNumber && <span className='text-sm text-red-500'> {errors.phoneNumber}</span>}
                    </div>
                    <div className='my-4'>
                        <Label className='my-1'> Password</Label>
                        <Input
                            type='password'
                            placeholder='password'
                            name='password'
                            value={input.password}
                            onChange={handleFormChange}
                        />
                        {errors?.password?.map((err, i) => (
                            <span key={i} className="text-sm text-red-500 block">{err}</span>
                        ))}
                    </div>
                    <div className='my-4'>
                        <Label className='my-1'>Confirm Password</Label>
                        <Input
                            type='password'
                            placeholder='Confirm password'
                            name='confirmPassword'
                            value={input.confirmPassword}
                            onChange={handleFormChange}
                        />
                        {errors && errors.confirmPassword && <span className='text-sm text-red-500'> {errors.confirmPassword}</span>}
                    </div>

                    <div className='flex items-center justify-between gap-10'>
                        <RadioGroup className='flex items-center gap-4 my-5' required>
                            <div className="flex items-center space-x-2">
                                <input type="radio"
                                    name='role'
                                    id='applicant'
                                    className='cursor-pointer'
                                    value='applicant'
                                    onChange={handleFormChange}
                                    checked={input.role === 'applicant'}
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
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>

                        </RadioGroup>



                        <div className='flex items-center gap-2'>
                            <Label>Profile Photo </Label>
                            <Input
                                accept='image/*'
                                type='file'
                                name='file'
                                className='cursor-pointer'
                                onChange={handleFormFileChange}
                            />
                            {errors && errors.file && <span className='text-sm text-red-500'> {errors.file}</span>}
                        </div>


                    </div>
                    {errors && errors.role && <span className='text-sm text-red-500 text-left block'> {errors.role}</span>}

                    {
                        loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait...</Button> : <Button type='submit' className='w-full my-4 cursor-pointer'>Sign up</Button>
                    }

                    <span className='text-sm cursor-pointer'>Already have an account? <Link to='/login' className='text-blue-600 hover:underline'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup