import asyncGetSearch from '../../store/actions/asyncGetSearch';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useLocation} from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState("");
    const suggestionBox = useRef();
    const searchData = useSelector(state=> state.searchData);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const handleInput = (e) => {
        setQuery(e.target.value);
    };
    
    const handleWheel = (e) => {
      if (suggestionBox.current.contains(e.target)) {
        e.stopPropagation();
      }
    };

    const handleNavigation = ()=>{
      location.pathname = '/'? history.push(`${element.media_type}/details/${element.id}`): history.push(`${window.location.origin}/${element.media_type}/details/${element.id}`)
    }

    useEffect(()=>{
        dispatch(asyncGetSearch(query));
    },[query])
  return (
    <div className="relative z-40 search-container flex justify-center w-[80vw] md:w-[35vw] mx-auto md:-translate-x-[25%]  gap-3 items-center mt-5">
          <div className="search items-center w-full flex px-2 rounded-md backdrop-brightness-125 backdrop-blur  bg-[#8080801e]">
          <span className="text-white text-xl md:text-[1.2vw]">
            <i className="ri-search-line"></i>
          </span>
            <input
              onChange={handleInput}
              value={query}
              className="outline-none border-none w-[70vw] md:w-[47vw] rounded-md text-base md:text-[1.2vw]  bg-[#0c0c1000] px-4 py-[2.3vw] md:py-[0.6vw] text-white placeholder-white"
              type="text"
              name="query"
              id="search"
              autoComplete='off'
              placeholder="Search your query"
            />
            <button
              onClick={() => setQuery("")}
              className={`text-white text-2xl md:text-[1.2vw] ${
                query.length <= 0 ? "opacity-0" : "opacity-100"
              }`}
            >
              <i className="ri-close-circle-line"></i>
            </button>
          </div>

          <div
            className={`backdrop-blur  bg-[#8080801e] mt-2 overflow-auto absolute top-[100%] left-50% w-full max-h-[30vh] md:max-h-[40vh]`}
          >
            <div ref={suggestionBox} onWheel={handleWheel} className={`text-white flex flex-col gap-[1.3vh] z-40 `}>
                {searchData && searchData.map((element, index)=><Link onClick={handleNavigation} key={index} className="hover:backdrop-blur-lg w-full py-2 px-1 pl-4 flex items-center gap-3">
                  <span className="rounded-md w-[25%] md:w-[20%] h-[5vh] md:h-[3vw] lg:h-[4vw] inline-block">
                    <img className='h-full w-full object-cover object-center' src={(element.backdrop_path || element.poster_path || element.profile_path) != null ? `https://image.tmdb.org/t/p/original/${element.backdrop_path || element.poster_path || element.profile_path}`: `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`} alt="" />
                  </span>
                  <h2 className='w-[75%] md:w-[80%] md:text-[1.5vw] lg:ml-[0.5vw]'>{element.title || element.original_title || element.name || element.original_name}</h2>
                </Link>)}
            </div>
          </div>
        </div>
  )
}

export default Search