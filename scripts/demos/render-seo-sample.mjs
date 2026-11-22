import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const source = resolve(process.argv[2] ?? '../seo_business_analysis', 'src/lib/report-generator.mjs');
const { buildStrategyDocx } = await import(pathToFileURL(source).href);

const primaryPage = {
  title: 'Event Live Streaming in Austin',
  targetKeyword: 'event live streaming austin',
  alsoTargets: 'Austin livestream production, multi-camera event streaming',
  estMonthlyVolume: 'Illustrative only',
  suggestedUrl: '/live-streaming-austin',
  whyYouCanRank: 'Build on existing event production coverage. Show a multi-camera setup, explain what affects pricing, and link to the quote form.',
};
const supportingPage = {
  title: 'Hybrid Event Production in Austin',
  targetKeyword: 'hybrid event production austin',
  alsoTargets: 'hybrid event AV, Austin conference broadcast',
  estMonthlyVolume: 'Illustrative only',
  suggestedUrl: '/hybrid-event-production-austin',
  whyYouCanRank: 'Explain how the crew supports in-person and remote attendees. Link to the live streaming page for broadcast details.',
};

const document = await buildStrategyDocx({
  clientName: 'Lantern AV',
  preparedDate: 'Portfolio sample',
  market: 'Austin, TX',
  niche: 'Event production',
  siteUrl: 'https://lantern-av.example.com',
  section1Intro: 'This sample strategy uses a fictional company and illustrative crawl and search results. The first priority is a dedicated live streaming service page.',
  sitePages: [
    { title: 'Home', description: 'Overview of event production services in Austin.' },
    { title: 'Event Production', description: 'Describes stage audio, video, and live streaming.' },
    { title: 'Contact', description: 'Project inquiry form.' },
  ],
  contentGap: 'The Event Production page mentions live streaming, but the service has no dedicated page.',
  competitors: [
    { name: 'Capital Event AV (fictional)', pages: '/event-live-streaming, /conference-av' },
    { name: 'Juniper Broadcast (fictional)', pages: '/austin-live-streaming, /hybrid-events' },
  ],
  competitorKeyPattern: 'Both example competitors give event live streaming its own service page.',
  paaItems: [
    { question: 'How much does it cost to livestream an event?', note: 'Explain how crew size, duration, and camera count affect pricing.' },
    { question: 'What internet speed do I need to livestream an event?', note: 'Explain how the crew tests the venue connection and plans for backup connectivity.' },
  ],
  tier1Pages: [primaryPage],
  tier2Pages: [supportingPage],
  tier3Pages: [
    { title: 'Conference Live Streaming FAQ', url: '/conference-live-streaming-faq', volume: 'illustrative only' },
  ],
  quickWins: [
    'Link the live streaming mention on Event Production to the new service page when it ships.',
    'Add venue, event date, and expected audience size to the inquiry form.',
  ],
  summaryRows: [primaryPage, supportingPage].map((page, index) => ({
    num: String(index + 1),
    pageTitle: page.title,
    targetKeyword: page.targetKeyword,
    estMonthlyVol: page.estMonthlyVolume,
    whyItCanRank: index === 0 ? 'Fills a gap in the existing service coverage.' : 'Addresses planning needs for hybrid events.',
  })),
});

await writeFile(new URL('../../public/demos/lantern-av-seo-strategy.docx', import.meta.url), document);
