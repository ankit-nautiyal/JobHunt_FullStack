import AppliedJobsTable from '@/components/AppliedJobsTable'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import UpdateProfileDialog from '@/components/UpdateProfileDialog'
import { Contact, Mail, Pen } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const haveResume = true;

const Profile = () => {
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=> store.auth);

    return (
        <div>
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto?.trim() || "dummyProfilePic.jpg"}/>
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=> setOpen(true)} className="text-right cursor-pointer" variant="outline"> <Pen /> </Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='text-md font-bold'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>No skills found</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        haveResume ?
                            <a href={user?.profile?.resume} rel="noopener noreferrer" className='text-blue-700 hover:underline w-full cursor-pointer text-sm' target='_blank' >
                                {user?.profile?.resumeOriginalName}
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
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile;