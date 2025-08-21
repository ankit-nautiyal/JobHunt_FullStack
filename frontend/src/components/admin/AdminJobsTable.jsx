import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


const AdminJobsTable = () => {
    const { allAdminJobs, searchJobsByText } = useSelector(store => store.job)
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobsByText) {
                return true;  //return existing all companies if no fiter search text
            }
            return job?.company?.companyName?.toLowerCase().includes(searchJobsByText?.trim().toLowerCase()) || job?.title?.toLowerCase().includes(searchJobsByText?.trim().toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobsByText])


    const navigate = useNavigate();
    return (
        <div>
            <Table>
                <TableCaption>List of your posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No.</TableHead>
                        {/* <TableHead className='text-white'>----</TableHead> */}
                        <TableHead>Company</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Posted On</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job, index) => (
                            <TableRow key={job?._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                                    <img
                                        src={job?.company?.logo}
                                        className="w-6 h-6 rounded-full object-cover"
                                        alt="logo"
                                    />
                                    <span className='font-medium text-sm'>{job?.company?.companyName}</span>
                                </TableCell>
                                {/* <TableCell>{job?.company?.companyName}</TableCell> */}
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>
                                    {new Date(job?.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        timeZone: "Asia/Kolkata",
                                    })}
                                </TableCell>
                                <TableCell className='text-right' >
                                    <Popover>
                                        <PopoverTrigger className='cursor-pointer'> <MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {/* <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div> */}
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable