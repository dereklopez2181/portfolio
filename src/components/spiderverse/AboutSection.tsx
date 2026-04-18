import type { RefObject } from 'react';
import { useReveal, ActionLines, SfxText } from './shared';

interface AboutProps {
  bio: string;
  skills: string[];
}

export default function AboutSection({ bio, skills }: AboutProps) {
  const [ref, visible] = useReveal(0.1);

  return (
    <section ref={ref as RefObject<HTMLElement>} style={{ background: 'var(--ink)', padding: 'var(--gutter)' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'var(--gutter)',
      }}>
        {/* Portrait panel */}
        <div
          className={visible ? 'anim-impact' : 'anim-target'}
          style={{
            border: '6px solid var(--ink)',
            background: `
              repeating-linear-gradient(45deg, rgba(255,0,153,0.2), rgba(255,0,153,0.2) 10px, transparent 10px, transparent 20px),
              var(--near-black)
            `,
            minHeight: '420px',
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
            background: 'radial-gradient(circle, rgba(0,212,255,0.12) 1.2px, transparent 1.2px)',
            backgroundSize: '8px 8px', transform: 'rotate(30deg)',
            pointerEvents: 'none', zIndex: 1,
          }} />
          <div style={{
            width: '220px', height: '280px',
            border: '5px solid var(--paper)',
            background: `repeating-linear-gradient(
              0deg, var(--near-black) 0px, var(--near-black) 4px, #222240 4px, #222240 8px
            )`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 3,
            boxShadow: '8px 8px 0 rgba(0,0,0,0.5)',
          }}>
            <span style={{
              fontFamily: 'monospace', color: 'var(--paper)',
              fontSize: '0.8rem', opacity: 0.5, textAlign: 'center', padding: '20px',
            }}>
              [ your portrait here ]
            </span>
          </div>
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 5 }}>
            <SfxText text="WHO?!" color="var(--cyan)" rotation={-12} />
          </div>
        </div>

        {/* Text panel */}
        <div style={{
          background: 'var(--paper)',
          border: '6px solid var(--ink)',
          padding: '36px 32px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle, rgba(255,229,0,0.1) 1px, transparent 1px)',
            backgroundSize: '7px 7px', pointerEvents: 'none',
          }} />
          <h2 className={visible ? 'anim-glitch' : 'anim-target'} style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--ink)',
            textShadow: '3px 2px 0 var(--yellow), -3px -2px 0 var(--magenta)',
            letterSpacing: '0.05em',
            marginBottom: '20px',
            position: 'relative', zIndex: 2,
          }}>
            ABOUT ME
          </h2>

          {/* Thought bubble */}
          <div
            className={visible ? 'anim-slide-up' : 'anim-target'}
            style={{
              background: 'white',
              border: '4px solid var(--ink)',
              borderRadius: '30px',
              padding: '22px 26px',
              boxShadow: '5px 5px 0 var(--ink)',
              position: 'relative', zIndex: 2,
              marginBottom: '20px',
              animationDelay: '0.2s',
            }}
          >
            <p style={{ fontSize: '1rem', lineHeight: 1.7, fontWeight: 700, color: 'var(--ink)' }}>
              {bio}
            </p>
            <div style={{
              position: 'absolute', bottom: '-18px', left: '40px',
              width: '14px', height: '14px',
              background: 'white', border: '3px solid var(--ink)', borderRadius: '50%',
            }} />
            <div style={{
              position: 'absolute', bottom: '-30px', left: '30px',
              width: '9px', height: '9px',
              background: 'white', border: '3px solid var(--ink)', borderRadius: '50%',
            }} />
          </div>

          {/* Skills */}
          <div
            className={visible ? 'anim-slide-up' : 'anim-target'}
            style={{
              marginTop: '32px', position: 'relative', zIndex: 2,
              display: 'flex', flexWrap: 'wrap', gap: '8px',
              animationDelay: '0.4s',
            }}
          >
            {skills.map((skill, i) => (
              <span key={skill} style={{
                fontFamily: "'Bangers', cursive",
                fontSize: '1rem',
                padding: '6px 14px',
                background: i % 3 === 0 ? 'var(--magenta)' : i % 3 === 1 ? 'var(--cyan)' : 'var(--yellow)',
                border: '3px solid var(--ink)',
                color: 'var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
                letterSpacing: '0.04em',
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
