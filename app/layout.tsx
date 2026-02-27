import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
// import CustomCursor from '@/components/CustomCursor'
import SpotifyPlayer from '@/components/SpotifyPlayer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Atharva Mandavkar - Portfolio',
  description: 'Electronics & Communication Engineer | AI-ML Enthusiast | Full Stack Developer',
  keywords: ['portfolio', 'developer', 'Atharva Mandavkar', 'AI', 'ML', 'IoT'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Removed className="dark" from here */}
      <body className={`${inter.className} min-h-screen transition-colors duration-300`}>
        <ScrollProgress />
        {/* <CustomCursor /> */}
        <Navbar />
        <main>{children}</main>
        {/* <SpotifyPlayer /> */}
      </body>
    </html>
  )
}