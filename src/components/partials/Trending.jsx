import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Trending = () => {
  const trendingData = useSelector((state) => state.trendingData);
  const treDetail = useRef();
  const [horizontalScroll, setHorizontalScroll] = useState(0);

  const handlePlusScroll = (operator) => {
    console.log(horizontalScroll);
    treDetail && treDetail.current.scrollBy({ left: 200, behavior: "smooth" });
    setHorizontalScroll((previous) =>
      previous <= treDetail.current.offsetWidth
        ? previous + treDetail.current.offsetWidth * 0.2
        : 0
    );
  };

  const handleMinusScroll = (operator) => {
    console.log(horizontalScroll);
    treDetail && treDetail.current.scrollBy({ left: -200, behavior: "smooth" });
    setHorizontalScroll((previous) =>
      previous < 0 ? previous - treDetail.current.offsetWidth * 0.2 : 0
    );
  };
  
  useEffect(() => {}, [horizontalScroll]);
  return (
    <div className="text-white px-4">
      <h1 className="text-xl my-3">Trending</h1>

      <div className="relative">
        <div
          ref={treDetail}
          className={`relative flex flex-nowrap px-2 overflow-auto gap-[1.8vw]`}
        >
          {trendingData &&
            trendingData.map((element, index) => (
              <Card dataType={element.media_type} key={index} element={element} />
            ))}
        </div>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(22,22,24,0.4) 80%, rgba(0,0,0,0) 100%)",
          }}
          onClick={(event) => {
            handleMinusScroll();
          }}
          className={`cursor-pointer  absolute top-0 left-0 w-[3%] h-full flex justify-center items-center`}
        >
          <i className="ri-arrow-left-s-line"></i>
        </div>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(22,22,24,0.4) 20%, rgba(0,0,0,1) 100%)",
          }}
          onClick={(event) => {
            handlePlusScroll();
          }}
          className={`cursor-pointer absolute top-0 right-0 w-[3%] h-full flex justify-center items-center`}
        >
          <i className="ri-arrow-right-s-line"></i>
        </div>
      </div>
    </div>
  );
};

export default Trending;
