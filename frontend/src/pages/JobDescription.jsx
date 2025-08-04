import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const JobDescription = () => {
    const dispatch= useDispatch();
    const {singleJob}= useSelector(store => store.job);
    const {user}= useSelector(store => store.auth);
    const isApplied = singleJob?.applications?.some(application => application.applicant === user._id) || false; 
    //redundant to write 'true' using ternary optr as some() fn always returns a boolean value
    // const isApplied = singleJob?.applications?.some(application => application.applicant === user._id) ? true : false;

    const params = useParams();  //to fetch params from URL
    const jobId = params.id;   //to fetch :id from params

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                //axios.get(url, config);
                const res = await axios.get(`${JOB_API_ENDPOINT}/${jobId}`, { withCredentials: true });
                console.log(res);
                
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
            }
        }
        fetchSingleJob();
    }, [dispatch, jobId, user?._id])

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-green-600 font-bold'} variant={'ghost'}>{singleJob?.vacancies} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'cursor-not-allowed' : 'bg-[#7e5db7] cursor-pointer hover:bg-[#9983bc]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Company Name: <span className='pl-4 font-normal text-gray-800'>{singleJob?.company?.companyName}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1'>Requirements: <span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements?.join(", ")}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} year(s)</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Date Posted: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split('T')[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription