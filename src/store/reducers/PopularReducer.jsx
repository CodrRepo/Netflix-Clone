import {createSlice} from '@reduxjs/toolkit'

export const popularSlice = createSlice({
    name: 'popularData',
    initialState: null,
    reducers: {
        // reducers to change state here
        getPopularData: (state, action)=>{
            return action.payload;
        }
    }
})

export const {getPopularData} = popularSlice.actions;
export default popularSlice.reducer;