import React from 'react'
import Home from './components/Home'
import Nav from './components/partials/Nav'
import { Route, Routes } from 'react-router-dom'
import LocomotiveScroll from 'locomotive-scroll'
import TrendingPage from './components/TrendingPage'
import PopularPage from './components/PopularPage'
import MoviesPage from './components/MoviesPage'
import TvPage from './components/TvPage'
import Person from './components/Person'

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  // bg-black: #0c0c10 
  // black-light: #222125
  // red: #f50c18
  return (
    <div className='relative bg-[#0c0c10] min-h-screen w-full flex'>
      <Nav/>
      <div className='bg-[#0c0c10] w-[78%] ml-[22%]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trending' element={<TrendingPage/>}/>
        <Route path='/popular' element={<PopularPage/>}/>
        <Route path='/movies' element={<MoviesPage/>}/>
        <Route path='/tv shows' element={<TvPage/>}/>
        <Route path='/people' element={<Person/>}/>
      </Routes>
    </div>
    </div>
    
  )
}

export default App