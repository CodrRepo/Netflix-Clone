import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import asyncGetTrending from '../../store/actions/asyncGetTrending';
import Search from './Search';

const Header = () => {
  const trendingData = useSelector(state => state.trendingData);

  function getRandomElement(data){
    const ranNumber = data && (Math.random()*data.length).toFixed();
    const randomTrendingData = trendingData[ranNumber];
    return randomTrendingData;
  }

  
  const randomElement = trendingData !== null && getRandomElement(trendingData)
  
  

  return trendingData && (
    <div>
        <div className='z-20 h-[80vh] md:h-[100vh] w-full relative'>
          <div className='z-40 fixed left-[0%]  ml-[10%] md:left-[50%] md:-translate-x-[25%] top-1 w-[30%]'>
          <Search/>
          </div>
          <img className='h-full w-full object-cover object-center' src={`https://image.tmdb.org/t/p/original/${randomElement.backdrop_path || randomElement.poster_path}`} alt="" />
          <div style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(19,110,111,0) 34%, rgba(0,0,0,1) 100%)',
          }} className='absolute top-0 left-0 h-full w-full flex items-end'>

          <div className='px-4 h-[60%] w-[70%]'>
          <h2 className='text-white text-[15vw] md:text-[4.2vw] font-bold leading-none'>{randomElement.name || randomElement.title || randomElement.original_title || randomElement.original_name}</h2>
          <p className='text-white mt-4 text-[3.5vw] md:text-[1.4vw]'>{randomElement.overview && randomElement.overview.slice(0, 200)}<Link className='text-[#e50914] ml-1' to="#">...more</Link></p>
          <div className='flex gap-4 text-white text-[3vw] md:text-[1.15vw] mt-2'>
            <p className=''><i className="ri-megaphone-fill text-[#e50914] mr-1 text-[3.5vw] md:text-[1.3vw]"></i>{randomElement.release_date || randomElement.first_air_date || 'No Information'}</p>
            <p><i className={`ri-${randomElement.media_type == 'movie'? 'clapperboard': randomElement.media_type}-fill text-[#e50914] mr-1 text-[3.5vw] md:text-[1.3vw]`}></i>{randomElement.media_type}</p>
          </div>

          <Link to={`/${randomElement.media_type}/details/${randomElement.id}`} className='bg-[#e50914] box  rounded px-4 py-2 md:py-3 mt-5 absolute z-30 text-[2.5vw] md:text-[1.4vw] flex items-center justify-center gap-1 text-white shadow-[0px_0px_50px_rgba(0,0,0,0.10)] shadow-[#e50914]'>Explore</Link>
          </div>
          </div>


        </div>
    </div>
  )
}

export default Header