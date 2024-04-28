import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import HorizontalScroll from "./HorizontalScroll";

const Trending = () => {
  const trendingData = useSelector((state) => state.trendingData);

  return (
    <div className="px-4">
      <HorizontalScroll data={trendingData} category={''} dataHeading={'Trending'}/>
    </div>
  )
};

export default Trending;
