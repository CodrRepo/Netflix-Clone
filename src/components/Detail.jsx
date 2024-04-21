import React, { Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./partials/Loading";
import Card from "./partials/Card";
import Search from "./partials/Search";

const Detail = () => {
  const { cat, id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [similarData, setSimilarData] = useState([]);

  async function getDetail() {
    setIsLoading(true);
    await axios
      .get(`${cat}/${id}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
        },
      })
      .then((res) => {setProductDetail(res.data); res.data==0 && console.log("no data available")})
      .catch((err) => console.log(err));
      setIsLoading(false);
  }

  function getRecommendedData() {
    axios
      .get(`${cat}/${id}/recommendations`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
        },
      })
      .then((res) => {setRecommendedData(res.data.results)})
      .catch((err) => console.log(err));
  }

  function getSimilarData() {
    axios
      .get(`${cat}/${id}/similar`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTlmY2JiMzAxN2NjMTc1ZDdmMDQ4M2UzMGE4MDFiMSIsInN1YiI6IjY2MThkM2RmOTBjZjUxMDE3Y2EyMDRkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i6veHynDrHke_iJAsrZUyx4ADyDpF-1YoZJTeL9UQ9c",
        },
      })
      .then((res) => setSimilarData(res.data.results))
      .catch((err) => console.log(err));
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: Smooth scrolling animation
    });
  };


  useEffect(() => {
    getDetail();
    getRecommendedData();
    getSimilarData();
  }, [id]);

  return !isLoading ? (
    <div className="z-10 relatvie text-white">
      <div className="z-40 fixed top-1 left-[50%] -translate-x-[20%]">
      <Search/>
      </div>
      <div className="z-10 relative h-screen w-full">
        
        {<img
          className="z-20 h-full w-full object-cover object-[50%_30%]" loading="eager"
          src={`https://image.tmdb.org/t/p/original/${
            productDetail.backdrop_path ||
            productDetail.poster_path ||
            productDetail.profile_path
          }`}
          alt=""
        />}
        <div
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)`,
          }}
          className="absolute z-30 flex flex-col justify-end bottom-0 left-0 h-full w-[100%] "
        >
          <div className="px-4 h-[60%] w-[70%]">
            <h2 className="text-white text-[4.2vw] font-bold leading-none">
              {productDetail.name ||
                productDetail.title ||
                productDetail.original_title ||
                productDetail.original_name}
            </h2>

            <div className="flex gap-4 text-white text-[1.3vw] mt-4">
              <p className="">
                <i className="ri-megaphone-fill text-[#e50914] mr-1 text-[1.4vw]"></i>
                {productDetail.release_date ||
                  productDetail.first_air_date ||
                  "No Information"}
              </p>
              <p className="text-[#ffcb00] text-[1.3vw] font-semibold">
                <i className="ri-star-fill mr-[0.4vw] text-[1.4vw]"></i>
                {productDetail.profile_path != undefined
                  ? productDetail.known_for_department
                  : productDetail.vote_average &&
                    productDetail.vote_average.toFixed(1)}
              </p>
            </div>

            <button className="bg-[#e50914] mt-5 text-[1.4vw] flex items-center gap-1 text-white px-4 py-2 rounded shadow-[0px_0px_50px_rgba(0,0,0,0.10)] shadow-[#e50914]">
              Watch Now <i className="ri-play-fill text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="z-40 px-4 mt-2 text-white w-full text-[1vw] flex justify-between font-black leading-none">
          {productDetail.length!=0 && productDetail.tagline.split("").map((element, index) => (
            <span className="fontGalactic" key={index}>{element.toUpperCase()}</span>
          ))}
        </div>
      <div className="px-4 mt-7">
        <h4 className="text-2xl font-bold">About Movie</h4>
        <p className="text-white mt-2 text-base text-[1.4vw]">
          {productDetail.overview && productDetail.overview}
        </p>
      </div>

      <div className="px-4">
        {recommendedData.length!=0 && <h2 className="font-semibold text-2xl mt-10 mb-3">Recommendation</h2>}
        <div className=" flex flex-wrap gap-[1.3vw]" onClick={(e)=> {scrollToTop(); getDetail()}}>
          {recommendedData.map((element, index) => (
            <Card key={index} dataType={cat} element={element} />
          ))}
        </div>

        {similarData.length!= 0 && <h2 className="font-semibold text-2xl mt-10 mb-3">Similar</h2>}
        <div className=" flex flex-wrap gap-[1.3vw]" onClick={(e)=> {scrollToTop(); getDetail()}}>
          {similarData.length!= 0 && similarData.map((element, index) => (
            <Card key={index} dataType={cat} element={element} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Detail;
