import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { password } = await request.json()
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminPassword) {
            return NextResponse.json(
                { error: 'ADMIN_PASSWORD not configured in .env.local' },
                { status: 500 }
            )
        }

        if (password === adminPassword) {
            return NextResponse.json({ success: true, token: adminPassword })
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
