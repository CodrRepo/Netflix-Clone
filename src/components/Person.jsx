import React from "react";
import Page from "./partials/Page";
import Search from "./partials/Search";

const Person = () => {
  return (
    <>
      <div className="z-40 fixed left-[0%]  ml-[10%] md:left-[50%] md:-translate-x-[25%] top-1 xl:top-[2vh] w-[30%]">
        <Search />
      </div>

      <Page
        title={"People"}
        type={"person"}
        category={"popular"}
        uniqueCategoriesList={[]}
      />
    </>
  );
};

export default Person;
