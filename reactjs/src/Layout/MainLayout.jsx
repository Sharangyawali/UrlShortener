import React from 'react'
import { NavBar } from '../Components/NavBar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}
