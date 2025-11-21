import { NextResponse } from 'next/server'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const getAccessToken = async () => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error getting access token:', error)
    throw error
  }
}

export async function GET() {
  try {
    // Validate environment variables
    if (!client_id || !client_secret || !refresh_token) {
      console.error('❌ Missing Spotify credentials')
      return NextResponse.json(
        { isPlaying: false, error: 'Missing credentials' },
        { status: 500 }
      )
    }

    // Get access token with timeout
    const tokenData = await getAccessToken()
    
    if (!tokenData.access_token) {
      throw new Error('No access token received')
    }

    // Fetch currently playing with timeout
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })

    // Handle 204 No Content (nothing playing)
    if (response.status === 204) {
      return NextResponse.json({ isPlaying: false })
    }

    // Handle 401 Unauthorized
    if (response.status === 401) {
      console.error('🚨 Spotify authorization failed - token may be invalid')
      return NextResponse.json(
        { isPlaying: false, error: 'Authorization failed' },
        { status: 401 }
      )
    }

    // Handle other errors
    if (!response.ok) {
      console.error(`🚨 Spotify API error: ${response.status}`)
      return NextResponse.json({ isPlaying: false })
    }

    const song = await response.json()

    if (!song || !song.item) {
      return NextResponse.json({ isPlaying: false })
    }

    return NextResponse.json({
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((artist: any) => artist.name).join(', '),
      album: song.item.album.name,
      albumArt: song.item.album.images[0]?.url || '',
      spotifyUrl: song.item.external_urls.spotify,
    })
  } catch (error: any) {
    // Handle specific error types
    if (error.name === 'AbortError' || error.code === 'ECONNRESET') {
      console.error('⚠️ Spotify API timeout or connection reset')
      return NextResponse.json(
        { isPlaying: false, error: 'Connection timeout' },
        { status: 504 }
      )
    }

    console.error('❌ Error fetching Spotify data:', error.message)
    return NextResponse.json(
      { isPlaying: false, error: error.message },
      { status: 500 }
    )
  }
}

// Add route config for better performance
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0