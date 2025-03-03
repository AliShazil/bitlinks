import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='h-16 bg-purple-700 flex justify-between items-center px-4 text-white'>
            <div className="logo font-bold text-2xl">
            <Link href="/">BitLinks</Link>
            </div>
            <ul className='flex justify-center gap-4 items-center'>
                <Link href="/"><li>Home</li></Link>
                <Link href="/shortner"><li>Shortner</li></Link>
                <li className='flex gap-3'>
                    <Link href="/shortner"><button className='bg-purple-500 shodow-lg rounded-lg p-3 py-2 font-bold cursor-pointer'>Try Now</button></Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
