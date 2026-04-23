import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { ActionLines, SfxText } from './shared';
import type { Project } from './SpiderVerseApp';

const ACCENT_COLORS: Record<string, string> = {
  'nexus-app': 'var(--magenta)',
  'vortex-brand': 'var(--cyan)',
  'echo-dashboard': 'var(--yellow)',
  'pulse-landing': 'var(--magenta)',
  'drift-mobile': 'var(--cyan)',
  'forge-system': 'var(--yellow)',
};

function getAccent(id: string): string {
  return ACCENT_COLORS[id] ?? 'var(--magenta)';
}

export default function ProjectDetailSection({
  project,
  onClose,
  sectionRef,
}: {
  project: Project | null;
  onClose: () => void;
  sectionRef: RefObject<HTMLElement>;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const accent = getAccent(project.id);

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--ink)', padding: 'var(--gutter)' }}
      aria-label={`Project details: ${project.title}`}
    >
      {/* Key on project.id causes React to remount content and replay CSS animations */}
      <div key={project.id}>

        {/* Header bar */}
        <div style={{
          background: accent,
          border: 'var(--border-thick)',
          padding: '20px 28px',
          marginBottom: 'var(--gutter)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <ActionLines intensity="strong" />
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <h2
              className="anim-glitch"
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                color: 'var(--ink)',
                letterSpacing: '0.05em',
                margin: 0,
              }}
            >
              ★ PROJECT FILE: {project.title} ★
            </h2>
            <SfxText text={project.sfx} color="var(--paper)" rotation={-6} style={{ fontSize: '1.1rem' }} />
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close project detail"
            style={{
              fontFamily: "'Bangers', cursive",
              fontSize: '1.1rem',
              letterSpacing: '0.06em',
              background: 'var(--ink)',
              color: 'var(--paper)',
              border: '3px solid var(--paper)',
              padding: '8px 18px',
              cursor: 'pointer',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.4)',
              position: 'relative',
              zIndex: 2,
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '5px 5px 0 rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '3px 3px 0 rgba(0,0,0,0.4)';
            }}
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Two-panel content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--gutter)',
        }}>

          {/* Media panel */}
          <div
            className="anim-impact"
            style={{
              border: '5px solid var(--ink)',
              background: 'var(--near-black)',
              minHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ActionLines intensity="strong" center="50% 50%" />
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle, ${accent}18 1.5px, transparent 1.5px)`,
              backgroundSize: '8px 8px',
              pointerEvents: 'none', zIndex: 1,
            }} />
            {project.media ? (
              <img
                src={project.media.src}
                alt={project.media.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                }}
              />
            ) : (
              <div style={{
                position: 'relative',
                zIndex: 3,
                textAlign: 'center',
                padding: '32px',
              }}>
                <div style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  color: accent,
                  letterSpacing: '0.08em',
                  textShadow: '3px 2px 0 var(--ink)',
                  marginBottom: '12px',
                }}>
                  [ DEMO COMING SOON ]
                </div>
                <div style={{
                  fontFamily: "'Comic Neue', cursive",
                  fontSize: '0.85rem',
                  color: 'var(--paper)',
                  opacity: 0.5,
                  fontWeight: 700,
                }}>
                  private repo — gif on the way
                </div>
              </div>
            )}
          </div>

          {/* Details panel */}
          <div
            className="anim-slide-up"
            style={{
              background: 'var(--paper)',
              border: '5px solid var(--ink)',
              padding: '28px 28px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle, ${accent}0f 1px, transparent 1px)`,
              backgroundSize: '7px 7px',
              pointerEvents: 'none',
            }} />

            {/* Long description (thought bubble) */}
            <div style={{
              background: 'white',
              border: '4px solid var(--ink)',
              borderRadius: '24px',
              padding: '20px 22px',
              boxShadow: '4px 4px 0 var(--ink)',
              position: 'relative',
              zIndex: 2,
            }}>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                {project.longDescription}
              </p>
              <div style={{
                position: 'absolute', bottom: '-16px', left: '36px',
                width: '12px', height: '12px',
                background: 'white', border: '3px solid var(--ink)', borderRadius: '50%',
              }} />
              <div style={{
                position: 'absolute', bottom: '-26px', left: '26px',
                width: '8px', height: '8px',
                background: 'white', border: '3px solid var(--ink)', borderRadius: '50%',
              }} />
            </div>

            {/* Features */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '1.1rem',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
                marginBottom: '10px',
              }}>
                KEY FEATURES:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="caption-box"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      color: 'var(--ink)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: accent, flexShrink: 0 }}>▶</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '1.1rem',
                letterSpacing: '0.06em',
                color: 'var(--ink)',
                marginBottom: '10px',
              }}>
                TECH STACK:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.techStack.map((tech, i) => (
                  <span key={tech} style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: '0.95rem',
                    padding: '4px 12px',
                    background: i % 3 === 0 ? accent : i % 3 === 1 ? 'var(--ink)' : 'transparent',
                    color: i % 3 === 1 ? 'var(--paper)' : 'var(--ink)',
                    border: '3px solid var(--ink)',
                    boxShadow: '2px 2px 0 var(--ink)',
                    letterSpacing: '0.04em',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links (if any) */}
            {project.links && project.links.length > 0 && (
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Bangers', cursive",
                      fontSize: '1rem',
                      letterSpacing: '0.06em',
                      background: 'var(--yellow)',
                      color: 'var(--ink)',
                      border: '3px solid var(--ink)',
                      padding: '8px 18px',
                      textDecoration: 'none',
                      boxShadow: '4px 4px 0 var(--ink)',
                      display: 'inline-block',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04) rotate(-1deg)';
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = '6px 6px 0 var(--ink)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1) rotate(0deg)';
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = '4px 4px 0 var(--ink)';
                    }}
                  >
                    ✦ {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
