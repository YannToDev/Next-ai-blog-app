// -- Fichier qui permet de mettre en place React-hot-Toaster ---

"use client"
import React from 'react';
import  { Toaster } from "react-hot-toast"


const ToasterProvider = () => {
  return (
    <Toaster />
  )
}

export default ToasterProvider;