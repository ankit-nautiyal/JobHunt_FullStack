import CategoryCaruosel from '../components/CategoryCarousel'
import HeroSection from '../components/HeroSection'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/shared/Footer'
import Navbar from '../components/shared/Navbar'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <CategoryCaruosel/>
            <LatestJobs/>
            <Footer/>
        </div>
    )
}

export default Home