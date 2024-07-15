import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/login.css";
import { Login } from "./Login";
import { CircularProgress } from '@mui/joy'

export const Register = () => {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(false);
  const [eye, setEye] = useState(true)
  const [confirmEye,setConfirmEye]=useState(true)
  const toggleChange = () => {
      setEye((prev) => !prev)
  }


  const rgexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const collectdata = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_API_URL);

    if (
      name.length <= 3 ||
      password.length <= 5 ||
      password.length>16||
      !rgexp.test(email)||
      password!==confirmPassword
    ) {
      setErrors(true);
    } else {
      setLoading(true)
      let result = await fetch(`${process.env.REACT_APP_API_URL}auth/register`, {
        method: "post",
        body: JSON.stringify({ userName:name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      setLoading(false)
      result = await result.json();
      if (result.success === true) {
        console.log(result.message);
        toast.success(result.message,{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
        navigate('/login');
      } else if (result) {
        console.log(result.message);
        toast.error(result.message,{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    }
  };
  return (
    <main className="flex h-screen justify-center items-center overflow-hidden">
      {
        loading?(
          <div className="w-[100%] flex justify-center items-center h-full">
              <CircularProgress></CircularProgress>
          </div>
        ):
      <div className="container1 w-[90%] h-[80%] flex border-2 border-gray-200 rounded-md shadow-lg tablet:w-[60%] laptop:w-[60%] tablet:justify-center">
        <div className="left hidden desktop:flex desktop:flex-1 laptop:flex laptop:w-[50%]">
          <div className="showcase flex flex-col items-center justify-center h-[100vh] mx-auto">
            <div className="showcase-content">
              <h1 className="desktop:text-[28px] w-[100%] mb-[24px] font-bold text-black">
                Already have an acccount?
              </h1>
              <Link
                to="/login"
                element={<Login/>}
                className="secondary-btn border-2 border-black font-bold text-black desktop:w-[80%] mx-auto"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
        <div className="right bg-white flex flex-col items-center justify-center w-[100%] laptop:w-[50%] desktop:w-[40%]">
          <div className="login flex flex-col justify-center items-center w-[80%] pb-[8px]">
            <div className="logo mt-[1vh] mb-[2vh]">
              <h1 className="text-[32px]">UrlShortener</h1>
            </div>
            <form className="w-[100%] pb-[8px]" onSubmit={collectdata}>
              <div>
                <label
                  htmlFor="Name"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                  Username
                </label>
                <input
                  type={"text"}
                  value={name}
                  className="text-input"
                  onChange={(e) => setName(e.target.value)}
                />
                {errors && name.length <= 3 ? (
                  <p className="text-[10px] italic text-red-600">
                    Username must be of atleast 4 characters!
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label
                  htmlFor="Email"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                  Email
                </label>
                <input
                  type={"email"}
                  value={email}
                  className="text-input"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors && !rgexp.test(email) ? (
                  <p className=" text-red-600 text-[10px] italic">
                    Enter the valid email!
                  </p>
                ) : (
                  ""
                )}
            
              </div>
              <div className="relative">
                <label
                  htmlFor="name"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                  Password
                </label>
                <input
                  type={eye ? "password" : "text" }
                  value={password}
                  className="text-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
                   {eye ? <AiFillEye className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> : <AiFillEyeInvisible className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={toggleChange} /> }
                {errors && password.length <= 5 ? (
                  <p className="text-[10px] italic text-red-600">
                    Password must be of atleast 6 characters
                  </p>
                ) :errors && password.length >16 ? (
                  <p className="text-[10px] italic text-red-600">
                  Password must be of less then 16 characters
                </p>
                ):''}
                {errors && password!==confirmPassword? (
                  <p className="text-[10px] italic text-red-600">
                    Password and confirm password must be same
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="name"
                  className="text-[16px] leading-[32px] font-semibold"
                >
                 Confirm Password
                </label>
                <input
                  type={confirmEye ? "password" : "text" }
                  value={confirmPassword}
                  className="text-input"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                   {confirmEye ? <AiFillEye className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={(()=>{
                    setConfirmEye(!confirmEye);
                   })} /> : <AiFillEyeInvisible className='absolute top-[40px] right-[12px] cursor-pointer' size={20} onClick={()=>{
                    setConfirmEye(!confirmEye);
                   }} /> }
                  {errors && password!==confirmPassword? (
                  <p className="text-[10px] italic text-red-600">
                    Password and confirm password must be same
                  </p>
                ) : (
                  ""
                )}
              </div>

              <button className="primary-btn">Sign up</button>
            </form>
            <div className="desktop:hidden">
              <p className="text-[14px]">
                <span className="mr-[4px]">Already have an account?</span>
                <Link
                  to="/"
                  element={<Login />}
                  className="font-bold hover:text-primary-color"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

         
        </div>
        <ToastContainer />
      </div>

      }
    </main>
  );
}
