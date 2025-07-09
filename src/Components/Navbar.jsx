import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around text-white bg-slate-500 py-2">
        <div className="logo">
            <span className='font-bold text-xl mx-9'>iTask</span>
        </div>

        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all hover:underline'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all hover:underline'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar