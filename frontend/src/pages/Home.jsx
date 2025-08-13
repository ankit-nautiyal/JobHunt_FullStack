import useGetAllJobs from '@/hooks/useGetAllJobs'
import CategoryCaruosel from '../components/CategoryCarousel'
import HeroSection from '../components/HeroSection'
import LatestJobs from '../components/LatestJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
    useGetAllJobs();
    const {user}= useSelector(store => store.auth);
    const navigate= useNavigate();

    useEffect(() => {
        if (user?.role === "recruiter") {
            navigate('/admin/companies')
        }
    }, [navigate, user?.role])  //just to avoid ESLint error o/w [] would also work
    
    return (
        <div>
            <HeroSection/>
            <CategoryCaruosel/>
            <LatestJobs/>
        </div>
    )
}

export default Home