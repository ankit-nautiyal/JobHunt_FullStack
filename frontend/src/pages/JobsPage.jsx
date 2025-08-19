import FilterCard from "@/components/FilterCard"
import Job from "@/components/Job"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setSearchedQuery } from "@/redux/jobSlice";


const JobsPage = () => {
    const {allJobs, searchedQuery} = useSelector(store=> store.job);  //fetch the latest available jobs from the redux store
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(()=>{
        if (searchedQuery) {
            const filteredJobs= allJobs.filter((job)=>{
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
                )
            })
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
        setSearchedQuery("");
    }, [searchedQuery, allJobs])

    return (
        <div>
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-20%">
                        <FilterCard  />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>No jobs found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div 
                                                key={job._id}
                                                initial= {{opacity: 0, x: 100}}
                                                animate= {{opacity: 1, x: 0}}
                                                exit= {{opacity: 0, x: -100}}
                                                transition= {{duration: 0.3}}
                                            >
                                                <Job job={job}/>
                                            </motion.div>
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