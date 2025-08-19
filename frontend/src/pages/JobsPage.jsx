import FilterCard from "@/components/FilterCard"
import Job from "@/components/Job"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const JobsPage = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);  //fetch the latest available jobs from the redux store
    const [localFilteredJobs, setLocalFilteredJobs] = useState(allJobs);
    const [filterValue, setFilterValue] = useState(""); // local filter controlled by FilterCard on Jobs page

    // useEffect(()=>{
    //     if (searchedQuery) {
    //         const filteredJobs= allJobs.filter((job)=>{
    //             return (
    //                 job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    //                 job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    //                 job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
    //             )
    //         })
    //         setFilterJobs(filteredJobs);
    //     } else {
    //         setFilterJobs(allJobs);
    //     }
    // }, [searchedQuery, allJobs])

    // useEffect(() => {
    //     // Filter jobs based on search query or radio selection
    //     const filtered = allJobs.filter((job) => {
    //         if (!searchedQuery) return true;
    //         return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    //             job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
    //             job.location.toLowerCase().includes(searchedQuery.toLowerCase());
    //     });
    //     setLocalFilteredJobs(filtered);
    // }, [searchedQuery, allJobs]);

    useEffect(() => {
        // prefer local JobsPage filter (filterValue). If empty, fallback to global searchedQuery (Hero/Browse searches).
        const keyword = (filterValue && filterValue.trim()) ? filterValue.trim() : (searchedQuery && searchedQuery.trim() ? searchedQuery.trim() : "");
        const filtered = allJobs.filter((job) => {
            if (!keyword) return true;
            const k = keyword.toLowerCase();
            return job.title.toLowerCase().includes(k) ||
                job.description.toLowerCase().includes(k) ||
                job.location.toLowerCase().includes(k);
        });
        setLocalFilteredJobs(filtered);
    }, [filterValue, searchedQuery, allJobs]);

    return (
        <div>
            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex gap-5">
                    <div className="w-20%">
                        <FilterCard useGlobal={false} onChange={setFilterValue}/>
                    </div>
                    {
                        localFilteredJobs.length <= 0 ? <span>No jobs found</span> : (
                            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        localFilteredJobs.map((job) => (
                                            <motion.div
                                                key={job._id}
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Job job={job} />
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