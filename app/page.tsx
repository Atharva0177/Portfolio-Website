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

  return (
    <>
      <Hero content={content.hero} />
      <About content={content.about} />
      <Projects content={content.projects} githubUrl={content.hero.socialLinks?.find(l => l.platform === 'github')?.url || '#'} />
      <Resume content={content.resume} />
      <Skills content={content.skills} />
      <GitHubActivity projects={content.projects} githubUrl={content.hero.socialLinks?.find(l => l.platform === 'github')?.url || '#'} />
      <Contact content={content.contact} />
    </>
  )
}