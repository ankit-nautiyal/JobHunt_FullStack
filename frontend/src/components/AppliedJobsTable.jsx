import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);


    return (
        <div>
            <Table>
                <TableCaption>List of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No.</TableHead>
                        <TableHead>Applied On</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <span>You haven't applied for any job yet.</span>
                        ) : (
                            allAppliedJobs.map((appliedJob, index) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {new Date(appliedJob.createdAt).toLocaleDateString("en-IN", {  //converting default MongoDB UTC to IST time
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            timeZone: "Asia/Kolkata",
                                        })}
                                    </TableCell>
                                    <TableCell>{appliedJob?.job?.title}</TableCell>
                                    <TableCell>{appliedJob?.job?.company?.companyName}</TableCell>
                                    <TableCell >
                                        <Badge className={`rounded-full ${appliedJob?.status === "Rejected" ? 'bg-red-600' : appliedJob?.status === 'Pending' ? 'bg-gray-600' : 'bg-green-600'}`} >
                                            {appliedJob?.status?.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobsTable