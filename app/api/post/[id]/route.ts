// --- Route de l'api qui corresond à /api/post/[id] ---
// NOTE : Cette route est utilisé dans le composant Content qui est un client Component et qui donc ne peut pas directement
//        acceder à la base de donnée

// import du client Prisma que l'on a mis en place.
import { prisma } from "../../client";
import { z } from "zod";

import { NextResponse } from "next/server";

type Params = {
    params:{
        id: string;
    };
};

const bodySchema = z.object({
    title: z.string(),
    content: z.string().min(10,{message:'10 characters required'}),
});

//  1. On récupère l'id du post qui est passé dans l'URL de la route.
//  2. On récupère le titre et le corps du post dans le body de la request.   
//  3. on récupère le post dans la BDD à partir de son Id et le on le met à jour avec les données  récupérées dans le body. 
//  4. Si tous c'est bien passé on retourne une réponse postive à la request avec le post mise à jour sinon on renvoi l'erreur avec le status associé.
export async function PATCH(request: Request, { params }: Params ){

    try {
        
        const { id } = params;
        const body = await request.json();
        const { title, content } = bodySchema.parse(body);

        const post = await prisma.post.update({
            where:{
                id:id
            },
            data:{
                title,
                content
            }
        })

        return NextResponse.json(post, { status : 200});

    } catch (error) {

        // let errors = error as string[];

        // if (errors instanceof z.ZodError) {
        //     errors = errors.issues.map((e) => ( e.message ));     
        // };

        // console.error("request error", errors);
        // NextResponse.json({errors: "error updating post"}, { status: 500})
        console.error("request error", error);
        NextResponse.json({error: "error updating post"}, { status: 500})
    }

};