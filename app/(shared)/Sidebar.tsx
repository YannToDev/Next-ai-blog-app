import React from 'react';
import Image from "next/image";

// composant pour afficher les liens des réseaux sociaux
import SocialLink from './SocialLink';
import AboutProfile from "../../public/assets/about-profile.jpg";

// Composant du formulae d'inscription
import Subscribe from './Subscribe';

// Import de l'image par défaut
import Ad2 from "../../public/assets/ad-2.png";

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <section>
         <h4 className='bg-wh-900 py-3 px-5 text-wh-50 text-xs font-bold text-center'>
            Subscribe and Follow
        </h4>

        <div className='my-5 mx-5'>
            <SocialLink isDark />
        </div>

        <Subscribe />
        <div className='my-8'>
            <Image
                className='hidden md:block my-8 w-full'
                alt="advert-2"
                placeholder='blur'
                src={Ad2}
                width={500}
                height={1000}
            />
        </div>

        <h4 className='py-3 px-5 bg-wh-900 text-wh-50 font-bold text-center'>
            About the Blog
        </h4>

        <div className='my-8 flex justify-center'>
            <Image
                alt="about-profile"
                placeholder='blur'
                src={AboutProfile}
                width={500}
                height={250}
        />
        </div>

         <h4 className='py-3 px-5 text-wh-500 font-bold text-center'>
            Geoffrey Epstein
        </h4>

        <p className='text-wh-500 tex-center text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, dolorum.
            Neque consequuntur nulla cupiditate alias voluptates ducimus ullam harum est!
        </p>

    </section>
  )
}

export default Sidebar