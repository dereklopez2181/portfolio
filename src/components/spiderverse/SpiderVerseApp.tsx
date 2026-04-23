import { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
import HeroSection from './HeroSection';
import WorkSection from './WorkSection';
import AboutSection from './AboutSection';
import ProjectDetailSection from './ProjectDetailSection';
import ContactSection, { Footer } from './ContactSection';

export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  longDescription: string;
  tags: string[];
  sfx: string;
  features: string[];
  techStack: string[];
  media?: { src: string; alt: string };
  links?: { label: string; url: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 'grocery-shopper',
    title: 'GROCERY SHOPPER',
    type: 'Automation',
    description: 'Chrome Manifest V3 extension that automates HEB.com grocery cart population from a plain-text list.',
    longDescription: 'A Chrome extension that takes a plain-text grocery list and automatically populates an HEB.com cart — no manual searching required. Built on Manifest V3 with a Claude Vision API pipeline to match item names to store SKUs even when descriptions are ambiguous.',
    tags: ['React', 'Node.js', 'AI Pipeline', 'Claude Vision API'],
    sfx: 'BAM!',
    features: [
      'Paste any plain-text grocery list and auto-fill the HEB cart',
      'Claude Vision API resolves ambiguous item names to correct SKUs',
      'Manifest V3 compliant — works with current Chrome security model',
      'One-click cart review before checkout',
    ],
    techStack: ['React', 'Node.js', 'Chrome Extensions MV3', 'Claude Vision API', 'TypeScript'],
  },
  {
    id: 'betshare-app',
    title: 'BETSHARE.APP',
    type: 'WEB APP',
    description: 'Full-stack mobile-first sports betting tracker featuring authentication, bet logging, group leaderboards, and performance dashboards.',
    longDescription: 'BetShare is a mobile-first web app for tracking sports bets and competing with friends. Users log picks, view personal dashboards with win-rate breakdowns, and climb group leaderboards in real time. Claude Vision parses bet slip photos so manual entry is optional.',
    tags: ['Next.js / React', 'Supabase', 'Claude Vision', 'Sentry'],
    sfx: 'KAPOW!',
    features: [
      'Bet slip photo parsing via Claude Vision — no manual entry needed',
      'Real-time group leaderboards with Supabase subscriptions',
      'Performance dashboards: ROI, win rate, sport/bet-type breakdowns',
      'Full auth flow with row-level security on all user data',
    ],
    techStack: ['Next.js', 'React', 'Supabase', 'Claude Vision API', 'Sentry', 'TypeScript'],
  },
  {
    id: 'checkout-js-deployer',
    title: 'CHECKOUT-JS-DEPLOYER',
    type: 'DEV TOOL',
    description: 'CLI tool (published as a globally-linked npm package) that automates running multiple BigCommerce checkout-js versions side-by-side for regression testing.',
    longDescription: 'A globally-linked npm CLI that spins up multiple BigCommerce checkout-js builds in parallel, each on isolated ports, so you can regression-test across versions without manual setup. Cuts version-comparison setup from 20+ minutes to a single command.',
    tags: ['Cloudflare', 'Node.js', 'BigCommerce API'],
    sfx: 'WHAM!',
    features: [
      'Single command to run N checkout-js versions in parallel',
      'Automatic port allocation and process management',
      'Cloudflare tunnel integration for shared testing URLs',
      'Published as globally-linked npm package — works anywhere in terminal',
    ],
    techStack: ['Node.js', 'TypeScript', 'Cloudflare Tunnel', 'BigCommerce API', 'npm'],
  },
  {
    id: 'seo-content-strategy',
    title: 'SEO CONTENT STRATEGY',
    type: 'DELIVERABLE',
    description: 'Repeatable workflow that crawls a client website, researches competitor keywords and People Also Ask data, and generates a structured SEO content strategy document.',
    longDescription: 'An agentic workflow that takes a client URL, crawls the site with Firecrawl, pulls competitor keyword gaps and PAA data via SerpAPI, and outputs a structured SEO content strategy document — ready to hand to a content team. Turns a multi-day manual process into a 20-minute automated run.',
    tags: ['Firecrawl', 'SerpAPI', 'Agentic Workflow'],
    sfx: 'THONK!',
    features: [
      'Full site crawl via Firecrawl to map existing content coverage',
      'Competitor keyword gap analysis with SerpAPI',
      'People Also Ask extraction for long-tail targeting',
      'Structured output: topic clusters, page briefs, internal linking map',
    ],
    techStack: ['Firecrawl', 'SerpAPI', 'Claude API', 'Node.js', 'TypeScript'],
  },
];

const SKILLS = ['React', 'Agentic Workflow', 'TypeScript', 'AI-Driven Development', 'Ecommerce Strategy'];

export default function SpiderVerseApp() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const detailRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const activeCardRef = useRef<HTMLElement | null>(null);

  // Read hash on mount + listen for back/forward navigation
  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const id = hash.slice('#project/'.length);
        if (PROJECTS.some(p => p.id === id)) {
          setSelectedProjectId(id);
        }
      } else {
        setSelectedProjectId(null);
      }
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);

  const handleSelect = (id: string, cardRef: RefObject<HTMLDivElement>) => {
    activeCardRef.current = cardRef.current;
    setSelectedProjectId(id);
    window.location.hash = `project/${id}`;
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleClose = () => {
    setSelectedProjectId(null);
    history.pushState('', document.title, window.location.pathname + window.location.search);
    requestAnimationFrame(() => {
      workRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    setTimeout(() => {
      (activeCardRef.current as HTMLElement | null)?.focus();
    }, 400);
  };

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) ?? null;

  return (
    <>
      <HeroSection
        name="DEREK LOPEZ"
        title="CREATIVE DEVELOPER"
        tagline="I build digital experiences that hit different — where code meets creativity and pixels tell stories."
      />
      <WorkSection
        projects={PROJECTS}
        selectedId={selectedProjectId}
        onSelect={handleSelect}
        sectionRef={workRef}
      />
      <AboutSection
        bio="I'm a creative developer who lives at the intersection of design and engineering. I believe the best digital experiences feel alive — they respond, they surprise, they make you lean in. Every project is a chance to push the boundaries of what the web can do."
        skills={SKILLS}
      />
      <ProjectDetailSection
        project={selectedProject}
        onClose={handleClose}
        sectionRef={detailRef}
      />
      <ContactSection email="hello@dereklopez.dev" />
      <Footer />
    </>
  );
}
