import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge'
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/jobs/${job._id}/description`)}
            className='hover:scale-110 transition-transform ease-in-out duration-200 text-left p-5 rounded-md shadow-lg  bg-white border border-gray-100 cursor-pointer'
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
        >
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.companyName}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
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
        </motion.div>
    )
}

export default LatestJobCards