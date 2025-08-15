import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",   //name
    initialState: {   //initialState
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
    },
    reducers: {  //reducer: [state, action] --> newState
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
    }
})

export const { setAllJobs, setSingleJob, setAllAdminJobs } = jobSlice.actions;
export default jobSlice.reducer;