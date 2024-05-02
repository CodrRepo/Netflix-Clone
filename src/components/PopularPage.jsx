import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import Card from "./partials/Card";
import Loading from "./partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const PopularPage = () => {
  const [pData, setPData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageno, setPageno] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('movie');

  const [uniqueCategories, setUniqueCategories] = useState(['movie', 'tv']);

  function getpData(){
    axios
        .get(`${currentCategory}/popular?page=${pageno}`, {
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
      .get(`${currentCategory}/popular?page=${pageno}`, {
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
    return title.charAt(0).toUpperCase() + title.slice(1, title.length);
  }

  useEffect(() => {
    getpData();
    console.log(pData)
  }, [currentCategory]);

  return (
    pData.length > 0 && (
      <div className="px-4 my-3 md:my-[3vh]">
        <div className="w-full flex gap-[1.8vw]">
          <svg
            className="md:hidden"
            height="50"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 256"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <radialGradient
              id="a"
              cx="48.339718%"
              cy="49.418621%"
              gradientTransform="matrix(1 0 0 .550875 0 .221951)"
              r="70.438089%"
            >
              <stop offset="0" />
              <stop offset="1" stop-opacity="0" />
            </radialGradient>
            <path d="m.00000018.00000114h255.90425382v255.90425386h-255.90425382z" />
            <path
              d="m141.676338 41.2746569-.067432 38.3613827-.067788 38.3613814-3.15611-8.905321c-.001096-.003069-.004987-.014413-.006065-.017482l-4.078393 85.402599c4.009838 11.323717 6.158216 17.36872 6.182347 17.392847.031573.031585 2.316708.169435 5.078103.306477 8.366405.415161 18.73404 1.304778 26.598936 2.281989 1.821024.226241 3.388216.342101 3.482565.257598.094351-.084504.145728-39.14347.114171-86.797623l-.057442-86.6438481h-17.011446z"
              fill="#b1060f"
              stroke="#000"
              stroke-width="2.956221"
            />
            <path
              d="m80.1382878 41.1604861v86.7316179c0 47.702451.0466767 86.778639.1038242 86.835798.0571438.05714 3.0113137-.221762 6.5648198-.619734 3.5535025-.39799 8.4646929-.892876 10.9136561-1.099607 3.7559391-.317084 14.9700631-1.038107 16.2686241-1.046089.377742-.002375.40197-1.951238.456683-36.735877l.057798-36.733378 2.71334 7.676914c.419329 1.186542.550861 1.557067.959391 2.712985l4.077324-85.3815481c-.863912-2.4425573-.411037-1.1603445-1.40109-3.9595855-3.331399-9.4190901-6.158326-17.408195-6.282246-17.753557l-.225488-.6279393h-17.1031391z"
              fill="#b1060f"
              stroke="#000"
              stroke-width="2.956221"
            />
            <path
              d="m80.1382787 41.1604861.0000091 48.6849187 34.2961902 90.9755582c.00358-2.084788.007672-3.211275.011417-5.594368l.057798-36.733378 2.71334 7.676914c15.103623 42.737557 23.218141 65.652219 23.265864 65.699933.031573.031585 2.316708.169435 5.078103.306477 8.366405.415161 18.73404 1.304778 26.598936 2.281989 1.821024.226241 3.388216.342101 3.482565.257598.064849-.058083.107182-19.209575.118453-46.227036l-34.135635-98.1401316-.016422 9.2870792-.067788 38.3613814-3.15611-8.905321c-3.083862-8.701476-5.142939-14.5206964-17.53235-49.5501176-3.331399-9.4190901-6.158326-17.408195-6.282246-17.753557l-.225488-.6279393h-17.1031392z"
              fill="url(#a)"
            />
            <path
              d="m80.1390021 41.160477 34.3646909 97.376981v-.044241l2.71334 7.676914c15.103623 42.737557 23.218141 65.652219 23.265864 65.699933.031573.031585 2.316708.169435 5.078103.306477 8.366405.415161 18.73404 1.304778 26.598936 2.281989 1.811691.225081 3.370857.340696 3.479712.258667l-34.09853-96.737614v.017829l-3.15611-8.905321c-3.083862-8.701476-5.142939-14.5206965-17.53235-49.5501178-3.331399-9.41909-6.158326-17.4081949-6.282246-17.7535569l-.225488-.6279393h-17.1031391z"
              fill="#e50914"
            />
            <path
              d="m141.676338 41.2746569-.067432 38.3613827-.067788 38.3613814-3.15611-8.905321c-.001096-.003069-.004987-.014413-.006065-.017482l-4.078393 85.402599c4.009838 11.323717 6.158216 17.36872 6.182347 17.392847.031573.031585 2.316708.169435 5.078103.306477 8.366405.415161 18.73404 1.304778 26.598936 2.281989 1.821024.226241 3.388216.342101 3.482565.257598.094351-.084504.145728-39.14347.114171-86.797623l-.057442-86.6438481h-17.011446z"
              fill="#b1060f"
              stroke="#000"
              stroke-width="2.956221"
            />
            <path
              d="m80.1382878 41.1604861v86.7316179c0 47.702451.0466767 86.778639.1038242 86.835798.0571438.05714 3.0113137-.221762 6.5648198-.619734 3.5535025-.39799 8.4646929-.892876 10.9136561-1.099607 3.7559391-.317084 14.9700631-1.038107 16.2686241-1.046089.377742-.002375.40197-1.951238.456683-36.735877l.057798-36.733378 2.71334 7.676914c.419329 1.186542.550861 1.557067.959391 2.712985l4.077324-85.3815481c-.863912-2.4425573-.411037-1.1603445-1.40109-3.9595855-3.331399-9.4190901-6.158326-17.408195-6.282246-17.753557l-.225488-.6279393h-17.1031391z"
              fill="#b1060f"
              stroke="#000"
              stroke-width="2.956221"
            />
            <path
              d="m80.1382787 41.1604861.0000091 48.6849187 34.2961902 90.9755582c.00358-2.084788.007672-3.211275.011417-5.594368l.057798-36.733378 2.71334 7.676914c15.103623 42.737557 23.218141 65.652219 23.265864 65.699933.031573.031585 2.316708.169435 5.078103.306477 8.366405.415161 18.73404 1.304778 26.598936 2.281989 1.821024.226241 3.388216.342101 3.482565.257598.064849-.058083.107182-19.209575.118453-46.227036l-34.135635-98.1401316-.016422 9.2870792-.067788 38.3613814-3.15611-8.905321c-3.083862-8.701476-5.142939-14.5206964-17.53235-49.5501176-3.331399-9.4190901-6.158326-17.408195-6.282246-17.753557l-.225488-.6279393h-17.1031392z"
              fill="url(#a)"
            />
            <path
              d="m80.1390021 41.160477 34.3646909 97.376981v-.044241l2.71334 7.676914c15.103623 42.737557 23.218141 65.652219 23.265864 65.699933.031573.031585 2.316708.169435 5.078103.306477 8.366405.415161 18.73404 1.304778 26.598936 2.281989 1.811691.225081 3.370857.340696 3.479712.258667l-34.09853-96.737614v.017829l-3.15611-8.905321c-3.083862-8.701476-5.142939-14.5206965-17.53235-49.5501178-3.331399-9.41909-6.158326-17.4081949-6.282246-17.7535569l-.225488-.6279393h-17.1031391z"
              fill="#e50914"
            />
          </svg>
          <h2 className="text-white text-xl md:text-[2vw] my-3">Popular</h2>
          </div>
        <div className="sticky top-0 py-[0.05vw] left-0 backdrop-blur-sm  bg-[#0c0c1013]">
        <div className="flex mt-4 xl:mt-[2vw] mb-6 xl:mb-[3vw] w-fit gap-[0.5vw] items-center">
          {uniqueCategories.map((element, index) => (
            <h3
              onClick={()=>{setPageno(1); setCurrentCategory(element.toLowerCase())}}
              key={index}
              className={` ${element === currentCategory ? `bg-[#ffcb00] text-black`: `bg-black text-[#ffcb00]`} text-sm xl:text-[1.5vw] px-4 py-2 xl:py-[1.5vw] xl:px-[2vw] cursor-pointer rounded-full hover:bg-[#ffcb00] hover:text-black`}
            >
              {element != undefined &&toTitleCase(element)}
            </h3>
          ))}
        </div>
        </div>

        <InfiniteScroll
          className="w-[100%] flex flex-wrap gap-[2vw] md:gap-[1.2vw] justify-center md:justify-start"
          dataLength={pData.length}
          next={() => fetchMoreData(currentCategory)}
          hasMore={hasMore}
        >
          {isLoading && (
            <h2 className="text-base px-4 py-2 md:ml-[50vh] fixed opacity-100 z-40 bottom-[7vh] md:bottom-[5vh] ml-auto md:right-[50%] md:translate-x-[120%] bg-black rounded-md text-[#ffcb00]">
              Loading...
            </h2>
          )}
          {pData.map((element, index) => (
            <Card dataType={currentCategory} key={index} element={element} />
          ))}
        </InfiniteScroll>
      </div>
    )
  );
};

export default PopularPage;
