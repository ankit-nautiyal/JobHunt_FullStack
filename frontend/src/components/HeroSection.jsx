import { useState } from 'react';
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleJobSearch = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <span className="inline-block bg-gray-100 rounded-full px-4 py-1 font-medium text-sm text-[#F83002]">No. #1 Job Hunt Website</span>

                <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    Search, Apply &amp; <br className="sm:hidden" /> Get Your <span className="text-[#6A38C2]">Dream Jobs!</span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                    <span className='font-bold'>Job</span><span className='text-[#F83002] font-bold'>Hunt</span> is India's <span className='text-[#6A38C2] font-bold'>No. #1 Job Portal</span> for finding latest job & internship opprtunites in startups as well as product based firms!
                </p>

                <div className="mt-6 flex items-center justify-center">
                    <div className="flex items-center w-full sm:w-[80%] md:w-[60%] lg:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full gap-4 mx-auto my-5">
                        <input
                            type="text"
                            placeholder="Find your dream jobs"
                            className="outline-none border-none w-full"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleJobSearch();
                            }}
                        />
                        <Button onClick={handleJobSearch} className="rounded-r-full bg-[#6A38C2] cursor-pointer">
                            <Search />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection