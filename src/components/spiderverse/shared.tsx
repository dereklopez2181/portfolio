import { useState, useEffect, useRef, useCallback } from 'react';
import type { RefObject, MouseEvent, CSSProperties } from 'react';

export function useReveal(threshold = 0.15): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
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

export function useMouseParallax() {
  const posRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = useCallback((e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const next = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    };
    posRef.current = next;
    setPos(next);
  }, []);
  return [pos, handleMouse] as const;
}

export function ActionLines({ intensity = 'normal', center = '50% 40%' }: { intensity?: string; center?: string }) {
  const bg = intensity === 'strong'
    ? `repeating-conic-gradient(from 0deg at ${center}, transparent 0deg 3deg, rgba(0,0,0,0.06) 3deg 4deg)`
    : `repeating-conic-gradient(from 0deg at ${center}, transparent 0deg 4deg, rgba(0,0,0,0.03) 4deg 5deg)`;
  return <div style={{ position: 'absolute', inset: 0, background: bg, pointerEvents: 'none', zIndex: 1 }} />;
}

export function SfxText({
  text,
  color = 'var(--yellow)',
  rotation = -8,
  style = {},
}: {
  text: string;
  color?: string;
  rotation?: number;
  style?: CSSProperties;
}) {
  return (
    <span style={{
      fontFamily: "'Bangers', cursive",
      fontSize: '2rem',
      color: 'var(--ink)',
      WebkitTextStroke: '3px white',
      paintOrder: 'stroke fill' as CSSProperties['paintOrder'],
      background: color,
      padding: '4px 16px',
      border: '3px solid var(--ink)',
      transform: `rotate(${rotation}deg)`,
      display: 'inline-block',
      boxShadow: '3px 3px 0 var(--ink)',
      ...style,
    }}>
      {text}
    </span>
  );
}
