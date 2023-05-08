// -- Composant qui correspond à la vue associée à la route /post/[id] ---

import React from 'react';
import Sidebar from '@/app/(shared)/Sidebar';
import { prisma } from "../../api/client";
import { FormattedPost } from '@/app/types';
import  Content  from './Content';

// Props reçues par ce composant. c'est un composant de type route qui reçoit un id
// dans l'URL et c'est ce dernier que l'on récupère.
type PostPageProps = {
    params: {
        id:string;
    }
};

//  pour refetch les datas toutes les 60s mais n'est pas sur que cela fonctionne.
export const revalidate = 60;

// -- Méthode qui communique directement avec le backend pour récupérer un post --
//  1. on récupère le post à l'aide de prisma et de son id
//  2. si on a pas trouvé de post on ne retourne rien 
//  3. on fomate le post que l'on a récupéré en BDD pour transformer les champs createdAt et updatedAt en string
//     car de base ils sont au format Date et cela pose un problème si on les passe à un composant de type Client
const getPost = async(id:string) => {

    const post = await prisma.post.findUnique({
        where: {
            id:id,
        }
    });

    if(!post){
        console.log(`Post with id ${id} not found`);
        return null;
    }

    const formattedPost = {
        ...post,
        createdAt: post?.createdAt?.toISOString(),
        updatedAt: post?.updatedAt?.toISOString()
    }

    return formattedPost;
}

const PostPage = async({ params }:PostPageProps ) => {

    //  on récupère l'id du post depuis l'URL
    const { id } = params;
    
    // on utilise la méthode précédente pour récupérer le post correspondant à l'id récupéré dans l'url.
    const post:FormattedPost | null  = await getPost(id);

    if(!post){
        return <div>Post Not Found</div>
    }
 

    return(
        <main className="px-10 leading-7">
            <div className="md:flex gap-10 mb-5">
                <div className="basis-3/4">
                    <Content 
                        post={post}
                    />
                </div>

                <div className="basis-1/4">
                    <Sidebar />
                </div>
            </div>
        </main>
    )
}

export default PostPage;