import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Card = ({element, dataType }) => {
  
  return  (
    <Link to={`/${dataType}/details/${element.id}`} className=' w-[29vw] md:w-[13vw] flex-shrink-0 '>
      <div className='h-[33vw] md:h-[15vw] rounded-md  overflow-hidden'>
        <img className='h-full w-full object-cover object-center' src={(element.backdrop_path || element.poster_path || element.profile_path)!= undefined? `https://image.tmdb.org/t/p/w500/${element.backdrop_path || element.poster_path || element.profile_path}`: `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`} alt="" />
      </div>
      <h3 className='truncate mt-2 text-white font-bold md:text-[1.4vw]'>{element.name || element.original_name || element.title || element.original_title}</h3>
      <div className='flex justify-between w-full gap-2'>
        <p className='text-[#777777] font-semibold text-[2.2vw] md:text-[1.2vw]'>{element.first_air_date || element.release_date || element.character || element.gender && (element.gender === 2 ? 'Male': 'Female') ||  'N/A'.split("-")[0]}</p>
        <p className='text-[#ffcb00] text-[2.2vw] md:text-[1.2vw] font-semibold'><i className="ri-star-fill mr-[0.4vw] text-[2vw] md:text-[1vw]"></i>{element.known_for_department || (element.vote_average && element.vote_average.toFixed(1))}</p>
      </div>
    </Link>
  )
}

export default Card