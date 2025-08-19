import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { RefreshCw } from 'lucide-react';

const filterData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Gurugram", "Noida", "Bengaluru", "Hyderabad"]
    },
    {
        fitlerType: "Role",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "SDE-1", "SDE - Intern"]
    },
    // {
    //     fitlerType: "Salary",
    //     array: ["0-3 LPA", " 3-6 LPA", "6-12 LPA", "12 LPA+"]
    // },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const handleChange=(value)=>{
        setSelectedValue(value);
    }

    const handleResetFilter = () => {
        setSelectedValue("");
        dispatch(setSearchedQuery(""));   // clear global search used by JobsPage
    }

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[dispatch, selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='flex font-bold text-lg gap-2 items-center'>
                <span>Filter Jobs</span>
                <span onClick={handleResetFilter} className='cursor-pointer w-5 h-5'> <RefreshCw/></span>    
            </h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`; 
                                    return (
                                        <div className='flex space-x-2 my-2 items-center'>
                                            <RadioGroupItem className={'cursor-pointer'} value={item} id={itemId} />
                                            <Label className={'cursor-pointer'} htmlFor={itemId}> {item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard