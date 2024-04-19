import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({element }) => {
  return  (
    <Link to="#" className='w-[13vw] flex-shrink-0 '>
      <div className='h-[15vw] rounded-md  overflow-hidden'>
        <img className='h-full w-full object-cover object-center' src={`https://image.tmdb.org/t/p/original/${element.backdrop_path || element.poster_path || element.profile_path}`} alt="" />
      </div>
      <h3 className='truncate mt-2 text-white font-bold'>{element.name || element.original_name || element.title || element.original_title}</h3>
      <div className='flex justify-between w-full'>
        <p className='text-[#777777] font-semibold text-[1.2vw]'>{element.first_air_date || element.release_date || 'N/A'.split("-")[0]}</p>
        <p className='text-[#ffcb00] text-[1.2vw] font-semibold'><i className="ri-star-fill mr-[0.4vw] text-[1vw]"></i>{element.profile_path!=undefined?element.known_for_department : element.vote_average && element.vote_average.toFixed(1)}</p>
      </div>
    </Link>
  )
}

export default Card