import useGetAllJobs from '@/hooks/useGetAllJobs'
import CategoryCaruosel from '../components/CategoryCarousel'
import HeroSection from '../components/HeroSection'
import LatestJobs from '../components/LatestJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setSearchedQuery } from '@/redux/jobSlice'

const Home = () => {
    useGetAllJobs();
    const {user}= useSelector(store => store.auth);
    const navigate= useNavigate();
    const dispatch= useDispatch();

    useEffect(() => {
        if (user?.role === "recruiter") {
            navigate('/admin/companies')
        }
        dispatch(setSearchedQuery(""));
    }, [dispatch, navigate, user?.role]) 
    
    return (
        <div>
            <HeroSection/>
            <CategoryCaruosel/>
            <LatestJobs/>
        </div>
    )
}

export default Home