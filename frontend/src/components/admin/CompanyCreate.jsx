import { setLoading, setSingleCompany } from "@/redux/companySlice"
import { registerCompanySchema } from "@/schema/companySchema"
import { COMPANY_API_ENDPOINT } from "@/utils/constants"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


const CompanyCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [companyName, setcompanyName] = useState("");
    const { loading } = useSelector(store => store.company);
    const [errors, setErrors] = useState({});

    const handleRegisterNewCompany = async (e) => {
        e.preventDefault();

        //for form-validation using zod
        const result = registerCompanySchema.safeParse({ companyName });
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors(fieldErrors);
            return;
        }

        setErrors({});  // to clear old validation messages

        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_ENDPOINT}`, { companyName }, {  //axios.post(url, data, config);
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true  //This tells Axios to send cookies(token) along with the request to the server/backend
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company?._id}`);  //we get id from the register company controller
            }
        } catch (error) {
            console.log(error || "Registration failed. Please try again.");
            toast.error(error?.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <form onSubmit={handleRegisterNewCompany}>
                <div className="my-10">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">What would you like to name your company? (you can change this later)</p>
                </div>

                <Label htmlFor='companyName'>Company Name</Label>
                <Input
                    id='companyName'
                    type='text'
                    className='my-2'
                    placeholder='Microsoft, Google, etc.'
                    onChange={(e) => setcompanyName(e.target.value)}
                    value={companyName}
                />

                {errors?.companyName?.map((err, i) => (
                    <span key={i} className="text-sm text-red-500 block">{err}</span>
                ))}

                <div className="flex items-center gap-2 my-10">
                    <Button type='button' onClick={() => navigate('/admin/companies')} className='cursor-pointer' variant='outline'>Cancel</Button>
                    {
                        loading ? <Button disabled className=" my-4 "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait... </Button> : <Button type="submit" className=" my-4 cursor-pointer">Continue</Button>
                    }
                </div>
            </form>

        </div>
    )
}

export default CompanyCreate