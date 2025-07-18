import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCaruosel from './CategoryCarousel'
import LatestJobs from './LatestJobs'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <CategoryCaruosel/>
            <LatestJobs/>
        </div>
    )
}

export default Home