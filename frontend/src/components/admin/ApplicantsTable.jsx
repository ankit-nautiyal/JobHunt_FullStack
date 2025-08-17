import { useSelector } from "react-redux"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { MoreHorizontal } from "lucide-react"


const ApplicantsTable = () => {
    const { allApplicants } = useSelector(store => store.application)

    return (
        <div>
            <Table>
                <TableCaption>List of the applicants for this job </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Application Received On</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicants && allApplicants?.applications?.map((application) => (
                            <tr key={application?._id}>
                                <TableCell>{application?.applicant?.fullName}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        application?.applicant?.profile?.resume ? (
                                            <a href={application?.applicant?.profile?.resume} className="text-blue-600 " target="_blank" rel="noreferrer" >{application?.applicant?.profile?.resumeOriginalName}</a> 
                                        ) : (
                                            <span>NA</span>
                                        )
                                    }
                                        
                                </TableCell>
                                <TableCell>
                                    {new Date(application?.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric", 
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "Asia/Kolkata",
                                    })}
                                </TableCell>
                                <TableCell className='text-right' >
                                    <Popover>
                                        <PopoverTrigger className='cursor-pointer'> <MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                [1,2].map((status, index)=>{
                                                    return(
                                                        <div key={index} className="flex w-fit items-center my-2 cursor-pointer">
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {/* <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <span>✅ Accept</span>
                                            </div>
                                            <div className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <span>❌ Reject</span>
                                            </div> */}
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

export default ApplicantsTable