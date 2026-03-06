import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admin Panel | Atharva.dev',
    robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {children}
        </div>
    )
}
