import React, {useEffect, useState } from "react";
import Header from "./partials/Header";
import Trending from "./partials/Trending";
import {useSelector, useDispatch} from 'react-redux'
import asyncGetTrending from "../store/actions/asyncGetTrending";
import Loading from "./partials/Loading";
import Popular from "./partials/Popular";
import asyncGetPopular from "../store/actions/asyncGetPopular";


const Home = () => {
  const trendingData = useSelector(state=> state.trendingData);
  const popularData = useSelector(state=>state.popularData);
  const dispatch = useDispatch();

  document.title = "MovizFire"

  useEffect(()=>{
    trendingData === null && dispatch(asyncGetTrending());
    popularData === null && dispatch(asyncGetPopular());
  },[trendingData, popularData])

  return (
      <div className="relative">
        {trendingData !=null ? <>
        <Header/><Trending/><Popular/>
        </> : <Loading/> }
        
      </div>
  );
};

export default Home;
