'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSpotify, FaPlay, FaMusic, FaSyncAlt } from 'react-icons/fa'

interface Track {
  title: string
  artist: string
  album: string
  albumArt: string
  spotifyUrl: string
  isPlaying: boolean
}

const SpotifyPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const MAX_RETRIES = 3

  useEffect(() => {
    fetchCurrentTrack()
    startPolling()
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Poll every 10 seconds
    intervalRef.current = setInterval(() => {
      fetchCurrentTrack(false)
    }, 10000)
  }

  const fetchCurrentTrack = async (showLoading = true, retry = 0) => {
    try {
      if (showLoading) {
        setIsRefreshing(true)
      }

      console.log('🎵 Fetching Spotify data...')
      
      // Try now playing first with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

      let response = await fetch('/api/spotify/now-playing', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      
      if (!response.ok && response.status !== 401) {
        throw new Error(`API Error: ${response.status}`)
      }

      let data = await response.json()
      console.log('📊 Now Playing Response:', data)

      // If nothing is playing, get recently played
      if (!data.isPlaying || !data.title) {
        console.log('🔄 Nothing playing, fetching recently played...')
        
        const recentController = new AbortController()
        const recentTimeoutId = setTimeout(() => recentController.abort(), 8000)

        response = await fetch('/api/spotify/recently-played', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
          signal: recentController.signal,
        })

        clearTimeout(recentTimeoutId)
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`)
        }
        
        data = await response.json()
        console.log('📊 Recently Played Response:', data)
      }

      if (data.title && data.artist) {
        const newTrack = {
          title: data.title,
          artist: data.artist,
          album: data.album || 'Unknown Album',
          albumArt: data.albumArt || '',
          spotifyUrl: data.spotifyUrl || 'https://open.spotify.com',
          isPlaying: data.isPlaying || false
        }

        // Only update if track changed
        if (JSON.stringify(newTrack) !== JSON.stringify(currentTrack)) {
          setCurrentTrack(newTrack)
          setLastUpdate(new Date())
        }

        setError(null)
        setRetryCount(0)
        console.log('✅ Track set:', data.title)
      } else {
        setError('No track data available')
        console.log('❌ No track data')
      }
      
      setIsLoading(false)
      setIsRefreshing(false)
    } catch (err: any) {
      console.error('❌ Error fetching Spotify data:', err.message)
      
      // Retry logic for connection errors
      if ((err.name === 'AbortError' || err.message.includes('ECONNRESET')) && retry < MAX_RETRIES) {
        console.log(`⏳ Retrying... (${retry + 1}/${MAX_RETRIES})`)
        setTimeout(() => {
          fetchCurrentTrack(showLoading, retry + 1)
        }, 2000 * (retry + 1)) // Exponential backoff
        return
      }

      setError(err.message)
      setIsLoading(false)
      setIsRefreshing(false)
      setRetryCount(retry)
    }
  }

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    setRetryCount(0)
    fetchCurrentTrack(true)
  }

  const getTimeSinceUpdate = () => {
    if (!lastUpdate) return 'Just now'
    const seconds = Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000)
    if (seconds < 10) return 'Just now'
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    return `${minutes}m ago`
  }

  // Update time display every second
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(prev => prev)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Show error in development only
  if (error && process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-8 right-8 z-40 glass p-4 rounded-lg max-w-xs">
        <p className="text-red-400 text-sm mb-2">⚠️ Spotify: {error}</p>
        {retryCount > 0 && (
          <p className="text-yellow-400 text-xs mb-2">Retried {retryCount} times</p>
        )}
        <button 
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className="mt-2 text-xs text-blue-400 hover:underline disabled:opacity-50"
        >
          {isRefreshing ? 'Retrying...' : 'Retry'}
        </button>
      </div>
    )
  }

  // Hide widget if error in production
  if (error && process.env.NODE_ENV === 'production') {
    return null
  }

  if (isLoading || !currentTrack) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-8 right-8 z-40 hidden lg:block"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-4 w-80 shadow-2xl border border-gray-300 dark:border-white/10 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: currentTrack.isPlaying ? [1, 1.1, 1] : 1 
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <FaSpotify className="text-2xl text-green-500" />
                </motion.div>
                <span className="text-sm font-semibold">
                  {currentTrack.isPlaying ? '🎵 Now Playing' : '🕐 Last Played'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Manual Refresh Button */}
                <motion.button
                  onClick={handleManualRefresh}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isRefreshing}
                  className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  title="Refresh now"
                  aria-label="Refresh Spotify data"
                >
                  <FaSyncAlt className={isRefreshing ? 'animate-spin' : ''} />
                </motion.button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-white transition-colors text-lg leading-none"
                  aria-label="Close Spotify Player"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Album Art & Info */}
            <div className="flex gap-4 items-center mb-4">
              <div className="relative group">
                <motion.img
                  key={currentTrack.albumArt}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    rotate: currentTrack.isPlaying ? 0 : 0,
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                    rotate: { 
                      duration: 10, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }
                  }}
                  src={currentTrack.albumArt}
                  alt={`${currentTrack.album} album art`}
                  className="w-20 h-20 rounded-lg shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23333" width="80" height="80"/%3E%3Ctext fill="%23666" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E🎵%3C/text%3E%3C/svg%3E'
                  }}
                />
                {currentTrack.isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <FaPlay className="text-white text-xs ml-0.5" />
                  </motion.div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <motion.h4 
                  key={currentTrack.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bold text-white truncate" 
                  title={currentTrack.title}
                >
                  {currentTrack.title}
                </motion.h4>
                <motion.p 
                  key={currentTrack.artist}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-gray-400 truncate" 
                  title={currentTrack.artist}
                >
                  {currentTrack.artist}
                </motion.p>
                <motion.p 
                  key={currentTrack.album}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-gray-500 truncate" 
                  title={currentTrack.album}
                >
                  {currentTrack.album}
                </motion.p>
              </div>
            </div>

            {/* Progress Bar */}
            {/* {currentTrack.isPlaying && (
              <div className="mb-4">
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    key="progress"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ 
                      duration: 30, 
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                  />
                </div>
              </div>
            )} */}

            {/* Controls */}
            <div className="flex items-center justify-between">
              <motion.a
                href={currentTrack.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-sm font-semibold text-white flex items-center gap-2 transition-colors"
              >
                <FaSpotify />
                Open in Spotify
              </motion.a>

              {currentTrack.isPlaying && (
                <div className="flex gap-1 items-end h-6">
                  {[1, 2, 3, 4].map((bar) => (
                    <motion.div
                      key={bar}
                      animate={{
                        height: ['8px', '24px', '12px', '20px', '8px']
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: bar * 0.1,
                        ease: 'easeInOut'
                      }}
                      className="w-1 bg-green-500 rounded-full"
                      style={{ height: '8px' }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Live Status & Update Time */}
            <div className="mt-3 flex items-center justify-between text-xs">
              {currentTrack.isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-green-400"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span>Live • Auto-refresh 5s</span>
                </motion.div>
              )}
              
              {lastUpdate && (
                <span className="text-gray-500">
                  {getTimeSinceUpdate()}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Minimized Button */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-shadow"
          aria-label="Show Spotify Player"
        >
          <FaMusic className="text-white text-xl" />
          {currentTrack.isPlaying && (
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default SpotifyPlayer