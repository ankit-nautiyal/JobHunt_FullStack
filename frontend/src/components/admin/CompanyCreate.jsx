import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import axios from "axios"
import { COMPANY_API_ENDPOINT } from "@/utils/constants"
import { useState } from "react"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"


const CompanyCreate = () => {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [companyName, setcompanyName] = useState();

    const registerNewCompany= async () => {
        try {
            //axios.post(url, data, config);
            const res= await axios.post(`${COMPANY_API_ENDPOINT}`, {companyName}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true  //This tells Axios to send cookies(token) along with the request to the server/backend
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId= res?.data?.company?._id;  //we get id from the register company controller
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error || "Registration failed. Please try again." );
            
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
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
                onChange={(e)=> setcompanyName(e.target.value)}
            />

            <div className="flex items-center gap-2 my-10">
                <Button onClick={()=> navigate('/admin/companies')} className='cursor-pointer' variant='outline'>Cancel</Button>
                <Button onClick={registerNewCompany} className='cursor-pointer'>Continue</Button>
            </div>
        </div>
    )
}

export default CompanyCreate