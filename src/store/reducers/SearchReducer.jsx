import { createSlice } from '@reduxjs/toolkit'

export const SearchSlice = createSlice({
    name: 'searchData',
    initialState: [],
    reducers: {
        // reducers to change state here
        getSearchData: (state, action)=>{
            // console.log(action)
            return action.payload;
        }
    }
})

export const {getSearchData} = SearchSlice.actions;
export default SearchSlice.reducer;