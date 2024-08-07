import React,{useState} from "react";
import { FaRegClipboard } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GenerateShortUrl = () => {
  const [url,setUrl]=useState('')
  const urlRegx=/^https?:\/\/.+/i
    const [shortUrl,setShortUrl]=useState()

    const request=async()=>{
      if(!urlRegx.test(url)){
        toast.error('URL must start with http:// or https://',{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      }
      else{
        let token=localStorage.getItem('authorization')
        if (token && token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }
        let result = await fetch(`${process.env.REACT_APP_API_URL}urlshortner/generate-short-url`, {
          method: "post",
          body: JSON.stringify({url:url }),
          headers: { 
            "authorization":`Bearer ${token}`,
            "Content-Type": "application/json"
           },
        });
        result = await result.json();
        console.log(result);
        if(result.success===true){
          setShortUrl(result.data.shortenedUrl)
        }
        else{
          toast.error(result.message,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        }
      }
    }

  return (
    <div className="w-[100%] h-[80vh] flex flex-col justify-between items-center">
      <div className="w-[100%] h-[70vh] flex flex-col justify-center items-center gap-[30px]">
        <div className="w-[95%] tablet:w-[400px] min-h-[50px] flex flex-col">
          <span className="text-black font-extrabold text-[20px]">
            Enter actual url
          </span>
          <input
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          className="bg-[#e7e7e7] w-full h-full focus:bg-none focus:outline-none border-[1px] rounded-lg p-[20px] text-black font-bold"></input>
        </div>
        <div className="w-[95%] tablet:w-[200px] h-[50px]">
          <button className="w-full h-full p-[20px] py-[5px] bg-[#620080] font-bold text-white rounded-lg" onClick={request}>
            Submit
          </button>
        </div>
      </div>
      {
        shortUrl&& shortUrl.length>0?
      <div className="w-[100%] flex flex-col justify-center items-center">
        <span className="text-black font-extrabold text-[20px]">
        Generated short Url 
            </span>
        <div className=" w-[95%] tablet:w-[500px] h-[50px] focus:bg-none focus:outline-none border-[1px] rounded-lg p-[20px] text-black font-bold flex justify-between px-[10px] items-center">
          <input
          readOnly={true}
          value={shortUrl}
          className=" w-[90%] h-full p-[20px] text-[15px] font-mono font-extrabold">
          </input>
          <div data-twe-toggle="tooltip" title="Copy to clipboard">
            <FaRegClipboard
                onClick={()=>{
                    navigator.clipboard.writeText(shortUrl);
                    toast.success('Copied to clipboard',{
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        })
                }}
              size={24}
              className="cursor-pointer hover:pointer"
            />
          </div>
        </div>
      </div>
:''
      }
      <ToastContainer theme="dark" />
    </div>
  );
};
