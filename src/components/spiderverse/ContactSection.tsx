import { useState } from 'react';
import type { RefObject } from 'react';
import { useReveal, ActionLines, SfxText } from './shared';

const BURST_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function ContactSection({ email }: { email: string }) {
  const [ref, visible] = useReveal(0.1);
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section ref={ref as RefObject<HTMLElement>} style={{ background: 'var(--ink)', padding: 'var(--gutter)' }}>
      <div style={{
        background: 'var(--magenta)',
        border: '6px solid var(--ink)',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 40px 80px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle, rgba(0,0,0,0.15) 1.2px, transparent 1.2px)',
          backgroundSize: '7px 7px', pointerEvents: 'none', zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle, rgba(255,229,0,0.1) 1px, transparent 1px)',
          backgroundSize: '9px 9px', transform: 'rotate(-20deg) translate(3px, 3px)',
          pointerEvents: 'none', zIndex: 1,
        }} />
        <ActionLines intensity="strong" center="50% 50%" />

        <h2 className={visible ? 'anim-impact' : 'anim-target'} style={{
          fontFamily: "'Bangers', cursive",
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          color: 'var(--paper)',
          textShadow: '4px 3px 0 var(--ink), -2px -2px 0 var(--cyan)',
          letterSpacing: '0.06em',
          position: 'relative', zIndex: 3,
          marginBottom: '24px',
        }}>
          LET&apos;S TEAM UP!
        </h2>

        {/* Speech bubble */}
        <div
          className={visible ? 'anim-slide-up' : 'anim-target'}
          style={{
            background: 'white',
            border: '4px solid var(--ink)',
            borderRadius: '30px',
            padding: '22px 30px',
            boxShadow: '5px 5px 0 var(--ink)',
            position: 'relative', zIndex: 3,
            maxWidth: '500px',
            marginBottom: '40px',
            animationDelay: '0.2s',
          }}
        >
          <p style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.6, color: 'var(--ink)' }}>
            Interested? Let&apos;s make something amazing together.
          </p>
          <div style={{
            position: 'absolute', bottom: '-22px', left: '50%', marginLeft: '-14px',
            width: 0, height: 0,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '22px solid var(--ink)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-15px', left: '50%', marginLeft: '-11px',
            width: 0, height: 0,
            borderLeft: '11px solid transparent',
            borderRight: '11px solid transparent',
            borderTop: '17px solid white',
            zIndex: 1,
          }} />
        </div>

        {/* CTA Button */}
        <a
          href={`mailto:${email}`}
          className={visible ? 'anim-slide-up' : 'anim-target'}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: 'var(--ink)',
            background: 'var(--yellow)',
            border: '4px solid var(--ink)',
            padding: '16px 48px',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            position: 'relative', zIndex: 3,
            boxShadow: btnHover ? '8px 8px 0 var(--ink), 12px 12px 0 var(--cyan)' : '5px 5px 0 var(--ink)',
            transform: btnHover ? 'scale(1.08) rotate(-2deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.25s ease',
            cursor: 'pointer',
            animationDelay: '0.35s',
            display: 'inline-block',
          }}
        >
          ✉ GET IN TOUCH!
          {btnHover ? (
            <div style={{ position: 'absolute', inset: '-20px', pointerEvents: 'none', zIndex: -1 }}>
              {BURST_ANGLES.map(angle => (
                <div key={angle} style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  width: '30px', height: '3px',
                  background: 'var(--ink)',
                  transform: `rotate(${angle}deg) translateX(55px)`,
                  transformOrigin: '0 50%',
                  animation: 'impact-in 0.3s both',
                }} />
              ))}
            </div>
          ) : null}
        </a>

        {visible ? (
          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 5, animation: 'impact-in 0.5s 0.5s both' }}>
            <SfxText text="ZAP!" color="var(--yellow)" rotation={12} />
          </div>
        ) : null}
        {visible ? (
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 5, animation: 'impact-in 0.5s 0.7s both' }}>
            <SfxText text="BOOM!" color="var(--cyan)" rotation={-10} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', padding: 'var(--gutter)' }}>
      <div style={{
        background: 'var(--paper)',
        border: '4px solid var(--ink)',
        padding: '20px',
        textAlign: 'center',
        fontFamily: "'Bangers', cursive",
        fontSize: '0.9rem',
        letterSpacing: '0.1em',
        color: 'var(--ink)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '5px 5px', pointerEvents: 'none',
        }} />
        <span style={{ position: 'relative', zIndex: 2 }}>
          © 2026 DEREK LOPEZ — DESIGNED WITH INK &amp; PIXELS
        </span>
      </div>
    </footer>
  );
}
