import Job from '@/components/Job';
import { useSelector } from 'react-redux';


const Browse = () => {
    const { allJobs } = useSelector(store => store.job);  //fetch the latest availabel jobs from the redux store

    return (
        <div>
            <div className=' max-w-7xl mx-auto my-10'>
                <h1 className='font-bol text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse