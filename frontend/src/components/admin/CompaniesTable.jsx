import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'


const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>List of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2].map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src="https://static.vecteezy.com/system/resources/previews/047/656/219/non_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell>14-08-2025</TableCell>
                                <TableCell className='text-right' > 
                                    <Popover>
                                        <PopoverTrigger className='cursor-pointer'> <MoreHorizontal/></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4'/>
                                                <span>Edit</span>
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

export default CompaniesTable