import React,{useEffect, useState} from 'react'
import { FaRegUser } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";
import { Login } from '../Routes/Login';
import { GenerateShortUrl } from '../Routes/GenerateShortUrl';
import Modal from './Modal';
export const NavBar = () => {
      const navigate = useNavigate();
  const [validated,setValidated]=useState(false)
  const [showModal,setShowModal]=useState(false)
useEffect(()=>{
  const authorization = localStorage.getItem("authorization");
  const expiry=localStorage.getItem("expiry");
  const expiryDate=new Date(expiry)
  const currentDate=new Date()
  if(authorization&& expiryDate>currentDate)
    setValidated(true)
},[])
const closeModal = () => setShowModal(false);

const logout=async()=>{
  localStorage.clear()
  setShowModal(false)
  setValidated(false)
  navigate("/");

}
  return (
    <div className="h-[120px] laptop:h-[75px] shadow-lg bg-white w-[100%] flex justify-center laptop:px-[10%]">
    <div className="h-[100%] w-[100%] tablet:w-[95%] laptop:w-[90%]  flex laptop:justify-between items-center">
      <div className="flex w-[50%]  flex-col laptop:flex-row ">
        <div className="h-[40px]  pt-[4px] text-black flex items-center justify-start font-bold font-mono text-[19px]">
          URL-SHORTENER
        </div>
        {/* content topics */}
      </div>
      <div className=" w-[50%] flex gap-[10px]  justify-end mr-[30px] tablet:mr-0 tablet:gap-[20px] pl-[10px]">
        {/* <Search /> */}
        <div className="h-[40px]  flex  flex-row gap-[30px] laptop:gap-[50px] justify-end mt-[2px] tablet:mt-[9px]">
            <Link to='/generate-short-url' element={<GenerateShortUrl/>} className='flex flex-col justify-center items-center'>
                <FaWpforms size={27} className='cursor-pointer'></FaWpforms>
                <span className='text-[9px] font-bold'>Form</span>
            </Link>
            {validated?
             <div className='flex flex-col justify-center items-center'>
             <CgLogOut size={27} className="cursor-pointer " onClick={()=>setShowModal(true)}/>
             </div>:
          <Link to="/login" element={<Login/>} className='flex flex-col justify-center items-center'>
          <FaRegUser size={27} className="cursor-pointer " />
          </Link>
          }
        </div>
      </div>
      {showModal?
      <Modal isOpen={showModal} onClose={closeModal}>
        <div className="">
          <h1 className="text-[16px] text-black font-semibold px-[15px] pt-[5px] my-[10px]">
            Log Out
          </h1>
            <div className="bg-[#f0f0f0] text-[black] p-[15px] text-[15px] font-sans">
              Are your sure you want to
              <strong> Logout </strong>from the 
              <strong> system </strong>
              ? If so, then please click the button <strong>Logout</strong> down below!!
            </div>
            <div className="bg-white px-[10px]">
              <div className="w-[120px] my-[15px] h-[30px] flex items-center justify-center bg-[#a25dda] font-semibold text-white float-end rounded-lg cursor-pointer" onClick={logout}>Logout</div>
            </div>        
        </div>
      </Modal>
      :''
    }
    </div>
  </div>
  )
}
