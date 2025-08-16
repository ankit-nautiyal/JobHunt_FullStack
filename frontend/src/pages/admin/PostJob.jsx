import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { jobPostSchema } from "@/schema/jobSchema";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// const jobArray = [];
const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    positions: '',
    companyId: ''
  })
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { companies } = useSelector(store => store.company);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleCompanySelect = (value) => {
    const selectedCompany = companies.find((company) => company?.companyName?.toLowerCase() === value.toLowerCase());
    setInput({ ...input, companyId: selectedCompany._id });
  }

  const handleJobTypeSelect = (value) => {
    setInput({ ...input, jobType: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //for form-validation using zod
    const result = jobPostSchema.safeParse(input);
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setErrors(fieldErrors);
      return;
    }

    setErrors({});  // to clear old validation messages

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true  //to include cookies (like token) from backend in the request
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error submitting the form. Please try again.");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center my-5">
        <form onSubmit={handleSubmit} className="p-8 w-[650px] border border-gray-200 shadow-lg rounded-lg">
          <div className="text-center items-center mb-5 text-xl font-bold ">
            <span>Post New Job</span>
          </div>
          <div className="grid grid-cols-2 gap-2">

            <div className='my-1' >
              <Label >Job Type</Label>
              <Select onValueChange={handleJobTypeSelect}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors && errors.jobType && <span className='text-sm text-red-500'> {errors.jobType}</span>}

            </div>

            <div>
              {
                companies?.length > 0 &&
                <div className='my-1'>
                  <Label >Company</Label>
                  <Select onValueChange={handleCompanySelect}>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          companies.map((company) => {
                            return (
                              <SelectItem value={company?.companyName}> {company?.companyName}</SelectItem>
                            )
                          })
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors && errors.companyId && <span className='text-sm text-red-500'> {errors.companyId}</span>}
                </div>
              }
            </div>

            <div>
              <Label htmlFor='title'>Title</Label>
              <Input
                type='text'
                name='title'
                id='title'
                placeholder='Enter job title'
                value={input.title}
                onChange={handleFormChange}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
              {errors?.title?.map((err, i) => (
                <span key={i} className="text-sm text-red-500 block">{err}</span>
              ))}
            </div>

            <div>
              <Label htmlFor='requirements'>Skills Required</Label>
              <Input
                type='text'
                name='requirements'
                id='requirements'
                placeholder='Enter comma-separated skills'
                value={input.requirements}
                onChange={handleFormChange}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
              {errors?.requirements?.map((err, i) => (
                <span key={i} className="text-sm text-red-500 block">{err}</span>
              ))}
            </div>

            <div>
              <Label htmlFor='salary'>Salary (LPA)</Label>
              <Input
                type='number'
                name='salary'
                id='salary'
                placeholder='Enter CTC in LPA'
                value={input.salary}
                onChange={handleFormChange}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
              {errors?.salary?.map((err, i) => (
                <span key={i} className="text-sm text-red-500 block">{err}</span>
              ))}
            </div>

            <div>
              <Label htmlFor='location'>Location</Label>
              <Input
                type='text'
                name='location'
                id='location'
                placeholder='Enter job location'
                value={input.location}
                onChange={handleFormChange}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
              {errors?.location?.map((err, i) => (
                <span key={i} className="text-sm text-red-500 block">{err}</span>
              ))}
            </div>

            <div>
              <Label htmlFor='experience'>Experience Required (years) </Label>
              <Input
                type='number'
                name='experience'
                id='experience'
                placeholder='Enter experience required in yrs'
                value={input.experience}
                onChange={handleFormChange}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
              {errors?.experience?.map((err, i) => (
                <span key={i} className="text-sm text-red-500 block">{err}</span>
              ))}
            </div>

            <div>
              <Label htmlFor='positions'>No. of Positions</Label>
              <Input
                type='number'
                name='positions'
                id='positions'
                placeholder='Enter total positions available'
                value={input.positions}
                onChange={handleFormChange}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
              {errors?.positions?.map((err, i) => (
                <span key={i} className="text-sm text-red-500 block">{err}</span>
              ))}
            </div>

            <div>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                type='text'
                name='description'
                id='description'
                placeholder='Enter job description'
                value={input.description}
                onChange={handleFormChange}
                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
              />
              {errors?.description?.map((err, i) => (
                <span key={i} className="text-sm text-red-500 block">{err}</span>
              ))}
            </div>

          </div>
          {
            loading ? (
              <Button disabled className="w-full my-4 ">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...
              </Button>
            ) : (
              <Button disabled={companies?.length === 0} type="submit" className="w-full my-4 cursor-pointer">
                Post Job
              </Button>
            )
          }

          {
            companies?.length === 0 && <p className="text-xs text-red-600 font-bold text-center my-3">*Please regsiter a company first to post a job</p>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob