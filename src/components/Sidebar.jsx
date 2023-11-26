import React from 'react'
import profilimg from '../assets/Ellipse 1.png'
import { FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div>
        <img src={profilimg} className='profilimg'/>
      </div>
      <div className='icons'>
        <Link to="/page/home" className='active'>
          <FaHome className='icon '/><br/>
        </Link>
        <Link to="/page/msg">
          <FaMessage className='icon'/><br/>
        </Link>
        <Link to="/page/notification">
          <IoIosNotifications className='icon'/><br/>
        </Link>
        <Link to="/page/setting">
          <CiSettings className='icon'/>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar