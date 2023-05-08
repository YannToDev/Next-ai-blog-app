// -- Composant qui correspondant à la page principale, la vue "/"

import Travel from "./(home)/Travel";
import Tech from "./(home)/Tech";
import Trending from "./(home)/Trending";
import Other from "./(shared)/Other";
import Sidebar from "./(shared)/Sidebar";
import Subscribe from "./(shared)/Subscribe";
import { prisma } from "./api/client";

// Pour typer les posts directement à l'aide de Prisma
import { Post } from "@prisma/client"


//  permettrais de rafraichir les données toutes les 60s mais n'est pas sur du fonctionnement
export const revalidate = 60

// -- Méthode qui communique directement avec le backend via prisma et qui permet 
//    de récupérer tous les posts dispos dans la bdd --
// NOTE: Pour que la propriété placeholder="blur" passé aux composants Image fonctionne ils faut que l'image soit importée
//  de façon statique d'ou le formattedPosts que l'on met en place
const getPosts = async () => {

  const posts = await prisma.post.findMany();

  const formattedPosts = await Promise.all(

    posts.map(async(post) => {
      const imageModule = require(`../public${post.image}`);
      return {
        ...post,
        image: imageModule.default
      }
    })
  )

  return formattedPosts;
};

export default async function Home() {

  // on récupère tous les posts à l'aide de la méthode précédente
  const posts = await getPosts();
  //   console.log("posts",posts);

  // -- Méthode qui initialise 4 tableaux puis remplis chacun d'eux avec les posts correspondant à leur catégorie --
  const formatPosts = () => {

    const trendingPosts: Post[] = [];
    const techPosts: Post[] = [];
    const travelPosts: Post[] = [];
    const otherPosts: Post[] = [];

    posts?.forEach((post: Post, i: number) => {
      if (i < 4) {
        trendingPosts.push(post);
      }
      if (post?.category === "Tech") {
        techPosts.push(post);
      }
      else if (post?.category === "Travel") {
        travelPosts.push(post);
      }

      else if (post?.category === "Interior Design") {
        otherPosts.push(post);
      }
    });

    return { trendingPosts, techPosts, travelPosts, otherPosts }
  };

  //  on récupère les différents tableaux avec la méthode précédente
  const { trendingPosts, techPosts, travelPosts, otherPosts } = formatPosts();


  return (
    <main className="px-10 leading-7">
      <Trending
        trendingPosts={trendingPosts}
      />

      <div className="md:flex gap-10 mb-5">

        <div className="basis-3/4">
          <Tech
            techPosts={techPosts}
          />

          <Travel 
            travelPosts={travelPosts}
          />

          <Other 
            otherPosts={otherPosts}
          />

          <div className="hidden md:block">
            <Subscribe />
          </div>
        </div>

        <div className="basis-1/4">
          <Sidebar />
        </div>

      </div>
    </main>
  );
}
