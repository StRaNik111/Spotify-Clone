import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { shazamAPI } from "../redux/servises/shazamAPI";



const SongDetails = () => {
	const dispatch = useDispatch()
	const { songid } = useParams()
	const { activeSong, isPlaying } = useSelector(state => state.player)
	const { data: songData, isFetching: isFetchingSongDetails } = shazamAPI.useGetSongDetailsQuery(songid)
	const { data: relatedSongs, isFetching } = shazamAPI.useGetSongsFromSearchQuery(songData?.subtitle)


	const handlePauseClick = () => {
		dispatch(playPause(false))

	}
	const handlePlayClick = (song, data, i) => {
		dispatch(setActiveSong({ song, data, i }))
		dispatch(playPause(true))
	}



	if (isFetchingSongDetails || isFetching) return <Loader title='Searching song details' />

	return (
		<div className=" flex flex-col ">
			<DetailsHeader artistId='' songData={songData} />
			<div className=" mb-10">
				<h2 className=" text-white text-3xl font-bold">Lyrics:</h2>
				<div className=" mt-5">
					{songData?.sections[1].type === 'LYRICS'
						? (songData?.sections[1].text.map((line, i) => {
							return <p key={i} className=" text-gray-400 text-base my-1" >{line}</p>
						}))
						: (<p className=" text-gray-400 text-base my-1">Sorry, no lyrics found!</p>)
					}
				</div>
			</div>
			<RelatedSongs data={relatedSongs?.tracks?.hits} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick} />
		</div>
	)
};

export default SongDetails;
