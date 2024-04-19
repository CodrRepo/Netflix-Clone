import { configureStore } from '@reduxjs/toolkit'
import SearchReducer from './reducers/SearchReducer'
import TrendingReducer from './reducers/TrendingReducer'
import PopularReducer from './reducers/PopularReducer'

export default configureStore({
  reducer: {
    searchData: SearchReducer,
    trendingData: TrendingReducer,
    popularData: PopularReducer,
  }
})