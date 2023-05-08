// --- Composant qui correspond au footer, il est utilisé dans le Layout général pour être dispo sur toutes les pages --

import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='bg-wh-900 text-wh-50 p-10'>
        <div className='sm:flex justify-between mx-auto gap-16'>
            
            {/* FIRST COLUMN */}
            <div className='mt-16 basis-1/2 sm:mt-0'>
                <h4 className='font-bold '>BLOG OF THE FUTURE</h4>
                <p className='my-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, architecto?
                    Minus praesentium laudantium, ex facere ipsam veritatis natus architecto neque!
                    Iste aspernatur facilis quaerat maiores ipsam, beatae officiis esse veniam!
                    Laborum, et ut a consequuntur officiis suscipit nobis labore vero!
                </p>
                <p>@ Blog of the Future All Rights Reserverd.</p>
            </div>

            {/* SECOND COLUMN */}
            <div className='mt-16 basis-1/4 sm:mt-0'>
                <h4 className='font-bold '>Links</h4>
                <p className='my-5'>Massa orc senectus</p>
                <p className='my-5'>Some random link again</p>
                <p>Ullamcorper vivamus.</p>
            </div>

            {/* THIRD COLUMN */}
            <div className='mt-16 basis-1/4 sm:mt-0'>
                <h4 className='font-bold'>Contact us</h4>
                <p className='my-5'>Massa orc senectus</p>
                <p className='my-5'>(333)425-6825</p>
            </div>

        </div>
    </footer>
  )
}

export default Footer