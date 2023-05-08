// -- Composant enfant de la Navbar qui permet d'afficher les différents liens liés aux réseaux sociaux --

import React from 'react'
import Image from "next/image";

// import des Images liées aux réseaux sociaux
import Twitter from "/public/assets/social_twitter.png";
import Facebook from "/public/assets/social_facebook.png";
import Instagram from "/public/assets/social_instagram.png";
import Google from "/public/assets/social_google.png";
import Discord from "/public/assets/social_discord.png";

// props qui permet de mettre un style conditionnel
type SocialLinksProps ={
    isDark? : boolean
};

const SocialLink:React.FC<SocialLinksProps>= ({ isDark }) => {

  return (
    <div className='flex justify-between items-center gap-7'>
       <a href="https://twitter.com" target="_blank" rel="noreferrer">
        <Image 
            className={`${isDark? "brightness-0" :"" } "hover:opacity-50"`}
            alt="Twitter"
            src={Twitter}
            height={20}
            width={20}
        />
        </a>
        
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Image 
                className={`${isDark? "brightness-0" :"" } "hover:opacity-50"`}
                alt="Facebook"
                src={Facebook}
                height={20}
                width={20}
            />
       </a>

        <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Image 
                className={`${isDark? "brightness-0" :"" } "hover:opacity-50"`}
                alt="Instagram"
                src={Instagram}
                height={20}
                width={20}
            />
       </a>

        <a href="https://google.com" target="_blank" rel="noreferrer">
            <Image 
                className={`${isDark? "brightness-0" :"" } "hover:opacity-50"`}
                alt="Google"
                src={Google}
                height={20}
                width={20}
           
           />
       </a>

        <a href="https://discord.com" target="_blank" rel="noreferrer">
            <Image 
                className={`${isDark? "brightness-0" :"" } "hover:opacity-50"`}
                alt="Discord"
                src={Discord}
                height={20}
                width={20}
            />
       </a>

    </div>
  )
}

export default SocialLink;