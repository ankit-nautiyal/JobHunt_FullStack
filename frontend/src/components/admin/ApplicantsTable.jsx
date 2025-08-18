import { useDispatch, useSelector } from "react-redux"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { MoreHorizontal } from "lucide-react"
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";
import { setAllApplicants } from "@/redux/applicationSlice";


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { allApplicants } = useSelector(store => store.application);
    const dispatch= useDispatch();

    const handleStatus = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.patch(`${APPLICATION_API_ENDPOINT}/${id}/status`, { status });
            if (res.data.success) {
                // update Redux so UI reflects change immediately
                const updatedApplication = res.data.application;
                if (updatedApplication) {
                    // allApplicants in the store is the job object containing .applications
                    const updatedJob = {
                        ...allApplicants,
                        applications: (allApplicants?.applications || []).map(application =>
                            application._id === updatedApplication._id ? updatedApplication : application
                        )
                    };
                    dispatch(setAllApplicants(updatedJob));
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    const getStatusWithEmoji = (status) => {
        if (status === "Accepted") return `✅ ${status}`;
        if (status === "Rejected") return `❌ ${status}`;
        if (status === "Pending") return `⌛ ${status}`;
        return status;
    };


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
                        <TableHead>Received On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicants && allApplicants?.applications?.map((application) => (  // 'allApplicants' is basically the job object in actual
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
                                <TableCell> {getStatusWithEmoji(application?.status)}</TableCell>
                                <TableCell className='text-right' >
                                    <Popover>
                                        <PopoverTrigger className='cursor-pointer'> <MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortlistingStatus.map((rawStatus, index) => {
                                                    return (
                                                        <div onClick={() => handleStatus(rawStatus, application?._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                                                             <span> {getStatusWithEmoji(rawStatus)}</span>  {/* Only UI gets emoji, it's not being passed in the DB using handleStatus fn  */}
                                                        </div>
                                                    )
                                                })
                                            }
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