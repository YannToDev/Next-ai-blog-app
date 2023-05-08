// -- Composant qui correspond à la Navbar qui est utilisée dans le Layout global --
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import SocialLink from './SocialLink';

import Ad1 from "../../public/assets/ad-1.jpg";

const Navbar = () => {
  return (
    <header className='mb-5'>
        <nav className='flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4'>
            <div className="hidden sm:block ">
                <SocialLink />
            </div>
            <div className='flex justify-between items-center gap-10'>
                <Link href="/">Home</Link>
                <Link href="/">Trending</Link>
                <Link href="/">About</Link>
            </div>

            <div>
                <p>Sign In</p>
            </div>
        </nav>

        <div className='flex justify-between gap-8 mt-5 mb-4 mx-10'>
            <div className='basis-2/3 md:mt-3'>
                <h1 className='font-bold text-3xl md:text-5xl'>BLOG OF THE FUTURE</h1>
                <p className='text-sm mt-3'>
                    Blog dedicated towars AO and generation and job automation
                </p>
            </div>

            <div className='basis-full relative w-auto h-32 bg-wh-500'>
                <Image
                    alt="advert-1"
                    placeholder='blur'
                    src={Ad1}
                    sizes="(max-with:480px) 100vw,
                            (max-with: 769px) 75vw,
                            (max-with: 1060) 50vw,
                            33vw"
                    fill
                    style={{objectFit : 'cover'}}
                />
            </div>
        </div>

        <hr className='border-1 mx-10' />

    </header>
  )
}

export default Navbar;