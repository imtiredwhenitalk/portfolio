import { site } from '../data/site';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="shell">
        <Reveal className="hero-eyebrow" delay={0}>
          <span className="eyebrow">Open to internships & freelance</span>
        </Reveal>

        <Reveal as="h1" className="hero-title" delay={80}>
          I build and deploy
          <span className="hero-title-accent"> real web products</span>
          — from UI to production servers.
        </Reveal>

        <Reveal className="hero-lead" delay={160}>
          <p>{site.description}</p>
        </Reveal>

        <Reveal className="hero-cta" delay={240}>
          <a className="btn btn-accent" href="#work">
            Selected work
          </a>
          <a className="btn btn-ghost" href={site.github} target="_blank" rel="noreferrer">
            {site.githubHandle} on GitHub
          </a>
        </Reveal>

        <Reveal className="hero-stats" delay={320}>
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
        </Reveal>
      </div>
    </section>
  );
}
