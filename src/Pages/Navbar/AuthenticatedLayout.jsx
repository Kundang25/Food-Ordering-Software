import Navbar from "./page";
import { Outlet } from "react-router";

import React from 'react'

const AuthenticatedLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default AuthenticatedLayout
