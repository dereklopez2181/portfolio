import type { RefObject, MouseEventHandler, CSSProperties } from 'react';
import { useReveal, useMouseParallax, ActionLines, SfxText } from './shared';

interface HeroProps {
  name: string;
  title: string;
  tagline: string;
}

export default function HeroSection({ name, title, tagline }: HeroProps) {
  const [ref, visible] = useReveal(0.1);
  const [mousePos, handleMouse] = useMouseParallax();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      onMouseMove={handleMouse as MouseEventHandler<HTMLElement>}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'var(--near-black)',
        overflow: 'hidden',
        padding: '40px 20px',
      }}
    >
      {/* Halftone magenta overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle, rgba(255,0,153,0.12) 1.2px, transparent 1.2px)',
        backgroundSize: '8px 8px',
        pointerEvents: 'none', zIndex: 1,
      }} />
      {/* Halftone cyan overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle, rgba(0,212,255,0.1) 1px, transparent 1px)',
        backgroundSize: '7px 7px',
        transform: 'rotate(15deg) translate(2px, 2px)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      <ActionLines intensity="strong" center="50% 50%" />
      {/* Diagonal color bands */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '60%', height: '140%',
        background: 'var(--magenta)',
        transform: 'rotate(-12deg)',
        opacity: 0.15, zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-10%',
        width: '50%', height: '140%',
        background: 'var(--cyan)',
        transform: 'rotate(-12deg)',
        opacity: 0.1, zIndex: 0,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 5, textAlign: 'center',
        transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        transition: 'transform 0.15s ease-out',
      }}>
        {visible ? (
          <SfxText text="WOW!" rotation={-15} style={{
            position: 'absolute', top: '-20px', right: '10px', fontSize: '1.4rem',
            animation: 'impact-in 0.5s 0.4s both',
          }} />
        ) : null}

        <h1
          className={visible ? 'anim-impact' : 'anim-target'}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            lineHeight: 0.95,
            color: 'var(--paper)',
            WebkitTextStroke: '3px var(--paper)',
            paintOrder: 'stroke fill' as CSSProperties['paintOrder'],
            textShadow: '6px 4px 0 var(--cyan), -6px -4px 0 var(--magenta), 3px -3px 0 var(--yellow)',
            letterSpacing: '0.04em',
            marginBottom: '16px',
          }}
        >
          {name}
        </h1>

        <div
          className={visible ? 'anim-slide-up' : 'anim-target'}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
            color: 'var(--yellow)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            border: '3px solid var(--yellow)',
            display: 'inline-block',
            padding: '8px 32px',
            background: 'rgba(255,229,0,0.08)',
            animationDelay: '0.2s',
          }}
        >
          {title}
        </div>

        <div
          className={visible ? 'anim-slide-up' : 'anim-target'}
          style={{
            marginTop: '28px',
            background: 'var(--yellow)',
            border: '3px solid var(--ink)',
            padding: '12px 28px',
            display: 'inline-block',
            fontWeight: 700,
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            color: 'var(--ink)',
            boxShadow: '4px 4px 0 var(--ink)',
            animationDelay: '0.4s',
            maxWidth: '500px',
          }}
        >
          {tagline}
        </div>

        <div style={{
          marginTop: '48px',
          fontFamily: "'Bangers', cursive",
          color: 'var(--paper)',
          fontSize: '1.1rem',
          letterSpacing: '0.15em',
          opacity: 0.6,
          animation: 'slide-up-impact 1s 1s both',
        }}>
          ↓ SCROLL DOWN ↓
        </div>
      </div>
    </section>
  );
}
