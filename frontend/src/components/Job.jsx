import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate= useNavigate();

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 '>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant='outline' className='rounded-full cursor-pointer' size='icon'> <Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className='p-6' variant='outline' size='icon'>
                    <Avatar>
                        <AvatarImage src="https://static.vecteezy.com/system/resources/previews/047/656/219/non_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg" />
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
                <Badge className={'text-green-600 font-bold'} variant={'ghost'}>{job?.vacancies} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
                <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=> navigate(`${job?._id}/description`)} variant='outline' className='cursor-pointer'>Details</Button>
                <Button className='bg-[#6A38C2] cursor-pointer'>Save for later</Button>
            </div>
        </div>
    )
}

export default Job