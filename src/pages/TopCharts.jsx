import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from "../components";
import { shazamAPI } from '../redux/servises/shazamAPI';


const TopCharts = () => {

	const { activeSong, isPlaying } = useSelector(state => state.player)
	const { data, isFetching } = shazamAPI.useGetTopChartsPageQuery()

	if (isFetching) return <Loader title='Loading songs around you' />
	return (
		<div className=' flex flex-col'>
			<h2 className=' font-bold text-3xl text-white mb-10'>
				Top Charts

			</h2>
			<div className=' flex flex-wrap sm:justify-start justify-center gap-8 '>
				{data?.tracks.map((song, i) => (
					<SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data} />
				))}
			</div>
		</div>
	)
};

export default TopCharts;
