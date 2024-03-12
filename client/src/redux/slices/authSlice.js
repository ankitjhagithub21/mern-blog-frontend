import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading:false,
    searchTerm:null
  },
  reducers: {
    login: (state,action) => {
     
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    setLoading:(state,action)=>{
      state.loading=action.payload
    },
    setSearchTerm:(state,action)=>{
      state.searchTerm = action.payload
    }
    
  },
})

export const { login,logout,setLoading,setSearchTerm} = authSlice.actions

export default authSlice.reducer