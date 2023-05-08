// --- composant enfant du composant Conten, il contient les boutons qui gèrent l'ouveture/ fermeture du menu d'édition 
//     mais aussi les méthodes associées au click sur ses boutons qui gèrent le state final/ temporaire du titre du post et de son contenu --
//NOTE: La gestion du state n'est pas évidente avec l'introduction de ce state temporaire mais cela est obligatoire avec la librairie tipTap
//      C'est malheuresement une des limites de la gestion du state de React avec ce genre de librairie. 

import React from 'react'
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { FormattedPost } from '@/app/types';

// pour typer l'éditor à partir du type fourni par la librairie elle même
import { Editor } from "@tiptap/react";

type CategoryAndEditProps = {
    post:FormattedPost;
    isEditable: boolean;
    handleIsEditable:(isEditable:boolean) => void;
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    tempTitle: string
    setTempTitle: React.Dispatch<React.SetStateAction<string>>;
    tempContent: string
    setTempContent: React.Dispatch<React.SetStateAction<string>>;
    editor: Editor | null;
};

const CategoryAndEdit = (
    { 
        post, isEditable, handleIsEditable, title,setTitle, tempTitle, setTempTitle, tempContent, setTempContent,editor 
    }: CategoryAndEditProps) => {
    
    // --- Méthode déclenchée quand on click sur l'icone stylo du menu d'édition ---
    //  1. on commence par toggle le state du menu d'édition quand on click sur le sylo( puisqu'on ouvre le menu d'édition initialement fermé)
    //  2. on sauvegarde l'état initial du titre dans le state temporaire prévu à cet effet.
    //  3. on sauvegarde l'état initial du contenu du post dans le state prévu à cet effet
    const handleEnableEdit = () => {

        handleIsEditable(!isEditable);
        setTempTitle(title);
        setTempContent(editor?.getHTML() || "");
    };

    // -- Méthode déclenchée quand on click sur la croix du menu d"édition
    //  1. on commence par toggle le state du menu d'édition quand on click sur la croix(puisqu'on le ferme)
    //  2. on défini le state du titre comme égale au state temporaire.
    //  3. de même on défini le state du contenu du post comme étant le state temporaire du contenu du post.
    const handleCancelEdit = () => {

        handleIsEditable(!isEditable);
        setTitle(tempTitle);
        editor?.commands.setContent(tempContent);
    };
        

    return (

        <div className='flex justify-between items-center'>
                <h4 className='bg-accent-orange py-2 px-5 text-wh-900 font-bold rounded-md'>
                    { post.category }
                </h4>

                {/*  boutons avec rendu conditionnel pour gérer l'édition du post */}
                <div className="mt-4">
                    {isEditable? (
                        <div className='flex justify-between gap-3'>
                            <button onClick={handleCancelEdit}>
                                <XMarkIcon className='h-6 w-6 text-accent-red' />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={handleEnableEdit}>
                                <PencilSquareIcon className='h-6 w-6 text-accent-red' />
                            </button>
                        </div>
                    ) 
                }
                </div>
            </div>
    )
}   

export default CategoryAndEdit