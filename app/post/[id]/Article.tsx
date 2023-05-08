// "use client"
// --- Composant enfant du composant Content, il contient le composant correspondant à la barre d'édition du post mais aussi 
//     au composant correspondant au contenu du post en lui même ---
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

// dépendance de la librairie TipTap
import { EditorContent } from '@tiptap/react';
import { Editor } from "@tiptap/react";

import { RocketLaunchIcon } from "@heroicons/react/24/solid"

// composant qui met en place le menu d'édition à partir de la librairie TipTap
import EditorMenuBar from './EditorMenuBar';


type ArticleProps = {
    contentError: string;
    isEditable: boolean;
    editor: Editor | null;
    setContent : React.Dispatch<React.SetStateAction<string>>;
    title:string;
}

const Article = ({contentError, isEditable, editor ,setContent ,title}:ArticleProps) => {
    
    // State de l'input
    const [role, setRole] = useState<string>("I am a helpful assistant")

    if(!editor){
        return null;
    };

    // -- méthode qui permet de créer un post à partir de la route de l'API prévue à cet effet --
    const postAiContent = async() => {
            editor
      .chain()
      .focus()
      .setContent("Generating Ai Content. Please Wait...")
      .run();
            
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/openai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: title,
            role: role,
        }),
    });

        const data = await response.json();
         editor.chain().focus().setContent(data.content).run();
        setContent(data.content);
        toast.success("Post content successfully created with openai")
    };  

    return (
        <article className='text-wh-500 leading-8'>

            {/* AI GENERATOR */}
            {isEditable && (
                <div className='border-2 rounded-md bg-wh-50 p-3 mb-3'>
                    <h4 className='m-0 p-0'>Generate Ai Content</h4>
                    <p className='my-1 p-0 text-xs'>What type of writer do you want</p>
                    <div className='flex gap-5 justify-between'>
                        <input
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            type="text" 
                            className='border-2 rounded-md bg-wh-50 px-3 py-1 w-full'
                            placeholder='Role'                      
                        />
                        <button
                            onClick={postAiContent} 
                            type="button"
                        >
                            <RocketLaunchIcon  
                                className='h-8 w-8 text-accent-orange hover:text-wh-300'
                            />
                        </button>
                    </div>
                </div>
            )}

            <div className={isEditable ? "border-2 rounded-md bg-wh-50 p-3" : "w-full max-w-full" }>
                {/* MENU D'EDITION VISIBLE UNIQUEMENT SI ON EST EN MODE EDITION */}
                {isEditable &&
                    <>
                        <EditorMenuBar 
                            editor={editor} 
                        />

                        <hr  className='border-1 mt-2 mb-5'/>
                    </>
                }
                <EditorContent 
                    editor={editor} 
                />
            </div>

            {contentError && <p className='mt-1 text-wh-900'>{contentError}</p>}

        </article>
    )
}

export default Article