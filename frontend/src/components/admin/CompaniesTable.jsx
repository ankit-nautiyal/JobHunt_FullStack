import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {
    const { companies } = useSelector(store => store.company);

    const navigate= useNavigate();
    return (
        <div>
            <Table>
                <TableCaption>List of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        companies.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo  || "https://res.cloudinary.com/dpvytzmey/image/upload/v1755284626/jobhunt_project/qcp4ceo7azju6wbcbfu8.avif" || "/company_placeholder_logo.svg" } alt="Company Logo" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-right' >
                                    <Popover>
                                        <PopoverTrigger className='cursor-pointer'> <MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
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

export default CompaniesTable