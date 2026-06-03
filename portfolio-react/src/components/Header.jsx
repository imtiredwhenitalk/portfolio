import { useEffect, useState } from 'react';
import { nav, site } from '../data/site';
import { useScrollY } from '../hooks/useScrollY';

export default function Header() {
  const scrollY = useScrollY();
  const compact = scrollY > 48;
  const [active, setActive] = useState('about');

  useEffect(() => {
    const ids = nav.map((item) => item.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header ${compact ? 'is-compact' : ''}`}>
      <div className="shell header-inner">
        <a className="logo" href="#" aria-label="Top of page">
          <img
            className="logo-mark"
            src="/lntu.png"
            alt=""
            width={32}
            height={32}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="logo-text">{site.title}</span>
        </a>

        <nav className="nav" aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.id}
              className={`nav-link ${active === item.id ? 'is-active' : ''}`}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="btn btn-ghost" href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn-accent" href="#work">
            View work
          </a>
        </div>
      </div>
    </header>
  );
}
