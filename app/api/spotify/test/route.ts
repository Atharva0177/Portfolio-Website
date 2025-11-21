import { NextResponse } from 'next/server'

export async function GET() {
  const hasClientId = !!process.env.SPOTIFY_CLIENT_ID
  const hasClientSecret = !!process.env.SPOTIFY_CLIENT_SECRET
  const hasRefreshToken = !!process.env.SPOTIFY_REFRESH_TOKEN

  return NextResponse.json({
    hasClientId,
    hasClientSecret,
    hasRefreshToken,
    clientIdLength: process.env.SPOTIFY_CLIENT_ID?.length || 0,
    clientSecretLength: process.env.SPOTIFY_CLIENT_SECRET?.length || 0,
    refreshTokenLength: process.env.SPOTIFY_REFRESH_TOKEN?.length || 0,
  })
}