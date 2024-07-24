import React, { useState } from 'react';
// import {FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
// import { RxCaretDown } from "react-icons/rx";
// import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function  Header () {
 const [dropdown, setDropdown] = useState(false)
  const handleDropdownToggle = () => {
    setDropdown(!dropdown)
  }
  return (
    <>
    <div className='flex items-center justify-between pl-17 p-4 bg-white shadow-sm'>
         <Link
         to='/Home'
         className='font-bold'>
         <p>LOGO</p>
         </Link>
         <div className='relative'>
            <div className='flex items-center space-x-4 pr-10'>
                <div className='flex items-center space-x-2 cursor-pointer ' onClick={handleDropdownToggle}>
                    <div className='flex flex-col'>
                        <span className='text-text-main font-roboto-medium  '>Hamza Bourkha</span>
                        <span className='text-text-main font-roboto-medium text-sm'>Directeur Pédagogique</span>

                    </div>
                
                </div>

            </div>

         </div>
    </div>
    </>
  )
    
} export default Header