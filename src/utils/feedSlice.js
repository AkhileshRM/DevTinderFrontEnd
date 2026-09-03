import {createSlice} from '@reduxjs/toolkit'

const feedSlice = createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addFeed:(state, action) => action.payload,
        removeUsersFromFeed:(state, action) => {
const newArray = state.filter(user => user._id!==action.payload)
return newArray
        }
            
            
    }
})

export default feedSlice.reducer
export const {addFeed, removeUsersFromFeed} = feedSlice.actions