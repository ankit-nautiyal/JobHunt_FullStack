import { Button } from './ui/button'
import { Bookmark, Clock9, MapPin } from 'lucide-react'
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
        <div className='w-full p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 break-words'>
            <div className='flex items-center justify-between'>
                <p className='flex text-center items-center gap-1 text-xs text-gray-500'>
                    <Clock9 size={12}/>
                    <span>{formatDaysAgo(job?.createdAt)}</span>
                </p>
                <Button variant='outline' className='rounded-full cursor-pointer' size='icon'> <Bookmark /></Button>
            </div>

            <div className='flex items-center gap-3 my-3'>
                <div className='w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0'>
                    <img src={job?.company?.logo || "/company_placeholder_logo.svg"} alt='company_logo' className='w-full h-full object-cover rounded-full' />
                </div>
                <div className='min-w-0'>
                    <h1 className='font-medium py-0.5 mx-1'>{job?.company?.companyName}</h1>
                    <p className='flex text-center items-center text-sm text-gray-500 truncate'>
                        <MapPin size={18}/>
                        <span>{job?.location}</span>
                    </p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 break-normal truncate'>{job?.title}</h1>
                <p className='text-sm text-gray-600 break-words whitespace-normal max-w-full line-clamp-1'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-green-600 font-bold'} variant={'ghost'}>{job?.positions} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
                <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>
            </div>

            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4'>
                <Button onClick={() => navigate(`${job?._id}/description`)} variant='outline' className='w-full sm:w-auto cursor-pointer'>Details</Button>
                <Button className='w-full sm:w-auto bg-[#6A38C2]'>Save for later</Button>
            </div>
        </div>
    )
}

export default Job