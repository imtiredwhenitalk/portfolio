import { useState, useEffect, useRef } from 'react';
import { site } from '../data/site';
import Reveal from './Reveal';

// Тайп еффект для головного заголовка hero
function TypingEffect({ segments, speed = 42, className = '' }) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  // З'єднуємо текст в один рядок
  const flatText = segments.map((s) => s.text).join('');
  const totalLength = flatText.length;

  useEffect(() => {
    if (displayedLength < totalLength) {
      intervalRef.current = setTimeout(() => {
        setDisplayedLength((len) => len + 1);
      }, speed);
    } else {
      setDone(true);
    }
    return () => clearTimeout(intervalRef.current);
  }, [displayedLength, speed, totalLength]);

  // Формуємо масив сегментів для виводу (акцент/звичайний текст)
  const charSegments = [];
  let segIdx = 0, charIdx = 0, charsSoFar = 0;
  while (charsSoFar < displayedLength && segIdx < segments.length) {
    const seg = segments[segIdx];
    const remaining = displayedLength - charsSoFar;
    const take = Math.min(seg.text.length - charIdx, remaining);
    if (take > 0) {
      charSegments.push({
        accent: seg.accent,
        text: seg.text.slice(charIdx, charIdx + take)
      });
      charIdx += take;
      charsSoFar += take;
    }
    if (charIdx >= seg.text.length) {
      segIdx += 1;
      charIdx = 0;
    }
  }

  return (
    <span className={`typing ${className}`}>
      {charSegments.map((seg, i) =>
        seg.accent ? (
          <span className="hero-title-accent" key={i}>{seg.text}</span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
      <span
        className="cursor"
        aria-hidden
        style={{
          marginLeft: '1px',
          visibility: done ? 'hidden' : 'visible',
        }}
      >|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="shell">
        <Reveal className="hero-block">
          <div className="hero-block-inner">
            <div className="hero-eyebrow-wrapper">
              <span className="eyebrow">Open to internships & freelance</span>
            </div>

            <h1 className="hero-title">
              <TypingEffect
                segments={[
                  { text: 'I build and deploy' },
                  { text: ' real web products', accent: true },
                  { text: ' from UI to prod.'}
                ]}
              />
            </h1>

            <div className="hero-lead">
              <p>{site.description}</p>
            </div>

            <div className="hero-cta">
              <a className="btn btn-accent" href="#work">
                Selected work
              </a>
              <a className="btn btn-ghost" href={site.github} target="_blank" rel="noreferrer">
                {site.githubHandle} on GitHub
              </a>
            </div>

            <div className="hero-stats">
              <dl className="stat-row">
                <div>
                  <dt>Education</dt>
                  <dd>{site.education}</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Full-stack + security fundamentals</dd>
                </div>
                <div>
                  <dt>Shipped</dt>
                  <dd>3 production-grade projects</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
