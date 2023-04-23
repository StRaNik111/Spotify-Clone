import SongBar from "./SongBar";



const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId }) => {
  // debugger
  return (
    <div className=" flex flex-col">
      <h1 className=" font-bold text-3xl text-white">Related Songs:</h1>
      <div className=" mt-6 w-full flex flex-col  ">
        {data?.map((song, i) => (
          <SongBar key={`${song.track.key} - ${artistId}`} artistId={artistId} song={song.track} i={i} handlePlayClick={handlePlayClick} handlePauseClick={handlePauseClick} isPlaying={isPlaying}
            activeSong={activeSong} />
        ))}
      </div>
    </div>
  )
}

export default RelatedSongs;
