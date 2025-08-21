import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { RefreshCw } from 'lucide-react';

const filterData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Gurugram", "Noida", "Bengaluru", "Hyderabad", "Remote"]
    },
    {
        fitlerType: "Role",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "SDE-1", "Intern"]
    },
    // {
    //     fitlerType: "Salary",
    //     array: ["0-3 LPA", " 3-6 LPA", "6-12 LPA", "12 LPA+"]
    // },
]

const FilterCard = ({ useGlobal = true, onChange }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        if (useGlobal) {
            dispatch(setSearchedQuery(selectedValue));
        } else if (typeof onChange === "function") {
            onChange(selectedValue);
        }
    }, [dispatch, selectedValue, useGlobal, onChange]);

    const handleChange = (value) => {
        setSelectedValue(value);
    }

    const handleResetFilter = () => {
        setSelectedValue("");
    }

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='flex font-bold text-lg gap-2 items-center'>
                <span>Filter Jobs</span>
                <span onClick={handleResetFilter} className='cursor-pointer w-5 h-5'> <RefreshCw className='hover:opacity-70' /></span>
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

export default FilterCard;