import Job from '@/components/Job';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Browse = () => {
    useGetAllJobs();
    const dispatch= useDispatch();
    const { allJobs } = useSelector(store => store.job);  //fetch the latest availabel jobs from the redux store
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    })

    return (
        <div>
            <div className=' max-w-7xl mx-auto my-10'>
                <h1 className='font-bol text-xl my-10 font-bold'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse