import React, { useRef } from 'react'
import ReactPlayer from 'react-player'

const Trailer = ({isPlay, trailerKey}) => {
  const videoDetails = useRef();
  return (
    <div className={`absolute top-0 left-0 ${isPlay? 'z-[99]': 'z-0'} h-screen w-full `}>
        <ReactPlayer ref={videoDetails} loop height={'100%'} width={'100%'}  playing={isPlay} url={`https://www.youtube.com/watch?v=${trailerKey}`}/>
    </div>
  )
}

export default Trailer