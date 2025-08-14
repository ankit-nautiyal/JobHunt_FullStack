import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetCompanyById = (companyId) => { //companyId is just a parameter to the hook, this hook doesn't create it, it's provided by whoever calls the hook
    const dispatch= useDispatch();

    useEffect(()=>{
        const fetchSingleCompany= async ()=>{
            try {
                const res= await axios.get(`${COMPANY_API_ENDPOINT}/${companyId}`, {withCredentials: true} );  //axios.get(url, config);
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log('Error fetching company:', error);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])  //*just to align with  to align with common ESLint practice, o/w [] would also work the same
}

export default useGetCompanyById

//*React's useEffect() depends on any variables it uses from outside its scope. If a variable changes, the effect should re-run.
//But dispatch is guaranteed stable by react-redux. It doesn't change between renders, so putting it in the dependency array isn't strictly necessary.