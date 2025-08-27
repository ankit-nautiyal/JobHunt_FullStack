import Job from '@/components/Job';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const { allJobs } = useSelector(store => store.job);  //fetch the latest availabe jobs from the redux store

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    },[dispatch])

    return (
        <div>
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='text-xl my-10 font-bold'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        (allJobs || []).map((job) => {
                            return (
                                <motion.div
                                    key={job._id}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Job job={job} />
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse