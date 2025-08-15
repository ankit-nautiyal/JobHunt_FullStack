import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",   //slice name
    initialState: {   //initialState
        singleCompany: null,
        companies: [],
        loading: false,
        searchCompanyByText: "",
    },
    reducers: {  //reducer: [state, action] --> newState
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }
    }
})

export const { setSingleCompany, setCompanies, setLoading, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;