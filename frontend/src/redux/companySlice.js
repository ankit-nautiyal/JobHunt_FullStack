import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",   //slice name
    initialState: {   //initialState
        singleCompany: null,
        companies: [],
        loading: false,
    },
    reducers: {  //reducer: [state, action] --> newState
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setLoading: (state, action)=>{
            state.loading= action.payload;
        },
    }
})

export const { setSingleCompany, setCompanies, setLoading } = companySlice.actions;
export default companySlice.reducer;