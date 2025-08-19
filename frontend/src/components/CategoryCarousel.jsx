import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Android Developer",
    "Graphic Designer",
    "SDE-1",
    "SDE - Intern"
]

const CategoryCarousel = () => {
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const handleJobSearch = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-10'>
                <CarouselContent >
                    {
                        categories.map((category) => (
                            <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                                <Button onClick={()=> handleJobSearch(category)} variant='outline' className='rounded-full cursor-pointer'>{category}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className='cursor-pointer' />
                <CarouselNext className='cursor-pointer' />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel