
import axios from "axios";
import { z } from "zod";


// Schéma qui permet de retourner des données typés
const updatePostResponse = z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    title: z.string(),
    category: z.string(),
    content: z.string(),
    author: z.string(),
    image: z.string(),
    snippet: z.string()
})

// --- Méthode qui utilise Axios pour appeler la route de notre API qui permet de mettre à jour un post et/ou son titre ---
const updatePost = async( title:string, content:string, postId :string) => {

    return axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/post/${postId}`,{
            title,
            content
    })
    .then(res => updatePostResponse.parse(res.data))
};

export default updatePost;