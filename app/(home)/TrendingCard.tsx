// --- composant enfant du composant Trending, il permet de gérer l'affichage d'un trending donné --

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Post } from "@prisma/client";

import asset1 from "/assets/ai-1.jpg"

type TrendingCardProps = {
    className? :string;
    post: Post;
};

const TrendingCard:React.FC<TrendingCardProps> = ({ className, post }) => {

 return (
    <Link
      className={`${className} sm:mt-0 sm:h-auto relative mt-7 block w-full h-96 hover:opacity-70`}
      href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
    >
      <div className="z-0 relative w-full h-full">
        <Image
          alt="tech"
          placeholder='blur'
          src={post?.image}
          sizes="(max-with:480px) 100vw,
                 (max-with: 769px) 75vw,
                 (max-with: 1060) 50vw,
                 33vw"
          fill
          style={{objectFit : 'cover'}}
        />
      </div>

      {/* La 1ere div pour appliquer un Bg gradient sur toute la partie */}
      {/* La seconde partie placée en absolue qui contient un bouton et un titre placé en relatif */}
      <div className="absolute z-1 top-0 left-0 w-full h-full bg-gradient-gradual" />
      <div className="absolute z-2 bottom-0 left-0 p-3">
        <h4 className="inline-block px-5 py-1 font-semibold bg-accent-orange text-wh-900">
          {post?.category}
          post
        </h4>
        <div className="text-wh-100 mt-2">
            {post?.title}
            post title
        </div>
      </div>
    </Link>
  );
}

export default TrendingCard;