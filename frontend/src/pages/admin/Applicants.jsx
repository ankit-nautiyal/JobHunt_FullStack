import ApplicantsTable from "@/components/admin/ApplicantsTable"
import useGetCompanyById from "@/hooks/useGetCompanyById"
import { setAllApplicants } from "@/redux/applicationSlice"
import { APPLICATION_API_ENDPOINT } from "@/utils/constants"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { allApplicants } = useSelector(store => store.application);
    const { singleCompany } = useSelector(store => store.company);
    useGetCompanyById(allApplicants?.company);  //to display company name on applicants page for admin/recruiter

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, params.id])

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-xl my-5"> <span className="text-blue-700"> {allApplicants?.applications?.length} Applicants</span> for {singleCompany?.companyName} {allApplicants?.title}</h1>
            <ApplicantsTable />
        </div>
    )
}

export default Applicants