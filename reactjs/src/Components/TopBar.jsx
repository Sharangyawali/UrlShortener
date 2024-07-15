import React from 'react'
import { Link,useLocation } from 'react-router-dom';
import { GenerateShortUrl } from '../Routes/GenerateShortUrl';
import { GetActualUrl } from '../Routes/GetActualUrl';

const TopBar = () => {
    const location = useLocation();
    console.log(location);
  return (
    <div className='w-[100%] h-[70px] flex bg-[#e6e6e6] justify-start px-[50px] gap-[30px] items-center'>
    <div className='text-[black] font-serif relative font-bold'>
      <Link to='/generate-short-url' element={<GenerateShortUrl/>} >Generate Short Url</Link>
      {location.pathname==='/generate-short-url'?
      <div className='w-[100%] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
      :''
      }
     </div>
    <div className='text-[black] font-serif relative font-bold'>
      <Link to='/get-actual-url' element={<GetActualUrl/>}>Get Actual Url</Link>
      {location.pathname==='/get-actual-url'?
      <div className='w-[100%] h-[5px] rounded-lg bg-[#a16db1] absolute top-[43px]'></div>
      :''
      }
     </div>
    
  </div>
  )
}

export default TopBar
