import { site } from '../data/site';
import Reveal from './Reveal';

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="shell">
        <Reveal>
          <header className="section-head">
            <p className="section-label">Contact me</p>
            <h2 id="contact-heading">Let&apos;s talk</h2>
            <p className="section-desc text-muted">
              Internships, freelance, or just feedback on a repo — reach out on Telegram or GitHub.
            </p>
          </header>
        </Reveal>

        <Reveal className="contact-actions" delay={80}>
          <a className="btn btn-accent btn-lg" href={site.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a className="btn btn-ghost btn-lg" href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </Reveal>

        <Reveal className="site-footer" delay={140}>
          <p>
            © {year} {site.title}. Built with React + Vite.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
