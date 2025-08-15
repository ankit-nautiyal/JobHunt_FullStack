import AdminJobsTable from '@/components/admin/AdminJobsTable';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobsByText } from '@/redux/jobSlice.js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(setSearchJobsByText(input));
    }, [input, dispatch]); 

    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className='w-55'
                    placeholder='Filter by company name, role'
                    onChange={(e)=> setInput(e.target.value)}
                />
                <Button onClick={()=> navigate("/admin/jobs/create")} className='cursor-pointer'>New Job</Button>
            </div>
            <AdminJobsTable />
        </div>
    )
}

export default AdminJobs