import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCaruosel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'

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