import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';


const JobDescription = () => {
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    //redundant to write 'true' using ternary optr as given below, as some() fn always returns a boolean value
    // const isApplied = singleJob?.applications?.some(application => application.applicant === user._id) ? true : false;

    const params = useParams();  //to fetch params from URL
    const jobId = params.id;   //to fetch :id from params

    const handleApplyJob = async () => {
        try {
            //axios.post(url, data/payload, config);
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/${jobId}`, {}, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);  //Updates the local state for UI update
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));  //for real time UI update (updates total applciants)
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                //axios.get(url, config);
                const res = await axios.get(`${JOB_API_ENDPOINT}/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) //Ensure the state is in sync with fetched data
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
                        <Badge className={'text-green-600 font-bold'} variant={'ghost'}>{singleJob?.positions} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant={'ghost'}>{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#6A38C2]  font-bold'} variant={'ghost'}>{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={handleApplyJob}
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