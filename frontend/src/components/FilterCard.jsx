import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Gurugram", "Noida", "Bangaluru", "Hyderabad", "Other"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "Software Developer", "Others"]
    },
    {
        fitlerType: "Salary",
        array: ["0-3 LPA", " 3-6 LPA", "6-12 LPA", "12 LPA+"]
    },
]

const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div className='flex space-x-2 my-2 items-center'>
                                            <RadioGroupItem className={'cursor-pointer'} value={item} id={item} />
                                            <Label  className={'cursor-pointer'} htmlFor={item}> {item}</Label>
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