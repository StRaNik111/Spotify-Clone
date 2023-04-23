import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import 'swiper/css';
import 'swiper/css/free-mode';
import { shazamAPI } from "../redux/servises/shazamAPI";
import Loader from "./Loader";

const TopChartCard = ({ song, i, activeSong, isplaying, handlePauseClick, handlePlayClick }) => {

  return (
    <div className=" w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">

      <h3 className=" font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className=" flex-1 flex flex-row justify-between items-center">
        <img className=" w-20 h-20 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
        <div className=" flex flex-1 flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className=" text-xl font-bold text-white">{song.title}</p>
          </Link>

          <Link to={`/artists/${song?.artists[0].adamid || song?.key}`}>
            <p className="text-ase font-bold  text-gray-300 m-1">{song?.subtitle}</p>
          </Link>

        </div>
      </div>
      <PlayPause isplaying={isplaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
    </div>
  )
}

const TopPlay = () => {
  // const { data } = shazamAPI.useGetTopChartsQuery()
  const { data } = shazamAPI.useGetTopChartsPageQuery()
  const dispatch = useDispatch()
  const { activeSong, isplaying } = useSelector(state => state.player)
  const divRef = React.useRef(null)
  const handlePauseClick = () => {
    dispatch(playPause(false))

  }
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  React.useEffect(() => {
    divRef?.current.scrollIntoView({ behavior: 'smooth' });
  }, [])


  const topPlays = data?.tracks.slice(0, 5)
  return (
    <div
      className=" xl:ml-6 ml-0 xl: mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
      ref={divRef}>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center" >
          <h2 className=" text-white font-bold text-2xl" >Top Charts</h2>
          <Link to='/top-charts'>
            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className=" mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => {

            return <TopChartCard
              activeSong={activeSong}
              isplaying={isplaying}
              key={song?.key}
              song={song}
              i={i}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          }
          )}
        </div>
      </div>
      <div className=" w-full flex flex-col mt-8 ">
        <div className="flex flex-row justify-between items-center" >
          <h2 className=" text-white font-bold text-2xl" >Top Artists</h2>
          <Link to='/top-artists'>
            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className=" mt-4"
        >
          {topPlays?.map((song) => {

            return <SwiperSlide key={song?.key} style={{ width: '25%', height: 'auto' }} className=" shadow-lg rounded-full animate-slideright">
              <Link to={`/artists/${song?.artists[0].adamid || song?.key}`}>
                {/* <Link to={`/artists/0`}> */}
                <img src={song?.images?.background} alt="Artist Avatar" className=" rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          }
          )}
        </Swiper>
      </div>
    </div>
  )

};

export default TopPlay;