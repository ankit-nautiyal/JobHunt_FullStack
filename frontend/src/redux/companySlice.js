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

export const { setSingleCompanyb } = companySlice.actions;
export default companySlice.reducer;