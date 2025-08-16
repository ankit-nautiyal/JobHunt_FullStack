import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


const AdminJobsTable = () => {
    const {allAdminJobs, searchJobsByText}= useSelector(store=> store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs= allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
            if (!searchJobsByText) {
                return true;  //return existing all companies if no fiter search text
            }
            return job?.company?.companyName?.toLowerCase().includes(searchJobsByText?.trim().toLowerCase()) || job?.title?.toLowerCase().includes(searchJobsByText?.trim().toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobsByText])
    

    const navigate= useNavigate();
    return (
        <div>
            <Table>
                <TableCaption>List of your posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Posted On</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr key={job?._id}>
                                <TableCell>{job?.company?.companyName}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt?.split('T')[0]}</TableCell>
                                <TableCell className='text-right' >
                                    <Popover>
                                        <PopoverTrigger className='cursor-pointer'> <MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div onClick={()=> navigate()} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable