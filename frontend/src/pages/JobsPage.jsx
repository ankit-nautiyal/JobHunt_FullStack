import FilterCard from "@/components/FilterCard"
import Job from "@/components/Job"
import { useSelector } from "react-redux";


const JobsPage = () => {
    const {allJobs} = useSelector(store=> store.job);  //fetch the latest availabel jobs from the redux store

    return (
        <div>
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-20%">
                        <FilterCard />
                    </div>
                    {
                        allJobs.length <= 0 ? <span>No jobs found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        allJobs.map((job) => (
                                            <div key={job._id}>
                                                <Job job={job}/>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default JobsPage;