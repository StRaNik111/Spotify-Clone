import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const shazamAPI = createApi({
	reducerPath: 'shazamAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam.p.rapidapi.com',
		prepareHeaders: (headers) => {
			headers.set('X-RapidAPI-Key', 'f295feb704mshc3f58d3da5ce8c3p115ec2jsn14f230663b4d')
			return headers
		}
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => `/charts/track` }),
		getSongDetails: builder.query({ query: (songId) => `/songs/get-details?key=${songId}` }),
		getRelatedSongs: builder.query({ query: (songId) => `/songs/list-recommendations?key=${songId}` }),
		getTopChartsPage: builder.query({ query: () => `/songs/list-recommendations?key=484129036` }),
		getArtistDetails: builder.query({ query: (artistId) => `/artists/get-details?id=${artistId}` }),
		getSongsFromSearch: builder.query({ query: (name) => `/search?term=${name}` }),
	})
})

export const { useGetTopCharts, getSongDetails, getRelatedSongs, getArtistDetails, getTopChartsPage, getSongsFromSearch } = shazamAPI