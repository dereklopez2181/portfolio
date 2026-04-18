import HeroSection from './HeroSection';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ContactSection, { Footer } from './ContactSection';

const PROJECTS = [
  { title: 'NEXUS APP', type: 'UI/UX', description: 'A next-gen social platform with real-time collaboration.', tags: ['React', 'Figma', 'Motion'], sfx: 'BAM!' },
  { title: 'VORTEX BRAND', type: 'BRANDING', description: 'Full visual identity for an esports organization.', tags: ['Identity', 'Print', 'Digital'], sfx: 'KAPOW!' },
  { title: 'ECHO DASHBOARD', type: 'WEB APP', description: 'Analytics dashboard with data visualization and dark mode.', tags: ['D3.js', 'Vue', 'API'], sfx: 'WHAM!' },
  { title: 'PULSE LANDING', type: 'WEB DESIGN', description: 'High-converting landing page for a fitness startup.', tags: ['HTML/CSS', 'Animation', 'CRO'], sfx: 'THWIP!' },
  { title: 'DRIFT MOBILE', type: 'MOBILE', description: 'iOS music discovery app with gesture-based navigation.', tags: ['Swift', 'Figma', 'Prototyping'], sfx: 'CRACK!' },
  { title: 'FORGE SYSTEM', type: 'DESIGN SYSTEM', description: 'Component library and token system for enterprise SaaS.', tags: ['Tokens', 'React', 'Storybook'], sfx: 'POW!' },
];

const SKILLS = ['React', 'Figma', 'TypeScript', 'Motion Design', 'UI/UX', 'Branding', 'Illustration', 'CSS Wizardry'];

export default function SpiderVerseApp() {
  return (
    <>
      <HeroSection
        name="DEREK LOPEZ"
        title="CREATIVE DEVELOPER"
        tagline="I build digital experiences that hit different — where code meets creativity and pixels tell stories."
      />
      <WorkSection projects={PROJECTS} />
      <AboutSection
        bio="I'm a creative developer who lives at the intersection of design and engineering. I believe the best digital experiences feel alive — they respond, they surprise, they make you lean in. Every project is a chance to push the boundaries of what the web can do."
        skills={SKILLS}
      />
      <ContactSection email="hello@dereklopez.dev" />
      <Footer />
    </>
  );
}
