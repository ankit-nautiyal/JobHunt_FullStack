import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch= useDispatch();

    useEffect(()=>{
        const fetchAllAdminJobs= async ()=>{
            try {
                const res= await axios.get(`${JOB_API_ENDPOINT}/admin/jobs`, {withCredentials: true} );  //axios.get(url, config);
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log('Error fetching jobs:', error);
            }
        }
        fetchAllAdminJobs();
    },[dispatch])  //*just to align with  to align with common ESLint practice, o/w [] would also work the same
}

export default useGetAllAdminJobs

//*React's useEffect() depends on any variables it uses from outside its scope. If a variable changes, the effect should re-run.
//But dispatch is guaranteed stable by react-redux. It doesn't change between renders, so putting it in the dependency array isn't strictly necessary.