
import './globals.css'
import { Open_Sans } from 'next/font/google';

//  composant qui permet d'utiliser la librairie react-hot-toaster
import ToasterProvider from './providers/ToasterProvider';

// composant enfants qui sont appliqué sur toutes les pages de l'application
import Navbar from './(shared)/Navbar';
import Footer from './(shared)/Footer';

// on importe une police par defaut et on la met en place pour toute l'application
const openSans = Open_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Blog ai App',
  description: 'Blog build in Next JS that uses Ai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={openSans.className} lang="en">
      <body>
        <ToasterProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
