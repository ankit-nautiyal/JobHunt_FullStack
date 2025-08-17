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
    useGetCompanyById(allApplicants?.company);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllApplicants(res?.data?.job));
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [dispatch, params.id])

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-xl my-5">{allApplicants?.applications.length} Applicant(s) for {singleCompany?.companyName} </h1>
            <ApplicantsTable />
        </div>
    )
}

export default Applicants