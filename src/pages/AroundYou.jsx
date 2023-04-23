import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from "../components";
import { shazamAPI } from '../redux/servises/shazamAPI';


const AroundYou = () => {
	const [country, setCountry] = React.useState('')
	const [loading, setLoading] = React.useState(true)
	const { activeSong, isPlaying } = useSelector(state => state.player)
	const { data, isFetching } = shazamAPI.useGetTopChartsQuery('20', 10)
	React.useEffect(() => {
		// at_b26f3HA6yPBpthkGiYbPUXfVn3IOQ
		axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_b26f3HA6yPBpthkGiYbPUXfVn3IOQ&ipAddress=8.8.8.8`)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false))
	}, [country])
	if (isFetching && loading) return <Loader title='Loading songs around you' />
	return (
		<div className=' flex flex-col'>
			<h2 className=' font-bold text-3xl text-white mb-10'>
				Around You <span className=' font-bold'>{country}</span>

			</h2>
			<div className=' flex flex-wrap sm:justify-start justify-center gap-8 '>
				{data?.tracks.slice(10, 20).map((song, i) => (
					<SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data} />
				))}
			</div>
		</div>
	)
};

export default AroundYou;
