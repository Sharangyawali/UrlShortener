import React from 'react'

export const HomePage = () => {

  return (
    <div className='px-[20px] laptop:px-[20%] min-h-[85vh] w-[100%] flex flex-row laptop:justify-between items-center gap-[30px]'>
        <div className=' text-black'>
            <h1 className='text-4xl font-bold text-wrap'>URL Shortener</h1>
            <p className='text-lg text-wrap '>Shorten long URLs and share them easily</p>
        </div>
        <div className="h-0 mobile:min-w-[300px] mobile:min-h-[300px] tablet:min-w-[500px] tablet:min-h-[500px] rounded-full bg-hero-pattern ">
        </div>
    </div>
  )
}
