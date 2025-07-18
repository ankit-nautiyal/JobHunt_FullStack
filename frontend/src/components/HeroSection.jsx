
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
    return (
        <div className='text-center'>
            <div className=' flex flex-col gap-5 my-10'>
                <span className=' mx-auto bg-gray-100 rounded-full px-4 py-2 font-medium text-[#F83002]'>No. #1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'> Dream Jobs!</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem laboriosam itaque porro fugiat non.</p>

                <div className='flex items-center w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full gap-4 mx-auto my-5'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                    />
                    <Button className='rounded-r-full bg-[#6A38C2] cursor-pointer'>
                        <Search />
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection