import fs from 'fs'
import path from 'path'

export interface SiteContent {
    site: {
        brandName: string
        loadingName: string
        loadingNameSuffix: string
        loadingTagline: string
    }
    hero: {
        greeting: string
        name: string
        taglines: string[]
        bio: string
        ctaButtons: { label: string; href: string; primary: boolean }[]
        socialLinks: { platform: string; url: string }[]
    }
    about: {
        subtitle: string
        stats: { label: string; value: string; icon: string; color: string }[]
        profileImage: string
        fullName: string
        title: string
        availability: string
        location: string
        graduationDate: string
        workStatus: string
        email: string
        phone: string
        socialLinks: { platform: string; url: string; label: string }[]
        topSkills: { name: string; level: number }[]
        languages: { name: string; level: string }[]
        bio: string[]
        expertise: {
            title: string
            description: string
            icon: string
            skills: string[]
        }[]
        education: {
            degree: string
            institution: string
            period: string
            grade: string
            color: string
        }[]
        highlights: {
            emoji: string
            title: string
            description: string
            bgColor: string
            borderColor: string
            hoverColor: string
        }[]
    }
    projects: {
        id: number
        title: string
        description: string
        image: string
        tech: string[]
        github: string
        color: string
    }[]
    skills: {
        categories: {
            category: string
            color: string
            skills: { name: string; color: string }[]
        }[]
        areasOfInterest: { name: string; emoji: string }[]
        summary: {
            title: string
            description: string
            badges: string[]
        }
    }
    resume: {
        email: string
        phone: string
        rollNo: string
        resumeFileName: string
        githubProfileUrl: string
        education: {
            degree: string
            field: string
            institution: string
            period: string
            grade: string
            rollNo?: string
        }[]
        certifications: {
            name: string
            issuer: string
            date: string
            skills: string[]
        }[]
        experience: {
            title: string
            company: string
            period: string
            description: string
            skills: string[]
            type: string
        }[]
        achievements: {
            title: string
            description: string
            date: string
            icon: string
            color: string
        }[]
        quickStats: { label: string; value: string }[]
    }
    contact: {
        subtitle: string
        heading: string
        description: string
        contactInfo: { label: string; value: string; link: string | null; icon: string }[]
        socialLinks: { platform: string; url: string }[]
    }
}

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json')

export function getContent(): SiteContent {
    const raw = fs.readFileSync(CONTENT_PATH, 'utf-8')
    return JSON.parse(raw) as SiteContent
}

/**
 * Save content via GitHub API (works on Vercel's read-only filesystem).
 * Falls back to local filesystem write for local development.
 */
export async function saveContent(content: SiteContent): Promise<void> {
    const token = process.env.GITHUB_CONTENT_TOKEN
    const repo = process.env.GITHUB_REPO
    const branch = process.env.GITHUB_BRANCH || 'main'

    // If GitHub env vars are configured, use GitHub API (required for Vercel)
    if (token && repo) {
        const filePath = 'data/content.json'
        const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`
        const headers = {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        }

        // 1. Get the current file SHA (required for updates)
        const getRes = await fetch(`${apiUrl}?ref=${branch}`, { headers })
        if (!getRes.ok) {
            const errBody = await getRes.text()
            throw new Error(`GitHub API: Failed to get current file (${getRes.status}): ${errBody}`)
        }
        const fileData = await getRes.json()
        const currentSha = fileData.sha

        // 2. Update the file via PUT
        const newContent = JSON.stringify(content, null, 2)
        const base64Content = Buffer.from(newContent, 'utf-8').toString('base64')

        const putRes = await fetch(apiUrl, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                message: 'Update content.json via Admin Panel',
                content: base64Content,
                sha: currentSha,
                branch,
            }),
        })

        if (!putRes.ok) {
            const errBody = await putRes.text()
            throw new Error(`GitHub API: Failed to update file (${putRes.status}): ${errBody}`)
        }

        return
    }

    // Fallback: local filesystem write (for local development)
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8')
}
