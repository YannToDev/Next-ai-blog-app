// -- Composant qui correspond à la section Other permettant d'afficher les posts qui ne sont pas dans les autres sections --

import React from 'react'
import Card from './Card';
import { Post } from "@prisma/client";

type OtherProps = {
    otherPosts: Post[],
}

const Other = ({ otherPosts } : OtherProps) => {
    return (
        <section className='pt-4 mb-16'> 
            {/* HEADER */}
            <p className='font-bold text-2xl'>Other Tranding Posts</p>
            
            {/* POSTS */}
            <div className='sm:grid grid-cols-2 gap-16'>
                <Card
                    post={otherPosts[0]}
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                />
                <Card 
                    post={otherPosts[1]}
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                />
                <Card 
                    post={otherPosts[2]}
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                />
                <Card 
                    post={otherPosts[3]}
                    className=' mt-5 sm:mt-0'
                    imageHeight='h-80'
                />
            </div>
        </section>
    )
}

export default Other;