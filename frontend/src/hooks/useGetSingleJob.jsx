import { setSingleJob } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleJob = ({jobId}) => {
    const dispatch= useDispatch();

    useEffect(()=>{
        const fetchSingleJob= async ()=>{
            try {
                //axios.get(url, config);
                const res= await axios.get(`${JOB_API_ENDPOINT}/${jobId}`, {withCredentials: true} );
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.jobs)); 
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
            }
        }
        fetchSingleJob();
    },[dispatch, jobId])  //*just to align with  to align with common ESLint practice, o/w [jobId] would also work the same
}

export default useGetSingleJob;

//*React's useEffect() depends on any variables it uses from outside its scope. If a variable changes, the effect should re-run.
//But dispatch is guaranteed stable by react-redux. It doesn't change between renders, so putting it in the dependency array isn't strictly necessary.