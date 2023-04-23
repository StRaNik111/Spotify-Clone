import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";



const SongCard = ({ data, activeSong, isPlaying, song, i }) => {
  // debugger
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))

  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }
  return (
    <div className=" flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slidedown rounded-lg cursor-pointer">
      <div className=" relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause song={song}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={song.share.image || song.images.coverart || 'https://www.shazam.com/resources/6d5bc923785ad71cf6206e7c624a1d77f98274e2/nocoverart.jpg'} alt="Song image" />
      </div>
      <div className="mt-3 flex flex-col">
        <p className=" font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.key}`}>
            {song.title}
          </Link>
        </p>
        <p className=" text-sm truncate text-gray-300 mt-1">
          <Link to={song.artists ? `/artists/${song.artists[0].adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  )
}



export default SongCard;
