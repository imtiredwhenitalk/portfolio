import { useState, useEffect, useRef } from 'react';
import { site } from '../data/site';
import Reveal from './Reveal';

// Тайп-ефект для головного заголовка hero (залишається все, вигляд збережено)
function TypingEffect({ segments, speed = 42, className = '' }) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  // Проста лінійна анімація усіх сегментів, не переносить останнє слово окремо
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

  // Формує вивід тексту по сегментах із підтримкою accent
  const charSegments = [];
  let remaining = displayedLength;
  for (let i = 0; i < segments.length && remaining > 0; i++) {
    const seg = segments[i];
    const cut = Math.min(seg.text.length, remaining);
    charSegments.push({
      accent: seg.accent,
      text: seg.text.slice(0, cut),
    });
    remaining -= cut;
  }

  return (
    <span className={`typing-wrap`}>
      <span
        className={`typing ${className}`}
        style={{
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          display: 'inline',
          whiteSpace: 'normal'
        }}
      >
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
            display: 'inline-block',
            verticalAlign: 'baseline'
          }}
        >|</span>
      </span>
      <style>{`
        .typing-wrap {
          display: block;
          max-width: 430px;
        }
        @media (max-width: 700px) {
          .typing-wrap {
            max-width: 98vw;
          }
        }
        @media (max-width: 480px) {
          .typing-wrap {
            max-width: 96vw;
            min-width: 0;
          }
          .hero-title {
            text-align: left !important;
            word-break: break-word !important;
            line-height: 1.18;
            hyphens: auto;
          }
          .typing {
            word-break: break-word !important;
            white-space: normal !important;
            overflow-wrap: break-word !important;
          }
        }
        @media (max-width: 370px) {
          .typing-wrap,
          .hero-title,
          .typing {
            max-width: 99vw !important;
            font-size: 0.97rem !important;
          }
        }
      `}</style>
    </span>
  );
}

// Оновлений або підчищений текст, але сенс і зовнішній вигляд зберігається як на зображенні
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
                  { text: ' – from UI to' },
                  { text: ' production' }
                ]}
              />
            </h1>

            <div className="hero-lead">
              <p>
                {site.description ||
                  'Student at LNTU (Cybersecurity). I ship web apps end-to-end — frontend, API, databases, Docker, and production deploy.'}
              </p>
            </div>

            <div className="hero-cta">
              <a className="btn btn-accent" href="#work">
                Selected work
              </a>
              <a className="btn btn-ghost" href={site.github} target="_blank" rel="noreferrer">
                {site.githubHandle} on GitHub
              </a>
            </div>

            <div className="hero-stats" style={{ width: '100%', overflowX: 'auto' }}>
              <dl
                className="stat-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 32,
                  minWidth: 0,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <dt>Education</dt>
                  <dd>{site.education || 'LNTU – Cybersecurity'}</dd>
                </div>
                <div style={{ minWidth: 0 }}>
                  <dt>Focus</dt>
                  <dd>Full-stack + security fundamentals</dd>
                </div>
                <div style={{ minWidth: 0 }}>
                  <dt>Shipped</dt>
                  <dd>3 production grade projects</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
      <style>
        {`
          @media (max-width: 700px) {
            .hero-block-inner {
              padding: 0 0.5rem;
            }
            .hero-title {
              font-size: 1.5rem;
              line-height: 1.15;
              word-break: break-word;
              text-align: left;
            }
            .hero-lead p {
              font-size: 1rem;
            }
            .hero-cta {
              flex-direction: column !important;
              gap: 10px !important;
              align-items: stretch !important;
              margin-bottom: 20px !important;
              display: flex !important;
            }
            .hero-cta a {
              min-width: 0 !important;
              width: 100% !important;
              text-align: center !important;
            }
            .hero-stats .stat-row {
              grid-template-columns: 1fr !important;
              gap: 14px !important;
            }
          }
          @media (max-width: 400px) {
            .hero-title {
              font-size: 1.2rem;
              word-break: break-word !important;
              text-align: left;
            }
            .hero-lead p {
              font-size: 0.95rem;
            }
            .hero-block-inner {
              padding: 0 2vw;
            }
          }
        `}
      </style>
    </section>
  );
}
