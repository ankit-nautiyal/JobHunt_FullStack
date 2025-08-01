import AppliedJobsTable from '@/components/AppliedJobsTable'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Contact, Mail, Pen } from 'lucide-react'
import React from 'react'

const skills = ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js'];
const haveResume = true;

const Profile = () => {
    return (
        <div>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src="https://static.vecteezy.com/system/resources/previews/047/656/219/non_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg" />
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam atque voluptas pariatur mollitia!</p>
                        </div>
                    </div>
                    <Button className="text-right cursor-pointer" variant="outline"> <Pen /> </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>ankit@gmail.com</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>9015208899</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='text-md font-bold'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length !== 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>No skills found</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        haveResume ?
                            <a className='text-blue-700 hover:underline w-full cursor-pointer text-sm' target='_blank' href="https://drive.google.com/file/d/1LyRzSNkvwX9btQjL9rw3Cwuv-Vid8X6g/view?usp=sharing">
                                Ankit Nautiyal
                            </a> :
                            <span>
                                No resume found
                            </span>
                    }
                </div>
            </div>
            <div className='d max-w-4xl mx-auto my-20 bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobsTable />
            </div>
        </div>
    )
}

export default Profile