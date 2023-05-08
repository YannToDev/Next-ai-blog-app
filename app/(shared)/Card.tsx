// -- Composant qui corresppond à une carte réutilisable qui est utilisée pour afficher des infos dans différentes
//    section et qui affiche un style différent en fonction des props reçues comme la taille de la carte et du formulaire --

import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import { Post } from "@prisma/client";

type CardProps = {
    post: Post;
    className?: string;
    imageHeight: string;
    isSmallCard?: boolean;
    isLongForm?: boolean;
};

const Card:React.FC<CardProps> = ({ post, className,imageHeight,isSmallCard = false, isLongForm = false }:CardProps) => {
  
    const {id,title,author, createdAt, image, snippet } = post || {};
    const date = new Date(createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" } as any;
    const formattedDate = date.toLocaleDateString("en-US", options);

    return (
        <div className={className}>
            <Link 
                href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
                className='basis-full hover:opacity-70'
            >
                <div className={`relative w-auto mb-3 ${imageHeight}`}>
                    <Image
                        alt="tech"
                        placeholder='blur'
                        src={image}
                        sizes="(max-with:480px) 100vw,
                                (max-with: 769px) 75vw,
                                (max-with: 1060) 50vw,
                                33vw"
                        fill
                        style={{objectFit : 'cover'}}
                        />
                </div>
            </Link>

            {/* NOTE: line-clamp-2 permet pour les petites cartes d'avoir un étalement sur 2 lignes */}
            <div className="basis-full">
                <Link href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}>
                  <h4 className={`font-bold hover:text-accent-green first-letter
                        ${isSmallCard? "text-base" : "text-lg"}
                        ${isSmallCard ? "line-clamp-2" : ""}
                    `}>
                        {title}
                    </h4>
                </Link>

                <div className={`${isSmallCard? "my-2": "flex my-2"} gap-3`}>
                    {/* <h5 className='font-semibold text-xs'>{post.author }</h5> */}
                    <h6 className='text-wh-300 text-xs'>{formattedDate}</h6>
                </div>

                <p className={`text-wh-500 ${isLongForm ? "line-clamp-5": "line-clamp-3"}`}>
                    {snippet}
                </p>   
            </div>
        </div>
    )  
}

export default Card;