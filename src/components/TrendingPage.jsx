import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Card from "./partials/Card";
import Loading from "./partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const TrendingPage = () => {
  const [tData, setTData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageno, setPageno] = useState(1);
  const [duration, setDuration] = useState("day");
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  const [uniqueCategories, setUniqueCategories] = useState(['all','movie', 'tv']);

  document.title = 'MovizFire: Trending'

  function getTData(){
    axios
        .get(`trending/${currentCategory}/${duration}?page=${pageno}`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
          },
        })
        .then((res) => {
          setTData(res.data.results);
        })
        .catch((err) => console.log(err));
  }

  async function fetchMoreData(category, duration) {
    console.log(category)
    setIsLoading(true);
    await axios
      .get(`trending/${currentCategory}/${duration}?page=${pageno}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
        },
      })
      .then((res) => {
        setIsLoading(true);
        setTData((previous) => [...new Set([...previous, ...res.data.results])]);
        res.data.results != undefined && res.data.results.length > 0
          ? setHasMore(true)
          : setHasMore(false);
        setPageno(previous=> previous+1)
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }

  function toTitleCase(title){
    return title.charAt(0).toUpperCase() + title.slice(1, title.length);
  }

  useEffect(() => {
    getTData();
  }, [currentCategory, duration]);

  return (
    tData.length > 0 && (
      <div className="px-4 my-3 md:my-[3vh]">
        <div className="w-full flex items-center gap-[1.8vw]">
        <div className="md:hidden h-[4vh]">
            <img className="h-full w-full" src="./mobile.png" alt="movizfire logo" />
          </div>
          <h2 className="text-white text-xl md:text-[2vw] my-3">Trending</h2>
          </div>
        <div className="sticky top-0 py-[0.05vw] left-0 backdrop-blur-sm  bg-[#0c0c1013]">
        <div className="flex mt-4 xl:mt-[2vw] w-fit gap-[0.5vw] items-center">
          {uniqueCategories.map((element, index) => (
            <h3
              onClick={()=>{setCurrentCategory(element.toLowerCase())}}
              key={index}
              className={` ${element === currentCategory ? `bg-[#ffcb00] text-black`: `bg-black text-[#ffcb00]`} text-sm xl:text-[1.5vw] px-4 py-2 xl:py-[1.5vw] xl:px-[2vw] cursor-pointer rounded-full hover:bg-[#ffcb00] hover:text-black`}
            >
              {toTitleCase(element)}
            </h3>
          ))}
          <span className="text-white text-xl xl:text-[1.8vw] leading-0 mb-[0.5vw]">|</span>
          {["day", "Week"].map((element, index) => (
            <h3
              onClick={()=>{setDuration(element.toLowerCase());}}
              key={index}
              className={`${element.toLowerCase()===duration.toLowerCase()? `text-black bg-[#ffcb00]`: `bg-black text-[#ffcb00]`} text-sm xl:text-[1.5vw] px-4 py-2 xl:py-[1.5vw] xl:px-[2vw] rounded-full hover:bg-[#ffcb00] hover:text-black `}
            >
              {toTitleCase(element)}
            </h3>
          ))}
        </div>

        </div>

        <InfiniteScroll
          className="w-[100%] flex flex-wrap gap-[2.5vw] xl:mt-[3vw]  mt-6 md:gap-[1.2vw] justify-center md:justify-start"
          dataLength={tData.length}
          next={() => fetchMoreData(currentCategory, duration)}
          hasMore={hasMore}
        >
          {isLoading && (
            <h2 className="text-base px-4 py-2 md:ml-[50vh] fixed opacity-100 z-40 bottom-[7vh] md:bottom-[5vh] ml-auto md:right-[50%] md:translate-x-[120%] bg-black rounded-md text-[#ffcb00]">
              Loading...
            </h2>
          )}
          {tData.map((element, index) => (
            <Card dataType={element.media_type} key={index} element={element} />
          ))}
        </InfiniteScroll>
      </div>
    )
  );
};

export default TrendingPage;
