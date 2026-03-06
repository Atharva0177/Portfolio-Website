'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
        </>
    )
}

export default ClientLayout
