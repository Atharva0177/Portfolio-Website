'use client'

import { motion } from 'framer-motion'

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
            {/* Subtle background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 rounded-full"
                        style={{
                            background: i % 2 === 0
                                ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)'
                                : 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -20, 30, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Main text animation container */}
            <div className="relative flex items-center justify-center">
                {/* The "A" that morphs into "Atharva.dev" */}
                <motion.div
                    className="flex items-center overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* "A" letter — scales up first, then slides left */}
                    <motion.span
                        className="text-4xl md:text-7xl lg:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
                        initial={{ scale: 0.3, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                        transition={{
                            duration: 0.7,
                            ease: 'easeOut',
                        }}
                    >
                        A
                    </motion.span>

                    {/* "tharva" — revealed after "A" settles */}
                    {'tharva'.split('').map((letter, i) => (
                        <motion.span
                            key={`name-${i}`}
                            className="text-4xl md:text-7xl lg:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
                            initial={{ opacity: 0, x: -20, filter: 'blur(8px)', width: 0 }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                filter: 'blur(0px)',
                                width: 'auto',
                            }}
                            transition={{
                                delay: 0.7 + i * 0.06,
                                duration: 0.4,
                                ease: 'easeOut',
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}

                    {/* ".dev" — appears with a different color accent */}
                    {'.dev'.split('').map((letter, i) => (
                        <motion.span
                            key={`dev-${i}`}
                            className="text-4xl md:text-7xl lg:text-9xl font-bold text-blue-400 inline-block"
                            initial={{ opacity: 0, y: 20, filter: 'blur(8px)', width: 0 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                                width: 'auto',
                            }}
                            transition={{
                                delay: 1.1 + i * 0.08,
                                duration: 0.4,
                                ease: 'easeOut',
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Underline sweep */}
                <motion.div
                    className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                        delay: 1.4,
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                />

                {/* Subtle glow beneath text */}
                <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                />
            </div>

            {/* Tagline that fades in below */}
            <motion.p
                className="absolute bottom-1/3 text-gray-500 text-sm md:text-base tracking-widest uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                onAnimationComplete={() => {
                    // Trigger dismiss after tagline shows
                    setTimeout(onComplete, 600)
                }}
            >
                Building the future with code
            </motion.p>
        </motion.div>
    )
}

export default LoadingScreen
