import useGetAllJobs from '@/hooks/useGetAllJobs'
import CategoryCaruosel from '../components/CategoryCarousel'
import HeroSection from '../components/HeroSection'
import LatestJobs from '../components/LatestJobs'

const Home = () => {
    useGetAllJobs();
    return (
        <div>
            <HeroSection/>
            <CategoryCaruosel/>
            <LatestJobs/>
        </div>
    )
}

export default Home