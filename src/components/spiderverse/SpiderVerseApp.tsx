import HeroSection from './HeroSection';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ContactSection, { Footer } from './ContactSection';

const PROJECTS = [
  { title: 'GROCERY SHOPPER', type: 'Automation', description: 'Chrome Manifest V3 extension that automates HEB.com grocery cart population from a plain-text list.', tags: ['React', 'Node.js', 'AI Pipeline', 'Claude Vision API'], sfx: 'BAM!' },
  { title: 'BETSHARE.APP', type: 'WEB APP', description: 'Full-stack mobile-first sports betting tracker featuring authentication, bet logging, group leaderboards, and performance dashboards.', tags: ['Next.js / React', 'Supabase', 'Claude Vision', 'Sentry'], sfx: 'KAPOW!' },
  { title: 'CHECKOUT-JS-DEPLOYER', type: 'DEV TOOL', description: 'CLI tool (published as a globally-linked npm package) that automates running multiple BigCommerce checkout-js versions side-by-side for regression testing.', tags: ['Cloudflare', 'Node.js', 'BigCommerce API'], sfx: 'WHAM!' },
  { title: 'SEO CONTENT STRATEGY GENERATOR', type: 'DELIVERABLE', description: 'Repeatable workflow that crawls a client website, researches competitor keywords and People Also Ask data, and generates a structured SEO content strategy document.', tags: ['Firecrawl', 'SerpAPI', 'Agentic Workflow'], sfx: 'THONK!' }
];

const SKILLS = ['React', 'Agentic Workflow', 'TypeScript', 'AI-Driven Development', 'Ecommerce Strategy'];

export default function SpiderVerseApp() {
  return (
    <>
      <HeroSection
        name="DEREK LOPEZ"
        title="Technology Consultant"
        tagline="Advisor. Builder."
      />
      <WorkSection projects={PROJECTS} />
      <AboutSection
        bio="I'm a creative advisor who lives at the intersection of architecture and engineering. I believe the best digital solutions feel alive — they respond, they surprise, they make you lean in. Every project is a chance to push the boundaries of what I can do."
        skills={SKILLS}
      />
      <ContactSection email="hello@dereklopez.dev" />
      <Footer />
    </>
  );
}
