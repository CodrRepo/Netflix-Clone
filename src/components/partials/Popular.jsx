import React from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";

const Popular = () => {
  const popularData = useSelector((state) => state.popularData);
  return (
    <div className="text-white px-4">
        <h2 className="text-xl my-3">Popular</h2>
      <div className="overflow-auto">
        <div className="flex flex-nowrap gap-[1.8vw]">
          {popularData &&
            popularData.map((element, index) => (
              <Card key={index} element={element} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
