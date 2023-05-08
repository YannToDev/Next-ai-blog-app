
// pour typer nos post dans le composant correpondant à la vue /post/[id]
//  car par défaut les champs createdAd et updatedAt sont de type Date et ne peuvent être passé à des client Component
//  donc on les a transformé en des string
export type FormattedPost = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    category: string;
    content: string;
    author: string;
    image: string;
    snippet: string;
}