import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    //calculate how many days ago the job was created/posted
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);  //time at which job was created
        const currentTime = new Date();  //curent time
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (24 * 60 * 60 * 1000))  //for days: (24 hrs * 60min * 60s * 1000ms)
    }
    const formatDaysAgo = (date) => {
        const days = daysAgoFunction(date);
        if (days === 0) return "Today";
        return `${days} day${days === 1 ? "" : "s"} ago`; // "day" if 1 day ago o/w "days"
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 '>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'> {formatDaysAgo(job?.createdAt)}</p>
                <Button variant='outline' className='rounded-full cursor-pointer' size='icon'> <Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || "company_placeholder_logo.svg"}  alt='company_logo' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.companyName}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-green-600 font-bold'} variant={'ghost'}>{job?.positions} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
                <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`${job?._id}/description`)} variant='outline' className='cursor-pointer'>Details</Button>
                <Button className='bg-[#6A38C2] cursor-pointer'>Save for later</Button>
            </div>
        </div>
    )
}

export default Job