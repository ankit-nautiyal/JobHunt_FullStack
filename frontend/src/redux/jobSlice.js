import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",   //name
    initialState:{   //initialState
        allJobs: []
    },
    reducers: {  //reducer: [state, action] --> newState
        setAllJobs: (state, action)=>{
            state.allJobs= action.payload;
        },
    }
})

export const {setAllJobs} = jobSlice.actions;
export default jobSlice.reducer;