import React from "react";
import Page from "./partials/Page";
import Search from "./partials/Search";

const Person = () => {
  return (
    <>

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
