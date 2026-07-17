//import React from 'react'
import { Link } from 'react-router-dom'
import { assetPath } from '@/lib/helpers'

export const LogoContainer = () => {
  return (
   
      <Link to={"/"}>
  <img src={assetPath("assets/svg/sslogo.png")} alt="" className='min-w-10 min-h-10 object-contain'/>
   </Link>
  )
}

//export default LogoContainer
