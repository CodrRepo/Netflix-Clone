import React from 'react'
import axios from '../../utils/axios'
import { getPopularData } from '../reducers/PopularReducer'

const asyncGetPopular = ()=> async(dispatch) => {
  await axios.get('/movie/popular',{
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
      },
  })
  .then(res => {dispatch(getPopularData(res.data.results))})
  .catch(err=> console.log(err));
}

export default asyncGetPopular