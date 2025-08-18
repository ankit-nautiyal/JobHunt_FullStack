import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"


const useGetAppliedJobs = () => {
    const dispatch= useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs= async () =>{
            try {
                const res= await axios.get(`${APPLICATION_API_ENDPOINT}`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [dispatch]);  // only [] would also work dispatch is guaranteed stable by react-redux. It doesn't change between renders, so putting it in the dependency array isn't strictly necessary.
}

export default useGetAppliedJobs