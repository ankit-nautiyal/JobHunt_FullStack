import CompaniesTable from '@/components/admin/CompaniesTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className='w-40'
                    placeholder='Filter by company'
                    onChange={(e)=> setInput(e.target.value)}
                />
                <Button onClick={()=> navigate("/admin/companies/create")} className='cursor-pointer'>New Company</Button>
            </div>
            <CompaniesTable />
        </div>
    )
}

export default Companies