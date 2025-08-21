import FilterCard from "@/components/FilterCard"
import Job from "@/components/Job"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const JobsPage = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);  //fetch the latest available jobs from the redux store
    const [localFilteredJobs, setLocalFilteredJobs] = useState(allJobs);
    const [filterValue, setFilterValue] = useState(""); // local filter controlled by FilterCard on Jobs page

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
        <div className='max-w-7xl mx-auto my-10 px-4'>
            {/* Responsive layout:
                - On small screens: single column, FilterCard appears above job list.
                - On md and up: two-column layout with 300px sidebar (FilterCard) and job grid on right.
            */}
            <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4'>
                <div>
                    {/* keep FilterCard visible on all screen sizes (not hidden) */}
                    <FilterCard useGlobal={false} onChange={setFilterValue} />
                </div>

                <div className='space-y-4'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            (localFilteredJobs || []).length <= 0
                                ? <span>No jobs found</span>
                                : localFilteredJobs.map((job) => (
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
            </div>
        </div>
    )
}

export default JobsPage;