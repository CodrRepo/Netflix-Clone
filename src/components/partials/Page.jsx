import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Page = ({title, type, category, uniqueCategoriesList}) => {
    const [pData, setPData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageno, setPageno] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(category);
    const [dataType, setDataType] = useState(type);
  
    const [uniqueCategories, setUniqueCategories] = useState(uniqueCategoriesList);
  
    function getpData(){
      axios
          .get(`${dataType}/${currentCategory}?page=${pageno}`, {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
            },
          })
          .then((res) => {
            setPData(res.data.results);
          })
          .catch((err) => console.log(err));
    }
  
    async function fetchMoreData(category) {
      console.log(category)
      setIsLoading(true);
      await axios
        .get(`${type}/${currentCategory}?page=${pageno}`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
          },
        })
        .then((res) => {
          setIsLoading(true);
          setPData((previous) => [...new Set([...previous, ...res.data.results])]);
          res.data.results != undefined && res.data.results.length > 0
            ? setHasMore(true)
            : setHasMore(false);
          setPageno(previous=> previous+1)
          setIsLoading(false);
        })
        .catch((err) => console.error(err));
    }
  
    function toTitleCase(title){
        let capitalizedText;
        if(title.includes('_')){
            capitalizedText = title.split('_').map((element)=> element.charAt(0).toUpperCase() + element.slice(1, element.length));
        }else {
            capitalizedText = title.split(' ').map((element)=> element.charAt(0).toUpperCase() + element.slice(1, element.length));
        }
      return capitalizedText.join(" ");
    }
  
    useEffect(() => {
      getpData();
      console.log(pData)
    }, [currentCategory]);
  return (
    pData != undefined && (
        <div className="px-4 my-3">
          <h2 className="text-white text-xl my-3">{toTitleCase(title)}</h2>
          {uniqueCategories.length>0 && <div className="flex  mt-4 mb-6 w-fit gap-[0.5vw] items-center">
            {uniqueCategories.map((element, index) => (
              <h3
                onClick={()=>{setPageno(1); console.log(pData); setCurrentCategory(element.toLowerCase())}}
                key={index}
                className={` ${element === currentCategory ? `bg-[#ffcb00] text-black`: `bg-black text-[#ffcb00]`} text-sm px-4 py-2 cursor-pointer rounded-full hover:bg-[#ffcb00] hover:text-black`}
              >
                {element != undefined &&toTitleCase(element)}
              </h3>
            ))}
          </div>}
  
          <InfiniteScroll
            className="w-[100%] flex flex-wrap gap-[1.8vw]"
            dataLength={pData.length}
            next={() => fetchMoreData(currentCategory)}
            hasMore={hasMore}
            loader={<Loading />}
          >
            {isLoading && (
              <h2 className="text-base px-4 py-2 ml-[50vh] fixed opacity-100 z-40 bottom-[5vh] right-[50%] translate-x-[120%] bg-black rounded-md text-[#ffcb00]">
                Loading...
              </h2>
            )}
            {pData.map((element, index) => (
              <Card key={index} element={element} />
            ))}
          </InfiniteScroll>
        </div>
      )
  )
}

export default Page