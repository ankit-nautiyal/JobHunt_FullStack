import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { setLoading, setSingleCompany } from '@/redux/companySlice'
import { updateCompanySchema } from '@/schema/companySchema'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CompanySetup = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const [errors, setErrors] = useState({});
    const { singleCompany } = useSelector(store => store.company);
    const { loading } = useSelector(store => store.company);
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const handleFormFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //for form-validation using zod
        const result = updateCompanySchema.safeParse(input);
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors(fieldErrors);
            return;
        }

        setErrors({});  // to clear old validation messages

        const formData = new FormData();
        formData.append("companyName", input.companyName);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.patch(`${COMPANY_API_ENDPOINT}/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message ?? "Registration failed. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        setInput({
            companyName: singleCompany?.companyName ?? "",
            description: singleCompany?.description ?? "",
            website: singleCompany?.website ?? "",
            location: singleCompany?.location ?? "",
            file: null
        })
    }, [singleCompany])


    return (
        <div className='max-w-3xl mx-auto my-10'>
            <form onSubmit={handleSubmit}>
                <div className='flex my-12 items-center gap-[225px] max-[435px]:gap-[100px]'>
                    <Button type='button' onClick={() => navigate("/admin/companies")} className='flex items-center gap-2 text-gray-500 font-semibold cursor-pointer' variant='outline'>
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className='font-bold text-xl items-center'>Company Setup</h1>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label className="py-1.5" htmlFor='companyName'>Company Name</Label>
                        <Input
                            type="text"
                            name="companyName"
                            id="companyName"
                            value={input.companyName}
                            onChange={handleFormChange}
                        />

                        {errors?.companyName?.map((err, i) => (
                            <span key={i} className="text-sm text-red-500 block">{err}</span>
                        ))}
                    </div>

                    <div>
                        <Label className="py-1.5" htmlFor='site'>Website</Label>
                        <Input
                            id="site"
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={handleFormChange}
                        />
                        {errors?.website?.map((err, i) => (
                            <span key={i} className="text-sm text-red-500 block">{err}</span>
                        ))}

                    </div>
                    <div>
                        <Label className="py-1.5" htmlFor='location'>Registered Address </Label>
                        <Input
                            type="text"
                            id="location"
                            name="location"
                            value={input.location}
                            onChange={handleFormChange}
                        />
                        {errors && errors.location && <span className='text-sm text-red-500'> {errors.location}</span>}
                    </div>
                    <div>
                        <Label className="py-1.5" htmlFor='desc'>Description</Label>
                        <Textarea
                            id='desc'
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={handleFormChange}
                        />
                        {errors && errors.description && <span className='text-sm text-red-500'> {errors.description}</span>}
                    </div>
                    <div>
                        <Label className="py-1.5" htmlFor='logo'>Logo</Label>
                        <Input
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={handleFormFileChange}
                            className='cursor-pointer'
                        />
                        {errors && errors.file && <span className='text-sm text-red-500'> {errors.file}</span>}

                    </div>
                </div>
                {
                    loading ? <Button disabled className="w-full my-4 "> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait... </Button> : <Button type="submit" className="w-full my-4 cursor-pointer">Update</Button>
                }
            </form>
        </div>
    )
}

export default CompanySetup