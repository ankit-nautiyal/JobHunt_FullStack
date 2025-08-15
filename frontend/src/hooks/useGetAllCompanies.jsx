import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetAllCompanies = () => { 
    const dispatch= useDispatch();

    useEffect(()=>{
        const fetchAllCompanies= async ()=>{
            try {
                const res= await axios.get(`${COMPANY_API_ENDPOINT}`, {withCredentials: true} );  //axios.get(url, config);
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log('Error fetching companies:', error);
            }
        }
        fetchAllCompanies();
    }, [dispatch])  //*just to align with  to align with common ESLint practice, o/w [] would also work the same
}

export default useGetAllCompanies

//*React's useEffect() depends on any variables it uses from outside its scope. If a variable changes, the effect should re-run.
//But dispatch is guaranteed stable by react-redux. It doesn't change between renders, so putting it in the dependency array isn't strictly necessary.