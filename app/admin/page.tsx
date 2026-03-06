'use client'

import { useState, useEffect, useCallback } from 'react'

import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Navbar from '@/components/Navbar'

type Tab = 'site' | 'hero' | 'about' | 'projects' | 'skills' | 'resume' | 'contact'

const TABS: { key: Tab; label: string; emoji: string }[] = [
    { key: 'site', label: 'Site', emoji: '🌐' },
    { key: 'hero', label: 'Hero', emoji: '🏠' },
    { key: 'about', label: 'About', emoji: '👤' },
    { key: 'projects', label: 'Projects', emoji: '🚀' },
    { key: 'skills', label: 'Skills', emoji: '⚡' },
    { key: 'resume', label: 'Resume', emoji: '📄' },
    { key: 'contact', label: 'Contact', emoji: '📧' },
]

// --- Reusable form components ---
function Field({ label, value, onChange, multiline = false, placeholder = '' }: {
    label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    rows={3}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-sm"
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-sm"
                />
            )}
        </div>
    )
}

function ColorField({ label, value, onChange }: {
    label: string; value: string; onChange: (v: string) => void
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <div className="flex gap-2 items-center">
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={e => onChange(e.target.value)}
                    className="w-10 h-10 p-1 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer"
                />
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder="#HexCode"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none text-sm uppercase font-mono"
                />
            </div>
        </div>
    )
}

function ArrayField({ label, items, onChange, placeholder = 'New item...' }: {
    label: string; items: string[]; onChange: (items: string[]) => void; placeholder?: string
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
            {items.map((item, i) => (
                <div key={i} className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={item}
                        onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n) }}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <button onClick={() => onChange(items.filter((_, j) => j !== i))}
                        className="px-3 py-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                </div>
            ))}
            <button onClick={() => onChange([...items, ''])}
                className="text-sm text-blue-400 hover:text-blue-300 mt-1">+ Add {label.toLowerCase()}</button>
        </div>
    )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">{title}</h3>
            {children}
        </div>
    )
}

// --- Tab content editors ---
function SiteEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const s = data.site
    const set = (k: string, v: any) => onChange({ ...data, site: { ...s, [k]: v } })
    return (
        <SectionCard title="Site Settings">
            <Field label="Brand Name (Navbar)" value={s.brandName} onChange={v => set('brandName', v)} />
            <Field label="Loading Screen Name" value={s.loadingName} onChange={v => set('loadingName', v)} />
            <Field label="Loading Name Suffix" value={s.loadingNameSuffix} onChange={v => set('loadingNameSuffix', v)} />
            <Field label="Loading Tagline" value={s.loadingTagline} onChange={v => set('loadingTagline', v)} />
        </SectionCard>
    )
}

function HeroEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const h = data.hero
    const set = (k: string, v: any) => onChange({ ...data, hero: { ...h, [k]: v } })
    return (
        <>
            <SectionCard title="Hero Section">
                <Field label="Greeting Badge" value={h.greeting} onChange={v => set('greeting', v)} />
                <Field label="Name" value={h.name} onChange={v => set('name', v)} />
                <Field label="Bio" value={h.bio} onChange={v => set('bio', v)} multiline />
                <ArrayField label="Taglines (rotating text)" items={h.taglines} onChange={v => set('taglines', v)} />
            </SectionCard>
            <SectionCard title="Hero Social Links">
                {h.socialLinks.map((link: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2 items-end">
                        <div className="flex-1"><Field label="Platform" value={link.platform} onChange={v => { const n = [...h.socialLinks]; n[i] = { ...n[i], platform: v }; set('socialLinks', n) }} /></div>
                        <div className="flex-1"><Field label="URL" value={link.url} onChange={v => { const n = [...h.socialLinks]; n[i] = { ...n[i], url: v }; set('socialLinks', n) }} /></div>
                        <button onClick={() => set('socialLinks', h.socialLinks.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('socialLinks', [...h.socialLinks, { platform: '', url: '' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add social link</button>
            </SectionCard>
        </>
    )
}

function AboutEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const a = data.about
    const set = (k: string, v: any) => onChange({ ...data, about: { ...a, [k]: v } })
    return (
        <>
            <SectionCard title="About Section">
                <Field label="Subtitle" value={a.subtitle} onChange={v => set('subtitle', v)} />
                <Field label="Full Name" value={a.fullName} onChange={v => set('fullName', v)} />
                <Field label="Title" value={a.title} onChange={v => set('title', v)} />
                <Field label="Availability Status" value={a.availability} onChange={v => set('availability', v)} />
                <Field label="Profile Image URL" value={a.profileImage} onChange={v => set('profileImage', v)} />
                <Field label="Location" value={a.location} onChange={v => set('location', v)} />
                <Field label="Graduation Date" value={a.graduationDate} onChange={v => set('graduationDate', v)} />
                <Field label="Work Status" value={a.workStatus} onChange={v => set('workStatus', v)} />
                <Field label="Email" value={a.email} onChange={v => set('email', v)} />
                <Field label="Phone" value={a.phone} onChange={v => set('phone', v)} />
            </SectionCard>
            <SectionCard title="Bio Paragraphs (supports HTML)">
                {a.bio.map((p: string, i: number) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <textarea value={p} onChange={e => { const n = [...a.bio]; n[i] = e.target.value; set('bio', n) }}
                            rows={2} className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none" />
                        <button onClick={() => set('bio', a.bio.filter((_: any, j: number) => j !== i))} className="px-3 py-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm self-start">✕</button>
                    </div>
                ))}
                <button onClick={() => set('bio', [...a.bio, ''])} className="text-sm text-blue-400 hover:text-blue-300">+ Add paragraph</button>
            </SectionCard>
            <SectionCard title="Stats">
                {a.stats.map((stat: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-3 items-end">
                        <div className="flex-1"><Field label="Label" value={stat.label} onChange={v => { const n = [...a.stats]; n[i] = { ...n[i], label: v }; set('stats', n) }} /></div>
                        <div className="w-24"><Field label="Value" value={stat.value} onChange={v => { const n = [...a.stats]; n[i] = { ...n[i], value: v }; set('stats', n) }} /></div>
                        <button onClick={() => set('stats', a.stats.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('stats', [...a.stats, { label: '', value: '', icon: 'FaCode', color: 'text-blue-400' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add stat</button>
            </SectionCard>
            <SectionCard title="Top Skills">
                {a.topSkills.map((skill: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2 items-end">
                        <div className="flex-1"><Field label="Skill" value={skill.name} onChange={v => { const n = [...a.topSkills]; n[i] = { ...n[i], name: v }; set('topSkills', n) }} /></div>
                        <div className="w-24"><Field label="Level %" value={String(skill.level)} onChange={v => { const n = [...a.topSkills]; n[i] = { ...n[i], level: parseInt(v) || 0 }; set('topSkills', n) }} /></div>
                        <button onClick={() => set('topSkills', a.topSkills.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('topSkills', [...a.topSkills, { name: '', level: 50 }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add skill</button>
            </SectionCard>
            <SectionCard title="Languages">
                {a.languages.map((lang: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2 items-end">
                        <div className="flex-1"><Field label="Language" value={lang.name} onChange={v => { const n = [...a.languages]; n[i] = { ...n[i], name: v }; set('languages', n) }} /></div>
                        <div className="flex-1"><Field label="Proficiency" value={lang.level} onChange={v => { const n = [...a.languages]; n[i] = { ...n[i], level: v }; set('languages', n) }} /></div>
                        <button onClick={() => set('languages', a.languages.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('languages', [...a.languages, { name: '', level: '' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add language</button>
            </SectionCard>
            <SectionCard title="Expertise Areas">
                {a.expertise.map((area: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 grid grid-cols-3 gap-2">
                                <Field label="Icon (emoji)" value={area.icon} onChange={v => { const n = [...a.expertise]; n[i] = { ...n[i], icon: v }; set('expertise', n) }} />
                                <Field label="Title" value={area.title} onChange={v => { const n = [...a.expertise]; n[i] = { ...n[i], title: v }; set('expertise', n) }} />
                                <Field label="Description" value={area.description} onChange={v => { const n = [...a.expertise]; n[i] = { ...n[i], description: v }; set('expertise', n) }} />
                            </div>
                            <button onClick={() => set('expertise', a.expertise.filter((_: any, j: number) => j !== i))} className="px-3 py-2 ml-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                        </div>
                        <ArrayField label="Skills" items={area.skills} onChange={v => { const n = [...a.expertise]; n[i] = { ...n[i], skills: v }; set('expertise', n) }} />
                    </div>
                ))}
                <button onClick={() => set('expertise', [...a.expertise, { title: '', description: '', icon: '💡', skills: [] }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add expertise area</button>
            </SectionCard>
            <SectionCard title="Education Timeline">
                {a.education.map((edu: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                                <Field label="Degree" value={edu.degree} onChange={v => { const n = [...a.education]; n[i] = { ...n[i], degree: v }; set('education', n) }} />
                                <Field label="Institution" value={edu.institution} onChange={v => { const n = [...a.education]; n[i] = { ...n[i], institution: v }; set('education', n) }} />
                                <Field label="Period" value={edu.period} onChange={v => { const n = [...a.education]; n[i] = { ...n[i], period: v }; set('education', n) }} />
                                <Field label="Grade" value={edu.grade} onChange={v => { const n = [...a.education]; n[i] = { ...n[i], grade: v }; set('education', n) }} />
                            </div>
                            <button onClick={() => set('education', a.education.filter((_: any, j: number) => j !== i))} className="px-3 py-2 ml-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm self-start">✕</button>
                        </div>
                    </div>
                ))}
                <button onClick={() => set('education', [...a.education, { degree: '', institution: '', period: '', grade: '', color: 'from-blue-500 to-cyan-500' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add education</button>
            </SectionCard>
            <SectionCard title="Key Highlights">
                {a.highlights.map((h: any, i: number) => (
                    <div key={i} className="mb-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between">
                            <div className="flex-1 grid grid-cols-3 gap-2">
                                <Field label="Emoji" value={h.emoji} onChange={v => { const n = [...a.highlights]; n[i] = { ...n[i], emoji: v }; set('highlights', n) }} />
                                <Field label="Title" value={h.title} onChange={v => { const n = [...a.highlights]; n[i] = { ...n[i], title: v }; set('highlights', n) }} />
                                <Field label="Description" value={h.description} onChange={v => { const n = [...a.highlights]; n[i] = { ...n[i], description: v }; set('highlights', n) }} />
                            </div>
                            <button onClick={() => set('highlights', a.highlights.filter((_: any, j: number) => j !== i))} className="px-3 py-2 ml-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm self-start">✕</button>
                        </div>
                    </div>
                ))}
                <button onClick={() => set('highlights', [...a.highlights, { emoji: '🏆', title: '', description: '', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20', hoverColor: 'hover:bg-blue-500/20' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add highlight</button>
            </SectionCard>
        </>
    )
}

function ProjectsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const p = data.projects
    const setProjects = (v: any) => onChange({ ...data, projects: v })
    return (
        <SectionCard title="Projects">
            {p.map((proj: any, i: number) => (
                <div key={i} className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">{proj.title || 'New Project'}</h4>
                        <button onClick={() => setProjects(p.filter((_: any, j: number) => j !== i))} className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">Delete</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Field label="Title" value={proj.title} onChange={v => { const n = [...p]; n[i] = { ...n[i], title: v }; setProjects(n) }} />
                        <Field label="GitHub URL" value={proj.github} onChange={v => { const n = [...p]; n[i] = { ...n[i], github: v }; setProjects(n) }} />
                    </div>
                    <Field label="Description" value={proj.description} onChange={v => { const n = [...p]; n[i] = { ...n[i], description: v }; setProjects(n) }} multiline />
                    <Field label="Image URL" value={proj.image} onChange={v => { const n = [...p]; n[i] = { ...n[i], image: v }; setProjects(n) }} />
                    <Field label="Gradient Color (e.g. from-blue-500 to-teal-600)" value={proj.color} onChange={v => { const n = [...p]; n[i] = { ...n[i], color: v }; setProjects(n) }} />
                    <ArrayField label="Tech Stack" items={proj.tech} onChange={v => { const n = [...p]; n[i] = { ...n[i], tech: v }; setProjects(n) }} />
                </div>
            ))}
            <button onClick={() => setProjects([...p, { id: Date.now(), title: '', description: '', image: '', tech: [], github: '', color: 'from-blue-500 to-purple-600' }])} className="w-full py-3 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 transition-colors">+ Add Project</button>
        </SectionCard>
    )
}

function SkillsEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const s = data.skills
    const set = (k: string, v: any) => onChange({ ...data, skills: { ...s, [k]: v } })
    return (
        <>
            <SectionCard title="Skill Categories">
                {s.categories.map((cat: any, i: number) => (
                    <div key={i} className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold">{cat.category || 'New Category'}</h4>
                            <button onClick={() => set('categories', s.categories.filter((_: any, j: number) => j !== i))} className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">Delete</button>
                        </div>
                        <Field label="Category Name" value={cat.category} onChange={v => { const n = [...s.categories]; n[i] = { ...n[i], category: v }; set('categories', n) }} />
                        <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                        {cat.skills.map((skill: any, j: number) => (
                            <div key={j} className="mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    <Field label="Name" value={skill.name} onChange={v => { const n = [...s.categories]; const sk = [...n[i].skills]; sk[j] = { ...sk[j], name: v }; n[i] = { ...n[i], skills: sk }; set('categories', n) }} />
                                    <Field label="Logo URL (optional)" placeholder="https://..." value={skill.iconUrl || ''} onChange={v => { const n = [...s.categories]; const sk = [...n[i].skills]; sk[j] = { ...sk[j], iconUrl: v }; n[i] = { ...n[i], skills: sk }; set('categories', n) }} />
                                </div>
                                <div className="mt-2 flex items-end justify-between gap-4">
                                    <div className="flex-1">
                                        <ColorField label="Badge Color" value={skill.color} onChange={v => { const n = [...s.categories]; const sk = [...n[i].skills]; sk[j] = { ...sk[j], color: v }; n[i] = { ...n[i], skills: sk }; set('categories', n) }} />
                                    </div>
                                    <button onClick={() => { const n = [...s.categories]; n[i] = { ...n[i], skills: n[i].skills.filter((_: any, k: number) => k !== j) }; set('categories', n) }} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm whitespace-nowrap">✕</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => { const n = [...s.categories]; n[i] = { ...n[i], skills: [...n[i].skills, { name: '', color: '#3776AB', iconUrl: '' }] }; set('categories', n) }} className="text-sm text-blue-400 hover:text-blue-300">+ Add skill</button>
                    </div>
                ))}
                <button onClick={() => set('categories', [...s.categories, { category: '', color: 'from-blue-500 to-cyan-500', skills: [] }])} className="w-full py-3 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 transition-colors">+ Add Category</button>
            </SectionCard>
            <SectionCard title="Areas of Interest">
                {s.areasOfInterest.map((area: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2 items-end">
                        <div className="w-20"><Field label="Emoji" value={area.emoji} onChange={v => { const n = [...s.areasOfInterest]; n[i] = { ...n[i], emoji: v }; set('areasOfInterest', n) }} /></div>
                        <div className="flex-1"><Field label="Name" value={area.name} onChange={v => { const n = [...s.areasOfInterest]; n[i] = { ...n[i], name: v }; set('areasOfInterest', n) }} /></div>
                        <button onClick={() => set('areasOfInterest', s.areasOfInterest.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('areasOfInterest', [...s.areasOfInterest, { name: '', emoji: '⭐' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add area</button>
            </SectionCard>
            <SectionCard title="Summary Section">
                <Field label="Title" value={s.summary.title} onChange={v => set('summary', { ...s.summary, title: v })} />
                <Field label="Description" value={s.summary.description} onChange={v => set('summary', { ...s.summary, description: v })} multiline />
                <ArrayField label="Badges" items={s.summary.badges} onChange={v => set('summary', { ...s.summary, badges: v })} />
            </SectionCard>
        </>
    )
}

function ResumeEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const r = data.resume
    const set = (k: string, v: any) => onChange({ ...data, resume: { ...r, [k]: v } })
    return (
        <>
            <SectionCard title="Resume Info">
                <div className="grid grid-cols-2 gap-2">
                    <Field label="Email" value={r.email} onChange={v => set('email', v)} />
                    <Field label="Phone" value={r.phone} onChange={v => set('phone', v)} />
                    <Field label="Roll No" value={r.rollNo} onChange={v => set('rollNo', v)} />
                    <Field label="Resume File Name" value={r.resumeFileName} onChange={v => set('resumeFileName', v)} />
                </div>
                <Field label="GitHub Profile URL" value={r.githubProfileUrl} onChange={v => set('githubProfileUrl', v)} />
            </SectionCard>
            <SectionCard title="Education">
                {r.education.map((edu: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-end mb-2">
                            <button onClick={() => set('education', r.education.filter((_: any, j: number) => j !== i))} className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">Delete</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Field label="Degree" value={edu.degree} onChange={v => { const n = [...r.education]; n[i] = { ...n[i], degree: v }; set('education', n) }} />
                            <Field label="Field" value={edu.field} onChange={v => { const n = [...r.education]; n[i] = { ...n[i], field: v }; set('education', n) }} />
                            <Field label="Institution" value={edu.institution} onChange={v => { const n = [...r.education]; n[i] = { ...n[i], institution: v }; set('education', n) }} />
                            <Field label="Period" value={edu.period} onChange={v => { const n = [...r.education]; n[i] = { ...n[i], period: v }; set('education', n) }} />
                            <Field label="Grade" value={edu.grade} onChange={v => { const n = [...r.education]; n[i] = { ...n[i], grade: v }; set('education', n) }} />
                        </div>
                    </div>
                ))}
                <button onClick={() => set('education', [...r.education, { degree: '', field: '', institution: '', period: '', grade: '' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add education</button>
            </SectionCard>
            <SectionCard title="Certifications">
                {r.certifications.map((cert: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-end mb-2">
                            <button onClick={() => set('certifications', r.certifications.filter((_: any, j: number) => j !== i))} className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">Delete</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Field label="Name" value={cert.name} onChange={v => { const n = [...r.certifications]; n[i] = { ...n[i], name: v }; set('certifications', n) }} />
                            <Field label="Issuer" value={cert.issuer} onChange={v => { const n = [...r.certifications]; n[i] = { ...n[i], issuer: v }; set('certifications', n) }} />
                            <Field label="Date" value={cert.date} onChange={v => { const n = [...r.certifications]; n[i] = { ...n[i], date: v }; set('certifications', n) }} />
                        </div>
                        <ArrayField label="Skills" items={cert.skills} onChange={v => { const n = [...r.certifications]; n[i] = { ...n[i], skills: v }; set('certifications', n) }} />
                    </div>
                ))}
                <button onClick={() => set('certifications', [...r.certifications, { name: '', issuer: '', date: '', skills: [] }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add certification</button>
            </SectionCard>
            <SectionCard title="Experience / Projects">
                {r.experience.map((exp: any, i: number) => (
                    <div key={i} className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold text-sm">{exp.title || 'New Entry'}</h4>
                            <button onClick={() => set('experience', r.experience.filter((_: any, j: number) => j !== i))} className="px-3 py-1 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">Delete</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Field label="Title" value={exp.title} onChange={v => { const n = [...r.experience]; n[i] = { ...n[i], title: v }; set('experience', n) }} />
                            <Field label="Company / Context" value={exp.company} onChange={v => { const n = [...r.experience]; n[i] = { ...n[i], company: v }; set('experience', n) }} />
                            <Field label="Period" value={exp.period} onChange={v => { const n = [...r.experience]; n[i] = { ...n[i], period: v }; set('experience', n) }} />
                            <Field label="Type (Project/Hackathon)" value={exp.type} onChange={v => { const n = [...r.experience]; n[i] = { ...n[i], type: v }; set('experience', n) }} />
                        </div>
                        <Field label="Description" value={exp.description} onChange={v => { const n = [...r.experience]; n[i] = { ...n[i], description: v }; set('experience', n) }} multiline />
                        <ArrayField label="Skills" items={exp.skills} onChange={v => { const n = [...r.experience]; n[i] = { ...n[i], skills: v }; set('experience', n) }} />
                    </div>
                ))}
                <button onClick={() => set('experience', [...r.experience, { title: '', company: '', period: '', description: '', skills: [], type: 'Project' }])} className="w-full py-3 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 transition-colors">+ Add Experience</button>
            </SectionCard>
            <SectionCard title="Achievements">
                {r.achievements.map((ach: any, i: number) => (
                    <div key={i} className="mb-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                                <Field label="Icon (emoji)" value={ach.icon} onChange={v => { const n = [...r.achievements]; n[i] = { ...n[i], icon: v }; set('achievements', n) }} />
                                <Field label="Date" value={ach.date} onChange={v => { const n = [...r.achievements]; n[i] = { ...n[i], date: v }; set('achievements', n) }} />
                                <Field label="Title" value={ach.title} onChange={v => { const n = [...r.achievements]; n[i] = { ...n[i], title: v }; set('achievements', n) }} />
                                <Field label="Description" value={ach.description} onChange={v => { const n = [...r.achievements]; n[i] = { ...n[i], description: v }; set('achievements', n) }} />
                            </div>
                            <button onClick={() => set('achievements', r.achievements.filter((_: any, j: number) => j !== i))} className="px-3 py-2 ml-2 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm self-start">✕</button>
                        </div>
                    </div>
                ))}
                <button onClick={() => set('achievements', [...r.achievements, { title: '', description: '', date: '', icon: '🏆', color: 'from-blue-500 to-purple-500' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add achievement</button>
            </SectionCard>
            <SectionCard title="Quick Stats">
                {r.quickStats.map((stat: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2 items-end">
                        <div className="flex-1"><Field label="Label" value={stat.label} onChange={v => { const n = [...r.quickStats]; n[i] = { ...n[i], label: v }; set('quickStats', n) }} /></div>
                        <div className="w-28"><Field label="Value" value={stat.value} onChange={v => { const n = [...r.quickStats]; n[i] = { ...n[i], value: v }; set('quickStats', n) }} /></div>
                        <button onClick={() => set('quickStats', r.quickStats.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('quickStats', [...r.quickStats, { label: '', value: '' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add stat</button>
            </SectionCard>
        </>
    )
}

function ContactEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const c = data.contact
    const set = (k: string, v: any) => onChange({ ...data, contact: { ...c, [k]: v } })
    return (
        <>
            <SectionCard title="Contact Section">
                <Field label="Subtitle" value={c.subtitle} onChange={v => set('subtitle', v)} />
                <Field label="Heading" value={c.heading} onChange={v => set('heading', v)} />
                <Field label="Description" value={c.description} onChange={v => set('description', v)} multiline />
            </SectionCard>
            <SectionCard title="Contact Info">
                {c.contactInfo.map((info: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2 items-end">
                        <div className="w-24"><Field label="Label" value={info.label} onChange={v => { const n = [...c.contactInfo]; n[i] = { ...n[i], label: v }; set('contactInfo', n) }} /></div>
                        <div className="flex-1"><Field label="Value" value={info.value} onChange={v => { const n = [...c.contactInfo]; n[i] = { ...n[i], value: v }; set('contactInfo', n) }} /></div>
                        <div className="flex-1"><Field label="Link (optional)" value={info.link || ''} onChange={v => { const n = [...c.contactInfo]; n[i] = { ...n[i], link: v || null }; set('contactInfo', n) }} /></div>
                        <button onClick={() => set('contactInfo', c.contactInfo.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('contactInfo', [...c.contactInfo, { label: '', value: '', link: null, icon: 'FaEnvelope' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add contact</button>
            </SectionCard>
            <SectionCard title="Social Links">
                {c.socialLinks.map((link: any, i: number) => (
                    <div key={i} className="flex gap-2 mb-2 items-end">
                        <div className="flex-1"><Field label="Platform" value={link.platform} onChange={v => { const n = [...c.socialLinks]; n[i] = { ...n[i], platform: v }; set('socialLinks', n) }} /></div>
                        <div className="flex-1"><Field label="URL" value={link.url} onChange={v => { const n = [...c.socialLinks]; n[i] = { ...n[i], url: v }; set('socialLinks', n) }} /></div>
                        <button onClick={() => set('socialLinks', c.socialLinks.filter((_: any, j: number) => j !== i))} className="px-3 py-2 mb-4 bg-red-900/50 text-red-400 rounded-lg hover:bg-red-900 text-sm">✕</button>
                    </div>
                ))}
                <button onClick={() => set('socialLinks', [...c.socialLinks, { platform: '', url: '' }])} className="text-sm text-blue-400 hover:text-blue-300">+ Add link</button>
            </SectionCard>
        </>
    )
}

// --- Main Admin Page ---
export default function AdminPage() {
    const [auth, setAuth] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [content, setContent] = useState<any>(null)
    const [activeTab, setActiveTab] = useState<Tab>('site')
    const [saving, setSaving] = useState(false)
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
    const [loading, setLoading] = useState(false)

    const fetchContent = useCallback(async (token: string) => {
        setLoading(true)
        try {
            const res = await fetch('/api/content', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.ok) {
                setContent(await res.json())
            }
        } catch { }
        setLoading(false)
    }, [])

    const handleLogin = async () => {
        setLoginError('')
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })
            const data = await res.json()
            if (data.success) {
                setAuth(data.token)
                fetchContent(data.token)
            } else {
                setLoginError(data.error || 'Invalid password')
            }
        } catch {
            setLoginError('Connection error')
        }
    }

    const handleSave = async () => {
        if (!content) return
        setSaving(true)
        setSaveStatus('idle')
        try {
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content)
            })
            if (res.ok) {
                setSaveStatus('saved')
                setTimeout(() => setSaveStatus('idle'), 3000)
            } else {
                setSaveStatus('error')
            }
        } catch {
            setSaveStatus('error')
        }
        setSaving(false)
    }

    // Login screen
    if (!auth) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">Admin Panel</h1>
                            <p className="text-gray-500 text-sm">Enter your password to manage content</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                                autoFocus
                            />
                            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
                            <button
                                onClick={handleLogin}
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (loading || !content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
        )
    }

    return (
        <div className="h-screen w-full flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-gray-900 border-r border-gray-800 h-full overflow-y-auto">
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">Admin Panel</h1>
                    <p className="text-xs text-gray-500">Manage your portfolio content</p>
                </div>
                <nav className="px-3">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 text-left transition-all text-sm ${activeTab === tab.key
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <span>{tab.emoji}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 mt-4 border-t border-gray-800">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
                    >
                        {saving ? 'Saving...' : '💾 Save Changes'}
                    </button>
                    {saveStatus === 'saved' && <p className="text-green-400 text-xs mt-2 text-center">✓ Saved successfully!</p>}
                    {saveStatus === 'error' && <p className="text-red-400 text-xs mt-2 text-center">✕ Failed to save</p>}
                    <a href="/" target="_blank" rel="noopener noreferrer" className="block w-full py-2 mt-3 text-center text-gray-400 hover:text-white text-xs border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
                        🔗 Preview Site
                    </a>
                </div>
            </aside>

            {/* Main Content (Editor) */}
            <main className="w-[500px] flex-shrink-0 border-r border-gray-800 p-8 overflow-y-auto h-full CustomScrollbar">
                <div className="pb-20">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        {TABS.find(t => t.key === activeTab)?.emoji} {TABS.find(t => t.key === activeTab)?.label} Settings
                    </h2>

                    {activeTab === 'site' && <SiteEditor data={content} onChange={setContent} />}
                    {activeTab === 'hero' && <HeroEditor data={content} onChange={setContent} />}
                    {activeTab === 'about' && <AboutEditor data={content} onChange={setContent} />}
                    {activeTab === 'projects' && <ProjectsEditor data={content} onChange={setContent} />}
                    {activeTab === 'skills' && <SkillsEditor data={content} onChange={setContent} />}
                    {activeTab === 'resume' && <ResumeEditor data={content} onChange={setContent} />}
                    {activeTab === 'contact' && <ContactEditor data={content} onChange={setContent} />}
                </div>
            </main>

            {/* Live Preview Pane */}
            <aside className="flex-1 bg-[#0a0f1d] h-screen overflow-y-auto relative hidden lg:block custom-scrollbar">
                <div className="sticky top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-3 flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                        <span className="ml-3 text-xs text-gray-400 font-mono tracking-widest uppercase">Live Preview • {TABS.find(t => t.key === activeTab)?.label}</span>
                    </div>
                </div>

                {/* The Preview Container */}
                <div className="w-full relative min-h-screen origin-top">
                    {/* Dark/Gradient Background to simulate site background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black pointer-events-none" />

                    <div className="relative z-10 p-8 max-w-5xl mx-auto">
                        {activeTab === 'site' && (
                            <div className="w-full space-y-10">
                                <Navbar brandName={content.site.brandName} isPreview />
                                <div className="mt-20 p-10 bg-gray-800/50 rounded-2xl border border-gray-700 text-center shadow-xl backdrop-blur-sm">
                                    <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest">Loading Screen Simulation</p>
                                    <div className="flex items-baseline justify-center gap-1 mb-4">
                                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                                            {content.site.loadingName}<span className="text-blue-500">{content.site.loadingNameSuffix}</span>
                                        </h1>
                                    </div>
                                    <p className="text-gray-400 text-lg">{content.site.loadingTagline}</p>
                                </div>
                            </div>
                        )}
                        {activeTab === 'hero' && <Hero content={content.hero} />}
                        {activeTab === 'about' && <About content={content.about} />}
                        {activeTab === 'projects' && <Projects content={content.projects} />}
                        {activeTab === 'skills' && <Skills content={content.skills} />}
                        {activeTab === 'resume' && <Resume content={content.resume} />}
                        {activeTab === 'contact' && <Contact content={content.contact} />}
                    </div>
                </div>
            </aside>
        </div>
    )
}
