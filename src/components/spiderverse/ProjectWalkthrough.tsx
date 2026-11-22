import { useState } from 'react';

type Step = {
  action: string;
  title: string;
  summary: string;
  output?: string;
  findings?: { label: string; detail: string }[];
};

const WALKTHROUGHS = {
  checkout: {
    label: 'CheckoutJS Deployer',
    sample: 'Simulated terminal session',
    steps: [
      {
        action: 'Deploy',
        title: 'Compare two checkout releases',
        summary: 'Choose two tags and assign them to test stores. The CLI creates a worktree and starts a dev server and Cloudflare tunnel for each version.',
        output: '$ bc-checkout-deployer deploy\n\n✓ v1.800.0 → QA Store A   :8080\n✓ v1.751.0 → QA Store B   :8081\n\nUpdated both custom checkout URLs.',
      },
      {
        action: 'Status',
        title: 'Verify both versions are running',
        summary: 'The status command shows each store’s assigned version, local port, process health, and checkout URL.',
        output: '$ bc-checkout-deployer status\n\nv1.800.0 · QA Store A :8080\n  Watcher, server, tunnel: running\n  https://qa-a.example.com/checkout\n\nv1.751.0 · QA Store B :8081\n  Watcher, server, tunnel: running\n  https://qa-b.example.com/checkout',
      },
      {
        action: 'Stop',
        title: 'Clean up the comparison',
        summary: 'The CLI stops the servers and tunnels, removes the worktrees, and offers to restore each store’s default checkout.',
        output: '$ bc-checkout-deployer stop\n\n✓ Stopped servers and tunnels\n✓ Removed both worktrees\n? Restore default checkouts? Yes\n✓ Both stores restored',
      },
    ],
  },
  seo: {
    label: 'SEO Content Strategy',
    sample: 'Sample research for a fictional business',
    steps: [
      {
        action: 'Crawl',
        title: 'Find the missing service page',
        summary: 'A sample Firecrawl inventory for Lantern AV, an Austin event production company.',
        findings: [
          { label: 'Pages found', detail: 'Home, Event Production, Contact' },
          { label: 'Content gap', detail: 'Event Production mentions live streaming, but the service has no dedicated page.' },
        ],
      },
      {
        action: 'Research',
        title: 'Match the gap to search intent',
        summary: 'The SerpAPI research stage reviews competitor landing pages and questions prospective clients ask.',
        findings: [
          { label: 'Competitor pattern', detail: 'Local competitors give event live streaming its own service page.' },
          { label: 'People Also Ask', detail: 'How much does it cost to livestream an event?' },
        ],
      },
      {
        action: 'Strategy',
        title: 'Turn research into a page brief',
        summary: 'The report puts the live streaming page first and gives the content team a concrete brief.',
        findings: [
          { label: 'New page', detail: '/live-streaming-austin' },
          { label: 'Target keyword', detail: 'event live streaming austin' },
          { label: 'Page brief', detail: 'Cover multi-camera setup, explain what affects pricing, and link to the quote form.' },
        ],
      },
    ],
  },
} satisfies Record<string, { label: string; sample: string; steps: Step[] }>;

export type Walkthrough = keyof typeof WALKTHROUGHS;

export default function ProjectWalkthrough({ kind }: { kind: Walkthrough }) {
  const [activeStep, setActiveStep] = useState(0);
  const { label, sample, steps }: { label: string; sample: string; steps: Step[] } = WALKTHROUGHS[kind];
  const step = steps[activeStep];

  return (
    <div className={`project-walkthrough project-walkthrough--${kind}`} aria-label={`${label} walkthrough`}>
      <header>
        <p className="project-walkthrough__label">{sample}</p>
        <div className="project-walkthrough__steps" role="group" aria-label="Walkthrough steps">
          {steps.map(({ action }, index) => (
            <button key={action} type="button" aria-pressed={index === activeStep} onClick={() => setActiveStep(index)}>
              {action}
            </button>
          ))}
        </div>
      </header>
      <div className="project-walkthrough__content" aria-live="polite">
        <h3>{step.title}</h3>
        <p>{step.summary}</p>
        {step.output && <pre>{step.output}</pre>}
        {step.findings && (
          <dl>
            {step.findings.map(({ label, detail }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {kind === 'seo' && <a href="/demos/lantern-av-seo-strategy.docx" download>Download sample strategy (.docx)</a>}
    </div>
  );
}
