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

export function saveContent(content: SiteContent): void {
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8')
}
