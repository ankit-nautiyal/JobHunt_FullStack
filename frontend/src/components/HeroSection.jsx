import { useState } from 'react';
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const handleJobSearch= ()=>{
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className='text-center'>
            <div className=' flex flex-col gap-5 my-10'>
                <span className=' mx-auto bg-gray-100 rounded-full px-4 py-2 font-medium text-[#F83002]'>No. #1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'> Dream Jobs!</span></h1>
                <p>JobHunt is India's No. #1 Job Portal for finding latest job & internship opprtunites in startups as well as product based firms!</p>

                <div className='flex items-center w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full gap-4 mx-auto my-5'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                        onChange={(e)=> setQuery(e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key === 'Enter') {
                                handleJobSearch();
                            }
                        }}
                    />
                    <Button onClick={handleJobSearch} className='rounded-r-full bg-[#6A38C2] cursor-pointer'>
                        <Search/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection