import { NextResponse } from 'next/server'
import { getContent, saveContent } from '@/lib/content'

function isAuthorized(request: Request): boolean {
    const authHeader = request.headers.get('authorization')
    const password = process.env.ADMIN_PASSWORD
    if (!password) return false
    return authHeader === `Bearer ${password}`
}

export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const content = getContent()
        return NextResponse.json(content)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const content = await request.json()
        await saveContent(content)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to save content:', error)
        const message = error instanceof Error ? error.message : 'Failed to save content'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
