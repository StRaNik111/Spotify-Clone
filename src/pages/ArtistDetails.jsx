

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { shazamAPI } from "../redux/servises/shazamAPI";
import React from "react";



const ArtistDetails = () => {
  const { id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector(state => state.player)
  const { data: artistData, isFetching: isFetchingArtistDetails } = shazamAPI.useGetArtistDetailsQuery(artistId)


  const { data: relatedSongs, isFetching } = shazamAPI.useGetSongsFromSearchQuery(artistData?.data[0]?.attributes?.name)

  const handlePauseClick = () => {
    dispatch(playPause(false))

  }
  const handlePlayClick = (song, data, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }


  if (isFetchingArtistDetails || isFetching) return <Loader title='Searching artist details' />
  return (
    <div className=" flex flex-col ">
      <DetailsHeader artistId={artistId} artistData={artistData.data[0]} />

      <RelatedSongs data={relatedSongs?.tracks?.hits} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick} />
    </div>
  )

};

export default ArtistDetails;

