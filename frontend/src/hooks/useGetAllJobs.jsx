import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch= useDispatch();

    useEffect(()=>{
        const fetchAllJobs= async ()=>{
            try {
                //axios.get(url, config);
                const res= await axios.get(`${JOB_API_ENDPOINT}`, {withCredentials: true} );
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs)) //received from the backend (job.controller.js)
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
            }
        }
        fetchAllJobs();
    },[dispatch])  //*just to align with  to align with common ESLint practice, o/w [] would also work the same
}

export default useGetAllJobs

//*React's useEffect() depends on any variables it uses from outside its scope. If a variable changes, the effect should re-run.
//But dispatch is guaranteed stable by react-redux. It doesn't change between renders, so putting it in the dependency array isn't strictly necessary.