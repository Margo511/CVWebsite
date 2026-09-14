import { useEffect, useRef } from 'react';
import './pointer-particles.css';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  bornAt: number;
  duration: number;
};

const MAX_PARTICLES = 48;

export function PointerParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!canvas || !context || !precisePointer.matches || reducedMotion.matches) return;

    let particles: Particle[] = [];
    let frameId = 0;
    let lastSpawnAt = 0;
    let lastX = -100;
    let lastY = -100;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(window.innerWidth * ratio);
      canvas!.height = Math.round(window.innerHeight * ratio);
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw(now: number) {
      frameId = 0;
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles = particles.filter(particle => {
        const progress = (now - particle.bornAt) / particle.duration;
        if (progress >= 1) return false;
        particle.x += particle.vx;
        particle.y += particle.vy;
        const opacity = Math.sin(progress * Math.PI) * 0.72;
        context!.beginPath();
        context!.arc(particle.x, particle.y, particle.radius * (1 - progress * 0.35), 0, Math.PI * 2);
        context!.fillStyle = `rgba(180, 116, 255, ${opacity})`;
        context!.shadowColor = 'rgba(154, 82, 255, .55)';
        context!.shadowBlur = 7;
        context!.fill();
        return true;
      });
      context!.shadowBlur = 0;
      if (particles.length) frameId = requestAnimationFrame(draw);
    }

    function clear() {
      particles = [];
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function handlePointerMove(event: PointerEvent) {
      if (document.documentElement.dataset.theme !== 'dark') {
        clear();
        return;
      }
      const now = performance.now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (now - lastSpawnAt < 20 || distance < 4) return;
      lastSpawnAt = now;
      lastX = event.clientX;
      lastY = event.clientY;
      for (let index = 0; index < 3; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.18 + Math.random() * 0.42;
        particles.push({
          x: event.clientX + (Math.random() - 0.5) * 18,
          y: event.clientY + (Math.random() - 0.5) * 18,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.08,
          radius: 0.8 + Math.random() * 1.5,
          bornAt: now,
          duration: 460 + Math.random() * 360,
        });
      }
      if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
      if (!frameId) frameId = requestAnimationFrame(draw);
    }

    const themeObserver = new MutationObserver(() => {
      if (document.documentElement.dataset.theme !== 'dark') clear();
    });
    resize();
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', clear);
    return () => {
      clear();
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', clear);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-particles" aria-hidden="true" />;
}
