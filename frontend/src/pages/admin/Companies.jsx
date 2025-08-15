import CompaniesTable from '@/components/admin/CompaniesTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useNavigate } from 'react-router-dom';

const Companies = () => {
    useGetAllCompanies();

    const navigate = useNavigate();
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className='w-fit'
                    placeholder='Filter by name'
                />
                <Button onClick={()=> navigate("/admin/companies/create")} className='cursor-pointer'>New Company</Button>
            </div>
            <CompaniesTable />
        </div>
    )
}

export default Companies