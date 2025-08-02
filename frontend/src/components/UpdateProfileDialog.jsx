import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_ENDPOINT } from "@/utils/constants"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=> store.auth);
    const dispatch= useDispatch();

    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill=> skill),
        resume: user?.profile?.resume
    })


    //to input fields except resume
    const handleInputChange= (e) =>{
        setInput({...input, [e.target.name]: e.target.value})
    }

    //to input resume
    const handleFileChange= (e) =>{
        const file= e.target.files?.[0];
        setInput({...input, file})
    }

    //for form submit
    const handleSubmit= async (e) =>{
        e.preventDefault();
        const formData= new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res= await axios.patch(`${USER_API_ENDPOINT}/profile`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.datta.message);           
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle className='text-center'>Update Profile </DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='name' className='text-right'>Name</Label>
                                <Input
                                    type='text'
                                    id='name'
                                    name='name'
                                    value={input.fullName}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={input.email}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='number' className='text-right'>Contact No.</Label>
                                <Input
                                    type='tel'
                                    max='10'
                                    id='number'
                                    name='number'
                                    value={input.phoneNumber}
                                    onChange={handleInputChange}
                                    className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Input
                                    type='text'
                                    id='bio' name='bio'
                                    value={input.bio}
                                    onChange={handleInputChange}
                                    className='col-span-3' />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Input
                                    type='text'
                                    id='skills'
                                    name='skills'
                                    value={input.skills}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='resume' className='text-right'>Resume</Label>
                                <Input
                                    id='resume'
                                    name='resume'
                                    type='file'
                                    accept='application/pdf'
                                    onChange={handleFileChange}
                                    className='col-span-3'
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait...</Button> : <Button type='submit' className='w-full my-4 cursor-pointer'>Save</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog