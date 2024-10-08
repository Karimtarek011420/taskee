import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SearchBox from '../Searchbox/Searchbox'

export default function Layout() {
  const Location = useLocation()

  const Pathname = Location.pathname

  return <>
    <Navbar />
    {Pathname.includes("job/") ? "" : <SearchBox />}
    <Outlet />
  </>

}

