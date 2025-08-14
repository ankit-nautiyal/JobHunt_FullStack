import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",   //slice name
    initialState: {   //initialState
        singleCompany: null,
    },
    reducers: {  //reducer: [state, action] --> newState
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
    }
})

export const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;