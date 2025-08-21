import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge'
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/jobs/${job._id}/description`)}
            className="w-full hover:scale-[1.03] transition-transform ease-in-out duration-200 cursor-pointer text-left p-4 sm:p-5 rounded-md shadow-lg bg-white border border-gray-100 break-words"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
        >
            <div className="min-w-0">
                <h1 className='font-medium text-lg ml-1 truncate'>{job?.company?.companyName}</h1>
                <p className='flex text-center items-center text-sm text-gray-500 truncate'>
                    <MapPin size={18} className='ml-0 pl-0' />
                    <span>{job?.location}</span>
                </p>
            </div>

            <div className="mt-2">
                <h1 className='font-bold text-lg my-2 break-normal ml-1 truncate'>{job?.title}</h1>
                <p className='text-sm ml-1 text-gray-600 break-words whitespace-normal max-w-full line-clamp-3'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-green-600 font-bold'} variant={'ghost'}>{job?.positions} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
                <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>
            </div>
        </motion.div>
    )
}

export default LatestJobCards