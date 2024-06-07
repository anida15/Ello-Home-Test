import React, { useState, useEffect, useRef } from 'react';
import {
  HomeIcon,
  UserPlusIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import './SideBar.css'

const SideBar = () => {
  const sidebarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
 

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (width > 1090) {
      setOpen(true);

    } else {
      setOpen(false);
    }
  }, [width]);


  

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);    
      }
    };
    if (open) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [open]);

  const handleOpen = () => {
    setOpen(!open);
     
  };

  return (
    <nav ref={sidebarRef} className={`navholder opacity-100 px-4 py-2 text-white bg-gray-800       transition-all duration-500 ease-in-out ${open ? 'w-64 h-screen' : 'w-10 h-12'}`}>
      <ul className='navigation'>
        <Bars3Icon onClick={handleOpen} className={`h-5 w-5 mr-2 cursor-pointer ${!open ? 'block' : 'hidden'}`} />
        <XMarkIcon onClick={handleOpen} className={`h-5 w-5 mr-2 cursor-pointer ${open ? 'block' : 'hidden'}`} />
        

        <li className="navlist my-3 flex items-center">
          <a href='/'>  
          <span className="flex mt-2 hover:bg-gray-900 focus:bg-dark-900 rounded-lg" to="/">
            <HomeIcon className={`navIcons h-5 w-5 mr-2 ${open ? 'block' : 'hidden'} `} />
            <span className={`navNames ${open ? 'block' : 'hidden'}`}>Home</span>
          </span>
           </a>
        </li>
        <hr className={`${open ? 'block  bg-yellow-500' : 'hidden'} `} />
        <li className="navlist my-3 flex items-center">
         <a href="/student-teacher?status=teacher">
          <span className="flex mt-2 hover:bg-gray-900 focus:bg-dark-900 rounded-lg"  >
            <UserIcon className={`navIcons h-5 w-5 mr-2 ${open ? 'block' : 'hidden'} `} />
            <span className={`navNames ${open ? 'block' : 'hidden'}`}>Teacher</span>
          </span>
          </a>
        </li>
        <hr className={`${open ? 'block  bg-yellow-500' : 'hidden'} `} /> 
         <li className="navlist my-3 text-red-500 flex items-center">
          <a href="/student-teacher?status=student">
          <span className="flex mt-2 hover:bg-gray-900 focus:bg-dark-900 rounded-lg"  >
            <UserPlusIcon className={`navIcons h-5 w-5 mr-2 ${open ? 'block' : 'hidden'} `} />
            <span className={`navNames ${open ? 'block' : 'hidden'}`}>Student</span>
          </span>
          </a>
        </li>
        <hr className={`${open ? 'block  bg-yellow-500' : 'hidden'} `} />

      </ul>
    </nav>
  );
};

export default SideBar;
