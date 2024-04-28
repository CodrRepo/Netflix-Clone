import asyncGetSearch from '../../store/actions/asyncGetSearch';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation} from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState("");
    const suggestionBox = useRef();
    const searchData = useSelector(state=> state.searchData);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleInput = (e) => {
        setQuery(e.target.value);
    };
    
    const handleWheel = (e) => {
      if (suggestionBox.current.contains(e.target)) {
        e.stopPropagation();
      }
    };

    useEffect(()=>{
        dispatch(asyncGetSearch(query));
    },[query])
  return (
    <div className="relative z-40 search-container flex justify-center gap-3 items-center mt-5">
          <div className="search items-center flex px-2 rounded-md backdrop-brightness-125 backdrop-blur  bg-[#8080801e]">
          <span className="text-white text-xl">
            <i className="ri-search-line"></i>
          </span>
            <input
              onChange={handleInput}
              value={query}
              className="outline-none border-none w-[30vw] rounded-md   bg-[#0c0c1000] px-4 py-2 text-white placeholder-white"
              type="text"
              name="query"
              id="search"
              autoComplete='off'
              placeholder="Search your query"
            />
            <button
              onClick={() => setQuery("")}
              className={`text-white text-2xl ${
                query.length <= 0 ? "opacity-0" : "opacity-100"
              }`}
            >
              <i className="ri-close-circle-line"></i>
            </button>
          </div>

          <div
            className={`backdrop-blur  bg-[#8080801e] mt-2 overflow-auto absolute top-[100%] left-50% w-[35vw] max-h-[10rem]`}
          >
            <div ref={suggestionBox} onWheel={handleWheel} className={`text-white flex flex-col z-40 `}>
                {searchData && searchData.map((element, index)=><Link onClick={()=> {window.location.href = location.pathname==`/`?`${element.media_type}/details/${element.id}`: window.location.origin+`/${element.media_type}/details/${element.id}`}} key={index} className="hover:backdrop-blur-lg w-full py-2 px-1 pl-4 flex items-center gap-3">
                  <span className="rounded-md w-[20%] h-7 inline-block">
                    <img className='h-full w-full object-cover object-center' src={(element.backdrop_path || element.poster_path || element.profile_path) != null ? `https://image.tmdb.org/t/p/original/${element.backdrop_path || element.poster_path || element.profile_path}`: `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`} alt="" />
                  </span>
                  <h2 className='w-[80%]'>{element.title || element.original_title || element.name || element.original_name}</h2>
                </Link>)}
            </div>
          </div>
        </div>
  )
}

export default Search