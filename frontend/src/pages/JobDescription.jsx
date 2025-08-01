import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react'


const JobDescription = () => {
    const hasApplied = true;

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Fullstack Developer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-green-600 font-bold'} variant={'ghost'}>12 Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>Part Time</Badge>
                        <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>24 LPA</Badge>
                    </div>
                </div>
                <Button
                    disabled={hasApplied}
                    className={`rounded-lg ${hasApplied ? 'cursor-not-allowed' : 'bg-[#7e5db7] cursor-pointer hover:bg-[#9983bc]'}`}
                >
                    {hasApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Fullstack Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Gurugram</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aperiam autem cumque</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 years</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12 Lpa</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Date Posted: <span className='pl-4 font-normal text-gray-800'>02-08-2025</span></h1>
            </div>
        </div>
    )
}

export default JobDescription