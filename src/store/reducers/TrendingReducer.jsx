import { createSlice } from '@reduxjs/toolkit'

export const TrendingSlice = createSlice({
    name: 'trendingData',
    initialState: null,
    reducers: {
        getTrendingData: (state, action) => {
            return action.payload;
        },
    }
})

export const { getTrendingData } = TrendingSlice.actions;
export default TrendingSlice.reducer;