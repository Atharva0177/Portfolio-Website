# Building My Developer Portfolio Website with Next.js 14 — A Complete Developer Guide

> *From zero to a fully dynamic, admin-panel-powered portfolio with Spotify integration, animated components, and a content-driven architecture.*

---

## Introduction

Every developer reaches a point where they need a portfolio. But I didn't just want a static page with my name and a list of projects — I wanted something that felt *alive*. Something that showed my personality, my work, and my current music taste, all in one place.

This article documents the full development journey of my portfolio website: the architecture decisions I made, the interesting technical challenges I faced, and the complete code behind every component. By the end, you'll have everything you need to build your own.

**What we'll build:**
- A Next.js 14 app with TypeScript and Tailwind CSS
- A centralized content management system using a single [content.json](file:///e:/Portfolio-Website/data/content.json) file
- An animated loading screen, particle-background hero, and scroll-aware navbar
- Sections for About, Projects, Skills, Resume, GitHub Activity, and Contact
- A live Spotify "Now Playing" widget
- A fully functional Admin Panel to edit all site content without touching code
- A contact form powered by Web3Forms

---

## Tech Stack

Before we dive in, here's the full list of what this site is built on:

| Category | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | React Icons |
| **Type Animation** | react-type-animation |
| **Scroll Detection** | react-intersection-observer |
| **Contact Form** | Web3Forms API |
| **Music Widget** | Spotify Web API |

Here is the [package.json](file:///e:/Portfolio-Website/package.json):

```json
{
  "name": "portfolio-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.16",
    "react-icons": "^4.12.0",
    "react-type-animation": "^3.2.0",
    "react-intersection-observer": "^9.5.3"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3"
  }
}
```

---

## Project Structure

```
Portfolio-Website/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout wrapper
│   │   └── page.tsx            # Full admin panel UI (CMS)
│   ├── api/
│   │   ├── admin/              # Admin auth API
│   │   ├── contact/            # Contact form proxy
│   │   ├── content/            # Content CRUD API
│   │   └── spotify/
│   │       ├── now-playing/    # Spotify current track
│   │       └── recently-played/# Spotify recent track
│   ├── globals.css             # Global styles & Tailwind
│   ├── layout.tsx              # Root layout (metadata, fonts)
│   └── page.tsx                # Main page (all sections)
├── components/
│   ├── About.tsx
│   ├── BentoShowcase.tsx
│   ├── ClientLayout.tsx        # Loading screen + Navbar wrapper
│   ├── Contact.tsx
│   ├── GitHubActivity.tsx
│   ├── Hero.tsx
│   ├── LoadingScreen.tsx
│   ├── Navbar.tsx
│   ├── ParticleBackground.tsx
│   ├── Projects.tsx
│   ├── Resume.tsx
│   ├── ScrollProgress.tsx
│   ├── Skills.tsx
│   ├── SpotifyPlayer.tsx
│   ├── TechStackVisualization.tsx
│   ├── TerminalToggle.tsx
│   └── ThemeToggle.tsx
├── data/
│   └── content.json            # ALL site content lives here
├── lib/
│   └── content.ts              # TypeScript interfaces + read/write helpers
├── public/                     # Static assets (resume PDF, images)
├── .env.local                  # Environment secrets
└── next.config.js
```

The key idea: **every piece of text, every project card, every skill — all managed through [data/content.json](file:///e:/Portfolio-Website/data/content.json).** No hardcoded strings in components.

---

## The Content Architecture: [content.json](file:///e:/Portfolio-Website/data/content.json) + TypeScript

This is the most important design decision in the whole project. Instead of scattering data across components, all content lives in a single JSON file. This makes the site trivially easy to update — you can even build an admin panel on top (which we did).

### [lib/content.ts](file:///e:/Portfolio-Website/lib/content.ts) — The Type Definitions and Helpers

```typescript
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
            skills: { name: string; color: string; iconUrl?: string }[]
        }[]
        areasOfInterest: { name: string; emoji: string }[]
        summary: { title: string; description: string; badges: string[] }
    }
    resume: {
        email: string
        phone: string
        rollNo: string
        resumeFileName: string
        githubProfileUrl: string
        education: { degree: string; field: string; institution: string; period: string; grade: string }[]
        certifications: { name: string; issuer: string; date: string; skills: string[] }[]
        experience: { title: string; company: string; period: string; description: string; skills: string[]; type: string }[]
        achievements: { title: string; description: string; date: string; icon: string; color: string }[]
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
```

The [getContent()](file:///e:/Portfolio-Website/lib/content.ts#127-131) function reads the JSON on every request (Next.js 14 Server Components handle this efficiently with its caching layer). The [saveContent()](file:///e:/Portfolio-Website/lib/content.ts#132-135) is called by the Admin Panel API route when you save changes through the UI.

### Why this pattern?

1. **Single source of truth** — Change one file, the whole site updates
2. **Type safety** — TypeScript catches schema mismatches at compile time
3. **Admin-panel-ready** — the [saveContent()](file:///e:/Portfolio-Website/lib/content.ts#132-135) function makes a CMS trivial
4. **Git-friendly** — content changes are tracked as real commits

---

## Setting Up the Project

### 1. Create the Next.js App

```bash
npx create-next-app@latest portfolio-website --typescript --tailwind --app
cd portfolio-website
npm install framer-motion react-icons react-type-animation react-intersection-observer
```

### 2. Environment Variables

Create [.env.local](file:///e:/Portfolio-Website/.env.local) in the root:

```env
# Spotify Integration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Contact Form (Web3Forms)
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key

# Admin Panel Password
ADMIN_PASSWORD=your_secure_admin_password
```

> **Never** commit [.env.local](file:///e:/Portfolio-Website/.env.local) to git. Add it to [.gitignore](file:///e:/Portfolio-Website/.gitignore).

---

## The Root Layout

The [app/layout.tsx](file:///e:/Portfolio-Website/app/layout.tsx) is where metadata lives. It reads dynamically from our content:

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import { getContent } from '@/lib/content'

const inter = Inter({ subsets: ['latin'] })

export function generateMetadata(): Metadata {
  const content = getContent()
  return {
    title: `${content.about?.fullName || content.site?.brandName || 'Portfolio'}`,
    description: content.hero?.bio || 'My portfolio website',
    keywords: ['portfolio', 'developer', content.about?.fullName || '',
      ...(content.skills?.categories?.map((c: any) => c.category) || [])],
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const content = getContent()
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen transition-colors duration-300`}>
        <ClientLayout site={content.site}>{children}</ClientLayout>
      </body>
    </html>
  )
}
```

## The Main Page

```typescript
// app/page.tsx
import { getContent } from '@/lib/content'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import GitHubActivity from '@/components/GitHubActivity'
import Resume from '@/components/Resume'

export default function Home() {
  const content = getContent()
  const githubUrl = content.hero.socialLinks?.find(l => l.platform === 'github')?.url || '#'

  return (
    <>
      <Hero content={content.hero} />
      <About content={content.about} />
      <Projects content={content.projects} githubUrl={githubUrl} />
      <Resume content={content.resume} />
      <Skills content={content.skills} />
      <GitHubActivity projects={content.projects} githubUrl={githubUrl} />
      <Contact content={content.contact} />
    </>
  )
}
```

Clean, flat, and every section is a separate component receiving exactly the slice of data it needs.

---

## [ClientLayout.tsx](file:///e:/Portfolio-Website/components/ClientLayout.tsx) — The Shell

Since [layout.tsx](file:///e:/Portfolio-Website/app/layout.tsx) is a Server Component, we need a client boundary for interactive pieces like the loading screen and navbar. [ClientLayout](file:///e:/Portfolio-Website/components/ClientLayout.tsx#19-41) is the bridge:

```typescript
// components/ClientLayout.tsx
'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import ScrollProgress from './ScrollProgress'

const ClientLayout = ({ children, site }: { children: React.ReactNode, site?: any }) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen
                        onComplete={() => setIsLoading(false)}
                        name={site?.loadingName}
                        suffix={site?.loadingNameSuffix}
                        tagline={site?.loadingTagline}
                    />
                )}
            </AnimatePresence>
            <ScrollProgress />
            <Navbar brandName={site?.brandName} />
            <main>{children}</main>
        </>
    )
}

export default ClientLayout
```

The `AnimatePresence` from Framer Motion allows the loading screen to animate *out* before the content animates in. The `mode="wait"` ensures the exit animation completes before the next component mounts.

---

## Component Deep Dives

### The Navbar

The Navbar is scroll-aware and section-aware. It tracks which section is visible using a `requestAnimationFrame`-throttled scroll listener and highlights the corresponding nav link:

```typescript
// components/Navbar.tsx (key section)
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const Navbar = ({ brandName = 'Atharva.dev' }: { brandName?: string }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'resume', 'skills', 'contact']
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        setScrolled(window.scrollY > 50)
        const scrollY = window.scrollY + 120
        let current = 'home'
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (!el) continue
          if (scrollY >= el.getBoundingClientRect().top + window.scrollY) current = id
        }
        setActiveSection(current)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'About', 'Projects', 'Resume', 'Skills', 'Contact']

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}
    >
      {/* ... nav links with animated underline indicator ... */}
    </motion.nav>
  )
}
```

The active nav link gets an animated gradient underbar using Framer Motion's `layoutId` for smooth transitions between sections.

---

### The Hero Component

The hero combines a live-rendered `ParticleBackground`, an animated greeting badge, a large heading, a `TypeAnimation` cycling through titles from [content.json](file:///e:/Portfolio-Website/data/content.json), and social links rendered dynamically:

```typescript
// components/Hero.tsx (condensed)
'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import ParticleBackground from './ParticleBackground'

const SOCIAL_ICONS: Record<string, any> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
}

const Hero = ({ content }: { content: HeroContent }) => {
  // Build the TypeAnimation sequence from the taglines array in content.json
  const typeSequence = content.taglines.flatMap(t => [t, 2000])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 pointer-events-none" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 text-center relative z-10"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-bold mb-6">
          Hi, I&apos;m <span className="gradient-text">{content.name}</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="text-2xl md:text-4xl mb-8">
          <TypeAnimation
            sequence={typeSequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          />
        </motion.div>

        {/* CTA Buttons from content */}
        <motion.div variants={itemVariants} className="flex gap-6 justify-center mb-12">
          {content.ctaButtons.map((btn, i) => (
            <motion.a
              key={i}
              href={btn.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={btn.primary
                ? 'px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'px-8 py-4 rounded-full glass text-white'}
            >
              {btn.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Social Links dynamically resolved from content */}
        <motion.div variants={itemVariants} className="flex gap-6 justify-center">
          {content.socialLinks.map((social, index) => {
            const Icon = SOCIAL_ICONS[social.platform] || FaGithub
            return (
              <motion.a key={index} href={social.url} target="_blank"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-3 glass rounded-full"
              >
                <Icon size={24} />
              </motion.a>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
```

**Key pattern**: the social icons map (`SOCIAL_ICONS`) lets content.json specify platform names like `"github"` and the component resolves the correct icon at render time — no hardcoding needed.

---

### The Contact Form with Web3Forms

The contact form submits directly to Web3Forms from the browser, bypassing any server-side handler (which could be blocked by CORS or rate limits):

```typescript
// components/Contact.tsx (form section)
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  setStatus('sending')

  const form = event.currentTarget
  const formDataToSend = new FormData(form)

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formDataToSend  // Includes the hidden access_key field
  })

  const data = await response.json()
  if (data.success) {
    setStatus('sent')
    form.reset()
    setTimeout(() => setStatus('idle'), 5000)
  } else {
    setStatus('error')
    setErrorMessage(data.message)
  }
}
```

In the form JSX, a hidden input carries the Web3Forms access key:

```jsx
<input
  type="hidden"
  name="access_key"
  value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''}
/>
```

**Setup**: Create a free account at [web3forms.com](https://web3forms.com), get your access key, and add it to [.env.local](file:///e:/Portfolio-Website/.env.local) as `NEXT_PUBLIC_WEB3FORMS_KEY`.

---

### The Spotify "Now Playing" Widget

This was one of the most fun features. A floating [SpotifyPlayer](file:///e:/Portfolio-Website/components/SpotifyPlayer.tsx#16-430) widget shows what's currently playing (or last played) in real time with a 10-second polling interval.

#### Step 1: Get Spotify API Credentials

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app, set redirect URI to `http://localhost:3000`
3. Note your `Client ID` and `Client Secret`
4. Use the Authorization Code flow to get an initial `code`, then exchange it for a `refresh_token`

The project includes a [get-new-token.js](file:///e:/Portfolio-Website/get-new-token.js) helper script for this.

#### Step 2: API Route — Now Playing

```typescript
// app/api/spotify/now-playing/route.ts
import { NextResponse } from 'next/server'

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  })

  return response.json()
}

export async function GET() {
  const { access_token } = await getAccessToken()
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  })

  if (response.status === 204) {
    return NextResponse.json({ isPlaying: false })
  }

  const data = await response.json()
  const track = {
    isPlaying: data.is_playing,
    title: data.item?.name,
    artist: data.item?.artists?.map((a: any) => a.name).join(', '),
    album: data.item?.album?.name,
    albumArt: data.item?.album?.images?.[0]?.url,
    spotifyUrl: data.item?.external_urls?.spotify,
  }
  return NextResponse.json(track)
}
```

#### Step 3: The Widget Component (key logic)

```typescript
// components/SpotifyPlayer.tsx (polling logic)
const SpotifyPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  useEffect(() => {
    fetchCurrentTrack()
    // Poll every 10 seconds
    const interval = setInterval(() => fetchCurrentTrack(false), 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchCurrentTrack = async (showLoading = true, retry = 0) => {
    // Try now-playing first
    let response = await fetch('/api/spotify/now-playing', { cache: 'no-store' })
    let data = await response.json()

    // Fall back to recently-played if nothing is active
    if (!data.isPlaying || !data.title) {
      response = await fetch('/api/spotify/recently-played', { cache: 'no-store' })
      data = await response.json()
    }

    if (data.title && data.artist) setCurrentTrack({ ...data, isPlaying: data.isPlaying || false })
  }

  // Widget renders as a fixed card in the bottom-right corner
  // Shows album art, track name, artist, and animated playing bars
}
```

The widget gracefully hides itself in production if Spotify errors occur, so it never breaks the page.

---

## The Admin Panel

Rather than editing [content.json](file:///e:/Portfolio-Website/data/content.json) by hand, the site has a built-in admin panel at `/admin`. It's a full CRUD interface for every section of the site.

**Authentication**: A simple password check via the `/api/admin` route, stored in `ADMIN_PASSWORD` env variable.

**Content API**: [app/api/content/route.ts](file:///e:/Portfolio-Website/app/api/content/route.ts) handles `GET` (read) and `POST` (write) requests, calling [getContent()](file:///e:/Portfolio-Website/lib/content.ts#127-131) and [saveContent()](file:///e:/Portfolio-Website/lib/content.ts#132-135) from [lib/content.ts](file:///e:/Portfolio-Website/lib/content.ts).

**The Admin UI**: A single large [app/admin/page.tsx](file:///e:/Portfolio-Website/app/admin/page.tsx) (~49KB) that renders a form for every section — hero, about, projects, skills, resume, contact — with live preview capabilities.

This means you can add a new project, tweak your bio, or add a certification entirely through the browser — no code deployment required.

---

## The [globals.css](file:///e:/Portfolio-Website/app/globals.css) — Design System

The `.glass` utility class is used throughout the site for the frosted-glass aesthetic:

```css
/* app/globals.css */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gradient-text {
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Dark/light mode support via CSS variables */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

The `ThemeToggle` component (using `localStorage`) allows manual light/dark switching, while the CSS variables handle the theming system-wide.

---

## Deployment

### Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel
```

Then in the Vercel dashboard, add all your environment variables from [.env.local](file:///e:/Portfolio-Website/.env.local):

| Variable | Where to get it |
|---|---|
| `SPOTIFY_CLIENT_ID` | Spotify Developer Dashboard |
| `SPOTIFY_CLIENT_SECRET` | Spotify Developer Dashboard |
| `SPOTIFY_REFRESH_TOKEN` | Exchange auth code using helper script |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | web3forms.com dashboard |
| `ADMIN_PASSWORD` | Set your own |

> **Note on Spotify**: The project includes [get-new-token.js](file:///e:/Portfolio-Website/get-new-token.js) — a helper script that guides you through the OAuth flow to get your initial refresh token. Run it once locally with `node get-new-token.js`.

---

## Key Design Patterns Used

### 1. Data-Prop Components
Every section component receives its data as a prop from [page.tsx](file:///e:/Portfolio-Website/app/page.tsx). No component fetches its own data — the server fetches everything once and passes it down. This results in a **single JSON file read per page request**.

### 2. Icon Resolver Maps
Instead of hardcoding icons in JSON (not serializable), we use string keys in content.json and a lookup map in the component:

```typescript
const SOCIAL_ICONS: Record<string, any> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
}
// In JSX:
const Icon = SOCIAL_ICONS[social.platform] || FaGithub
```

### 3. Scroll-Triggered Animations
Using `react-intersection-observer`, sections animate in as they enter the viewport:

```typescript
const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
>
```

### 4. `requestAnimationFrame` Scroll Throttling
The navbar uses RAF-based throttling instead of `lodash/throttle` to avoid jank during scroll detection, keeping scroll handlers performant.

---

## Customizing This for Yourself

If you want to clone and adapt this portfolio:

1. **Clone the repo** and run `npm install`
2. **Edit [data/content.json](file:///e:/Portfolio-Website/data/content.json)** — change every field to your own info
3. **Replace `public/Atharva_Mandavkar_Resume.pdf`** with your resume PDF
4. **Add your [.env.local](file:///e:/Portfolio-Website/.env.local)** with Spotify and Web3Forms credentials
5. **Run `npm run dev`** and visit `http://localhost:3000/admin` to use the CMS
6. **Deploy to Vercel** and add your env vars

The only hardcoded thing left is the Spotify integration, which requires OAuth; follow the [CONTACT_FORM_SETUP.md](file:///e:/Portfolio-Website/CONTACT_FORM_SETUP.md) and the [get-new-token.js](file:///e:/Portfolio-Website/get-new-token.js) helper for step-by-step instructions.

---

## What I Learned Building This

**1. JSON-driven content scales beautifully.** What started as a simpler site became far easier to maintain once I centralized everything into [content.json](file:///e:/Portfolio-Website/data/content.json). Adding a new project takes 10 lines of JSON — no component editing required.

**2. Server Components + Client Islands is the right mental model.** Layout-level data fetching in Server Components, with `'use client'` only where interactivity is genuinely needed, results in fast initial loads and minimal JS payloads.

**3. Framer Motion is worth it.** The staggered entrance animations, the navbar indicator `layoutId` transitions, and the Spotify widget's spring physics all make the site feel premium with minimal code.

**4. Build the admin panel early.** I added it later, and retrofitting it taught me that designing for content-driven architecture from the start would have saved hours.

---

## Final Thoughts

Building a portfolio that reflects who you are technically is one of the most satisfying projects you can do. This one evolved from a simple static page into a fully dynamic, CMS-powered site with live integrations — and every piece of the architecture was intentional.

If you use any of these patterns in your own portfolio, I'd love to hear about it.

You can find the full source code on [GitHub](https://github.com/Atharva0177) and see the live site in action.

---

*Thanks for reading! If this was helpful, drop a clap (or 50 🙂). Questions? Leave them in the comments below.*

---

**Tags**: `Next.js` · `TypeScript` · `Portfolio` · `Web Development` · `React` · `Tailwind CSS` · `Framer Motion` · `Spotify API`
