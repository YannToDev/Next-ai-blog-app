// -- Composant enfant de la page principale "/"  qui permet d'afficher les 4 premiers posts ---

import Link from 'next/link'
import React from 'react'
import TrendingCard from './TrendingCard';
import { Post } from "@prisma/client";


// il reçoit le tableau de post de type Trending en props
type TrendingProps = {
    trendingPosts :Post[]
};

const Trending = ({ trendingPosts }:TrendingProps) => {

  return (
    <section className='pt-3 pb-10'>
        {/* Partie Gauche de la section */}
        <div className='flex items-center gap-3'>
            <div className='bg-wh-900 py-2 px-8 text-wh-10 text-sm font-bold'>
                TRENDING
            </div>
            <p className='text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe impedit laboriosam ea.
                Esse inventore eos .
            </p>
        </div>  


        {/* PARTIE DROITE DE LA SECTION AVEC GRID */}
        <div className='sm:grid gap-5 grid-cols-4 grid-rows-2 sm:h-[600px] my-3'>
            <TrendingCard 
                className='col-span-2 row-span-2 bg-wh-500'
                post={trendingPosts[0]} 
            />
            <TrendingCard 
                className='col-span-2 row-span-1 bg-wh-500'
                post={trendingPosts[1]}  
            />
            <TrendingCard 
                className='cols-span-1 row-span-1 bg-wh-500' 
                post={trendingPosts[2]}     
            />
            <TrendingCard 
                className='cols-span-1 row-span-1 bg-wh-500' 
                post={trendingPosts[3]} 
            />
        </div>

        <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, nesciunt!
            Veniam labore cupiditate corporis autem quod quae, similique quas eum.
            Doloribus perferendis dicta explicabo culpa rerum ratione numquam nemo dolores!
        </p>

    </section>
  )
}

export default Trending;

    {/* PARTIE DROITE DE LA SECTION Avec FlexBox */}
        {/* <div className='flex justify-between gap-3 my-3'>
            <div className=' basis-1/2 bg-wh-500 h-96'></div>
            <div className="flex flex-col basis-1/2 gap-3 h-96">
                <div className='basis-1/2 bg-wh-500'></div>
                <div className="flex basis-1/2 gap-3">
                    <div className='basis-1/2 bg-wh-500'></div>
                    <div className='basis-1/2 bg-wh-500'></div>
                </div>
            </div>
        </div> */}