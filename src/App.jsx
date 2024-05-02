import React, { useEffect } from 'react'
import Home from './components/Home'
import Nav from './components/partials/Nav'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import LocomotiveScroll from 'locomotive-scroll'
import TrendingPage from './components/TrendingPage'
import PopularPage from './components/PopularPage'
import MoviesPage from './components/MoviesPage'
import TvPage from './components/TvPage'
import Person from './components/Person'
import Detail from './components/Detail'

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  
  const location = useLocation();
  
  
  return (
    <div className='relative bg-[#0c0c10] min-h-screen w-full flex pb-[20vw] md:pb-[2vw]'>
      <Nav/>
      <div className='bg-[#0c0c10] w-[100vw] md:w-[78vw] md:ml-[22vw]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trending' element={<TrendingPage/>}/>
        <Route path='/popular' element={<PopularPage/>}/>
        <Route path='/movies' element={<MoviesPage/>}/>
        <Route path='/tv shows' element={<TvPage/>}/>
        <Route path='/people' element={<Person/>}/>
        <Route path={`/:cat/details/:id`} element={<Detail/>}/>
      </Routes>
    </div>
    </div>
    
  )
}

export default App