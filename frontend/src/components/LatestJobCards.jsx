import { Badge } from './ui/badge'

const LatestJobCards = () => {
    return (
        <div className='hover:scale-110 transition-transform ease-in-out duration-200 text-left p-5 rounded-md shadow-lg  bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eum.</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-green-600 font-bold'} variant={'ghost'}>12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>Part Time</Badge>
                <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>24 LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards