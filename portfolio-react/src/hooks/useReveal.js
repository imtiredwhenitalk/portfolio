import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -6% 0px' } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}
