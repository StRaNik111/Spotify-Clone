
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard, ArtistCard } from "../components";
import { shazamAPI } from '../redux/servises/shazamAPI';


const TopArtists = () => {
	const { data, isFetching } = shazamAPI.useGetTopChartsPageQuery()

	if (isFetching) return <Loader title='Loading songs around you' />


	return (
		<div className=' flex flex-col'>
			<h2 className=' font-bold text-3xl text-white mb-10'>
				Top Artists

			</h2>
			<div className=' flex flex-wrap sm:justify-start justify-center gap-8 '>
				{data?.tracks.slice(10, 20).map((track) => (
					<ArtistCard key={track.key} track={track} />
				))}

			</div>
		</div>
	)
};






export default TopArtists;
