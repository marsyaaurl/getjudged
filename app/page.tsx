import Navbar from './components/Navbar';
import { ArrowRight } from 'lucide-react';

export default function Home(){
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='flex flex-col items-center justify-center mt-11 mx-10 gap-y-5 bg-[#F5BD1E]/5 shadow-[0_0px_30px_rgba(245,189,30,0.4)] h-[72vh] px-10 py-10 rounded-3xl'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='font-black text-6xl text-gray-600 text-center'><i className='text-[#F5BD1E]'>Confess</i> Your <span className='text-[#FF1592]'>MESS </span>—</h1>
          <h1 className='font-black text-6xl text-gray-600 text-center'>Let’s See If <i className='text-[#FF1592]'>YOU</i> <span className='text-[#F5BD1E]'>Walk Out</span></h1>
          <h1 className='font-black text-6xl text-gray-600 text-center'><span className='text-[#FF1592]'>GUILTY</span> or <span className='text-[#F5BD1E]'>INNOCENT</span></h1>
        </div>
        <div className='flex flex-row items-center justify-center gap-x-3 bg-[#FF1592] rounded-full px-4 py-2 hover:shadow-[0_5px_50px_rgba(225,17,128,0.4)]'>
          <a href='/Confess'>
            <button  className='text-white font-bold text-xl'>
              Let's Get Your Verdict
            </button>
          </a>
          <ArrowRight className='text-white font-bold'/>
        </div>
      </div>
    </>
  )
}