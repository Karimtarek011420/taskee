import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SearchBox from '../Searchbox/Searchbox'

export default function Layout() {
  return <>
  <Navbar/>
  <SearchBox/>
  
  <Outlet/>
  </>
  
}

