import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",   //name
    initialState: {   //initialState
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobsByText: "",
        allAppliedJobs: "",
        searchedQuery: ""
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
        setSearchJobsByText: (state, action) => {
            state.searchJobsByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    }
})

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobsByText, setAllAppliedJobs, setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;