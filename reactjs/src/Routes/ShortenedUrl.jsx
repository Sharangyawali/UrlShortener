import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/joy'

export const ShortenedUrl = () => {
    const { id } = useParams();
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        getActualUrl()
    }, [])
    
    const getActualUrl=async()=>{
        let token=localStorage.getItem('authorization')
        if (token && token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }
        let result = await fetch(`${process.env.REACT_APP_API_URL}urlshortner/get-actual-url`, {
          method: "post",
          body: JSON.stringify({shortUrl:`http://localhost:3000/${id}` }),
          headers: { 
            "authorization":`Bearer ${token}`,
            "Content-Type": "application/json"
           },
        });
        result = await result.json();
        setLoading(false)
        if(result.success===true){
            window.location.replace(result.data.actualUrl)
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
            theme: "dark",
            })
        }

    }

  return (
    <>
    {
        loading? (
          <div className='w-[100%] h-[100vh] flex justify-center items-center'>
            <CircularProgress/>
          </div>
        ) : ''
  
    }
    </>
  )
}
