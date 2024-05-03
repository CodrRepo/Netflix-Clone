import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./partials/Loading";
import Card from "./partials/Card";
import Search from "./partials/Search";
import Trailer from "./partials/Trailer";
import { motion, transform } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import HorizontalScroll from "./partials/HorizontalScroll";
gsap.registerPlugin(useGSAP);

const Detail = () => {
  const { cat, id } = useParams();
  const widthCalulate = useRef();
  
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [trailerKey, setTrailerKey] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const navigate = useNavigate();
  const [btnPos, setBtnPos] = useState({
    top: "0",
    left: "0",
    height: "9vw",
    width: "9vw",
  });
  const btnMove = useRef(null);
  const [cast, setCast] = useState([]);
  
  useGSAP(
    () => {
      gsap.to(".box", { x: btnPos.left, y: btnPos.top, ease: "power2.out" });
    },
    [btnPos, btnMove],
    { scope: widthCalulate }
  );
  
  
  function handleMouseEnterGsap() {
    gsap.to(".box", { scale: 1.5, ease: "power2.out", duration: 0.4 });
  }
  function handleMouseLeaveGsap() {
    gsap.to(".box", { scale: 1, ease: "power2.out", duration: 0.4 });
  }
  
  async function getDetail() {
    console.log(cat, id)
    setIsLoading(true);
    await axios
    .get(`${cat}/${id}`)
    .then((res) => {
      res.status !== 200 ? navigate('/'): setProductDetail(res.data);       
      })
      .catch((err) => alert(err));
      setIsLoading(false);
    }
    
    function getRecommendedData() {
      axios
      .get(`${cat}/${id}/recommendations`)
      .then((res) => {
        setRecommendedData(res.data.results);
      })
      .catch((err) => console.log(err));
    }
    
    function getMovieCredits() {
      axios
      .get(`${cat}/${id}/movie_credits`)
      .then((res) => {
        setRecommendedData(res.data.cast);
      })
      .catch((err) => console.log(err));
    }
    
    function getTvCredits() {
      axios
      .get(`${cat}/${id}/tv_credits`)
      .then((res) => {
        setSimilarData(res.data.cast);
      })
      .catch((err) => console.log(err));
  }
  
  function getCredits() {
    axios
    .get(`/${cat}/${id}/credits`)
    .then((res) => setCast(res.data.cast))
    .catch((err) => console.log(err));
  }
  
  function getSimilarData() {
    axios
    .get(`${cat}/${id}/similar`)
    .then((res) => setSimilarData(res.data.results))
    .catch((err) => console.log(err));
  }
  
  async function getVideos() {
    await axios.get(`/${cat}/${id}/videos`).then((res) => {
      let trailerList = res.data.results.filter(
        (element) => element.type === "Trailer" && element.official === true
      )
      
      trailerList.forEach((trailer, index)=> trailer.name.includes("Hindi") && setTrailerKey(trailer.key)) === undefined && (trailerList.length>0 && setTrailerKey(trailerList[0].key))
    }
  );
}
window.onload = ()=>{getDetail()}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Optional: Smooth scrolling animation
  });
};

  const handleMouseMove = (event) => {
    const containerRect = widthCalulate.current.getBoundingClientRect();
    const containerStyle = window.getComputedStyle(widthCalulate.current);
    const marginLeftPercentage = parseFloat(containerStyle.marginLeft); // Get the margin-left in percentage
    const marginTopPercentage = parseFloat(containerStyle.marginTop); // Get the margin-top in percentage
    const marginLeftPixels = (marginLeftPercentage / 100) * containerRect.width;
    const marginTopPixels = (marginTopPercentage / 100) * containerRect.height;
    setBtnPos({
      left: `${
        event.clientX - containerRect.left - marginLeftPixels < 0
          ? 0 - btnMove.current.offsetWidth / 2
          : event.clientX -
            containerRect.left -
            marginLeftPixels -
            btnMove.current.offsetWidth / 2
      }px`,
      top: `${
        event.clientY - containerRect.top - marginTopPixels >
        widthCalulate.current.clientHeight
          ? widthCalulate.current.clientHeight - btnMove.current.offsetHeight
          : event.clientY -
            containerRect.top -
            marginTopPixels -
            btnMove.current.offsetHeight
      }px`,
    });
  };

  useEffect(() => {
    getDetail();
    scrollToTop();
    setIsPlay(false);
    setTrailerKey("")
    cat !== "person" ? getRecommendedData() : getMovieCredits();
    cat !== "person" ? getSimilarData() : getTvCredits();
    cat !== "person" && getVideos();
    cat !== "person" && getCredits();
  }, [id, cat]);

  return !isLoading ? (
    <div className="z-10 relative text-white">
      <div className="z-40 fixed left-[0%]  ml-[10%] md:left-[50%] md:-translate-x-[50%] top-1 xl:top-[vh] w-[30%]">
        <Search />
      </div>
      <div className="z-10 relative h-[80vh] md:h-screen w-full">
        <div>
          <div className=" absolute top-0 left-0 h-full w-full ">
            <div
              ref={widthCalulate}
              onMouseEnter={handleMouseEnterGsap}
              onMouseLeave={() => {
                setBtnPos({ top: "33vw", left: "2.5vw" }),
                  handleMouseLeaveGsap();
              }}
              onMouseMove={(event) => {
                handleMouseMove(event);
              }}
              className="absolute z-[100] top-0 left-0 h-full w-[100vw] bg-[#00000000]"
            >
              {cat !== 'person' && <button
                ref={btnMove}
                onClick={() => {
                  trailerKey.length > 0 && setIsPlay((previous) => !previous);
                }}
                className={`bg-[#e50914] box scale-[1]  rounded-full px-4 py-3 mt-5 absolute z-[200] text-[1.4vw] flex items-center justify-center gap-1 text-white shadow-[0px_0px_50px_rgba(0,0,0,0.10)] shadow-[#e50914]`}
              >
                {trailerKey.length > 0 ? (
                  <i
                    className={`ri-${isPlay ? "pause" : "play"}-fill text-xl`}
                  ></i>
                ) : (
                  <p className={`p-2 rounded-full`}><i className="ri-video-off-fill"></i></p>
                )}
              </button>}
            </div>
            {trailerKey.length > 0 && (
              <Trailer isPlay={isPlay} trailerKey={trailerKey} />
            )}
          </div>
        </div>
        {
          <img
            className="z-[50] absolute top-0 left-0 h-full w-full object-cover object-[50%_30%]"
            loading="eager"
            src={
              (productDetail.backdrop_path ||
                productDetail.poster_path ||
                productDetail.profile_path) != undefined
                ? `https://image.tmdb.org/t/p/original/${
                    productDetail.backdrop_path ||
                    productDetail.poster_path ||
                    productDetail.profile_path
                  }`
                : `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`
            }
            alt=""
          />
        }
        <div
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,1) 100%)`,
          }}
          className="absolute overflow-auto z-[60] flex flex-col justify-end bottom-0 left-0 h-full w-[100%] "
        >
          <div className="px-4 h-[60%] w-[70%]">
            <div className="genres flex gap-2 whitespace-nowrap font-semibold text-sm text-white mb-2">
              {productDetail.genres != undefined &&
                productDetail.genres.map((element, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <p className="text-[4vw] md:text-[1.4vw]">{element.name}</p>{" "}
                    <span className="text-[#ffcb00]">
                      {index != productDetail.genres.length - 1 && "|"}
                    </span>
                  </div>
                ))}
            </div>
            <h2 className="text-white text-[15vw] md:text-[4.2vw] font-bold leading-none">
              {productDetail.name ||
                productDetail.title ||
                productDetail.original_title ||
                productDetail.original_name}
            </h2>

            <div className="flex gap-4 text-white text-[3vw] md:text-[1.3vw] mt-4">
              <p className="text-[3vw] md:text-[1.3vw]">
                <i className="ri-megaphone-fill text-[#e50914] mr-1 text-[3.1vw] md:text-[1.4vw]"></i>
                {productDetail.release_date ||
                  productDetail.first_air_date || 
                  productDetail.birthday ||
                  productDetail.deathday ||
                  "No Information"}
              </p>
              <p className="text-[#ffcb00] text-[3vw] md:text-[1.3vw] font-semibold">
                <i className="ri-star-fill mr-[0.4vw] text-[3.1vw] md:text-[1.4vw]"></i>
                {productDetail.profile_path != undefined
                  ? productDetail.known_for_department
                  : productDetail.vote_average &&
                    productDetail.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="z-40 px-4 mt-2 text-white w-full text-[1.8vw] md:text-[1vw] flex justify-between font-black leading-none">
        {productDetail.length != 0 &&
          productDetail.tagline &&
          productDetail.tagline.split("").map((element, index) => (
            <span className="fontGalactic" key={index}>
              {element.toUpperCase()}
            </span>
          ))}
      </div>
      <div className="px-4 mt-7">
        <h4 className="text-[6.5vw] md:text-[2.3vw] font-bold">Overview</h4>
        <p className="text-white mt-2 text-[4vw] md:text-[1.4vw] lg:leading-[2vw]">
          {productDetail.overview || productDetail.biography}
        </p>
      </div>

      {cat !== "person" && (
        <div className="px-4 mt-[8vh]">
          <h2 className="text-[6.5vw] md:text-[2.3vw] font-bold">Cast</h2>
          <div className="">
            <HorizontalScroll data={cast} category={'person'} dataHeading={""}/>
          </div>
        </div>
      )}

      <div className="px-4">
        {recommendedData.length != 0 && (
          <h2 className="font-semibold text-[6.5vw] md:text-[2.3vw] mt-[9vh] md:mt-[2vh] mb-3">
            {cat !== "person" ? "Recommendation" : "Movie Credits"}
          </h2>
        )}
        <div
          className=" flex flex-wrap gap-[2.2vw] md:gap-[1.3vw] md:justify-start"
          onClick={(e) => {
            scrollToTop();
            getDetail();
          }}
        >
          {recommendedData.map((element, index) => (
            <Card
              key={index}
              dataType={cat === "person" ? "movie" : cat}
              element={element}
            />
          ))}
        </div>

        {similarData.length != 0 && (
          <h2 className="font-semibold text-[6.5vw] md:text-[2.3vw] mt-[9vh] md:mt-[14vh] lg:mt-[8vh] mb-3">
            {cat !== "person" ? "Similar" : "TV Credits"}
          </h2>
        )}
        <div
          className=" flex flex-wrap gap-[2.2vw] md:gap-[1.3vw] md:justify-start"
          onClick={(e) => {
            scrollToTop();
            getDetail();
          }}
        >
          {similarData.length != 0 &&
            similarData.map((element, index) => (
              <Card
                key={index}
                dataType={cat === "person" ? "tv" : cat}
                element={element}
              />
            ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Detail;
