import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CompanySetup = () => {
    const params = useParams();

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
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

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.patch(`${COMPANY_API_ENDPOINT}/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.companyName || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    }, [singleCompany])


    return (
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center gap-5 p-8'>
                    <Button onClick={() => navigate("/admin/companies")} className='flex items-center gap-2 text-gray-500 font-semibold cursor-pointer' variant='outline'>
                        <ArrowLeft />
                        <span>Back</span>
                    </Button>
                    <h1 className='font-bold text-xl'>Company Setup</h1>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <Label className="py-1.5" htmlFor='companyName'>Company Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="companyName"
                            value={input.name}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <Label className="py-1.5" htmlFor='desc'>Description</Label>
                        <Input
                            id='desc'
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={handleFormChange}
                        />
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
                    </div>
                    <div>
                        <Label className="py-1.5" htmlFor='location'>Location</Label>
                        <Input
                            type="text"
                            id="location"
                            name="location"
                            value={input.location}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <Label className="py-1.5" htmlFor='logo'>Logo</Label>
                        <Input
                            type="file"
                            id="logo"
                            accept="image/*"
                            onChange={handleFormFileChange}
                        />
                    </div>
                </div>
                {
                    loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait... </Button> : <Button type="submit" className="w-full my-4 cursor-pointer">Update</Button>
                }
            </form>
        </div>
    )
}

export default CompanySetup