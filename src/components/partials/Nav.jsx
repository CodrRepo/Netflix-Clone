import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  const navItemData = [
    { name: "Home", icon: "ri-home-fill" },
    { name: "Trending", icon: "ri-fire-fill" },
    { name: "Popular", icon: "ri-bard-fill" },
    { name: "Movies", icon: "ri-clapperboard-fill" },
    { name: "TV Shows", icon: "ri-tv-fill" },
    { name: "People", icon: "ri-team-fill" },
    { name: "About SCSP", icon: "ri-team-fill" },
    { name: "Contact Us", icon: "ri-close-circle-line" },
  ];

  const linkDetails = useRef();
  const [navItemPos, setNavItemPos] = useState(-1);

  return (
    <>
      <div className="nav-container w-full md:w-[22vw] z-40 fixed overflow-scroll bottom-[0px] md:top-[0px] left-0 bg-[#0c0c10] md:min-h-screen md:pt-7 py-2">
        <nav className="w-[100%]  md:w-[70%] md:ml-[15%] flex items-center justify-center md:block">
          <svg
            className="hidden md:block"
            viewBox="0 0 170 30"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
          >
            <g>
              <path
                fill="#e50914"
                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
              ></path>
            </g>
          </svg>

          <h3 className="text-white mt-7 text-[1.8vw] hidden md:block">New Feeds</h3>
          <div
            className="mb-3 mt-2 w-full relative overflow-hidden"
            onMouseLeave={() => setNavItemPos(-1)}
          >
            <ul className="flex justify-between px-4 md:block">
              {navItemData
                .slice(0, navItemData.length - 2)
                .map((element, index) => (
                  <Link
                    key={index}
                    ref={linkDetails}
                    to={`/${
                      element.name.toLowerCase() === "home"
                        ? ""
                        : element.name.toLowerCase()
                    }`}
                    onMouseEnter={() => {
                      setNavItemPos(index);
                    }}
                    className="cursor-default"
                  >
                    <motion.li
                      initial={"initial"}
                      key={index}
                      className="z-30 overflow-hidden md:h-[4.3vw] items-center whitespace-nowrap relative text-[#ffffffdd] flex text-base"
                    >
                      <div className="flex relative z-40">
                        <span className=" text-[#ff000d] text-[6vw] md:text-[1.5vw] md:w-[2.2vw]">
                          <motion.i className={`${element.icon}`}></motion.i>
                        </span>
                        <h2 className="text-[1.5vw] hidden md:block">{element.name}</h2>
                      </div>
                    </motion.li>
                  </Link>
                ))}
            </ul>
            <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
              <motion.div
                animate={{ y: `${4.3 * navItemPos}vw` }}
                transition={{
                  transition: `transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)`,
                }}
                className={`absolute z-0 ${
                  navItemPos >= 0 && "bg-[#ff000d]"
                } left-0 h-[4.1vw] w-full hidden md:block`}
              ></motion.div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
