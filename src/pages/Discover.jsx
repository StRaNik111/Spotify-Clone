import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { shazamAPI } from "../redux/servises/shazamAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";



const Discover = () => {
	const dispatch = useDispatch()
	const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player)
	// const { data, error, isLoading } = shazamAPI.useGetTopChartsQuery()
	const { data: ganreData, isLoading } = shazamAPI.useGetSongsFromSearchQuery(genreListId)

	const ganreTitle = genres.find(({ value }) => value === genreListId)?.title
	if (isLoading) return <Loader title='Loader songs...' />

	return (
		<div className="flex flex-col">
			<div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
				<h2 className=" font-bold text-3xl text-white text-left">
					Discover {ganreTitle}
				</h2>
				<select value={genreListId || 'Pop-hop'} onChange={(e) => dispatch(selectGenreListId(e.target.value))}
					className="text-white bg-black to-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
					{genres.map(ganre => (
						<option key={ganre.value} value={ganre.value}>{ganre.title}</option>
					))}
				</select>
			</div>
			<div className="flex flex-wrap sm:justify-start justify-center gap-8 ">
				{/* {data.tracks.slice(0, 10).map((song, i) => ( */}
				{ganreData.tracks.hits.map((song, i) => (
					<SongCard data={ganreData} activeSong={activeSong} isPlaying={isPlaying} key={song.track.key} song={song.track} i={i} />
				))}
			</div>
		</div>
	)
}

export default Discover;
