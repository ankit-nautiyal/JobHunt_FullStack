import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Job = () => {
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
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo enim sapiente rem soluta expedita error quia iure culpa iusto fuga?</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-green-600 font-bold'} variant={'ghost'}>12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>Part Time</Badge>
                <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>24 LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button variant='outline' className='cursor-pointer'>Details</Button>
                <Button className='bg-[#6A38C2] cursor-pointer'>Save for later</Button>
            </div>
        </div>
    )
}

export default Job