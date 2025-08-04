import { Badge } from './ui/badge'

const LatestJobCards = ({job}) => {
    return (
        <div className='hover:scale-110 transition-transform ease-in-out duration-200 text-left p-5 rounded-md shadow-lg  bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.companyName}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-green-600 font-bold'} variant={'ghost'}>{job?.vacancies} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
                <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards