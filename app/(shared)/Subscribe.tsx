// -- Composant enfant de la page principale qui correspondant au formulaire de souscription --

import React from 'react'

const Subscribe = () => {

    return (
        <div className='text-center bg-wh-10 px-5 py-10'>
            <h4 className='font-semibold text-base'>Subscribe to our Newsletter</h4>
            <p>Enter Email adresss to get top news and great deals</p>

            <input 
                type="text"
                className='text-center w-5/6 min-w-[100px] px-5 py-2 border-2'
                placeholder="Enter Email Address" 
            />
            <button className='bg-accent-red text-wh-10 font-semibold w-5/6 min-w-[100px] py-2 px-5 mt-3'> 
                SUBSCRIBE
            </button>

        </div>
    )
}

export default Subscribe