import { NextResponse } from 'next/server'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'
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
      signal: AbortSignal.timeout(5000),
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
    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json(
        { isPlaying: false, error: 'Missing credentials' },
        { status: 500 }
      )
    }

    const tokenData = await getAccessToken()

    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      console.error(`🚨 Recently played API error: ${response.status}`)
      return NextResponse.json({ isPlaying: false })
    }

    const data = await response.json()
    const track = data.items[0]?.track

    if (!track) {
      return NextResponse.json({ isPlaying: false })
    }

    return NextResponse.json({
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url || '',
      spotifyUrl: track.external_urls.spotify,
    })
  } catch (error: any) {
    if (error.name === 'AbortError' || error.code === 'ECONNRESET') {
      console.error('⚠️ Recently played API timeout')
      return NextResponse.json(
        { isPlaying: false, error: 'Connection timeout' },
        { status: 504 }
      )
    }

    console.error('❌ Error fetching recently played:', error.message)
    return NextResponse.json(
      { isPlaying: false, error: error.message },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0