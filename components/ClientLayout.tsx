'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'

interface ClientLayoutProps {
    children: React.ReactNode
    site?: {
        brandName: string
        loadingName: string
        loadingNameSuffix: string
        loadingTagline: string
    }
}

const ClientLayout = ({ children, site }: ClientLayoutProps) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen
                        onComplete={() => setIsLoading(false)}
                        name={site?.loadingName}
                        suffix={site?.loadingNameSuffix}
                        tagline={site?.loadingTagline}
                    />
                )}
            </AnimatePresence>

            <ScrollProgress />
            <Navbar brandName={site?.brandName} />
            <main>{children}</main>
        </>
    )
}

export default ClientLayout
