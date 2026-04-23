import { useState, useRef, useEffect } from 'react';
import type { RefObject } from 'react';
import { ActionLines, SfxText } from './shared';
import type { Project } from './SpiderVerseApp';

const ACCENT_COLORS = ['var(--magenta)', 'var(--cyan)', 'var(--yellow)', 'var(--magenta)'];

function useCardReveal(threshold = 0.1): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function ProjectCard({
  project,
  index,
  isActive,
  onSelect,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: (id: string, cardRef: RefObject<HTMLDivElement>) => void;
}) {
  const [cardRef, visible] = useCardReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  const handleActivate = () => onSelect(project.id, cardRef);

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      className={visible ? 'anim-slide-up' : 'anim-target'}
      onClick={handleActivate}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: isActive ? `5px solid var(--cyan)` : '5px solid var(--ink)',
        background: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.05) rotate(-1deg)' : 'scale(1) rotate(0deg)',
        transition: 'transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.25s ease, border-color 0.2s ease',
        boxShadow: isActive
          ? `8px 8px 0 var(--ink), 12px 12px 0 var(--cyan)`
          : hovered
            ? `8px 8px 0 var(--ink), 12px 12px 0 ${accentColor}`
            : '4px 4px 0 var(--ink)',
        animationDelay: `${index * 0.12}s`,
        zIndex: hovered ? 10 : 1,
        outline: 'none',
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <div style={{
          position: 'absolute', top: '8px', left: '8px', zIndex: 10,
          background: 'var(--cyan)',
          border: '2px solid var(--ink)',
          padding: '2px 8px',
          fontFamily: "'Bangers', cursive",
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          color: 'var(--ink)',
          boxShadow: '2px 2px 0 var(--ink)',
        }}>
          ▶ OPEN
        </div>
      )}

      {/* Halftone hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle, ${accentColor}22 1.2px, transparent 1.2px)`,
        backgroundSize: '6px 6px',
        pointerEvents: 'none', zIndex: 2,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Image area */}
      <div style={{
        height: '200px',
        background: `repeating-linear-gradient(
          45deg,
          ${accentColor}33,
          ${accentColor}33 10px,
          var(--near-black) 10px,
          var(--near-black) 20px
        )`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderBottom: '4px solid var(--ink)',
      }}>
        <ActionLines intensity={hovered ? 'strong' : 'normal'} />
        <span style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1.5rem',
          color: 'var(--paper)',
          letterSpacing: '0.08em',
          zIndex: 2,
          opacity: 0.5,
          fontStyle: 'italic',
        }}>
          {`[ ${project.type} ]`}
        </span>
        {hovered && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 5, animation: 'impact-in 0.3s both' }}>
            <SfxText text={project.sfx} color={accentColor} rotation={-8} style={{ fontSize: '1.2rem' }} />
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '16px 18px', position: 'relative', zIndex: 3 }}>
        <h3 style={{
          fontFamily: "'Bangers', cursive",
          fontSize: '1.5rem',
          letterSpacing: '0.03em',
          marginBottom: '6px',
          color: 'var(--ink)',
          textShadow: hovered ? `2px 1px 0 ${accentColor}` : 'none',
          transition: 'text-shadow 0.3s ease',
        }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#444', fontWeight: 700 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
          {project.tags.map((tag, i) => (
            <span key={tag} style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '2px 8px',
              border: '2px solid var(--ink)',
              background: i === 0 ? accentColor : 'transparent',
              color: 'var(--ink)',
              fontFamily: "'Comic Neue', cursive",
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{
          marginTop: '12px',
          fontFamily: "'Bangers', cursive",
          fontSize: '0.85rem',
          letterSpacing: '0.06em',
          color: accentColor,
          WebkitTextStroke: '1px var(--ink)',
        }}>
          CLICK FOR DETAILS →
        </div>
      </div>
    </div>
  );
}

export default function WorkSection({
  projects,
  selectedId,
  onSelect,
  sectionRef,
}: {
  projects: Project[];
  selectedId: string | null;
  onSelect: (id: string, cardRef: RefObject<HTMLDivElement>) => void;
  sectionRef?: RefObject<HTMLElement | null>;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderVisible(true); obs.unobserve(el); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      style={{ background: 'var(--ink)', padding: 'var(--gutter)' }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          background: 'var(--paper)',
          border: 'var(--border-thick)',
          padding: '28px 32px',
          marginBottom: 'var(--gutter)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle, rgba(255,0,153,0.08) 1px, transparent 1px)',
          backgroundSize: '6px 6px', pointerEvents: 'none',
        }} />
        <h2
          className={headerVisible ? 'anim-glitch' : 'anim-target'}
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--ink)',
            textShadow: '3px 2px 0 var(--cyan), -3px -2px 0 var(--magenta)',
            letterSpacing: '0.06em',
            position: 'relative', zIndex: 2,
          }}
        >
          ★ MY WORK ★
        </h2>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--gutter)',
      }}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            isActive={p.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
