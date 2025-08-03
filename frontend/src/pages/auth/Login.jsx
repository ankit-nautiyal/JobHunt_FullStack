import { setLoading, setUser } from '@/redux/authSlice'
import { loginSchema } from '@/schema/authSchema'
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


const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector(store=> store.auth);

    const handleFormChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //for form-validation using zod
        const result = loginSchema.safeParse(input);
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors(fieldErrors);
            return;
        }

        try {
            dispatch(setLoading(true));
            //axios.post(url, data, config);
            const res = await axios.post(`${USER_API_ENDPOINT}/auth/login`, input, {
                headers: {
                    "Content-Type": "application/json"   //Lets backend know we're sending json data
                },
                withCredentials: true  //config object: to include cookies (like token) from backend in the request
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Login failed. Please try again.");
        } finally{
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
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
                        />
                        {errors && errors.email && <span className='text-sm text-red-500'> {errors.email}</span>}
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
                        {errors && errors.password && <span className='text-sm text-red-500'> {errors.password}</span>}
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
                            {errors && errors.role && <span className='text-sm text-red-500 text-left block'> {errors.role}</span>}
                        </RadioGroup>
                    </div>

                    {
                        loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 w-4 h-4 animate-spin'/> Please wait...</Button> :  <Button type='submit' className='w-full my-4 cursor-pointer'>Login</Button>
                    }

                    <span className='text-sm'>Don't have an account? <Link to='/signup' className='text-blue-600 hover:underline'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
