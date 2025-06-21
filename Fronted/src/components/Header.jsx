import React from 'react'
import { assets } from '../srcAssest'
import { useAppContext } from './AppContext'

const Header = () => {
    const { setInput, input } = useAppContext();
    const inputRef = React.useRef();
    const onSubmitHandler = async(e) => {
        e.preventDefault();
        setInput(inputRef.current.value);
    }
    const onClear=()=>{
        setInput('')
        inputRef.current.value='';
    }

    return (
        <div className='mx-8 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-40 py-5  relative'>
            <div className='text-center mt-20 mb-10'>
                <div className='inline-flex items-center gap-2 px-6 py-2 bg-primary/10 rounded-full text-sm sm:text-base text-primary border-2'>
                    <p>This Blog Powered with Ai</p>
                    <img src={assets.star_icon} alt="" className='w-2.5' />
                </div>
            </div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-5'>Welcome to <span className='text-primary '>Our Blog</span></h1>
            <form onSubmit={onSubmitHandler} className="flex items-center justify-between gap-2 bg-white border border-primary rounded-full px-4 py-2 shadow-sm max-w-[100%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] mx-auto w-full md:px-0">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="🔍 Search for Blog..."
                    className="flex-grow bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 px-2 text-sm"
                />
                {input&&
                    <button onClick={onClear} className='font-bold text-xl w-2.5 pb-1 text-red-500' >x</button>
                }
               
                <button

                    type="submit"
                    className="bg-primary text-white px-2 mr-3 py-1 rounded-full hover:bg-primary/90 transition duration-200 text-balance font-bold"

                >
                    Search
                </button>
                
            </form>


            <img src={assets.gradientBackground} alt="" className="absolute -top-12 -z-10 opacity-50" />
        </div>
    )
}

export default Header
