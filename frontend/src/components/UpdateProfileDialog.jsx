import { useEffect, useState } from "react"
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
import { updateProfileSchema } from "@/schema/updateProfileSchema"
import { Textarea } from "./ui/textarea"

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const getInitialInput = (user) => ({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: Array.isArray(user?.profile?.skills)
            ? user.profile.skills.join(", ")
            : user?.profile?.skills || "",
        resume: user?.profile?.resume || "",
    });

    const [input, setInput] = useState(getInitialInput(user));

    useEffect(() => {
        if (open) {
            setInput(getInitialInput(user));
            setErrors({});
        }
    }, [open, user]);

    //to input fields except resume
    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    //to input resume
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    //for form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure skills is a string for Zod validation
        const inputForValidation = {
            ...input,
            skills: Array.isArray(input.skills) ? input.skills.join(", ") : input.skills
        };


        //for form-validation using zod
        const result = updateProfileSchema.safeParse(inputForValidation);
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            setErrors(fieldErrors);
            return;
        }

        // When sending to backend, send as string (as the backend splits it to send to MongoDB finally as an array of strings)
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", inputForValidation.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            //axios.post(url, payload, config);
            const res = await axios.patch(`${USER_API_ENDPOINT}/profile`, formData, {
                headers: {
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
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
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
                        <div className="grid py-2">
                            <div className="grid grid-cols-4 items-center ">
                                <Label htmlFor='fullName' className='text-right'>Full Name</Label>
                                <Input
                                    type='text'
                                    id='fullName'
                                    name='fullName'
                                    value={input.fullName}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                    placeholder='Enter your full name here'
                                />
                                {errors && errors.fullName && <span className='text-right col-span-4 text-sm text-red-500'> {errors.fullName}</span>}
                            </div>
                        </div>
                        <div className="grid  py-2">
                            <div className="grid grid-cols-4 items-center ">
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={input.email}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                    placeholder='Enter your email here'
                                />
                                {errors && errors.email && <span className='text-right col-span-4 text-sm text-red-500'> {errors.email}</span>}
                            </div>
                        </div>
                        <div className="grid  py-2">
                            <div className="grid grid-cols-4 items-center ">
                                <Label htmlFor='phoneNumber' className='text-right'>Phone No.</Label>
                                <Input
                                    type='text'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    value={input.phoneNumber}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                    placeholder='Enter your phone no. here'
                                />
                                {errors && errors.phoneNumber && <span className='text-right col-span-4 text-sm text-red-500'> {errors.phoneNumber}</span>}
                            </div>
                        </div>
                        <div className="grid  py-2">
                            <div className="grid grid-cols-4 items-center ">
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Textarea
                                    type='text'
                                    id='bio'
                                    name='bio'
                                    value={input.bio}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                    placeholder='Enter your bio here'
                                />
                                {errors && errors.bio && <span className='text-right col-span-4 text-sm text-red-500'> {errors.bio}</span>}
                            </div>
                        </div>
                        <div className="grid  py-2">
                            <div className="grid grid-cols-4 items-center ">
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Textarea
                                    type='text'
                                    id='skills'
                                    name='skills'
                                    value={input.skills}
                                    onChange={handleInputChange}
                                    className='col-span-3'
                                    placeholder='Enter your comma-separated skills here'
                                />
                                {errors && errors.skills && <span className='text-right col-span-4 text-sm text-red-500'> {errors.skills}</span>}
                            </div>
                        </div>
                        <div className="grid  py-2">
                            <div className="grid grid-cols-4 items-center ">
                                <Label htmlFor='resume' className='text-right'>Resume</Label>
                                <Input
                                    id='resume'
                                    name='file'
                                    type='file'
                                    accept='application/pdf'  //This limits the file picker in the browser to show only .pdf files.
                                    onChange={handleFileChange}
                                    className='col-span-3'
                                />
                                {errors && errors.file && <span className='text-right col-span-4 text-sm text-red-500'> {errors.file}</span>}
                            </div>
                        </div>
                        {/* <div className="grid  py-2">
                            <div className="grid grid-cols-4 items-center ">
                                <Label htmlFor='profilePhoto' className='text-right'>Profile Photo</Label>
                                <Input
                                    id='profilePhoto'
                                    name='file'
                                    type='file'
                                    accept='image/*'  //This limits the file picker in the browser to show only image files.
                                    onChange={handleFileChange}
                                    className='col-span-3'
                                />
                                {errors && errors.file && <span className='text-right col-span-4 text-sm text-red-500'> {errors.file}</span>}
                            </div>
                        </div> */}
                        <DialogFooter>
                            {
                                loading ? <Button disabled className='w-full my-4'> <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait...</Button> : <Button type='submit' className='w-full my-4 cursor-pointer'>Save</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog