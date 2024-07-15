import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../Components/TopBar'
export const TopBarLayout = () => {
  return (
    <div>
        <TopBar/>
        <Outlet/>
    </div>
  )
}
