import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",   //name
    initialState:{   //initialState
        loading: false,
        user: null
    },
    reducers: {  //reducer: [state, action] --> newState
        setLoading: (state, action)=>{
            state.loading= action.payload;
        },
        setUser: (state, action)=>{
            state.user= action.payload;
        }
    }
})

export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;