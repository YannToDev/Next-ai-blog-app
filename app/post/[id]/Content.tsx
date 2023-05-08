// --- composant enfant de la page /post/[id] il permet de gérer et d'afficher le contenu de cette page. ---
// NOTE: sur cette page il y a des intéractions que l'utilisateur peut faire comme éditer un post, autrement dit on 
// manipule des states, c'est pour cela que ce composant est de type client.
"use client"
import React, { useState } from 'react';
import Image from 'next/image';

import axios from "axios";
import { toast } from 'react-hot-toast';

// dépendance de la librairie TipTap
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Editor } from "@tiptap/react";

// import  de notre type personalisé pour nos Posts
import { FormattedPost } from '@/app/types';

// composant qui gère les liens pour les réseaux sociaux
import SocialLink from '@/app/(shared)/SocialLink';

import updatePost  from '../../actions/useGetPostById';

// Composant qui contient les boutons permettant d'ouvrir/quitter le mode edition
import CategoryAndEdit from './CategoryAndEdit';
import Article from './Article';


type ContentProps = {
    post: FormattedPost
}

const Content = ({ post }: ContentProps) => {

    // state qui permet de gérer l'état d'édition du post
    const [isEditable, setIsEditable] = useState<boolean>(false);

    // states qui gère l'état du titre du post et des erreurs asssociées
    const [title,setTitle] = useState<string>(post.title);
    const [titleError,setTitleError] = useState<string>("");


    // state pour la gestion du contenu du post et des éventuelles erreurs associées
    const [content,setContent] = useState<string>(post.content);
    const [contentError,setContentError] = useState<string>("");

    // State temporaire pour titre et le contenu. Ces states servent à garder les états intermédiaires quand on est en
    // mode edition. Autrement dit, ce sont les states qui peuvent être modifier quand on ouvre/ferme le mode edition.
    const [tempTitle,setTempTitle] = useState<string>(title);
    const [tempContent,setTempContent] = useState<string>(content);

    const date = new Date(post?.createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" } as any;
    const formattedDate = date.toLocaleDateString("en-US", options);

    // méthode qui permet de modifier le contenu de l'editor donc de notre post.
    // 1. Si le contenu est vide on définit l'erreur comme vide pour qu'il n'y en ai pas.
    // 2. Sinon on modifier notre state qui contient le contenu du post avec le html que l'on récupère
    const handleOnChangeContent = ({ editor } :any) => {
        if(!(editor as Editor).isEmpty){
            setContentError('');
        }

        setContent((editor as Editor).getHTML());
    };

    //  hook de la librairie TipTap qui permet de créer ensuite un menu et un contenu d'edition
    // on défini le contenu par défaut comme égal à notre state 'content' qui contient le contenu du post
    // associée à cette page.
    // On relie le state d'édition de ce hook au state d'édition que l'on a crée.
    const editor = useEditor({
        extensions: [StarterKit],
        editorProps :{
            attributes:{
                class :"prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full"
            }
        },
        onUpdate: handleOnChangeContent,
        content: content,
        editable: isEditable
    });

    // Méthode qui modifie notre State isEditable pour pouvoir afficher le bon icone mais aussi le state
    //  associé à l'editor en lui même pour pouvoir afficher/Cacher le menu d'édition
    const handleIsEditable = (bool: boolean)=> {

        setIsEditable(bool);
        editor?.setEditable(bool)
    }; 


    // Méthode qui permet de changer le titre du post
    // 1. Si il y a un titre alors l'erreur est nulle.
    // 2. On modifier le state associé au titre en lui passant la valeur du textArea associé
    const handleChangeTitle = (e:React.ChangeEvent<HTMLTextAreaElement>) => {

        if(title) setTitleError("");
        setTitle(e.target.value)
    };

    // méthode exécutée lors du clic sur le bouton submit qui permet d'envoyer les modifications à la BDD
    // NOTE: Ce composant est de type client donc il  ne peut accéder directement à la BDD c est pour cela qu'on passe par l'API
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if(title === "") toast.error("Title is required");
        if(editor?.isEmpty) toast.error("the post content is required");
        if(title === "" || editor?.isEmpty) return;
        

        try {
            const data =  await updatePost(title,content,post.id);
            
            // on réinitalise les states d'édition ( le notre et celui de TipTap)
            // on réinitalise aussi les states temporaires qui contiennent le titre le contenu du post.
            handleIsEditable(false);
            setTempTitle("");
            setTempContent("");

            // on définit le state du titre et le state du contenu du post comme étant ceux récupérés en BDD
            // on définit aussi le state du contenu du post de la librairie en elle même comme égal à celui récupéré en BDD.
            setTitle(data.title);
            setContent(data.content);
            editor?.commands.setContent(data.content);
            toast.success("post suceesfully modified");

        } catch (error) {
            toast.error("something went wrong");
        }

        // --- Version utilisé dans la vidéo avec affichage des erreurs dans le DOM et fetch à la main ---
        // if(title === "") setTitleError("This field is required");
        // if(editor?.isEmpty) setContentError('This field is required');
        // if(title === "" || editor?.isEmpty) return;


        // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`,{
        //     method:"PATCH",
        //     headers: {
        //          "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         title :title,
        //         content
        //     }),
        // })

        // const data = await response.json();

        // on réinitalise les states d'édition ( le notre et celui de TipTap)
        // on réinitalise aussi les states temporaires qui contiennent le titre le contenu du post.
        // handleIsEditable(false);
        // setTempTitle("");
        // setTempContent("");

        // on définit le state du titre et le state du contenu du post comme étant ceux récupérés en BDD
        // on définit aussi le state du contenu du post de la librairie en elle même comme égal à celui récupéré en BDD.
        // setTitle(data.title);
        // setContent(data.content);
        // editor?.commands.setContent(data.content);
        // toast.success("post suceesfully modified");
    };

  return (
    <div className='prose w-full max-w-full mb-10'>
        <h5 className='text-wh-300'>
            {`Home > ${post.category} > ${post.title}`}
        </h5>

        {/* CATEGORY AND EDIT */}
        <CategoryAndEdit 
            post={post}
            isEditable={isEditable}
            handleIsEditable={handleIsEditable}
            title={title}
            setTitle={setTitle}
            tempTitle={tempTitle}
            setTempTitle={setTempTitle}
            tempContent={tempContent}
            setTempContent={setTempContent}
            editor={editor}

        />

        <form onSubmit={handleSubmit}>
            {/* HEADER*/}
            <>
                {isEditable ? (
                    <div>
                        <textarea 
                            className='border-2 rounded-md bg-wh-50 p-3 w-full'
                            placeholder='Title'
                            onChange={handleChangeTitle}
                            value={title}
                        />
                        {titleError && <p className='mt-1 text-primary-500'>{titleError}</p>}
                    </div>
                ) : (
                    <h3 className='font-bold text-3xl mt-3'>
                        { title }
                    </h3>
                )}

                <div className="gap-3">
                    <h5 className='font-semibold tex-xs'>By {post.author}</h5>
                    <h6 className='text-wh-300 text-xs'>{formattedDate} </h6>
                </div>
            </>

            {/* IMAGE */}
            <div className='relative w-auto mt-2 mb-16 h-96'>
                <Image
                    fill
                    alt={post.title}
                    src={post.image}
                    sizes="(max-width: 480px) 100vw,
                           (max-width: 768px) 85vw
                           (max-width: 1060px) 75vw
                    "
                    className='object-cover'
                />
            </div>
            
            {/* ARTICLE */}
            <Article 
                contentError={contentError}
                editor={editor}
                isEditable={isEditable}
                setContent={setContent}
                title={title}
            />

            {/* SUBMIT BUTTON */}
            {isEditable && (
                <div className='flex justify-end'>
                    <button 
                        type="submit"
                        className='bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5 rounded-md'
                    >
                        SUBMIT
                    </button>
                </div>
            )}
        </form>
        
        {/* SOCIAL LINKS */}
        <div className='hidden md:block mt-10 w-1/3'>
            <SocialLink isDark />
        </div>
     
    </div>
  )
}

export default Content;