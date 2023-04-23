

import React from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from 'react-icons/fi'

const Searchbar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${searchTerm}`)
  }
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className=" p-2 text-gray-400 focus-within: text-gray-600">
      {/* <label htmlFor="search-field">
        Search all songs
      </label> */}
      <div className=" flex flex-row js justify-start items-center">
        <FiSearch className=" w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search" value={searchTerm}
          className=" flex-1 bg-transparent border-none p-4 text-white placeholder-gray-500 outline-none text-base"
          onChange={(e) => setSearchTerm(e.target.value)}

        />
      </div>
    </form>
  )
}



export default Searchbar;