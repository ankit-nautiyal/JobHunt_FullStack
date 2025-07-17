import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCaruosel from './CategoryCaruosel'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <CategoryCaruosel/>
        </div>
    )
}

export default Home