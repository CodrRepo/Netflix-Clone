import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const HorizontalScroll = ({ data, dataHeading, category }) => {
    const [scrollProgress, setScrollProgress] = useState(null);
  const elemDetail = useRef();

  const { scrollXProgress } = useScroll({
    container: elemDetail,
  });

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    setScrollProgress((latest*100).toFixed());
  });

  const handlePlusScroll = (operator) => {
    elemDetail &&
      elemDetail.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleMinusScroll = (operator) => {
    elemDetail &&
      elemDetail.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  return (
    <div className="text-white">
      <h1 className="text-xl my-3">{dataHeading}</h1>

      <div className="relative">
        <motion.div
          ref={elemDetail}
          className={`relative flex flex-nowrap px-2 overflow-auto gap-[2.5vw] md:gap-[1.2vw]`}
        >
          {data &&
            data.map((element, index) => (
              <Card
                dataType={element.media_type || category}
                key={index}
                element={element}
              />
            ))}
        </motion.div>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(22,22,24,0.4) 80%, rgba(0,0,0,0) 100%)",
          }}
          onClick={(event) => {
            handleMinusScroll();
          }}
          className={`${scrollProgress <=0 && 'hidden'} cursor-pointer absolute top-0 left-0 w-[3%] h-full flex justify-center items-center`}
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
          className={`${scrollProgress >=100 && 'hidden'} cursor-pointer absolute top-0 right-0 w-[3%] h-full flex justify-center items-center`}
        >
          <i className="ri-arrow-right-s-line"></i>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
